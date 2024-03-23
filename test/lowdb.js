//导入 lowdb
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
//获取 db 对象
const db = low(adapter);

//初始化数据
// db.defaults({ posts: [], user: {}}).write();

//写入数据
// db.get('posts').push({id: 1, title: '上春山'}).write();
// db.get('user').push({id: 1, name: 'kafka'}).write();
// db.get('posts').unshift({id: 2, title: '上春山'}).write();

//获取单条数据
// console.log(db.get('posts').find({id: 1}).value());

//获取数据
// console.log(db.get('posts').value());

//删除数据
// let res = db.get('posts').remove({id: 2}).write();
// console.log(res);

//更新数据
db.get('posts').find({id: 1}).assign({title: '希望黑敬亭不要再上春晚了'}).write();

//了解即可,很少用到
