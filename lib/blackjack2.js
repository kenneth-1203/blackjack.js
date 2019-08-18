var player, playerCards, playerLen, dealerCards, cards, cardTypes, usedCards, isPlaying;

cardTypes = [

    'diamonds',
    'clubs',
    'hearts',
    'spades',

];

document.querySelector('.btn-hit').addEventListener('click', hitBtn);
document.querySelector('.btn-pass').addEventListener('click', passBtn);


init();


playerCreate = {

    drawCard: function() {
        
    cards++;
    var cardNum = (Math.floor(Math.random() * 13) + 1);
    var cardType = cardTypes[(Math.floor(Math.random() * cardTypes.length))];

    this[cards] = { 'number': cardNum, 'type': cardType };
    usedCards[cards] = { 'number': cardNum, 'type': cardType };
    usedCards[0] = { 'number': 0, 'type': 'null' };

    }
}

playerCards = Object.create(playerCreate);
playerCards.number = 10;
dealerCards = Object.create(playerCreate);

// function init() {

//     isPlaying = true;
//     usedCards = {};
//     dealerCards = {};
//     playerCards = {};
//     cards = 0;

//     drawCard();
//     drawCard();
// };

// function drawCard() {

//     cards++;
//     var cardNum = (Math.floor(Math.random() * 13) + 1);
//     var cardType = cardTypes[(Math.floor(Math.random() * cardTypes.length))];

//     playerCards[cards] = { 'number': cardNum, 'type': cardType };
//     usedCards[cards] = { 'number': cardNum, 'type': cardType };
//     usedCards[0] = { 'number': 0, 'type': 'null' };

// };

// function hitBtn() {

//     if (isPlaying) {

//         drawCard();
    
//         Object.size = function(obj) {
//             var size = 0, key;
//             for (key in obj) {
//                 if (obj.hasOwnProperty(key)) size++;
//             }
//             return size;
//         };
//         playerLen = Object.size(playerCards);
    
//         for(var i = 0; i < playerLen; i++) {
         
//             if (playerCards[cards]['number'] === usedCards[i]['number']) {
//                 if (playerCards[cards]['type'] === usedCards[i]['type']) {
    
//                     delete playerCards[i];
//                     hitBtn();
//                 }
//             }
//         }
//     }
// };

function passBtn() {

    if (isPlaying) {

        cards++;
        var cardNum = (Math.floor(Math.random() * 13) + 1);
        var cardType = cardTypes[(Math.floor(Math.random() * cardTypes.length))];
    
        dealerCards[cards] = { 'number': cardNum, 'type': cardType };
        usedCards[cards] = { 'number': cardNum, 'type': cardType };
        usedCards[0] = { 'number': 0, 'type': 'null' };
    }
}