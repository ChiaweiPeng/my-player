import {getTrackDetail} from '@/api/music'
import { dispatch, make } from 'vuex-pathify'
// 引入全局提示
import {message} from 'ant-design-vue'
import { getLikeList } from '../../api'

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
  playingList: [],
  mode: PLAY_MODE.CYCLE,
  volume: 0.8,
  likes: []
}

export default {
  namespaced: true,
  state,
  getters: {
    index (state) {
      return state.playingList.findIndex(track => track.id === state.track.id)
    },
    nextTrackId (state, getters) {
      const index = getters['index']
      let id = state.track.id
      const len = state.track.id
      const {mode, playingList} = state
      if (mode === PLAY_MODE.CYCLE || (mode === PLAY_MODE.RANDOM && len - 1 !== index)) {
        id = playingList[(index + 1) === playingList.length ? 0 : index + 1].id
      }
      return id
    },
    prevTrackId (state, getters) {
      const index = getters['index']
      return state.playingList[index === 0 ? (state.playingList.length - 1) : index - 1].id
    },
    liked: (state) => !!state.likes.find(i => i === state.track.id)
  },
  mutations: {
    ...make.mutations(state),
    playingList (state, list) {
      state.playingList = list
    }
  },
  actions: {
    // async fetch({commit, rootGetters}){
    //     if(rootGetters['settings/logged']){
    //         const [likeRes, playlistRes] = await Promise.all([getLikeList(), getUserPlaylist({
    //             timestamp: new Date().getTime(),
    //             uid
    //         })]) 
    //     }
    // },
    updatePlayingList ({commit}, list) {
      // console.log('up playinglist',JSON.stringify(list))
      localStorage.setItem('playingList', JSON.stringify(list))
      commit('playingList', list)
    },
    async updateTrack ({commit}, payload) {
      const {id, option = {autoplay: true, resetProgress: true}} = payload
      commit('playing', false)
      commit('loadAudio', true)
      const track = await getTrackDetail(id)
      if (option.resetProgress) {
        commit('currentTime', 0)
      }
      console.log('track response is', track)
      commit('track', track)
      commit('currentTrackId', track.id)
      localStorage.setItem('currentTrackId', track.id)

      if (!track.url) {
        message.info('当前歌曲暂时不可用，为您跳转下一首')
        // 跳转下一曲
        const next = getters['nextTrackId']
        if (
          next && getters['nextTrackId'] !== state.currentTrackId
        ) dispatch('updateTrack', {id: getters['nextTrackId']})
      } else {
        if (option.autoplay) {
          commit('playing', true)
        }
      }
    },
    async favSong ({commit, dispatch, state}, {id, like}) {
      // let likes = state.likes
      message.warning('需要登录')
    }
  }
}
