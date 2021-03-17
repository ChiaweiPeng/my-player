// 开启QQ音乐API 服务
const musicApi = require('music-api-for-qq')
const express = require('express')

export const startQQMusicApiServer = () => {
  const app = express()

  const host = '127.0.0.1'
  const port = 6001

  app.server = musicApi.server({
    port: port,
    host: host,
    cache: false,
    use: function (server, express) {
      server.use('/', express.static(__dirname + '/demo'))
    }
  })

  console.log('qq-music-api is running on http://127.0.0.1:6001')

  // app.server = musicApi.server( port, host , () => {
  //     console.log('qq-music-api is running on http://localhost:6001')
  // })
}
