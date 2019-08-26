var players, newPlayer, playerCards, dealerCards,
cards, checkCard, cardTypes, cardValue, usedCards, 
isPlaying, dealerMove;

cardTypes = [

    'diamond',
    'club',
    'heart',
    'spade',

];
newPlayer = {

    cards: 0,
    total: 0,
    drawCard: function() {

    if (isPlaying && dealerMove) {

        var letterNum;
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
        
            if (this.cards === 0) { this.total += cardValue; newCard(this, cardValue, cardType, letterNum); }
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
    };
    },
    standBtn: function() {

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
                        }, 1000);
                    }, 1000);
                };
                }, 1000)
            } else { 
                setInterval(function() {
                    document.querySelector('span').classList.add('dealer-hand');
                    document.querySelector('.dealer-hand').textContent = dealerCards.total;
                }, 500); };
        }, 100);

        if (!isPlaying && !dealerMove) { gameOver(); };
    }
};

init();

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
        document.querySelector('.main-menu').style.opacity = '0';

        setInterval(function() {
            document.querySelector('.main-menu').style.zIndex = '0';
        }, 1000);
    }, 1000)
}

function init() {

    isPlaying = true;
    dealerMove = true;
    cards = 0;
    usedCards = [];
    checkCard = [];
    players = [];

    playerCards = Object.create(newPlayer);
    dealerCards = Object.create(newPlayer);
    playerCards.name = 'player';
    dealerCards.name = 'dealer';
    players.push(playerCards, dealerCards);

    playerCards.drawCard();
    dealerCards.drawCard();
    playerCards.drawCard();
    dealerCards.drawCard();
};

function newCard(player, num, type, letter) {

    player[player.cards] = { 'value': num, 'number': letter, 'type': type };
    player.cards++;
    cards++;

    document.getElementById(player.name + '-card-' + player.cards).style.display = 'block';
    document.getElementById(player.name + '-card-' + player.cards).style.background = 
    'url(style/card/cards/' + letter + '-of-' + type + '.png) center';
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
                if (player[i]['number'] === 'A') {
    
                    if (player.total === 11) {
    
                        player.total = 0;
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
                    }
                    else { 
    
                    player.total = 0;
                    player[i]['value'] = 11;
                    player.total += player[0]['value'];
                    player.total += player[1]['value'];
                    };
                };
            };
        }
        else if (player.cards === 3) {
    
            for(var i = 0; i < player.cards; i++) {
                console.log('loop');
                if (player[i]['number'] === 'A') {
                    console.log('10');
                    player.total = 0;
                    player[i]['value'] = 10; 
                    player.total += player[0]['value'];
                    player.total += player[1]['value'];
                    player.total += player[2]['value'];

                    if (player.total > 21) { 
                        console.log('1');
                        player.total = 0;
                        player[i]['value'] = 1; 
                        player.total += player[0]['value'];
                        player.total += player[1]['value'];
                        player.total += player[2]['value']; 
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
                
                if (player[i]['number'] === 'A') {

                    player.total = 0;
                    player[i]['value'] = 1;
                    player.total += player[0]['value'];
                    player.total += player[1]['value'];
                    player.total += player[2]['value'];
                    player.total += player[3]['value'];

                    if (player.cards === 5) { player.total += player[4]['value']; };
                };
            };
        };
    };
};

function dealerAI() {

    if (dealerMove) {

        isPlaying = false;

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
            else { dealerMove = false; };
        };
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
        else if (playerCards.total < dealerCards.total) {
            console.log('Dealer won');
        }
        else { console.log('Draw'); };
    }
    else if (playerCards.total < 21 && dealerCards.total > 21) {
        console.log('Player won');
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