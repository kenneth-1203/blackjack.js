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

        if (this.cards <= 5) {

            this.cards++;
            cards++;
        }
        else { isPlaying = false; };

        if (cardNum > 10) {
            
            newCardNum = cardNum;
            if (newCardNum === 11) { letterNum = 'J'; }
            else if (newCardNum === 12) { letterNum = 'Q'; }
            else if (newCardNum === 13) { letterNum = 'K'; };

            cardNum = 10; 
            
        } else if (cardNum === 1) { 

            newCardNum = cardNum;
            letterNum = 'A'; 
            
        }
        else { newCardNum = cardNum; letterNum = cardNum; };

        this.total += cardNum;

        checkCard[cards] = { 'number': newCardNum, 'letter': letterNum, 'type': cardType };
        usedCards[cards] = { 'number': newCardNum, 'letter': letterNum, 'type': cardType };
        usedCards[0] = { 'number': 0, 'type': 'null' };
    
        for(var i = 0; i < cards; i++) {
            
            if (checkCard[cards]['number'] === usedCards[i]['number'] 
            && checkCard[cards]['type'] === usedCards[i]['type']) {

                this.cards--;
                cards--;
                this.drawCard();
            }
            else {

                this[this.cards] = { 'number': cardNum, 'letter': letterNum, 'type': cardType };

                document.getElementById(this.name + '-card-' + this.cards).style.display = 'block';
                document.getElementById(this.name + '-card-' + this.cards).style.background = 
                'url(style/card/cards/' + newCardNum + '-of-' + cardType + '.png) center';
                document.getElementById(this.name + '-card-' + this.cards).style.backgroundSize = '115px 156px';
                document.getElementById(this.name + '-ltop-' + this.cards).textContent = letterNum;
                document.getElementById(this.name + '-lbottom-' + this.cards).textContent = letterNum;
                document.getElementById(this.name + '-ltop-' + this.cards).style.display = 'block';
                document.getElementById(this.name + '-lbottom-' + this.cards).style.display = 'block';
                document.getElementById(this.name + '-top-' + this.cards).classList.add('fa-' + cardType);
                document.getElementById(this.name + '-bottom-' + this.cards).classList.add('fa-' + cardType);

                finalCards(this);
                document.getElementById('player-hand').textContent = 'Hand: ' + playerCards.total;
            };
        };
    };
    },
    standBtn: function() {

        for (var i = 1; i <= 2; i++) { document.getElementById('hidden-' + i).style.display = 'none'; };

        if (dealerMove) { finalCards(dealerCards); dealerAI(); };

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
    usedCards = {};
    checkCard = {};
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

function finalCards(player) {

    if (isPlaying) {

        if (player.cards === 2) {

            for(var i = 1; i <= player.cards; i++) {
                console.log('loop');
                if (player[i]['letter'] === 'A') {
    
                    if (player.total === 11) {
    
                        player.total = 0;
                        player[i]['number'] = 11;
                        player.total += player[1]['number'];
                        player.total += player[2]['number'];
                    }
                    else if (player.total === 2) {
    
                        player.total = 0;
                        player[1]['number'] = 11;
                        player[2]['number'] = 10;
                        player.total += player[1]['number'];
                        player.total += player[2]['number'];
                    }
                    else { 
    
                    player.total = 0;
                    player[i]['number'] = 11;
                    player.total += player[1]['number'];
                    player.total += player[2]['number'];
                    };
                };
            };
        }
        else if (player.cards === 3) {
    
            for(var i = 1; i <= player.cards; i++) {
                console.log('loop');
                if (player[i]['letter'] === 'A') {
                    console.log('10');
                    player.total = 0;
                    player[i]['number'] = 10; 
                    player.total += player[1]['number'];
                    player.total += player[2]['number'];
                    player.total += player[3]['number'];

                    if (player.total > 21) { 
                        console.log('1');
                        player.total = 0;
                        player[i]['number'] = 1; 
                        player.total += player[1]['number'];
                        player.total += player[2]['number'];
                        player.total += player[3]['number']; 
                    };
                };
            };
            if (player.total >= 21) {

                isPlaying = false;
            };
        } 
        else if (player.cards > 3) {
            console.log('more than 3');
            for(var i = 1; i <= player.cards; i++) {
                
                if (player[i]['letter'] === 'A') {

                    player.total = 0;
                    player[i]['number'] = 1;
                    player.total += player[1]['number'];
                    player.total += player[2]['number'];
                    player.total += player[3]['number'];
                    player.total += player[4]['number'];

                    if (player.cards === 5) { player.total += player[5]['number']; };
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