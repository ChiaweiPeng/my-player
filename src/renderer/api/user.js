import {musicXhr as xhr} from '@/utils/xhr'
import {now} from 'lodash'

/*
    获取当前用户播放列表
*/
export const getUserPlaylist = params => {
  return xhr.get('/user/playlist', {
    params: {
      ...params,
      timestamp: now()
    }
  })
}

/* 
  获取用户喜爱的专辑
*/
export const favAlbums = () => xhr.get('/albums/sublist', {params : {timestamp: now()}})


/* 
  获取收藏mv
*/
export const favMVs = () => xhr.get('/mv/sublist', {params: {timestamp: now()}})


/* 
  获取收藏歌手
*/
export const favArtists = () => xhr.get('/artist/sublist', {params:{timestamp: now()}})
