const fs = require('fs');
const path = require('path');
const {
  spawn
} = require('child_process');
const express = require('express')

const http2 = require('http2')
const http2Express = require('http2-express-bridge')
const app = http2Express(express)
const option = {
  key: fs.readFileSync("./localhost+2-key.pem"),
  cert: fs.readFileSync("./localhost+2.pem"),
  allowHTTP1: true
}

const JWT = require('./util/JWT');
require("./config/db.config")


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Expose-Headers', 'Authorization, Overtimes'); // 浏览器端读取不到token
  next()
})


app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Overtimes');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Max-Age', 86400) //时间单位为秒
  res.sendStatus(200);
})
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

const multer = require('multer')

//在本地创建一个目标文件夹
const upload = multer({
  dest: 'uploads/'
})


const UserRouter = require('./routes/admin/UserRouter');



//统一验证token，第一次登录系统要放行
app.use((req, res, next) => {
  //若token有效则next()，如果token过期则返回401
  if (req.url === '/adminapi/user/login') {
    next() //第一次登录，放行
    return
  }
  const token = req.headers["authorization"]
  if (token) {
    var payload = JWT.verify(token)
    if (payload) {
      const newToken = JWT.generate({
        _id: payload._id,
        username: payload.username
      }, "1d")
      res.header('Authorization', newToken)
      res.header('Overtimes', `${+new Date() + 86400000}`)
      next()
    } else {
      res.status(200).send({
        errCode: '-1',
        errorInfo: 'token过期'
      })
    }
  }
})


app.use(UserRouter)

//upload.single('avatar')：获取到文件存入到uploads中
app.post('/postdata', upload.single('avatar'), function (req, res, next) {
  console.log('1111');
  // 获取文件扩展名
  const fileExtension = path.extname(req.file.originalname);
  // console.log(typeof fileExtension);
  // 构建目标图片文件路径
  const targetFilePath = path.join(__dirname, 'uploads/', `${Date.now()}${fileExtension}`);

  // 读取临时文件的二进制数据
  fs.readFile(req.file.path, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Failed to read file.');
    }
    // console.log(data);   //二进制数据
    // 将二进制数据写入目标图片文件
    fs.writeFile(targetFilePath, data, 'binary', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Failed to save file.');
      }

      // 删除临时文件
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error deleting temporary file:', err);
        }
        console.log('删除成功');
      });

      const pythonScriptPath = 'vgg16model.py';

      // 使用spawn方法调用Python脚本
      const pythonProcess = spawn('python', [pythonScriptPath, targetFilePath]);

      // 处理Python脚本的输出
      pythonProcess.stdout.on('data', (data) => {
        console.log(`Python脚本输出：${data}`);
        //在进行网络通信时，数据往往以二进制形式传输。通过Buffer，我们可以方便地读取、写入和转换二进制数据。
        const buffer = Buffer.from(data, 'hex');
        const chineseText = buffer.toString('utf-8');
        console.log(buffer, chineseText);
        console.log(parseFloat(chineseText.split(',')[1]), parseFloat(chineseText.split(',')[1]) <= 0.5);
        if (parseFloat(chineseText.split(',')[1]) <= 50) {
          res.send({
            "data": '该图像非鸟类或者图像模糊，请重新上传'
          })
        } else {
          res.send({
            "data": chineseText.split(',')[0]
          })
        }

      });
    });
  });

})






const server = http2.createSecureServer(option, app)
server.listen(80, () => {
  console.log('https://192.168.125.102:80');
})