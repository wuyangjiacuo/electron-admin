import axios from 'axios'
class BaseServer {
  constructor () {
    // this.baseurl = 'http://120.78.175.231:8686'
    this.baseurl = 'http://47.100.188.220:8686' // 新买的两年服务器
    // this.baseurl = 'http://localhost:8686'
  }
  Post (obj, url) {
    return axios({
      url: url,
      method: 'POST',
      data: obj
    })
  }
  Delete (obj, url) {
    return axios({
      url: url,
      method: 'Delete',
      data: obj
    })
  }
  Get (url) {
    return axios({
      url: url,
      method: 'GET'
    })
  }
  Put (obj, url) {
    return axios({
      url: url,
      method: 'PUT',
      data: obj
    })
  }
  upLoadFile (formData, url) {
    return axios({
      url: url,
      method: 'Post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export default BaseServer
