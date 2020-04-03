---
title: 中介者模式
date: 2019-02-12 19:44:20
tags: 中介者模式
categories:
    - 设计模式
---
## 什么是中介者模式
中介者模式的作用就是解除对象与对象之间的紧耦合关系。

## 泡泡堂
```js
    function Players (name, teamColor) {
        this.name = name;
        this.teamColor = teamColor;
        this.state = 'alive';
    }

    Players.prototype.win = function () {
        console.log(this.name + 'won');
    };
    Players.prototype.lose = function () {
        console.log(this.name + 'lose');
    };

    Players.prototype.die = function () {
        this.state = 'dead';
        playerDirector.ReceiveMessage('playerDead', this);
    };
    Players.prototype.remove = function () {
        playerDirector.ReceiveMessage('removePlayer', this);
    };
    Players.prototype.changeTeam = function (color) {
        playerDirector.ReceiveMessage('changeTeam', this, color);
    };

    var playerFactory = function (name, teamColor) {
        var newPlayer = new Players(name, teamColor);
        playerDirector.ReceiveMessage('addPlayer', newPlayer);
        return newPlayer;
    }

    var playerDirector = (function () {
        var players = {},
            operations = {};

        operations.addPlayer = function (player) {
            var teamColor = player.teamColor;
            players[teamColor] = players[teamColor] || [];
            players[teamColor].push(player);
        };

        operations.removePlayer = function (player) {
            var teamColor = player.teamColor,
                teamPlayers = players[teamColor] || [];
            for (var i = teamPlayers.length - 1; i >= 0; i--) {
                if (teamPlayers[i] === player) {
                    teamPlayers.splice(i, 1);
                }
            }
        };

        operations.changeTeam = function(player,newTeamColor){
            operations.removePlayer(player);
            player.teamColor = newTeamColor;
            operations.addPlayer(player);
        };

        operations.playerDead = function (player) {
            var teamColor = player.teamColor,
                teamPlayers = players[teamColor];
            var all_dead = true;
            for (var i = 0, player; player = teamPlayers[i++];) {
                if (player.state !== 'dead') {
                    all_dead = false;
                    break;
                }
            }
            if (all_dead === true) {
                for (var i = 0, player; player = teamPlayers[i++];) {
                    player.lose();
                }
                for (var color in players) {
                    if (color !== teamColor) {
                        var teamPlayers = players[color];
                        for (var i = 0, player; player = teamPlayers[i++];) {
                            player.win()
                        }
                    }
                }
            }
        };

        var ReceiveMessage = function () {
            var message = Array.prototype.shift.call(arguments);
            operations[message].apply(this, arguments);
        };
        return {
            ReceiveMessage: ReceiveMessage
        }
    })();

    var player1 = playerFactory('皮蛋', 'red'),
        player2 = playerFactory('小乖', 'red'),
        player3 = playerFactory('宝宝', 'red'),
        player4 = playerFactory('小强', 'red');

    var player5 = playerFactory('黑妞', 'blue'),
        player6 = playerFactory('葱头', 'blue'),
        player7 = playerFactory('胖墩', 'blue'),
        player8 = playerFactory('海盗', 'blue');

    player1.die();
    player2.die();
    player3.die();
    player4.die();


    // player1.remove();
    // player2.remove();
    // player3.die();
    // player4.die();

    // player1.changeTeam('blue');
    // player2.die();
    // player3.die();
    // player4.die();
```
## 购买商品
```
选择颜色： <select name="" id="colorSelect">
    <option value="">请选择</option>
    <option value="red">红色</option>
    <option value="blue">蓝色</option>
</select>

选择内存： <select name="" id="memorySelect">
    <option value="">请选择</option>
    <option value="32G">32G</option>
    <option value="16G">16G</option>
</select>

输入购买数量： <input type="text" id="numberInput"><br>
您选择了颜色：<div id="colorInfo"></div>
您选择了内存：<div id="memoryInfo"></div>
您选择了数量：<div id="numberInfo"></div>

<button id="nextBtn" disabled="true">请选择手机颜色和购买数量</button>
<script type="text/javascript">
    var goods = {
        'red|32G': 3,
        'red|16G': 0,
        'blue|32G': 1,
        'blue|32G': 6,
    };
    var mediator = (function () {
        var colorSelect = document.getElementById('colorSelect'),
            numberInput = document.getElementById('numberInput'),
            memorySelect = document.getElementById('memorySelect'),
            colorInfo = document.getElementById('colorInfo'),
            numberInfo = document.getElementById('numberInfo'),
            memoryInfo = document.getElementById('memoryInfo'),
            nextBtn = document.getElementById('nextBtn');

        return{
            changed:function (obj) {
                var color = colorSelect.value,
                    memory = memorySelect.value,
                    number = numberInput.value,
                    stock = goods[color + '|'+memory];

                if (obj === colorSelect){
                    colorInfo.innerHTML = color;
                } else if (obj === memorySelect){
                    memoryInfo.innerHTML = memory
                } else if (obj === numberInput){
                    numberInfo.innerHTML = number
                }

                if (!color){
                    nextBtn.disabled = true;
                    nextBtn.innerHTML = '请选择手机颜色';
                    return;
                }

                if (!memory){
                    nextBtn.disabled = true;
                    nextBtn.innerHTML = '请选择内存代销';
                    return;
                }

                if (!Number.isInteger(number - 0) && number <0){
                    nextBtn.disabled = true;
                    nextBtn.innerHTML = '请输入正确的购买数量';
                    return;
                }

                nextBtn.disabled = false;
                nextBtn.innerHTML = '放入购物车';
            }
        }
    })();

    colorSelect.onchange = function () {
        mediator.changed(this)
    };
    memorySelect.onchange = function () {
        mediator.changed(this)
    };
    numberInput.onchange = function () {
        mediator.changed(this)
    };

</script>
```
