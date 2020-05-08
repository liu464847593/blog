## 命名规则
---
### 项目命名
全部采用小写方式， 以下划线分隔。

例：`my_project_name`

### 目录命名
参照项目命名规则；

有复数结构时，要采用复数命名法。

例：`scripts`, `styles`, `images`, `data_models`

### JS文件命名
参照项目命名规则。

例：`account_model.js`

### CSS, SCSS文件命名
参照项目命名规则。

例：`retina_sprites.scss`

### HTML文件命名
参照项目命名规则。

例：`error_report.html`

## HTML
--- 
### 语法
- 缩进使用soft tab（2个空格）；
- 嵌套的节点应该缩进；
- 在属性上，使用双引号，不要使用单引号；
- 属性名全小写，用中划线做分隔符；
- 不要在自动闭合标签结尾处使用斜线；
- 不要忽略可选的关闭标签，例：`</li>` 和 `</body>`。

### HTML5 doctype
在页面开头使用这个简单地doctype来启用标准模式，使其在每个浏览器中尽可能一致的展现；

虽然doctype不区分大小写，但是按照惯例，doctype大写。

### lang属性
根据HTML5规范：

> 应在html标签上加上`lang`属性。这会给语音工具和翻译工具帮助，告诉它们应当怎么去发音和翻译。

但sitepoint只是给出了语言的大类，例如中文只给出了zh，但是没有区分香港，台湾，大陆。而微软给出了一份更加详细的语言列表，其中细分了zh-cn, zh-hk, zh-tw。

### 字符编码
通过声明一个明确的字符编码，让浏览器轻松、快速的确定适合网页内容的渲染方式，通常指定为'UTF-8'。

### IE兼容模式

```
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
</head>
...
</html>
```

### 引入CSS, JS

```
<!-- External CSS -->
<link rel="stylesheet" href="code_guide.css">

<!-- In-document CSS -->
<style>
    ...
</style>

<!-- External JS -->
<script src="code_guide.js"></script>

<!-- In-document JS -->
<script>
    ...
</script>
```

### 属性顺序
属性应该按照特定的顺序出现以保证易读性；

- `class`
- `id`
- `name`
- `data-*`
- `src`, `for`, `type`, `href`, `value` , `max-length`, `max`, `min`, `pattern`
- `placeholder`, `title`, `alt`
- `aria-*`, `role`
- `required`, `readonly`, `disabled`
- class是为高可复用组件设计的，所以应处在第一位；

id更加具体且应该尽量少使用，所以将它放在第二位。

### 减少标签数量

```
<!-- Not well -->
<span class="avatar">
    <img src="...">
</span>

<!-- Better -->
<img class="avatar" src="...">
```