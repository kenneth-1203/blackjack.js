<<<<<<< HEAD
var players, playerCreate, playerCards, dealerCards,
cards, checkCard, cardTypes, cardNum, usedCards, 
isPlaying, dealerMove;
=======
var players, newPlayer, playerCards, dealerCards,
cards, checkCard, cardTypes, cardValue, usedCards, 
isPlaying, dealerMove;

>>>>>>> parent of c3b4ed0... .
cardTypes = [

    'diamond',
    'club',
    'heart',
    'spade',

];
<<<<<<< HEAD
playerCreate = {
=======
newPlayer = {
>>>>>>> parent of c3b4ed0... .

    cards: 0,
    total: 0,
    drawCard: function() {

    if (isPlaying && dealerMove) {

        var letterNum;
<<<<<<< HEAD
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
    
        // Needs to use .map() function for better accuracy
        
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
=======
        var cardValue = (Math.floor(Math.random() * 13) + 1);
        var cardType = cardTypes[(Math.floor(Math.random() * cardTypes.length))];

        if (this.cards < 5) {
            if (cardValue > 10) {
                
                if (cardValue === 11) { letterNum = 'J'; }
                else if (cardValue === 12) { letterNum = 'Q'; }
                else if (cardValue === 13) { letterNum = 'K'; };

                cardValue = 10;  
            }
            else if (cardValue === 1) { 

                letterNum = 'A';  
            }
            else { letterNum = cardValue; };

            usedCards[cards] = { 'value': cardValue, 'number': letterNum, 'type': cardType };
            checkCard[cards] = letterNum + cardType;
        
            if (this.cards === 0) { 

                this.total += cardValue; newCard(this, cardValue, cardType, letterNum);

                if (playerCards.cards > 2) {

                    document.getElementById('player-card-' + playerCards.cards).style.opacity = '0';
                    document.getElementById('player-ltop-' + playerCards.cards).style.opacity = '0';
                    document.getElementById('player-lbottom-' + playerCards.cards).style.opacity = '0';

                setInterval(function() {
                    for (var i = 1; i <= playerCards.cards; i++) {
                        document.getElementById('player-card' + i).classList.add('fade-in');
                        setInterval(function() {
                            document.querySelector('.player-hand').textContent = playerCards.total;
                        }, 1000);
                    };
                    }, 1000)
                }
            }
            else {

                var isDuplicate = function(a) {
                    var counts = [];
                    for(var i = 0; i <= a.length; i++) {
                        if(counts[a[i]] === undefined) {
                            counts[a[i]] = 1;
                        } else {
                            return true;
                        };
                    };
                    return false;
                };
                if (isDuplicate(checkCard)) {

                    this.drawCard();
                    console.log('Duplicate found: ' + checkCard[cards-1]);
                }
                else { this.total += cardValue; newCard(this, cardValue, cardType, letterNum); };
            };
        }
        else { isPlaying = false; };
>>>>>>> parent of c3b4ed0... .
    };
    },
    standBtn: function() {

<<<<<<< HEAD
        for (var i = 1; i <= 2; i++) { document.getElementById('hidden-' + i).style.display = 'none'; };

        if (dealerMove) { finalCards(dealerCards); dealerAI(); };
        document.getElementById('dealer-hand').textContent = 'Hand: ' + dealerCards.total;

        if (!isPlaying && !dealerMove) { gameOver(); };
=======
        if (dealerMove) { finalCards(dealerCards); dealerAI(); };

        setInterval(function() {
            for (var i = 1; i <= 2; i++) {
            document.getElementById('card' + i).classList.add('flip');
            };
            if (dealerCards.cards > 2) {
            setInterval(function() {
                for (var i = 1; i <= dealerCards.cards; i++) {
                    document.getElementById('card' + i).classList.add('fade-in');
                    setInterval(function() {
                        for (var i = 1; i <= dealerCards.cards; i++) {
                        document.getElementById('card' + i).classList.add('flip');
                        };
                        setInterval(function() {
                            document.querySelector('span').classList.add('dealer-hand');
                            document.querySelector('.dealer-hand').textContent = dealerCards.total;
                            gameOver();
                        }, 500);
                    }, 1000);
                };
                }, 1000)
            } else { 
                setInterval(function() {
                    document.querySelector('span').classList.add('dealer-hand');
                    document.querySelector('.dealer-hand').textContent = dealerCards.total;
                    gameOver();
                }, 500); };
        }, 100);
>>>>>>> parent of c3b4ed0... .
    }
};

init();

<<<<<<< HEAD

document.querySelector('.btn-hit').addEventListener('click', function() { playerCards.drawCard(); });
document.querySelector('.btn-stand').addEventListener('click', function() { playerCards.standBtn(); });

=======
document.querySelector('.play-btn').addEventListener('click', function() { gameStart(); });
document.querySelector('.btn-hit').addEventListener('click', function() { playerCards.drawCard(); });
document.querySelector('.btn-stand').addEventListener('click', function() { playerCards.standBtn(); });

function gameStart() {

    document.querySelector('.play-btn').classList.add('active');
    document.querySelector('.play-btn').textContent = '';

    setInterval(function() {
        document.querySelector('.about-btn').classList.add('active');
        document.querySelector('.about-btn').textContent = '';
    }, 200);
    setInterval(function() {
        document.querySelector('.navbar').classList.add('navbar-final');
        document.querySelector('.title').classList.add('final');

        setInterval(function() {
            document.querySelector('.main-menu').style.opacity = '0';
        }, 1200);
        setInterval(function() {
            document.querySelector('.main-menu').style.zIndex = '0';
        }, 1200);
    }, 700);
}

>>>>>>> parent of c3b4ed0... .
function init() {

    isPlaying = true;
    dealerMove = true;
    cards = 0;
<<<<<<< HEAD
    usedCards = {};
    checkCard = {};
    players = [];
    bust = [];
    winner = [];

    playerCards = Object.create(playerCreate);
    dealerCards = Object.create(playerCreate);
=======
    usedCards = [];
    checkCard = [];
    players = [];

    playerCards = Object.create(newPlayer);
    dealerCards = Object.create(newPlayer);
>>>>>>> parent of c3b4ed0... .
    playerCards.name = 'player';
    dealerCards.name = 'dealer';
    players.push(playerCards, dealerCards);

    playerCards.drawCard();
    dealerCards.drawCard();
    playerCards.drawCard();
    dealerCards.drawCard();
};

<<<<<<< HEAD
=======
function newCard(player, num, type, letter) {

    player[player.cards] = { 'value': num, 'number': letter, 'type': type };
    player.cards++;
    cards++;

    document.getElementById(player.name + '-card-' + player.cards).style.opacity = '1';
    document.getElementById(player.name + '-card-' + player.cards).style.background = 
    'url(style/card/cards/' + letter + '-of-' + type + '.png) center';
    document.getElementById(player.name + '-card-' + player.cards).style.backgroundSize = '115px 156px';
    document.getElementById(player.name + '-ltop-' + player.cards).textContent = letter;
    document.getElementById(player.name + '-lbottom-' + player.cards).textContent = letter;
    document.getElementById(player.name + '-ltop-' + player.cards).style.opacity = '1';
    document.getElementById(player.name + '-lbottom-' + player.cards).style.opacity = '1';
    document.getElementById(player.name + '-top-' + player.cards).classList.add('fa-' + type);
    document.getElementById(player.name + '-bottom-' + player.cards).classList.add('fa-' + type);

    finalCards(player);
    document.getElementById('player-hand').textContent = 'Hand: ' + playerCards.total;    
};

>>>>>>> parent of c3b4ed0... .
function finalCards(player) {

    if (isPlaying) {

        if (player.cards === 2) {

<<<<<<< HEAD
            for(var i = 1; i <= player.cards; i++) {
                console.log('loop');
                if (player[i]['letter'] === 'A') {
=======
            for(var i = 0; i < player.cards; i++) {
                console.log('loop');
                if (player[i]['number'] === 'A') {
>>>>>>> parent of c3b4ed0... .
    
                    if (player.total === 11) {
    
                        player.total = 0;
<<<<<<< HEAD
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
=======
                        player[i]['value'] = 11;
                        player.total += player[0]['value'];
                        player.total += player[1]['value'];
                    }
                    else if (player[0]['number'] === 'A' && player[1]['number'] === 'A') {
    
                        player.total = 0;
                        player[0]['value'] = 11;
                        player[1]['value'] = 10;
                        player.total += player[0]['value'];
                        player.total += player[1]['value'];
>>>>>>> parent of c3b4ed0... .
                    }
                    else { 
    
                    player.total = 0;
<<<<<<< HEAD
                    player[i]['number'] = 11;
                    player.total += player[1]['number'];
                    player.total += player[2]['number'];
=======
                    player[i]['value'] = 11;
                    player.total += player[0]['value'];
                    player.total += player[1]['value'];
>>>>>>> parent of c3b4ed0... .
                    };
                };
            };
        }
        else if (player.cards === 3) {
    
<<<<<<< HEAD
            for(var i = 1; i <= player.cards; i++) {
                console.log('loop');
                if (player[i]['letter'] === 'A') {
                    console.log('10');
                    player.total = 0;
                    player[i]['number'] = 10; 
                    player.total += player[1]['number'];
                    player.total += player[2]['number'];
                    player.total += player[3]['number'];
=======
            for(var i = 0; i < player.cards; i++) {
                console.log('loop');
                if (player[i]['number'] === 'A') {
                    console.log('10');
                    player.total = 0;
                    player[i]['value'] = 10; 
                    player.total += player[0]['value'];
                    player.total += player[1]['value'];
                    player.total += player[2]['value'];
>>>>>>> parent of c3b4ed0... .

                    if (player.total > 21) { 
                        console.log('1');
                        player.total = 0;
<<<<<<< HEAD
                        player[i]['number'] = 1; 
                        player.total += player[1]['number'];
                        player.total += player[2]['number'];
                        player.total += player[3]['number']; 
=======
                        player[i]['value'] = 1; 
                        player.total += player[0]['value'];
                        player.total += player[1]['value'];
                        player.total += player[2]['value']; 
>>>>>>> parent of c3b4ed0... .
                    };
                };
            };
            if (player.total >= 21) {

                isPlaying = false;
            };
        } 
        else if (player.cards > 3) {
            console.log('more than 3');
<<<<<<< HEAD
            for(var i = 1; i <= player.cards; i++) {
                
                if (player[i]['letter'] === 'A') {

                    player.total = 0;
                    player[i]['number'] = 1;
                    player.total += player[1]['number'];
                    player.total += player[2]['number'];
                    player.total += player[3]['number'];
                    player.total += player[4]['number'];

                    if (player.cards === 5) { player.total += player[5]['number']; };
=======
            for(var i = 0; i < player.cards; i++) {
                
                if (player[i]['number'] === 'A') {

                    player.total = 0;
                    player[i]['value'] = 1;
                    player.total += player[0]['value'];
                    player.total += player[1]['value'];
                    player.total += player[2]['value'];
                    player.total += player[3]['value'];

                    if (player.cards === 5) { player.total += player[4]['value']; };
>>>>>>> parent of c3b4ed0... .
                };
            };
        };
    };
};

function dealerAI() {

    if (dealerMove) {

        isPlaying = false;

<<<<<<< HEAD
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
=======
        if (dealerCards.cards < 5) {
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
>>>>>>> parent of c3b4ed0... .
                    isPlaying = true;
                    dealerCards.drawCard();
                    finalCards(dealerCards);
                    dealerAI();
<<<<<<< HEAD

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
=======
    
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
            else { dealerMove = false; };
        };
>>>>>>> parent of c3b4ed0... .
    };
};

function gameOver() {

    if (playerCards.total > 21 && dealerCards.total <= 21) {
<<<<<<< HEAD
        console.log('Dealer won');
    }
    else if (playerCards.total > 21 && dealerCards.total > 21) {
        console.log('Draw')
=======

        setInterval(function() {
            document.querySelector('.display-lose').classList.add('anim');
            document.querySelector('.display-lose').classList.add('fade-in');
        }, 500);
        document.querySelector('.display-lose').style.display = 'block';
    }
    else if (playerCards.total > 21 && dealerCards.total > 21) {
        setInterval(function() {
            document.querySelector('.display-draw').classList.add('anim');
            document.querySelector('.display-draw').classList.add('fade-in');
        }, 500);
        document.querySelector('.display-draw').style.display = 'block';
>>>>>>> parent of c3b4ed0... .
    }
    else if (playerCards.total < 21 && dealerCards.total < 21) {

        if (playerCards.total > dealerCards.total) {
<<<<<<< HEAD
            console.log('Player won');
        }
        else if (playerCards.total < dealerAI.total) {
            console.log('Dealer won');
        }
        else { console.log('Draw'); };
=======
            setInterval(function() {
                document.querySelector('.display-win').classList.add('anim');
                document.querySelector('.display-win').classList.add('fade-in');
            }, 500);
            document.querySelector('.display-win').style.display = 'block';
        }
        else if (playerCards.total < dealerCards.total) {
            setInterval(function() {
                document.querySelector('.display-lose').classList.add('anim');
                document.querySelector('.display-lose').classList.add('fade-in');
            }, 500);
            document.querySelector('.display-lose').style.display = 'block';
        }
        else { setInterval(function() {
            document.querySelector('.display-draw').classList.add('anim');
            document.querySelector('.display-draw').classList.add('fade-in'); 
        }, 500);
        document.querySelector('.display-draw').style.display = 'block';
        };
    }
    else if (playerCards.total < 21 && dealerCards.total > 21) {
        setInterval(function() {
            document.querySelector('.display-win').classList.add('anim');
            document.querySelector('.display-win').classList.add('fade-in');
        }, 500);
        document.querySelector('.display-win').style.display = 'block';
>>>>>>> parent of c3b4ed0... .
    }
    else if (playerCards.total === 21) {

        if (dealerCards.total < 21) {
<<<<<<< HEAD
            console.log('Player won');
        }
        else if (dealerCards.total > 21) {
            console.log('Player won');
        }
        else { console.log('Draw'); };
=======
            setInterval(function() {
                document.querySelector('.display-win').classList.add('anim');
                document.querySelector('.display-win').classList.add('fade-in');
            }, 500);
            document.querySelector('.display-win').style.display = 'block';
        }
        else if (dealerCards.total > 21) {
            setInterval(function() {
                document.querySelector('.display-win').classList.add('anim');
                document.querySelector('.display-win').classList.add('fade-in');
            }, 500);
            document.querySelector('.display-win').style.display = 'block';
        }
        else { setInterval(function() {
            document.querySelector('.display-draw').classList.add('anim');
            document.querySelector('.display-draw').classList.add('fade-in');
        }, 500);
        document.querySelector('.display-draw').style.display = 'block'; 
        };
>>>>>>> parent of c3b4ed0... .
    }
    else if (dealerCards.total === 21) {

        if (playerCards.total < 21) {
<<<<<<< HEAD
            console.log('Dealer won');
        }
        else if (playerCards.total > 21) {
            console.log('Dealer won');
        }
        else { console.log('Draw'); };
=======
            setInterval(function() {
                document.querySelector('.display-lose').classList.add('anim');
                document.querySelector('.display-lose').classList.add('fade-in');
            }, 500);
            document.querySelector('.display-lose').style.display = 'block';
        }
        else if (playerCards.total > 21) {
            setInterval(function() {
                document.querySelector('.display-lose').classList.add('anim');
                document.querySelector('.display-lose').classList.add('fade-in');
            }, 500);
            document.querySelector('.display-lose').style.display = 'block';
        }
        else { setInterval(function() {
            document.querySelector('.display-draw').classList.add('anim');
            document.querySelector('.display-draw').classList.add('fade-in');
        }, 500);
        document.querySelector('.display-draw').style.display = 'block'; 
        };
>>>>>>> parent of c3b4ed0... .
    };
};