import BaseServer from './base'

class SuperServer extends BaseServer {
  constructor (URL) {
    super()
    this.baseUrl = this.baseurl + URL
  }
  // 用户注册
  userSignUp (obj) {
    return this.Post(obj, this.baseUrl + '/signUp')
  }
  // 用户登录
  userLogin (obj) {
    return this.Post(obj, this.baseUrl + '/login')
  }
  userInfo (token) {
    return this.Get(this.baseUrl + '/loginByToken/?token=' + token)
  }
  getVerificationCode (obj) {
    return this.Post(obj, this.baseUrl + '/verificationCode')
  }
  postUserInfo () {
    return this.Post(null, this.baseUrl)
  }
  updateUserAvatar (obj) {
    return this.Post(obj, this.baseUrl + '/updateUserAvatar')
  }
}

export default SuperServer
