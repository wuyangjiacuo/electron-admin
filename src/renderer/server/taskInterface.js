import BaseServer from './base'

class SuperServer extends BaseServer {
  constructor (URL) {
    super()
    this.baseUrl = this.baseurl + URL
  }
  addNewTask (obj) {
    return this.Post(obj, this.baseUrl + '/addNewTask')
  }
  getTasks (obj) {
    return this.Post(obj, this.baseUrl + '/getTasks')
  }
  getTaskDetail (obj) {
    return this.Post(obj, this.baseUrl + '/getTaskDetail')
  }
  updateTask (obj) {
    return this.Post(obj, this.baseUrl + '/updateTask')
  }
}

export default SuperServer
