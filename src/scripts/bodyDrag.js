var bodyEl = document.body; 
var gElement;

bodyEl.addEventListener('dragover',(ev)=>{
    ev.preventDefault();
    console.log(ev.currentTarget);
   gElement = ev.currentTarget;
    // bodyEl.classList.add('ondragover');
});

// bodyEl.addEventListener('drop',(ev)=>{
//     const typeOfEl = ev.dataTransfer.getData('text/plain');
//     console.log(typeOfEl);
//     console.log('drop');
//     const el = document.createElement(typeOfEl);
//     el.innerHTML = `Hello I am ${typeOfEl}`
//     bodyEl.appendChild(el);
// })

bodyEl.addEventListener('dragleave',()=>{
    // console.log('frame-drag-leave');
    bodyEl.classList.remove('ondragover');
});

bodyEl.style.height = window.innerHeight;
var getMsg = ()=>{}

window.parent.addEventListener('message',(ev)=>{
    console.log(ev);
    if(ev.data.type == 'end'){
        const droppedEl = document.createElement(ev.data.elType);
        droppedEl.innerHTML = `HelllOooooooo`;
       console.log(ev.data.elType , gElement);
       gElement.appendChild(droppedEl)
    }
}); 