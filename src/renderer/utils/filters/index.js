import { inRange } from "lodash"

export function formatDuring (val) {
  if (val) {
    let min = ~~(val / 1000 / 60)
    let sec = ~~(val % (1000 * 60) / 1000)
    return `${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`
  } else {
    return '00:00'
  }
}

export const formatNumber = (number) => {
  if(inRange(number, 1000,1000000)) {
    return `${~~(number / 1000)}K`
  } else if (inRange(number, 1000001,1000000000)) {
    return `${~~(number / 1000000)}M`
  } else {
    return number
  }
}

export default {
  formatDuring,
  formatNumber
}
