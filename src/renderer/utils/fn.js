const reducer = (object, property) => {
  // console.log(object)
  if(object) {
    return object[property]
  } else {
    return undefined
  }
  // return object[property]
}
export const optional_chain = (...parameters) => {
  const [source, ...properties] = parameters
  return properties.reduce(reducer, source)
}

/*
休眠
*/
export const sleep = (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const formatLyric = (lyric = '') => {
  return lyric
    .split("\n")
    .filter((i) => !!i)
    .map((i) => {
      const reg = new RegExp(/\[\d*:\d*((\.|:)\d*)*\]/, 'g')
      // 正则分离时间和歌词
      let [time] = i.match(reg) || []
      let sentence = i.match(/](.*)/)[1];
      // console.log(sentence)
      if (time) {
        const min = Number(time.match(/\[(\d*)/i)[1])
        const sec = Number(time.match(/:(\d*)/i)[1])
        const mill = time.match(/\.(\d*)]/i)[1]
        const millToSec = +(Number(mill) / 1000).toFixed(2)
        time = min * 60 + sec + millToSec
        sentence = sentence || '● ● ●'
      } else {
        sentence = sentence || i
      }
      return {
        time,
        sentence
      }
    });
}

// export const formatLyric = (lyric = '') => {
//   return lyric
//     .split('\n')
//     .filter((i) => !!i)
//     .map((i) => {
//       const reg = new RegExp(/\[\d*:\d*((\.|:)\d*)*\]/, 'g');
//       let [time] = i.match(reg) || [];
//       let sentence = i.match(/](.*)/)[1];
//       // [by: ***]
//       // [00:27.54]The many miles we walked
//       // [00:56.33]
//       // [00:59.54] That's the way it is
//       // [00:12]
//       if (time) {
//         const min = Number(time.match(/\[(\d*)/i)[1]);
//         const sec = Number(time.match(/:(\d*)/i)[1]);
//         const mill = time.match(/\.(\d*)]/i)[1];
//         const millToSec = +(Number(mill) / 1000).toFixed(2);
//         time = min * 60 + sec + millToSec;
//         sentence = sentence || '● ● ●';
//       } else {
//         sentence = sentence || i;
//       }
//       return {
//         time,
//         sentence,
//       };
//     });
// };

export { formatDuring } from './filters'
