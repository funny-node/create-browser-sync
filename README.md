启动：

```bash
$ node server
```

然后本地浏览 http://localhost:8000/ 查看 demo，可以修改 index.html 和 index.js 文件，修改完后浏览器会自动刷新

---

其实就是想简单实现一个类似 browser-sync 的工具，可以实时 watch，reload 浏览器。本身并不复杂，socket.io 作为主要工具，然后起一个静态资源服务器对静态文件做 server 即可（我是自己简单模拟了下），然后服务端监听文件修改，告诉客户端 reload 浏览器即可

