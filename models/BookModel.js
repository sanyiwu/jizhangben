//导入mongoose
const mongoose = require('mongoose');

//5. 创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: {
        type: Boolean,
        default: true
    }
});

//6. 创建模型对象  对文档操作的封装对象
//BookModel对象 可以对文档进行增删改查操作, books 是集合名称
let BookModel = mongoose.model('books',BookSchema);

//暴露模型对象
module.exports = BookModel;