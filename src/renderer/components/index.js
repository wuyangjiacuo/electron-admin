import appContainer from './layout/appContainer.vue'
import pagenation from './common/pagenation'
import editor from './common/editor'
import treeTable from './common/treeTable'

export default (Vue) => {
  Vue.component('appContainer', appContainer)
  Vue.component('pagenation', pagenation)
  Vue.component('editor', editor)
  Vue.component('treeTable', treeTable)
}
