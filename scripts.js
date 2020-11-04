window.c = {
    l: function(text){
        console.log(text);
    }
 };
var application = {
    changed: 0,
    //note to self - group these
    gridState: {
        cells: 100,
        rows: 10,
        columns: 10,
        inPlay: []
    },
    colorChanger : {},
    dictionaryLookup: {},
   tableCells: document.getElementsByTagName('td'),

    lookup: function(evt) {
        evt.preventDefault();
        console.log('lookup');
        let key = '13756c48-e6ff-463e-b33a-0eedc3a6965a'; //atob this later or include secret file in build
        let endpoint = 'https://dictionaryapi.com/api/v3/references/collegiate/json/'
        let input = document.getElementById('lookupVal').value;
        var responseToParse = {};
        
        responseToParse = application.getData(endpoint+input+`?key=${key}`);
        

       
        
        
        
    },
    getData: function(endpoint) {
        let results = document.getElementById('results');
        fetch(endpoint).then(function(response) {
            return response.json();
        }).then(function(data) {
            for (key in data) {
                results.innerText = data[key]['shortdef'];
            }
        }).catch(function(err){
            console.log(err);
        });

        
    },


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
        var self =  this;

        self.colorChanger = document.getElementById('colorChanger');
        dictionaryLookup =  document.getElementById('lookupButton');
        colorChanger.addEventListener('click', application.colorChange);
        dictionaryLookup.addEventListener('click', application.lookup);

       let rows = document.querySelectorAll('tr');

       rows.forEach(row => {
           let key = row.getAttribute('data-row');
           self.gridState.inPlay[key]= [];
           row.querySelectorAll('input').forEach(cell => {
               let cellKey = cell.getAttribute('data-cell');
               cell.setAttribute('data-row', key)

               self.gridState.inPlay[key].push(cellKey);
               
           });
           

       })
    
    
        Array.prototype.forEach.call(application.tableCells, (tableCell) => {
                tableCell.addEventListener('input', application.cellInput);   
    });

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
        var self = application;
        var inPlay = self.gridState.inPlay;
        let el = evt.target;
        var nextInput;

        if (el.value.length == el.getAttribute('maxlength')) {
            let cell = el.getAttribute('data-cell');
            let rowAtt = el.getAttribute('data-row');
            if (inPlay[rowAtt].length == cell) {
                let temp = inPlay[rowAtt+1];
                console.log(temp);
            } else {
                console.log(inPlay[rowAtt].length)
            }


            //nextInput.focus();
            //works within a row
        }


    }
}


document.addEventListener('DOMContentLoaded', function(){
    application.initListeners();
});
