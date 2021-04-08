import {musicXhr as xhr} from '@/utils/xhr'

/*
    获取banner新歌
*/
export const getNewRelease = () => xhr.get('/personalize/newsong')

/*
    获取推荐歌单列表
*/
export const getPersonalized = () => xhr.get('/personalized?limit=10')

/*
    新专辑
*/
export const newAlbums = (params) => {
  return xhr.get('/album/new', {
    params
  })
}

/*
    新歌速递
*/
export const topSong = type => {
  return xhr.get(`/top/song?type=${type}`)
}

/**
 * 获取推荐mv
 */
export const getMv = () => xhr.get('/personalized_mv')

/*
    获取歌单分类列表
 */
export const getCatList = () => xhr.get('/playlist/catlist')

/*
    获取新mv
*/
export const getNewMv = params => xhr.get('/mv/first', {params})

/*
    获取所有榜单
*/
export const getTopList = () => xhr.get('/toplist')

/*
    获取歌单详情,根据歌单id返回歌单详细信息
*/
export const getPlayList = id => xhr.get(`/playlist/detail?id=${id}`)

/*
    获取专辑详情，根据歌单id返回歌单详细信息
*/
export const getAlbum = id => xhr.get('/album', {params: {id}})

/*
    获取歌手详情
*/
export const getArtist = id => xhr.get(`/artists?id=${id}`)

/* 
  获取歌手专辑
*/
export const getArtistAlbum = id => xhr.get(`/artist/album?id=${id}`)

/*
    获取歌词
*/
export const getLyric = id => xhr.get(`/lyric?id=${id}`)

/*
    获取歌曲详情
*/
export const getSongData = (ids = []) => xhr.get(`/song/detail?ids=${ids.join()}`)

/*
    获取歌曲可播放url
*/
export const getSongUrl = id => xhr.get(`/song/url?id=${id}`)

/*
    标记|取消，喜欢音乐
*/
export const favTrack = (params) => {
  params['timestamp'] = new Date().getTime()
  return xhr.get('/like', {
    params
  })
}

/*
    获取喜欢列表
*/
export const getLikeList = () => xhr.get('/likelist')

/*
    登录
    -phone: 手机号
    -md5_password: md5加密密码
*/
export const login = params => {
  return xhr.post('/login/cellphone', params)
}

/*
** MV相关

** 获取mv数据
*/
export const mvDetail = mvid => {
  return xhr.get('/mv/detail', {
    params: {
      mvid,
      timestamp: new Date().getTime()
    }
  })
}

/*
    mv地址
*/
export const mvUrl = params => {
  return xhr.get('/mv/url', {
    params
  })
}

/*
    相关mv
*/
export const simiMv = mvid => {
  return xhr.get('/simi/mv', {
    params: {
      mvid
    }
  })
}

/*
    根据歌单类型获取推荐歌单
*/
export const getTopPlaylist = (params = {limit: 20, cat: '全部', offset: 0}) =>
  xhr.get('/top/playlist', {params})
