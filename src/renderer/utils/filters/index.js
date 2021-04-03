export function formatDuring (val) {
  if (val) {
    let min = ~~(val / 1000 / 60)
    let sec = ~~(val % (1000 * 60) / 1000)
    return `${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`
  } else {
    return '00:00'
  }
}

export default {
  formatDuring
}
