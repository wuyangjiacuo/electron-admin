import BaseServer from './base'

class SuperServer extends BaseServer {
  constructor (URL) {
    super()
    this.baseUrl = this.baseurl + URL
  }
  // get article list by query
  getCateInfo () {
    return this.Get(this.baseUrl + '/getAllCate')
  }
  addCate (obj) {
    return this.Post(obj, this.baseUrl + '/addCate')
  }
  changeRank (obj) {
    return this.Post(obj, this.baseUrl + '/changeRank')
  }
  updateCatePic (obj) {
    return this.Post(obj, this.baseUrl + '/updateCatePic')
  }
  updateCateName (obj) {
    return this.Post(obj, this.baseUrl + '/updateCateName')
  }
  delCate (obj) {
    return this.Post(obj, this.baseUrl + '/delCate')
  }
}

export default SuperServer
