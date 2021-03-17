const express = require('express')
const apiRouter = require('./apiRouter')
const netApiMap = require('./neteaseApi')

// 直接引进来，在下面引用路由就可以了
const musicApi = require('music-api-for-qq')

export const startNetApiServer = () => {
  const app = express()

  const port = 5001
  const host = '127.0.0.1'

  // netease 路由匹配
  Object.entries(netApiMap).map(([k, v]) => {
    app.use(k, v)
  })

  // qq-music 自带匹配
  app.use('/qq-api', musicApi.router('/api'))

  app.server = app.listen(port, host, () => {
    console.log('后台api开启，整合在端口： http://127.0.0.1:5001')
  })
}
