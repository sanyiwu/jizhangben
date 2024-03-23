//导入mongoose
const mongoose = require('mongoose');

//5. 创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//6. 创建模型对象  对文档操作的封装对象
//AccountModel对象 可以对文档进行增删改查操作, books 是集合名称
let UserModel = mongoose.model('users',UserSchema);

//暴露模型对象
module.exports = UserModel;