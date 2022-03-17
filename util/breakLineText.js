function lineBreak(str, count) {
  let arr = []
  let pause = false
  while (!pause) {
    if (str.length > count) {
      if (str.charAt(count) === ' ') {
        arr.push(str.substring(0, count).trim())
        str = str.substring(count, str.length).trim()
      } else {
        let index = str.substring(0, count).lastIndexOf(' ')
        arr.push(str.substring(0, index).trim())
        str = str.substring(index, str.length).trim()
      }
    } else {
      arr.push(str)
      pause = true
    }
  }
  return arr
}

module.exports = lineBreak
