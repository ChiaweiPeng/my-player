const express = require('express')
const cookieParser = require('cookie-parser')

// 引入netease和qq-music Api
const netApiMap = require('./neteaseApiMap')
const musicApi = require('mymusic-api-for-qq')

export const startApiServer = () => {
  const app = express()

  // 处理跨域
  app.use((req, res, next) => {
    if (req.query !== '/' && !req.path.includes('.')) {
      res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
      })
    }
    req.method === 'OPTIONS' ? res.status(204).end() : next()
  })

  // 获取postdata数据
  app.use(express.json())
  app.use(express.urlencoded({extended: false}))

  // 解析cookie
  app.use(cookieParser())

  // netease 路由匹配
  //http://127.0.0.1:6001/api/artist-list
  Object.entries(netApiMap).map(([k, v]) => {
    app.use(k, v)
  })

  // qq-music 路由匹配
  //http://127.0.0.1:6001/qq-api/api/singer_list
  app.use('/qq-api', musicApi.router('/api'))

  // 配置端口，主机号
  const port = process.env.API_PORT || 6001
  const host = process.env.HOST || '127.0.0.1'

  // 创建server
  app.server = app.listen(port, host, () => {
    console.log(`后台server开启，api整合在: @ http://${host || 'localhost'}:${port}`)
  })
}
