import {getLyric, getSongData, getSongUrl } from '@/api/index'
import {musicXhr as xhr} from '@/utils/xhr'

/**
 * 获取歌曲详情，包括歌词，可供播放的url
 * @param id :歌曲id
 * @param logged: 用户是否登录（决定播放url）
 * @returns {Promise<{lyric: (*[]|*), url: string}>}
**/
export const getTrackDetail = async (id, logged = false) => {
  const {songs: [track]} = await getSongData([id])
  // const {lrc, nolyric} = await getLyric(id)
  // const lyric = nolyric ? [] : lrc.lyric.split('\n').map(i => {
  //   const [time, sentence] = i.split(']')
  //   return {time, sentence}
  // })
  const lyric = await getLyric(id);
  let url
  if (logged) {
    const {data: [song]} = await getSongUrl(id)
    if (song.freeTrailInfo) {
      url = null
    } else {
      url = song.url
    }
  } else {
    url = `https://music.163.com/song/media/outer/url?id=${id}`
  }
  // return {...track, url, lyric}
  return {...track, url, lyric}
}


/* 
  搜索
*/
export const search = async (keywords, conditions) => {
  return xhr.get('/cloudsearch', {
    params:{
      keywords,
      ...conditions
    }
  })
}
