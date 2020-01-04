const http = require("http")
const fs = require('fs')

// 相当于手动构建一个 static server
const server = http.createServer((request, response) => {
  if (request.url === '/') {
    response.writeHead(200, {"Content-Type": "text/html"})
    const html = fs.readFileSync('./index.html', 'utf-8')
    response.write(html)
  } else if (request.url === '/index.js') {
    response.writeHead(200, {"Content-Type": "application/javascript"})
    const js = fs.readFileSync('./index.js', 'utf-8')
    response.write(js)
  }
  
  response.end()
})

const io = require('socket.io')(server)

io.on('connection', client => {
  fs.watchFile('./index.html', (curr, prev) => {
    console.log('index.html 文件变动')
    io.emit('reload');
  })

  fs.watchFile('./index.js', (curr, prev) => {
    console.log('index.js 文件变动')
    io.emit('reload');
  })
})

server.listen(8000)