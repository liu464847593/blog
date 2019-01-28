---
title: 命令模式
date: 2019-01-28 20:30:58
tags: 命令模式
categories:
    - 设计模式
---
##什么是命令模式
命令模式中的命令指的是一个执行某些特定事情的指令
应用场景：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接受者能够消除彼此之间的耦合关系。

## 菜单程序
传统面向对象的命令模式
```js
    var setCommand = function (button, command) {
        button.onclick = function () {
            command.execute();
        }
    };
    var MenuBar = {
        refresh: function () {
            console.log('刷新菜单目录');
        }
    };
    var SubMenu = {
        add: function () {
            console.log('增加子菜单');
        },
        del: function () {
            console.log('删除子菜单');
        }
    }
    var RefreshMenuBarCommand = function (receiver) {
        this.receiver = receiver
    }
    RefreshMenuBarCommand.prototype.execute = function () {
        this.receiver.refresh()
    };
    var AddSubMenuComman = function (receiver) {
        this.receiver = receiver
    };
    AddSubMenuComman.prototype.execute = function () {
        this.receiver.add()
    };
    var DelsubMenuCommand = function (receiver) {
        this.receiver = receiver
    };
    DelsubMenuCommand.prototype.execute = function () {
        console.log('删除子菜单');
    };

    var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
    var addSubMenuComman = new AddSubMenuComman(SubMenu);
    var delsubMenuCommand = new DelsubMenuCommand(SubMenu);

    setCommand(button1, refreshMenuBarCommand);
    setCommand(button2, addSubMenuComman);
    setCommand(button3, delsubMenuCommand);
```

## JS中的命令模式
```js
    var button1 = document.getElementById('button1');


    var setCommand = function (button, command) {
        button.onclick = function () {
            command.execute()
        }
    };
    var MenuBar = {
        refresh: function () {
            console.log('刷新菜单目录');
        }
    };
    var RefreshMenuBarCommand = function (receiver) {
        return {
            execute:function () {
                receiver.refresh()
            }
        }
    }


    var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);

    setCommand(button1, refreshMenuBarCommand);
```
## 撤销命令
```js
    var ball = document.getElementById('ball');
    var pos = document.getElementById('pos');
    var moveBtn = document.getElementById('moveBtn');
    var cancelBtn = document.getElementById('cancelBtn');

    var MoveCommand = function (receiver,pos) {
        this.receiver = receiver;
        this.pos = pos;
        this.oldPos = null;
    };
    MoveCommand.prototype.execute = function () {
        this.receiver.start('left',this.pos,1000,'strongEaseOut');
        this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
    }
    MoveCommand.prototype.undo = function () {
        this.receiver.start('left',this.oldPos,1000,'strongEaseOut');
    }
    var moveCommand;
    moveBtn.onclick = function () {
        var animate = new Animate(ball);
        moveCommand = new MoveCommand(animate,pos.value);
        moveCommand.execute()
    };
    cancelBtn.onclick = function () {
        moveCommand.undo()
    }
```

##撤销和重做
```js
var Ryu = {
    attack: function () {
        console.log('攻击');
    },
    defense:function () {
        console.log('防御');
    },
    jump:function () {
        console.log('跳跃');
    },
    croush:function () {
        console.log('蹲下');
    }
}
var makeCommand = function (receiver,state) {
    return function () {
        receiver[state]();
    }
};
var commands = {
    '119':'jump',
    '115':'croush',
    '97':'defense',
    '100':'attack'
}
var commandStack = [];
document.onkeypress = function (ev) {
    var keyCode = ev.keyCode,
        command = makeCommand(Ryu,commands[keyCode]);
    if (command){
        command();
        commandStack.push(command)
    }
}
document.getElementById('replay').onclick = function () {
    var command;
    while (command = commandStack.shift()){
        command();
    } 
};
```

## 宏命令
宏命令是一组命令的集合，通过执行宏命令的方式可以一次执行一批命令。
```js
var closeDoorCommand = {
    execute:function() {
        console.log('关门');
    }
};
var openPcCommand = {
    execute:function() {
        console.log('开电脑');
    }
}
var openQQcomand = {
    execute:function() {
        console.log('登录QQ');
    }
}

var MacroCommand = function () {
    return{
        commanList:[],
        add:function (command) {
            this.commanList.push(command)
        },
        execute:function () {
            for (var i = 0, command; command = this.commanList[i++];){
                command.execute()
            }
        }
    }
}
var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQcomand);
macroCommand.execute()
```


