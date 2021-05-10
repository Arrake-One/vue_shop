import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message,
  Container,
  Aside,
  Main,
  Header,
  Col,
  Row,
  Menu,
  Submenu,
  MenuItemGroup, MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  Popconfirm,
  MessageBox,
  Tabs,
  Tag,
  Divider,
  Tree,
  Steps,
  Step,
  Alert,
  Select,
  Option,
  Cascader,
  TabPane
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(Col)
Vue.use(Row)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Popconfirm)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Tree)
Vue.use(Step)
Vue.use(Alert)
Vue.use(Steps)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(TabPane)

Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
