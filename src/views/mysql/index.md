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
