import User from './userInfoInterface'
import Gif from './gifInterface'
import Article from './articleInterface'
import Cate from './cateInterface'
import TaskInterface from './taskInterface'
import Message from './message'

export default {
  user: new User('/api/v1/user'),
  gif: new Gif('/api/v1/gif'),
  cate: new Cate('/api/v1/cate'),
  article: new Article('/api/v1/article'),
  task: new TaskInterface('/api/v1/task'),
  message: new Message('/api/v1/message')
}
