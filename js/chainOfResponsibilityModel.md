---
title: 职责链模式
date: 2019-02-11 11:28:41
tags: 职责链模式
categories:
    - 设计模式
---

## 什么是职责链模式
使多个对象都有机会处理请求，从而避免请求的发送者和接接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。  
优点： 请求发送者只需要知道链中的第一个节点，从而弱化了发送者和一组接收者之间的强联系。

## 实际开发的职责链模式
```js
    var order500 = function (orderType, pay, stock) {
        if (orderType === 1 && pay === true) {
            console.log('500元定金预购，得到100优惠券');
        } else {
            order200(orderType, pay, stock);
        }
    };
    var order200 = function (orderType, pay, stock) {
        if (orderType === 2 && pay === true) {
            console.log('200元定金预购，得到50优惠券');
        } else {
            orderNomarl(orderType, pay, stock);
        }
    };
    var orderNomarl = function (orderType, pay, stock) {
        if (stock > 0) {
            console.log('普通购买，无优惠券');
        } else {
            console.log('手机库存不足');
        }
    };
    order500(1, true, 500);
    order500(1, false, 500);
    order500(2, true, 500);
    order500(3, false, 500);
    order500(3, false, 0);
```
缺点：违反开放-封闭原则，可能要增加300元预定或者去掉200元预定，就必须改动业务函数内部。

灵活可拆分的职责链节点
```js
    var order500 = function (orderType, pay, stock) {
        if (orderType === 1 && pay === true) {
            console.log('500元定金预购，得到100优惠券');
        } else {
            return 'nextSuccessor';
        }
    };
    var order200 = function (orderType, pay, stock) {
        if (orderType === 2 && pay === true) {
            console.log('200元定金预购，得到50优惠券');
        } else {
            return 'nextSuccessor';
        }
    };
    var orderNomarl = function (orderType, pay, stock) {
        if (stock > 0) {
            console.log('普通购买，无优惠券');
        } else {
            console.log('手机库存不足');
        }
    };

    var Chain = function (fn) {
        this.fn = fn;
        this.successor = null;
    };
    Chain.prototype.setNextSuccessor = function (successor) {
        return this.successor = successor;
    };
    Chain.prototype.passRequest = function () {
        var ret = this.fn.apply(this,arguments);
        if (ret === 'nextSuccessor'){
            return this.successor && this.successor.passRequest.apply(this.successor,arguments);
        }
        return ret;
    };
    var chainOrder500 = new Chain(order500);
    var chainOrder200 = new Chain(order200);
    var chainOrderNormal = new Chain(orderNomarl);

    chainOrder500.setNextSuccessor(chainOrder200);
    chainOrder200.setNextSuccessor(chainOrderNormal);

    chainOrder500.passRequest(1,true,500);
    chainOrder500.passRequest(2,true,500);
    chainOrder500.passRequest(3,true,500);
    chainOrder500.passRequest(1,false,0);

    // var order300 = function () {};
    // chainOrder300 = new Chain(order300);
    // chainOrder500.setNextSuccessor(chainOrder300);
    // chainOrder300.setNextSuccessor(chainOrder200);
```
异步的职责链
```js
   Chain.prototype.next = function () {
        return this.successor && this.successor.passRequest.apply(this.successor,arguments);
    }
    var fn1 = new Chain(function () {
        console.log(1);
        return 'nextSuccessor';
    });
    var fn2 = new Chain(function () {
        console.log(2);
        var self = this;
        setTimeout(function () {
            self.next();
        },1000);
    })
    var fn3 = new Chain(function () {
        console.log(3);
    })
    fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
    fn1.passRequest();
```
## 用AOP实现职责链
```js
    Function.prototype.after = function (fn) {
        var self = this;
        return function () {
            var ret = self.apply(this.arguments);
            if (ret === 'nextSuccessor'){
                return fn.apply(this,arguments);
            }
            return ret;
        }
    }

    var order = order500yuan.after(order200yuan).after(orderNomarl);
    order(1,true,500);
    order(2,true,500);
    order(3,false,500);
```
