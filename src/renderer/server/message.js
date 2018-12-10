import BaseServer from './base'

class SuperServer extends BaseServer {
  constructor (URL) {
    super()
    this.baseUrl = this.baseurl + URL
  }
  checkMessage (obj) {
    return this.Post(obj, this.baseUrl + '/checkMessage')
  }
}

export default SuperServer
