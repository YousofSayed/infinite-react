
/**
 * @desc MutObs используя события MutationObserve из DOM3 прослушивает определенные node элементы, атрибуты или отслеживает внутреннюю структуру и выполняет соответствующую callback функцию отмены или повтора действия;
 **/

window.undoredo = window.undoredo || {};

/**
 * @desc
 * */
undoredo.MutObs = function( dom ) {

    // Унификация проблем совместимости между браузерами
    var MutationObserver = this.MutationObserver = window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;

    // Определение поддержки MutationObserver клиентским браузером;
    this.mutationObserverSupport = !!MutationObserver;

    if(!this.mutationObserverSupport) return alert("Ваш браузер не поддерживает функции MutationObserver");
   // Конфигурация отслеживания по умолчанию, отслеживается всё: attributes, child elements, attribute values;
    this.options = {
        'childList': true,
        'subtree': true,
        'attributes' : true,
        'characterData' : true,
        'attributeOldValue' : true,
        'characterDataOldValue' : true
    };

    // currentMutation - определяем переменную для хранения текущей Mutation;
    this.currentMutation = {};

   // historyList - массив содержит список операций пользователя;
    this.historyList = [];

    // recordsAll - массив хранит ВСЕ совершенные мутации ;
    this.recordsAll = [];

    // index - номер текущего вызова fallback;
    this.index = 0;

    // Если не передан элемент DOM то по умолчанию отслеживать изменения в body;
    this.dom = dom|| document.documentElement.body || document.getElementsByTagName("body")[0];
    
    // Запуск отслеживания;
    this.observe( );

};

//функция extend аналог функции jQuery $.extend для объединения объектов
//пример
// var a = {i1: '1', i2: {i21: '21', i22: '22'}};
// var b = extend(a); 
// a.i2.i22 = 'qweqwe';
//window.status = b.i2.i22;
// в итоге все обекты из a помещаются в b но и остаются в a.
function extend() {
    var len = arguments.length, target, i = 0, options, prop;
    if (len > 0) {
        if (len == 1) {
            target = {};
        }
        else {
            target = arguments[0];
            ++i;
        }

        for (; i < len; ++i) {
            options = arguments[i];
            for (prop in options) {          
                target[prop] = (typeof options[prop] == 'object') ? extend(options[prop]) : options[prop];
            }
        }
        return target;
    }
}

// $.extend(undoredo.MutObs.prototype, {
undoredo.MutObs.prototype = extend({
    // Callback-функция измененного узла, сохраняем Undo и Redo в historyList;
    "callback" : function ( records , instance ) {
        // Удаляет указанный индекс;
        this.historyList.splice( this.index+1 );

        var _this = this;
        records.map(function(record) {
            var target = record.target;
            //console.log(record);
            _this.recordsAll.push(record);
            _this.getHistory(record);
            //Удаление или добавление элементов;
            if( record.type === "childList" ) {
                // Если элемент удалён;
                if(record.removedNodes.length !== 0) {
                    // Получаем относительные индексы элементов;
                    var indexs = _this.getIndexs(target.children , record.removedNodes );
                    _this.historyList.push({
                        "undo" : function() {
                            _this.disconnect();
                            _this.addChildren(target,  record.removedNodes ,indexs );
                            _this.reObserve();
                        },
                        "redo" : function() {
                            _this.disconnect();
                            _this.removeChildren(target,  record.removedNodes );
                            _this.reObserve();
                        }
                    });
                };
                // Если элемент добавлен;
                if(record.addedNodes.length !== 0) {
                    // Получаем относительные индексы элементов;
                    var indexs = _this.getIndexs(target.children , record.addedNodes );
                    _this.historyList.push({
                        "undo" : function() {
                            _this.disconnect();
                            _this.removeChildren(target,  record.addedNodes );
                            _this.reObserve();
                        },
                        "redo" : function () {
                            _this.disconnect();
                            _this.addChildren(target,  record.addedNodes ,indexs);
                            _this.reObserve();
                        }
                    });
                };
                // проверка для типа мутации characterData
            } else if( record.type === "characterData" ) {
                var oldValue = record.oldValue;
                var newValue = record.target.textContent // ||  record.target.innerText - можно использовать, но не совместимо с IE 7,8,9
                _this.historyList.push({
                    "undo" : function() {
                        _this.disconnect();
                        target.textContent = oldValue;
                        _this.reObserve();
                    },
                    "redo" : function () {
                        _this.disconnect();
                        target.textContent = newValue;
                        _this.reObserve();
                    }
                });
                // изменение свойств style, dataset, attribute включены в attributes;
            } else if( record.type === "attributes" ) {
                var oldValue = record.oldValue;
                var newValue = record.target.getAttribute( record.attributeName );
                var attributeName = record.attributeName;
                _this.historyList.push({
                    "undo" : function() {
                        _this.disconnect();
                        target.setAttribute(attributeName, oldValue);
                        _this.reObserve();
                    },
                    "redo" : function () {
                        _this.disconnect();
                        target.setAttribute(attributeName, newValue);
                        _this.reObserve();
                    }
                });
            };
        });
        // обнуляем index;
        this.index = this.historyList.length-1;
    },

    "removeChildren" : function ( target, nodes ) {
        for(var i= 0, len= nodes.length; i<len; i++ ) {
            target.removeChild( nodes[i] );
        };
    },

    "getHistory" : function ( record ) {
        return (record);
    },

    "addChildren" : function ( target, nodes ,indexs) {
        for(var i= 0, len= nodes.length; i<len; i++ ) {
            if(target.children[ indexs[i] ]) {
                target.insertBefore( nodes[i] , target.children[ indexs[i] ])  ;
            }else{
                target.appendChild( nodes[i] );
            };
        };
    },

    // метод определяющий какой node содержит child в родительском элементе;
    "indexOf" : function ( target, obj ) {
        return Array.prototype.indexOf.call(target, obj)
    },

    "getIndexs" : function (target, objs) {
        var result = [];
        for(var i=0; i<objs.length; i++) {
            result.push( this.indexOf(target, objs[i]) );
        };
        return result;
    },

    /**
     * @desc определение наблюдателя (отслеживания)
     * */
    "observe" : function() {
        if( this.dom.nodeType !== 1) return alert("Первый параметр функции должен быть элементом dom");
        this.currentMutation = new this.MutationObserver( this.callback.bind(this) );
        // Начать отслеживание;
        this.currentMutation.observe( this.dom, this.options );
    },

    /**
     * @desc рестарт отслеживания (точнее "снять с паузы"), правильно запустится только если до этого был инициализирована ф-я observe;
     * */
    "reObserve" : function () {
        this.currentMutation.observe( this.dom, this.options );
    },

    /**
     *@desc Если необходимо выполнить функцию или действие с DOM которые не должны попасть в список Undo и Redo, то можно передать их в эту функцию входящим параметром в виде функции. without прекратит отслеживание (disconnect) выполнит действие и возобновит (reObserve);
     * */
    "without" : function ( fn ) {
        this.disconnect();
        fn&fn();
        this.reObserve();
    },

     /**
     * @desc остановить отслеживание;
     * */
     "disconnect" : function () {
        return this.currentMutation.disconnect();
    },

    /**
     * @desc операции Mutation для сохранения в historyList;
     * */
    "save" : function ( obj ) {
        if(!obj.undo)return alert("Переданный аргумент должен быть undo!");
        if(!obj.redo)return alert("Переданный аргумент должен быть redo!");
        this.historyList.push(obj);
    },

    /**
     * @desc  функция для очистки совершенных операций;
     * */
    "reset" : function () {
        //обнуляем массивы historyList и index;
        this.historyList = [];
        this.index = 0;
    },

    /**
     * @desc удаляет заданный индекс;
     * */
    "splice" : function ( index ) {
        this.historyList.splice( index );
    },

     /**
     * @desc функция отмены, шаг назад - Undo
     * step - шаг насколько мутаций вернуться, если значение не передано или <=0, то по умолчанию = 1
     * */
    "undo" : function (step) {
        if (step <= 0 || step === undefined) {step = 1}
        for (var i = 0; i < step; i++) {
            if( this.canUndo() ) {
                 this.historyList[this.index].undo();
                 this.index--;
             };
         }
    },

    /**
     * @desc функция повтора, шаг вперед - Redo
     * step - шаг насколько мутаций повторить, если значение не передано или <=0, то по умолчанию = 1
     * */
    "redo" : function (step) {
        if (step <= 0 || step === undefined) {step = 1}
        for (var i = 0; i < step; i++) {
            if( this.canRedo() ) {
                this.index++;
                this.historyList[this.index].redo();
            };
        }
    },

    /**
     * @desc определение того что может быть отменено
     * */
    "canUndo" : function () {
        return this.index !== -1;
    },

    /**
     * @desc определение того что может быть повторено;
     * */
    "canRedo" : function () {
        return this.historyList.length-1 !== this.index;
    }
});

export const MutateHandler = undoredo.MutObs;