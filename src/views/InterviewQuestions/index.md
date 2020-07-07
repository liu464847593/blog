## 什么是MVVM，比MVC有什么区别
不管是 React 还是 Vue，它们都不是 MVVM 框架，只是有借鉴 MVVM 的思路

- View：用户看到的视图
- Model：本地数据和数据库中的数据

传统的 MVC 架构通常是使用控制器更新模型，视图从模型中获取数据去渲染。当用户有输入时，会通过控制器去更新模型，并且通知视图进行更新。
![](../../../src/asstes/img/InterviewQuestions/mvc.jpeg)
