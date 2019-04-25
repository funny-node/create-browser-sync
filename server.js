const http = require("http")
const fs = require('fs')

const server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/html"})

  const html = fs.readFileSync('./index.html', 'utf-8')

  response.write(html)
  
  response.end()
})

const io = require('socket.io')(server)

io.on('connection', client => {
  

  fs.watchFile('./index.html', (curr, prev) => {
    // console.log(curr)
    io.emit('reload', 123);
  })
})

server.listen(8000)