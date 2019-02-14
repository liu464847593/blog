---
title: 状态模式
date: 2019-02-14 20:53:40
tags: 状态模式
categories:
    - 设计模式
---
## 什么是状态模式
把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部

## 状态模式的优缺点
优点：  
1. 状态模式定义了状态与行为之间的关系，并将它们封装在一个类里  
2. 避免Context无线膨胀，状态切换的逻辑被分布在状态类中，也去掉了Context中原本过多的条件分支
3. 用对象代替字符串来记录当前状态，是的状态的切换更加一目了然。
4. Context中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响。

缺点： 会在系统中定义许多状态类。很难看出整个状态机的逻辑

## JS中的状态机
```js
    var Light = function () {
        this.currState = FSM.off;
        this.button = null;
    };
    Light.prototype.init = function () {
        var button = document.createElement('button'),
            self = this;
        button.innerHTML = '已关灯';
        this.button = document.body.appendChild(button);
        this.button.onclick = function () {
            self.currState.buttonWasPressed.call(self);
        }
    };
    var FSM = {
        off: {
            buttonWasPressed: function () {
                console.log('关灯');
                this.button.innerHTML = '下一次按我是开灯';
                this.currState = FSM.on;
            }
        },
        on: {
            buttonWasPressed: function () {
                console.log('开灯');
                this.button.innerHTML = '下一次按我是关灯';
                this.currState = FSM.off;
            }
        }
    };
    var light = new Light();
    light.init();
```
```js
    var delegate = function (client,delegation) {
        return{
            buttonWasPressed:function () {
                return delegation.buttonWasPressed.apply(client,arguments);
            }
        }
    };
    var FSM = {
        off: {
            buttonWasPressed: function () {
                console.log('关灯');
                this.button.innerHTML = '下一次按我是开灯';
                this.currState = this.onState;
            }
        },
        on: {
            buttonWasPressed: function () {
                console.log('开灯');
                this.button.innerHTML = '下一次按我是关灯';
                this.currState = this.offState;
            }
        }
    };

    var Light = function () {
        this.offState = delegate(this,FSM.off);
        this.onState = delegate(this,FSM.on);
        this.currState = this.offState;
        this.button = null;
    };
    Light.prototype.init = function () {
        var button = document.createElement('button'),
            self = this;
        button.innerHTML = '已关灯';
        this.button = document.body.appendChild(button);
        this.button.onclick = function () {
            self.currState.buttonWasPressed();
        }
    };
    var light = new Light();
    light.init();
```

