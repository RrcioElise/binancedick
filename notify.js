// console.log(result.data);
const config = require('./config')
const axios = require('axios')

async function dingding(text) {
  data = {
    msgtype: 'markdown',
    markdown: {
      title: `${config.dingding_word}`, // 首屏会话透出的展示内容
      text: text,
    },
    at: {
      atMobiles: ['1'],
    },
  }

  if (config.dingding_token == '') {
    return '尚未开启钉钉推送'
  }
  try {
    const result = await axios.post(
      `https://oapi.dingtalk.com/robot/send?access_token=${config.dingding_token}`,
      data
    )
    return result.data
  } catch (e) {
    console.log(e)
  }
}

async function notify(text, type = 'dinding') {
  let data
  switch (type) {
    case 'dinding':
      data = await dingding(text)
      break
    default:
      data = await dingding(text)
  }
  return data
}

module.exports = notify

