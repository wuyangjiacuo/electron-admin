import BaseServer from './base'

class SuperServer extends BaseServer {
  constructor (URL) {
    super()
    this.baseUrl = this.baseurl + URL
    // console.log(this.baseUrl)
  }
  // get gifList
  getGifList (obj) {
    return this.Post(obj, this.baseUrl + '/gifList')
  }
  getGifDetail (obj) {
    return this.Post(obj, this.baseUrl + '/gifDetail')
  }
  // delete article
  delGif (obj) {
    return this.Delete(obj, this.baseUrl + '/delGif')
  }
}

export default SuperServer
