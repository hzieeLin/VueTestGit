# my-bk

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 随手笔记

这里主要写了是一些包和配置，相信这是我容易忘记的内容

1、axios安装

npm i axios

导入axios

设计后端的基本头地址

```
axios.defaults.baseURL="http://127.0.0.1:9000"
```

挂载axios

```
Vue.prototype.$http = axios
```

同样在后端的node中

再用post时，为了解决前端传来的json格式的数据，需要以下用来解析

```
//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))

const bodyParser = require('body-parser');
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
```

2、注册与登录

给用户的密码进行加密算法

```
const bcrypt = require('bcryptjs')
```

```
req.body.password = bcrypt.hashSync(req.body.password, 10)//用bcrypt.hashSync方法加密
bcrypt.compareSync(输入密码，数据库密码)//进行比较，判断密码是否相同
```

登录是jwt认证

```
"express-jwt": "^5.3.3",
"joi": "^17.5.0",
"jsonwebtoken": "^8.5.1",
```

```
在全局建立config.js包作为加密密钥
module.exports = {
    //加密密钥
    jwtSecretKey: "author hziee linsh"
}
```
