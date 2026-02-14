const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 3000

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json'
}

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url)
  
  const extname = path.extname(filePath).toLowerCase()
  const contentType = mimeTypes[extname] || 'application/octet-stream'
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end('<h1>404 - File Not Found</h1>')
      } else {
        res.writeHead(500)
        res.end(`Server Error: ${err.code}`)
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf-8')
    }
  })
})

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`)
  console.log('📁 Serving files from ./dist directory')
})