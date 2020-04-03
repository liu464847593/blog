---
title: 组合模式
date: 2019-01-30 20:27:27
tags: 组合模式
categories:
    - 设计模式
---
## 什么是组合模式
组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更小的“孙对象”构成。

## 组合模式的用途
组合模式将对象组合成树形结构，以表示“部分-整体”的层次结构
1.表示树形结构。
2.利用对象多态性统一对待组合对象和单个对象。

## 更强大的宏命令
```js
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
    };
    var openAcCommand = {
        execute:function () {
            console.log('打开空调');
        }
    };
    var openTvCommand = {
        execute:function () {
            console.log('打开电视');
        }
    };
    var openSoundCommand = {
        execute:function () {
            console.log('打开音响');
        }
    };

    var macroCommand1 = MacroCommand();
    macroCommand1.add(openTvCommand);
    macroCommand1.add(openSoundCommand);


    var closeDoorCommand = {
        execute:function() {
            console.log('关门');
        }
    };
    var openPcCommand = {
        execute:function() {
            console.log('开电脑');
        }
    };
    var openQQcomand = {
        execute:function() {
            console.log('登录QQ');
        }
    };


    var macroCommand2 = MacroCommand();
    macroCommand2.add(closeDoorCommand);
    macroCommand2.add(openPcCommand);
    macroCommand2.add(openQQcomand);

    var macroCommand = MacroCommand();
    macroCommand.add(openAcCommand);
    macroCommand.add(macroCommand1);
    macroCommand.add(macroCommand2);

    var setCommand = (function(command){
         document.getElementById('button').onclick = function () {
             command.execute();
         }
    })(macroCommand);
```
## 组合模式例子（扫描文件夹）
```js
    var Folder = function (name) {
        this.name = name;
        this.files = [];
    };
    Folder.prototype.add = function (file) {
        this.files.push(file)
    };
    Folder.prototype.scan = function () {
        console.log('开始扫描文件夹：' + this.name);
        for (var i = 0, file, files = this.files; file = files[i++];) {
            file.scan();
        }
    }

    var File = function (name) {
        this.name = name;
    };
    File.prototype.add = function () {
        throw  new Error('文件下面不能再添加文件')
    };
    File.prototype.scan = function () {
        console.log('开始扫描文件：' + this.name);
    }

    var folder = new Folder('学习资料');
    var folder1 = new Folder('JavaScript');
    var folder2 = new Folder('jquery');

    var file1 = new File('JS设计模式与开发实践');
    var file2 = new File('精通JQuery');
    var file3 = new File('重构与模式');

    folder1.add(file1);
    folder2.add(file2);

    folder.add(folder1);
    folder.add(folder2);
    folder.add(file3);

    var folder3 = new Folder('NodeJs');
    var file4 = new  File('深入浅出NodeJs');
    folder3.add(file4);

    var file5 = new File('JS语言精髓与编程实践');

    folder.add(folder3);
    folder.add(file5);
    folder.scan();
```

## 注意
1.组合模式不是父子关系
2.对叶对象操作的一致性
3.双向映射关系
4.用职责链模式提高组合模式性能

## 引用父对象
```js
    var Folder = function (name) {
        this.name = name;
        this.parent = null;
        this.files = [];
    };
    Folder.prototype.add = function (file) {
        file.parent = this;
        this.files.push(file);
    };
    Folder.prototype.scan = function () {
        console.log('开始扫描文件夹：' + this.name);
        for (var i = 0, file, files = this.files; file = files[i++];) {
            file.scan();
        }
    }
    Folder.prototype.remove = function () {
        if (!this.parent) {
            return;
        }
        for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
            var file = files[l];
            if (file === this) {
                files.splice(l, 1)
            }
        }
    };


    var File = function (name) {
        this.name = name;
        this.parent = null;
    };
    File.prototype.add = function () {
        throw  new Error('文件下面不能再添加文件')
    };
    File.prototype.scan = function () {
        console.log('开始扫描文件：' + this.name);
    }

    File.prototype.remove = function () {
        if (!this.parent) {
            return;
        }
        for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
            var file = files[l];
            if (file === this) {
                files.splice(l, 1)
            }
        }
    };

    var folder = new Folder('学习资料');
    var folder1 = new Folder('JavaScript');

    var file1 = new File('深入浅出NodeJs');

    folder1.add(new File('JS设计模式与开发实践'));
    folder.add(folder1);

    folder.add(file1);
    folder1.remove();
    folder.scan();
```

## 合适使用组合模式
1.表示对象的部分-整体层次结构
2.客户希望统一对待树中的所有对象

