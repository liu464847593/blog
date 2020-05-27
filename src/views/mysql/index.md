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
