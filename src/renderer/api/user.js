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
