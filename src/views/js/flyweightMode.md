---
title: 享元模式
date: 2019-02-10 09:03:23
tags: 享元模式
categories:
    - 设计模式
---

## 什么是享元模式
享元模式是一种用于性能优化的模式。核心是运用共享技术来有效支持大量细粒度的对象。

## 初始享元模式
```js
    var Model = function (sex) {
        this.sex = sex;
    };
    Model.prototype.takePhoto = function () {
        console.log('sex= ' + this.sex + ' underwear=' + this.underwear);
    };
    var maleModel = new Model('male'),
        femaleModel = new Model('femaleModel');
    for (var i = 1; i <= 50; i++) {
        maleModel.underwear = 'underwear' + i;
        maleModel.takePhoto();
    }
    for (var i = 1; i <= 50; i++) {
        femaleModel.underwear = 'underwear' + i;
        femaleModel.takePhoto();
    }
```
## 内部状态和外部状态
享元模式要求将对象的属性划分为`内部状态`与`外部状态`。  
享元模式的目标是尽量减少共享对象的数量。  
如何划分内部状态和外部状态：  
内部状态存储于对象内部。  
内部状态可以被一些对象共享。  
内部状态独立于具体的场景，通常不会改变。  
内部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。

## 文件上传
```js
    var Upload = function (uploadType) {
        this.uploadType = uploadType;
    };
    Upload.prototype.delFile = function (id) {
        uploadManager.setExternalState(id, this);
        if (this.fileSize < 3000) {
            return this.dom.parentNode.removeChild(this.dom)
        }
        ;
        if (window.confirm('确认要删除该文件吗？' + this.fileName)) {
            return this.dom.parentNode.removeChild(this.dom);
        }
    }

    var UploadFactory = (function () {
        var createdFlyWeightObjs = {};
        return {
            create: function (uploadType) {
                if (createdFlyWeightObjs[uploadType]) {
                    return createdFlyWeightObjs[uploadType]
                }
                return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
            }
        }
    })();
    var uploadManager = (function () {
        var uploadDatabase = {};
        return {
            add: function (id, uploadType, fileName, fileSize) {
                var flyWeightObj = UploadFactory.create(uploadType);
                var dom = document.createElement('div');
                dom.innerHTML = '<span>文件名称：' + fileName + ',文件大小：' + fileSize + '</span>' +
                    '<button class="delFile">删除</button>';
                dom.querySelector('.delFile').onclick = function () {
                    flyWeightObj.delFile(id);
                }
                document.body.appendChild(dom);
                uploadDatabase[id] = {
                    fileName: fileName,
                    fileSize: fileSize,
                    dom: dom
                };
                return flyWeightObj;
            },
            setExternalState: function (id, flyWeightObj) {
                var uploadData = uploadDatabase[id];
                for (var i in uploadData) {
                    flyWeightObj[i] = uploadData[i];
                }
            }
        }
    })()
    var id = 0;
    window.startUpload = function (uploadType, files) {
        for (var i = 0, file; file = files[i++];) {
            var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
        }
    }
    startUpload('plugin', [
        {
            fileName: '1.txt',
            fileSize: 1000
        },
        {
            fileName: '2.html',
            fileSize: 3000
        },
        {
            fileName: '3.txt',
            fileSize: 5000
        }
    ])
    startUpload('flash', [
        {
            fileName: '4.txt',
            fileSize: 1000
        },
        {
            fileName: '5.html',
            fileSize: 3000
        },
        {
            fileName: '6.txt',
            fileSize: 5000
        }
    ])
```
## 享元模式的适用性
一个程序中使用了大量的相似对象。  
由于使用了大量对象，造成很大的内存开销。  
对象的大多数状态都可以变为外部状态。  
剥离出对象的外部状态之后，可以用相对较少的共享对象取代大量对象。  

## 通用对象池实现
```js
    var objectPoolFactory = function (createObjFn) {
        var objectPool = [];
        return {
            create:function () {
                var obj = objectPool.length === 0?
                    createObjFn.apply(this,arguments) : objectPool.shift();
                return obj;
            },
            recover:function (obj) {
                objectPool.push(obj);
            }
        }
    }
    var iframeFactory = objectPoolFactory(function () {
        var iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.onload = function () {
            iframe.onload = null;
            iframeFactory.recover(iframe);
        }
        return iframe;
    })
    var iframe1 = iframeFactory.create();
    iframe1.src = 'https://www.baidu.com/';

    var iframe2 = iframeFactory.create();
    iframe1.src = 'https://QQ.com';

    setTimeout(function () {
        var iframe2 = iframeFactory.create();
        iframe1.src = 'http://163.com';
    },3000)
```
