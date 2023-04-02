import Vue from 'vue'
import {
  Button,
  Checkbox,
  Tabbar,
  TabbarItem,
  NavBar,
  Form,
  Field,
  Toast,
  Cell,
  List,
  Icon,
  Grid,
  GridItem,
  CellGroup
} from 'vant'

// vue.use()往全局注入一个插件，供全局真接使用，不需要单独引用
// 但是Toast比较特殊，使用的话还需要单独引用，因为它是在js中使用的

Vue.use(Grid)
Vue.use(GridItem)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(List)
Vue.use(Cell)
Vue.use(Toast)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
