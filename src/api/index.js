const ubuntuUrl = 'http://api.ubuntu.gaoweisong.com'
const localhostUrl = 'http://api.localhost.gaoweisong.com'
const productionUrl = 'http://api.gaoweisong.com'
const v1 = `${localhostUrl}/v1`
const chatAddress = 'ws://192.168.0.102:7272'
export default {
  'chatAddress': chatAddress,
  'category': `${v1}/category/all`,
  'articles': `${v1}/article/list`,
  'article': `${v1}/article/detail`,
  'pushComment': `${v1}/comment/push`,
  'comments': `${v1}/comment/list`,
  'register': `${v1}/user/register`,
  'login': `${v1}/user/login`,
  'logout': `${v1}/user/logout`
}
