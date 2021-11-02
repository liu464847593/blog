---
sidebar: auto
---

## 什么是MySQL?
`MySQL`是一个跨平台的开源关系型数据库管理系统

数据库（Database）是按照数据结构来组织、存储和管理数据的仓库。

- 关系型数据库：采用了`关系模型`来组织数据的数据库，其以行和列的形式存储数据
- 非关系型数据库：没有关系数据库的关系型特性。分为键值对存储数据库，列存储数据库，文档型数据库，图形数据库

SQL：对数据库进行查询和修改操作的语言

```
// 连接到数据库
mysql -h hostname -u username -p
```

## 数据类型
数值类型：
- 整数类型：TINYINT,SMALLINT,MEDIUMINT,INT,BIGINT  
- 浮点类型：FLOAT,DOUBLE  
- 定点小数类型：DECIMAL

日期/时间类型：YEAR,TIME,DATE,DATETIME,TIMESTAMP
字符串类型：CHAR,VARCHAR,BINARY,VARBINARY,BLOB,TEXT,ENUM和SET

## 函数
- 数学函数：
绝对值ABS(X)，圆周率PI(),平方根SQRT(X),求余函数MOD(x,y),获取整数CEIL(x)，CEILING(x),FLOOR(x),获取随机数RAND(),RAND(x)
ROUND(x),ROUND(x,y),TRUNCATE(x,y),符号函数SIGN(x),幂函数POW(x,y),POWER(x,y),EXP(x),LOG(x),LOG10(x)
RADIANS(x),DEGREES(x),SIN(x),ASIN(x),COS(x),ACOS(x),TAN(x)
- 字符串函数：CAHR_LENGTH(str),CONCAT(s1,s2..),INSERT(s1,x,len,s2),LOWER(str)等
- 日期和时间函数：CURRENT_DATE(),UNIX_TIMESTAMP(date)等
- 条件判断函数：IF(expr,v1,v2),IFNULL(v1,v2),CASE
- 系统信息函数：VERSION(),CONNECTION_ID(),USER()
- 加/解密函数：PASSWORD(),MD5(),ENCODE(str,pswd_str),DECODE()



## 常用命令

- 查看数据库： `SHOW DATABASES`
- 创建数据库： `CREATE DATABASE database_name`
- 查看数据库定义： `SHOW CREATE DATABASE  database_name`
- 删除数据库： `DROP DATABASE database_name`
- 使用数据库： `USE database_name`
- 创建数据表： `CREATE TABLE tb_name(字段，类型，【默认值】...)`
- 查看表基本结构： `DESC tb_name`
- 查看表详细结构： `SHOW CREATE TABLE tb_name`
- 修改表名： `ALTER TABLE 旧表名 RENAME 新表名`
- 修改字段数据类型： `ALTER TABLE 表名 MODIFY 字段名 数据类型`
- 修改字段名： `ALTER TABLE 表名 CHANGE 旧字段名 新字段名 新数据类型`
- 添加字段： `ALTER TABLE 表名 ADD 新字段名 数据类型`
- 删除字段： `ALTER TABLE 表名 DROP 字段名`
- 修改字段排列位置： `ALTER TABLE 表名 MODIFY 字段1 数据类型 FIRST|AFTER 字段2`
- 更改表的存储引擎： `ALTER TABLE 表名 ENGINE= 更改后的存储引擎名`
- 删除表的外键约束： `ALTER TABLE 表名 DROP FOREIGN KEY 外键约束名`
- 删除没有关联的表： `DROP TABLE IF EXISTS 表1，表2，...表n`
- 查询所有字段： `SELECT * FROM tb_name`
- 指定查询记录： `SELECT 字段1，字段2,...字段n FROM tb_name WHERE 查询条件`
- 内连接： `SELECT xxx FROM tb_name INNER JOIN tb_name1 ON xxx`
- 左连接： `SELECT xxx FROM tb_name LEFT OUTER JOIN tb_name1 ON xxx`
- 右连接： `SELECT xxx FROM tb_name RIGJT OUTER JOIN tb_name1 ON xxx`
- 合并查询 `SELECT column,... FROM table1 UNION [ALL] SELECT column,... FROM table2`
- 插入数据 `SELECT INTO table_name (column_list) VALUES (value_list)`
- 更新数据 `UPDATE table_name SET column_name1 = value1,...coulmn_namen =valun WHERE (condition)`
- 删除数据 `DELETE FROM table_name [WHERE <condition>]`

## 聚合函数查询
- AVG() 返回某列平均值
- COUNT() 返回某列行数
- MAX() 返回某列最大值
- MIN() 返回某列最小值
- SUM() 返回某列的和

## 取名
表名[AS]表别名  
列名[AS]列别名


查询语句 IN 速度要快于OR, DISTINCT 消除重复记录
HAVING 和 WHERE 区别：
HAVING在数据分组后进行过滤分组，WHERE在分组前用来选择，且排除的记录不包括在分组中
ROLLUP,ORDER BY 不能同时使用

## 索引
索引是对数据库表中一列或多列的值进行排序的一种结构，使用索引可提高数据库中特定数据的查询速度

优点：
- 创建唯一索引，保证数据库表中每一行数据的唯一性
- 大大加快数据查询速度
- 加速表与表之间的连接
- 在使用分组和排序子句进行数据查询时，显著减少查询中分组和排序的时间

缺点：
- 创建索引和维护索引要耗费时间，并且随着数据量的增加所消耗的时间也会增加
- 索引需要占磁盘空间，除了数据表占数据空间之外，每个索引还要占一定物理空间，如果有大量索引，索引文件可能比数据文件更快达到最大文件尺寸
- 当对表中的数据进行增加，删除，和修改的时候，索引要动态维护，降低了数据的维护速度

### 索引分类
- 普通索引和唯一索引
- 单列索引和组合索引
- 全文索引
- 空间索引

## 存储过程和函数

### 创建存储过程和函数
```
//创建存储过程
CREATE PROCEDURE sp_name([proc_parameter])
[characteristics ...] routine_body

// 创建存储函数
CREATE FUNCTION func_name([func_parameter])
RESTURNS type
[characteristic ...] routine_body

// 定义变量
DECLARE var_name,[,varname]... date_type [DEFAULT value]

// 变量赋值
SET var_name = expr [, var_name = expr] ...;
```

## 视图
视图是个虚拟表，是从数据库中一个或多个表导出来的表。视图还可以从已经存在的视图的基础上定义

```
// 创建/修改视图
CREATE [OR REPLACE] [ALGORITHM = {UNDEFINED | MERGE | TEMPTABLE}]
VIEW view_name [(column_list)]
AS SELECT_statement
[WITH [CASCADED | LOCAL] CHECK OPTION]

// 查看视图
DESC 视图名

// 修改视图
ALTER [ALGORITHM = {UNDEFINED | MERGE | TEMPTABLE}]
VEIW view_name [(column_list)]
AS SELECT_statement
[WITH [CASCADED | LOCAL] CHECK OPTION]

// 删除视图
DROP VIEW [IF EXISTS]
view_name [,view_name] ...
[RESTRICT | CASCADE]
```
## 触发器
```
// 创建只有一个执行语句的触发器
CREATE TRIGGER trigger_name trigger_time trigger_event
ON tb1_name FOR EACH ROW trigger_stmt

// 创建有多个执行语句的触发器
CREATE TRIGGER trigger_name trigger_time trigger_event
ON tb1_name FOR EACH ROW 
BEGIN
语句列表
END

// 删除触发器
DROP TRIGGER [schema_name.]trigger_name
```
