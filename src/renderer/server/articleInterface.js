import BaseServer from './base'

class SuperServer extends BaseServer {
  constructor (URL) {
    super()
    this.baseUrl = this.baseurl + URL
  }
  // get article list by query
  getArticleList (obj) {
    return this.Post(obj, this.baseUrl + '/articleList')
  }
  // get detail list by query
  getArticleDetail (obj) {
    return this.Post(obj, this.baseUrl + '/articleDetail')
  }
  // add article
  addArticle (obj) {
    return this.Post(obj, this.baseUrl + '/addArticle')
  }
  // delete article
  delArticle (obj) {
    return this.Delete(obj, this.baseUrl + '/delArticle')
  }
  // update article
  updateArticle (obj) {
    return this.Put(obj, this.baseUrl + '/updateArticle')
  }
}

export default SuperServer
