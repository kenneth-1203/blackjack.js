var players, playerCreate, playerCards, dealerCards,
cards, checkCard, cardTypes, cardNum, usedCards, 
isPlaying, dealerMove;
cardTypes = [

    'diamond',
    'club',
    'heart',
    'spade',

];
playerCreate = {

    cards: 0,
    total: 0,
    drawCard: function() {

    if (isPlaying && dealerMove) {

        var letterNum;
        var cardNum = (Math.floor(Math.random() * 13) + 1);
        var cardType = cardTypes[(Math.floor(Math.random() * cardTypes.length))];

        if (cardNum > 10) {
            
            newCardNum = cardNum;
            if (newCardNum === 11) { letterNum = 'J'; }
            else if (newCardNum === 12) { letterNum = 'Q'; }
            else if (newCardNum === 13) { letterNum = 'K'; };

            cardNum = 10; 
            
        } else if (cardNum === 1) { 

            newCardNum = cardNum;
            letterNum = 'A'; 
            
        } else { newCardNum = cardNum; letterNum = cardNum; };

        usedCards[cards] = { 'number': newCardNum, 'letter': letterNum, 'type': cardType };
    
        if (this.cards === 0) { this.total += cardNum; newCard(this, cardNum, newCardNum, cardType, letterNum); }

        else {

            // Card checking still needs to be fixed.

            checkNum = usedCards.map(function (item) {
                return item.number;
            });
            checkType = usedCards.map(function (item) {
                return item.type;
            });
            numCheck = checkNum.filter(function(item, index){
                return checkNum.indexOf(item) >= index;
            });
            typeCheck = checkType.filter(function(item, index){
                return checkType.indexOf(item) >= index;
            });

            if (numCheck.length < cards && typeCheck.length < checkType.length) {

                this.cards--;
                cards--;
                this.drawCard();
                console.log('Duplicate found: ' + usedCards[cards]);
            } 
            else { this.total += cardNum; newCard(this, cardNum, newCardNum, cardType, letterNum); };
        };
    };
    },
    standBtn: function() {

        for (var i = 1; i <= 2; i++) { document.getElementById('hidden-' + i).style.display = 'none'; };

        if (dealerMove) { finalCards(dealerCards); dealerAI(); };
        document.getElementById('dealer-hand').textContent = 'Hand: ' + dealerCards.total;

        if (!isPlaying && !dealerMove) { gameOver(); };
    }
};

init();


document.querySelector('.btn-hit').addEventListener('click', function() { playerCards.drawCard(); });
document.querySelector('.btn-stand').addEventListener('click', function() { playerCards.standBtn(); });

function init() {

    isPlaying = true;
    dealerMove = true;
    cards = 0;
    usedCards = [];
    players = [];
    bust = [];
    winner = [];

    playerCards = Object.create(playerCreate);
    dealerCards = Object.create(playerCreate);
    playerCards.name = 'player';
    dealerCards.name = 'dealer';
    players.push(playerCards, dealerCards);

    playerCards.drawCard();
    dealerCards.drawCard();
    playerCards.drawCard();
    dealerCards.drawCard();
};

function newCard(player, num, newNum, type, letter) {

    player[player.cards] = { 'number': num, 'letter': letter, 'type': type };
    player.cards++;
    cards++;

    document.getElementById(player.name + '-card-' + player.cards).style.display = 'block';
    document.getElementById(player.name + '-card-' + player.cards).style.background = 
    'url(style/card/cards/' + newNum + '-of-' + type + '.png) center';
    document.getElementById(player.name + '-card-' + player.cards).style.backgroundSize = '115px 156px';
    document.getElementById(player.name + '-ltop-' + player.cards).textContent = letter;
    document.getElementById(player.name + '-lbottom-' + player.cards).textContent = letter;
    document.getElementById(player.name + '-ltop-' + player.cards).style.display = 'block';
    document.getElementById(player.name + '-lbottom-' + player.cards).style.display = 'block';
    document.getElementById(player.name + '-top-' + player.cards).classList.add('fa-' + type);
    document.getElementById(player.name + '-bottom-' + player.cards).classList.add('fa-' + type);

    finalCards(player);
    document.getElementById('player-hand').textContent = 'Hand: ' + playerCards.total;    
};

function finalCards(player) {

    if (isPlaying) {

        if (player.cards === 2) {

            for(var i = 0; i < player.cards; i++) {
                console.log('loop');
                if (player[i]['letter'] === 'A') {
    
                    if (player.total === 11) {
    
                        player.total = 0;
                        player[i]['number'] = 11;
                        player.total += player[0]['number'];
                        player.total += player[1]['number'];
                    }
                    else if (player.total === 2) {
    
                        player.total = 0;
                        player[0]['number'] = 11;
                        player[1]['number'] = 10;
                        player.total += player[0]['number'];
                        player.total += player[1]['number'];
                    }
                    else { 
    
                    player.total = 0;
                    player[i]['number'] = 11;
                    player.total += player[0]['number'];
                    player.total += player[1]['number'];
                    };
                };
            };
        }
        else if (player.cards === 3) {
    
            for(var i = 0; i < player.cards; i++) {
                console.log('loop');
                if (player[i]['letter'] === 'A') {
                    console.log('10');
                    player.total = 0;
                    player[i]['number'] = 10; 
                    player.total += player[0]['number'];
                    player.total += player[1]['number'];
                    player.total += player[2]['number'];

                    if (player.total > 21) { 
                        console.log('1');
                        player.total = 0;
                        player[i]['number'] = 1; 
                        player.total += player[0]['number'];
                        player.total += player[1]['number'];
                        player.total += player[2]['number']; 
                    };
                };
            };
            if (player.total >= 21) {

                isPlaying = false;
            };
        } 
        else if (player.cards > 3) {
            console.log('more than 3');
            for(var i = 0; i < player.cards; i++) {
                
                if (player[i]['letter'] === 'A') {

                    player.total = 0;
                    player[i]['number'] = 1;
                    player.total += player[0]['number'];
                    player.total += player[1]['number'];
                    player.total += player[2]['number'];
                    player.total += player[3]['number'];

                    if (player.cards === 5) { player.total += player[4]['number']; };
                };
            };
        };
    };
};

function dealerAI() {

    if (dealerMove) {

        isPlaying = false;

        if (dealerCards.total <= 15) {
            console.log('not enough');
            isPlaying = true;
            dealerCards.drawCard();
            finalCards(dealerCards);
            dealerAI();
        }
        else if (dealerCards.total === 16) {
            
            if (playerCards.cards === 2) {

                isPlaying = true;
                dealerCards.drawCard();
                finalCards(dealerCards);
                dealerAI(); 
            }
            else {
                var result = (Math.random() * 10 + 1);
            
                if (result <= 7.6) { 
                    console.log('too less');
                    isPlaying = true;
                    dealerCards.drawCard();
                    finalCards(dealerCards);
                    dealerAI();

                } else { dealerMove = false; };
            };
        }
        else if (dealerCards.total === 17) {
            
            var result = (Math.random() * 10 + 1);
            
            if (result <= 3.9) {
                console.log('why not');
                isPlaying = true;
                dealerCards.drawCard();
                finalCards(dealerCards);
                dealerAI();

            } else { dealerMove = false; };
        }
        else if (dealerCards.total === 18 || dealerCards.total === 19) {
            
            var result = (Math.random() * 10 + 1);
            
            if (result <= 1.05) {
                console.log('here goes nothing');
                isPlaying = true;
                dealerCards.drawCard();
                finalCards(dealerCards);
                dealerAI();

            } else { dealerMove = false; };
        }
        else { dealerMove = false; }
    };
};

function gameOver() {

    if (playerCards.total > 21 && dealerCards.total <= 21) {
        console.log('Dealer won');
    }
    else if (playerCards.total > 21 && dealerCards.total > 21) {
        console.log('Draw')
    }
    else if (playerCards.total < 21 && dealerCards.total < 21) {

        if (playerCards.total > dealerCards.total) {
            console.log('Player won');
        }
        else if (playerCards.total < dealerAI.total) {
            console.log('Dealer won');
        }
        else { console.log('Draw'); };
    }
    else if (playerCards.total === 21) {

        if (dealerCards.total < 21) {
            console.log('Player won');
        }
        else if (dealerCards.total > 21) {
            console.log('Player won');
        }
        else { console.log('Draw'); };
    }
    else if (dealerCards.total === 21) {

        if (playerCards.total < 21) {
            console.log('Dealer won');
        }
        else if (playerCards.total > 21) {
            console.log('Dealer won');
        }
        else { console.log('Draw'); };
    };
};