const defaultConfig = {
  count: 20, // 每次最多执行条数
  time: 100 // 每次执行间隔
}
var fns = []
var count = 0
var hasTimeout = false
// 发布函数
function release () {
  if (count <= defaultConfig.count) {
    count++
    send() && release()
  } else if (!hasTimeout) {
    hasTimeout = true
    setTimeout(() => {
      hasTimeout = false
      count = 0
      release()
    }, defaultConfig.time)
  }
}

function send () {
  let fn = fns.shift()
  return fn && fn.req().then(fn.resolve).catch(fn.reject)
}

// 防抖函数
function diversion (req, config) {
  if (config) {
    config.time && (defaultConfig.time = config.time)
    config.count && (defaultConfig.count = config.count)
  }
  return new Promise((resolve, reject) => {
    // 储存请求
    fns.push({req, resolve, reject})
    // 发布请求
    setTimeout(release, 0)
  })
}

export default diversion

export const cancelDiversion = function () {
  fns = []
}
