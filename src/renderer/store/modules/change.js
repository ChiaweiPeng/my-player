import { getTrackDetail } from '@/api/music'
import { getLikeList, favTrack } from '@/api'
import { getUserPlaylist } from '@/api/user'
import { commit, dispatch, make } from 'vuex-pathify'
import { sleep } from '@/utils/fn'
// 引入全局提示
import { message } from 'ant-design-vue'
import { isEqual, uniqWith } from 'lodash'

const PLAY_MODE = {
  CYCLE: 0,
  RANDOM: 1,
  SINGLE: 2
}

const state = {
  playing: false,
  loadAudio: false,
  track: {},
  currentTrackId: localStorage.getItem('currentTackId'),
  currentTime: localStorage.getItem('currentTime'),
  playingList: localStorage.getItem('playingList'),
  playlist: [],
  mode: PLAY_MODE.CYCLE,
  volume: 0.8,
  likes: [],
  recent: localStorage.getItem('recent') ? JSON.parse(localStorage.getItem('recent')) : [],
}

export default {
  namespaced: true,
  state,
  getters: {
    index(state) {
      return state.playingList.findIndex(track => track.id === state.track.id)
    },
    nextTrackId(state, getters) {
      const index = getters['index']
      let id = state.track.id
      const len = state.playingList.length
      const { mode, playingList } = state
      if (mode === PLAY_MODE.CYCLE || (mode === PLAY_MODE.RANDOM && len - 1 !== index)) {
        id = playingList[(index + 1) === playingList.length ? 0 : index + 1].id
      }
      return id
    },
    prevTrackId(state, getters) {
      const index = getters['index']
      return state.playingList[index === 0 ? (state.playingList.length - 1) : index - 1].id
    },
    liked: (state) => !!state.likes.find(i => i === state.track.id)
  },
  mutations: {
    ...make.mutations(state),
    playingList(state, list) {
      state.playingList = list
    },
    UPDATE_PLAYER(state, payload) {
      Object.keys(payload).map(key => {
        state[key] = payload[key];
      });
    },
  },
  actions: {
    async fetch({ commit, rootGetters }) {
      if (rootGetters['settings/logged']) {
        // 获得当前用户推荐歌单
        const [likesRes, playlistRes] = await Promise.all([getLikeList(), getUserPlaylist({
          timestamp: new Date().getTime(),
          uid: rootGetters['settings/userId']
        })])
        commit('likes', likesRes.ids)
        commit('playlist', playlistRes.playlist)
      }
    },
    updatePlayingList({ commit }, list) {
      localStorage.setItem('playingList', JSON.stringify(list))
      commit('playingList', list)
    },
    // 播放歌曲
    async updateTrack({ rootGetters, commit, dispatch, getters }, payload) {
      const { id, option = { autoplay: true, resetProgress: true } } = payload
      commit('playing', false)
      commit('loadAudio', true)
      // await sleep()
      // console.log(id)
      const track = await getTrackDetail(id, rootGetters['settings/logged'])
      console.log(track)
      if (option.resetProgress) {
        commit('currentTime', 0)
      }
      // console.log('track response is', track)
      commit('track', track)
      commit('currentTrackId', track.id)
      localStorage.setItem('currentTrackId', track.id)

      if (!track.url) {
        message.info('当前歌曲暂时不可用，为您跳转下一首')
        // 跳转下一曲
        const next = getters['nextTrackId']
        if (
          next && getters['nextTrackId'] !== state.currentTrackId
        ) dispatch('updateTrack', { id: getters['nextTrackId'] })
      } else {
        if (option.autoplay) {
          commit('playing', true)
        }
      }
    },
    async favSong({ rootGetters, commit, dispatch, state }, { id, like }) {
      let likes = state.likes
      if (!rootGetters['settings/logged']) {
        message.warning('需要登录，请先登录')
      } else {
        await favTrack({ id, like })
        if (like) {
          likes.push(id)
        } else {
          likes = likes.filter(i => i !== id)
        }
        commit('likes', likes)
      }
    },
    pushRecent({ state, commit }, payload) {
      const recent = uniqWith([payload, ...state.recent], isEqual)
      // console.log(recent)
      const limit = 100
      const len = recent.length
      if (len > limit) {
        recent.splice(limit, len - limit)
      }
      try {
        localStorage.setItem('recent', JSON.stringify(recent))
      } catch (e) {
        console.error(e)
      }
      commit('recent', recent)
    }
  }
}
