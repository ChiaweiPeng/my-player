const request = require('NeteaseCloudMusicApi/util/request')
const { cookieToJson } = require('NeteaseCloudMusicApi/util/index')

// 网易api接口匹配
const artist_list = require('NeteaseCloudMusicApi/module/artist_list')
const artists = require('NeteaseCloudMusicApi/module/artists')

const lyric = require('NeteaseCloudMusicApi/module/lyric')
// const login = require('NeteaseCloudMusicApi/module/login') 不知为啥加了单独login会参数错误
const login_cellphone = require('NeteaseCloudMusicApi/module/login_cellphone')
const login_refresh = require('NeteaseCloudMusicApi/module/login_refresh');
const login_status = require('NeteaseCloudMusicApi/module/login_status');
const logout = require('NeteaseCloudMusicApi/module/logout');

const personalized = require('NeteaseCloudMusicApi/module/personalized')
const personalized_newsong = require('NeteaseCloudMusicApi/module/personalized_newsong')
const personalized_mv = require('NeteaseCloudMusicApi/module/personalized_mv')

const playlist_catlist = require('NeteaseCloudMusicApi/module/playlist_catlist')
const playlist_detail = require('NeteaseCloudMusicApi/module/playlist_detail')

const album_new = require('NeteaseCloudMusicApi/module/album_new')
const album = require('NeteaseCloudMusicApi/module/album')

const like = require('NeteaseCloudMusicApi/module/like')
const likelist = require('NeteaseCloudMusicApi/module/likelist')

const mv_first = require('NeteaseCloudMusicApi/module/mv_first')

const song_detail = require('NeteaseCloudMusicApi/module/song_detail')
const song_url = require('NeteaseCloudMusicApi/module/song_url')

const toplist = require('NeteaseCloudMusicApi/module/toplist')

const user_playlist = require('NeteaseCloudMusicApi/module/user_playlist')

module.exports = {
  '/artist_list': generatorFn(artist_list),
  '/artists': generatorFn(artists),

  '/lyric': generatorFn(lyric),
  '/like': generatorFn(like),
  '/likelist': generatorFn(likelist),
  '/login/cellphone': generatorFn(login_cellphone),
  '/login/refresh': generatorFn(login_refresh),
  '/login/status': generatorFn(login_status),
  '/logout': generatorFn(logout),

  '/personalized': generatorFn(personalized),
  '/personalized/newsong': generatorFn(personalized_newsong),
  '/personalized_mv': generatorFn(personalized_mv),

  '/playlist/catlist': generatorFn(playlist_catlist),
  '/playlist/detail': generatorFn(playlist_detail),

  '/album/new': generatorFn(album_new),
  '/album': generatorFn(album),

  '/mv/first': generatorFn(mv_first),

  '/song/detail': generatorFn(song_detail),
  '/song/url': generatorFn(song_url),

  '/toplist': generatorFn(toplist),

  '/user/playlist':generatorFn(user_playlist)
}

function generatorFn(module) {
  return (req, res) => {
    if (typeof req.query.cookie === 'string') {
      req.query.cookie = cookieToJson(req.query.cookie);
    }
    let query = Object.assign(
      {},
      { cookie: req.cookies },
      req.query,
      req.body,
      req.files,
    );
    module(query, request)
      .then(answer => {
        console.log('[OK]', decodeURIComponent(req.originalUrl))
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
      .catch(answer => {
        console.log('[ERR]', decodeURIComponent(req.originalUrl), {
          status: answer.status,
          body: answer.body,
        })
        if (answer.body.code == '301') answer.body.msg = '需要登录'
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
  }
}
