const request = require('NeteaseCloudMusicApi/util/request')
const { cookieToJson } = require('NeteaseCloudMusicApi/util/index')

// 网易api接口匹配
const artist_list = require('NeteaseCloudMusicApi/module/artist_list')

// qq音乐api接口匹配
// const

module.exports = {
  '/artist_list': generatorFn(artist_list)
}

function generatorFn (module) {
  return (req, res) => {
    // 如果请求参数中存在cookie，将cookie转为Json格式传给api
    if (typeof req.query.cookie === 'string') {
      req.query.cookie = cookieToJson(req.query.cookie)
    }

    let query = Object.assign(
      {},
      { cookie: req.cookie },
      req.query,
      req.body,
      req.files
    )

    module(query, request).then(answer => {
      console.log('[ok]', decodeURIComponent(req.originalUrl))
      res.append('Set-Cookie', answer.cookie)
      res.status(answer.status).send(answer.body)
    })
      .catch(answer => {
        console.log('[err]', decodeURIComponent(req.originalUrl), {
          status: answer.status,
          body: answer.body
        })
        // if(answer.body.code === '301') answer.body.msg =
      })
  }
}
