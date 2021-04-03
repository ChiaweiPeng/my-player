<script>
import {Howl} from 'howler'
import {sync} from 'vuex-pathify'
import {throttle} from 'lodash'
export default {
  name: 'Player',
  data: () => ({
    progressThrottle: null,
    saveCurrentTimeThrotttle: null,
    pauseProgress: false,
    howler: null
  }),
  computed: {
    volume: sync('change/volume'),
    currentTime: sync('change/currentTime')
  },
  watch: {
    'track' (newTrack, oldTrack) {
      if (newTrack.id !== oldTrack.id) {
        // console.log(newTrack)
        this.init(newTrack.url)
        console.log('song changed')
      }
    },
    volume (val) {
      this.howler.volume(val)
    }
  },
  mounted () {
    this.progressThrottle = throttle(this.runProgress, 500)
    this.saveCurrentTimeThrotttle = throttle(this.saveCurrentTime, 2000)
    this.track.url && this.init(this.track.url)
  },
  methods: {
    initHowler (src) {
      const sound = new Howl({
        src: [src],
        html5: true,
        preload: 'metadata',
        format: ['mp3', 'flac'],
        onplay: () => {
          console.log(src)
          requestAnimationFrame(this.step)
        },
        onseek: () => {
          requestAnimationFrame(this.step)
        },
        onload: () => {
          this.loadAudio = false
        },
        onloaderror: () => {
          console.log('加载失败')
          this.loadAudio = false
        }
      })
      sound.once('end', this.endCb)
      sound.seek(this.currentTime)
      return sound
    },
    init (url) {
      this.initMediaSession()
      this.howler = this.initHowler(url)
      this.howler.volume(this.volume)
    },
    pause () {
      this.howler.pause()
    },
    play () {
      this.howler.play()
    },
    runProgress () {
      this.currentTime = Math.ceil(this.howler.seek())
    },
    setSeek (val) {
      this.howler.seek(val)
    },
    step () {
      this.progressThrottle()
      this.saveCurrentTimeThrotttle()
      if (this.howler.playing()) requestAnimationFrame(this.step)
    },
    endCb () {
      this.handleClickForwardMuisc()
    },
    initMediaSession () {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.track.name,
          artist: this.track.ar[0].name,
          album: this.track.al.name,
          artwork: [
            { src: this.albumPicUrl, sizes: '512x512', type: 'image/png' }
          ]
        });
        [
          ['play', this.handleClickStartPlay],
          ['pause', this.handleClickStartPlay],
          [ 'previoustrack', this.handleClickBackMusic],
          ['nexttrack', this.handleClickForwardMuisc]
        ].map(([name, fn]) => navigator.mediaSession.setActionHandler(name, fn))
      }
    },
    saveCurrentTime () {
      localStorage.setItem('currentTime', this.currentTime)
    }
  }
}
</script>
