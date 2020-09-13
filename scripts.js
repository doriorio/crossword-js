var application = {
    changed: 0,
    //note to self - group these
    tableCells: document.getElementsByTagName('td'),
    //tableCellsArr: Array.prototype.slice.call(tableCells),
    colorChanger: document.getElementById('colorChanger'),
    self: this,
    gridState: null,


    toggleActive: function(evt) {
        if (evt.target.tagName == 'INPUT') {

            let newDiv = document.createElement('div');
            evt.target.parentNode.append(newDiv);
            evt.target.parentNode.removeChild(evt.target);
            newDiv.classList.add('blackDiv');
            application.changed = 1;
            let body = document.getElementsByTagName('body')[0];
            Array.prototype.forEach.call(application.tableCells, (tableCell) => {
                tableCell.removeEventListener('click', application.toggleActive);
             });
             
        }
        
        
    },
    initListeners: function() {
    
    
        colorChanger.addEventListener('click', application.colorChange);
    
    
    
        Array.prototype.forEach.call(application.tableCells, (tableCell) => {
    
                tableCell.addEventListener('input', application.cellInput);
    
            
    })

    },
    colorChange: function(){

        console.log(application.tableCells);
        if (colorChanger.innerText == '') {
            let textNode = document.createTextNode("The next box you click will turn black");
            colorChanger.appendChild(textNode);
        }
        Array.prototype.forEach.call(application.tableCells, (tableCell) => {
            tableCell.addEventListener('click', application.toggleActive);
        });

    },
    cellInput: function(evt){
        console.log(evt.target.value.length);
        console.log(evt.target.getAttribute('maxlength'));
        if (evt.target.value.length == evt.target.getAttribute('maxlength')) {
        
            let nextInput = evt.target.parentNode.nextElementSibling.firstChild;
            if (nextInput.tagName != 'INPUT') {
                nextInput = nextInput.nextSibling;
                console.log(nextInput);
            } 
            nextInput.focus();
            //works within a row
        }


    }
}


document.addEventListener('DOMContentLoaded', function(){
    application.initListeners();
});
