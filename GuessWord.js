var prepareGame = document.querySelector('#main_option li');
var help = document.querySelectorAll('#main_option li')[1];
var startButton = document.querySelector('.radiobutton+button');
//var checkingMessage = document.getElementById('check');
var checkInput = document.getElementById('send');
var hint = document.querySelector('button+button');
var warning = document.querySelector('button+p');
var information = document.querySelector('p+p');

var gamePanelStatus = document.getElementById('gamepanel').style.visibility='hidden';
var helpPanelStatus = document.getElementById('helppanel').style.visibility='hidden';

var randomWord, availableHints, totalTries, totalMistakes;
var gameStarted = false;
function showGamePanel(){
    gamePanelStatus = document.getElementById('gamepanel').style.visibility='visible';
}

function showHelpPanel(){
    helpPanelStatus = document.getElementById('helppanel').style.visibility='visible';
}


function gameStart(){
    var genre = document.getElementsByClassName('radiobutton');
    var randomIndex;
    gameStarted = true;
    checkInput.disabled=false;
    totalMistakes=0, totalTries=0, availableHints = 2;
    warning.textContent='';
    information.textContent='';

    if(genre[0].checked){
        var AnimalList = ['tiger','lion','frog','kangaroo','snake','elephant','eagle','shark','whale','spider','mouse','human','cockroach','monkey','chimpanzee','cat','dog',
        'oranghutan','gorilla','tuna','crocodile','octopus','squirrel'];

        randomIndex = Math.floor((Math.random()*AnimalList.length));
        randomWord = AnimalList[randomIndex];
        //checkingMessage.innerHTML = randomWord;
    }
    if(genre[1].checked){
        var countryList = ['France','Korea','England','Japan','Russia','China','USA','Portugal','Spain','Indonesia','Austria','Vietnam','Brazil','Sweden','Argentina','Mexico','India',
        'Lithuania', 'Latvia' ,'Switzerland','Germany', 'Denmark', 'Italy','Pakistan','Canada','Algeria', 'Iran','Iraq', 'Costarica', 'Uruguay', 'Mongolia'];
        randomIndex = Math.floor((Math.random()*countryList.length));
        randomWord = countryList[randomIndex].toLowerCase();
        //checkingMessage.innerHTML = randomWord;
    }
    if(genre[2].checked){
        var cityList=['London','Seoul','Busan','Moscow','Manchester','Toronto','Paris','Madrid','Milano','Torino','Rome','Stockholm','Gothenburg','Berlin','Frankfurt','Dusseldorf','Minsk','Vilnius',
        'Dubai','Incheon','Tokyo','Beijing','Kyoto','Lisbon','Liverpool','Valencia','Mallorca','Lyon','Marseille','Zurich','Talin','Riga','Kiev','Amsterdam'];
        randomIndex = Math.floor((Math.random()*cityList.length));
        randomWord = cityList[randomIndex].toLowerCase();
        //checkingMessage.innerHTML = randomWord;
    }
}

function checkUserInput(){
    var userInput = document.querySelector('input[type="text"]').value.toLowerCase(); //대문자 입력시 소문자로 변환
    totalTries++;
    if(userInput!=randomWord){
        totalMistakes++;

        warning.textContent = totalMistakes + ' Mistake (s)';

        if(totalMistakes==10){
            warning.textContent = 'Game Over'+ ' correct answer is '+ randomWord.charAt(0).toUpperCase() + randomWord.substring(1,randomWord.length);
            information.textContent = '';
            hint.disabled=true;
            checkInput.disabled=true;
        }
    }

    if(userInput==randomWord){
            warning.textContent='';
            hint.disabled=true;
            information.textContent = 'Cool! Click the start button again if you wanna play more';
            checkInput.disabled=true;
        }
showHints();
}

function showHints(){
    if((totalTries==3)||((totalTries>=6)&&(availableHints>=1))){
        hint.disabled=false;
    }
}



function useHints(){
    if(availableHints==2){
        var firstLetter=randomWord.charAt(0).toUpperCase();
        information.textContent ='The first letter is: ' + firstLetter;
        if(totalTries<6)
            hint.disabled=true;
    }
    if(availableHints==1){
        information.textContent += ' The word has ' + randomWord.length + ' letters';
        hint.disabled=true;
    }

    availableHints--;
}


prepareGame.addEventListener('click',showGamePanel,false);
help.addEventListener('click',showHelpPanel,false);
startButton.addEventListener('click',gameStart, false);
checkInput.addEventListener('click',checkUserInput, false); 
hint.addEventListener('click',useHints,false);
