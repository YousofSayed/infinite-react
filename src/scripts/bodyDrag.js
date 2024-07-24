var bodyEl = document.body; 
var gElement;

bodyEl.addEventListener('dragover',(ev)=>{
    ev.preventDefault();
    console.log(ev.currentTarget);
   gElement = ev.currentTarget;
    // bodyEl.classList.add('ondragover');
});

bodyEl.addEventListener('dragleave',()=>{
    // console.log('frame-drag-leave');
    bodyEl.classList.remove('ondragover');
});

bodyEl.style.height = window.innerHeight;

window.parent.addEventListener('message',(ev)=>{
    console.log(ev);
    if(ev.data.type == 'end'){
        const droppedEl = document.createElement(ev.data.elType);
        droppedEl.innerHTML = `HelllOooooooo`;
       console.log(ev.data.elType , gElement);
       gElement.appendChild(droppedEl);
       console.log('true');
    }
}); 