import Vue from 'vue'
import {
  Layout,
  Row,
  Col,
  Form,
  FormModel,
  Input,
  InputNumber,
  Select,
  Cascader,
  Radio,
  Checkbox,
  // Switch,
  // Rate,
  Upload,
  Button,
  // Tag,
  Card,
  Table,
  Tabs,
  Tree,
  Breadcrumb,
  // Menu,
  // Dropdown,
  // Collapse,
  // Steps,
  Divider,
  Icon,
  Badge,
  Avatar,
  Modal,
  Popconfirm,
  Popover,
  Progress,
  DatePicker,
  Drawer,
  BackTop,
  Tooltip,
  Empty,
  message,
  notification,
  ConfigProvider
} from 'ant-design-vue'
const { Header, Content, Sider, Footer } = Layout
const FormItem = Form.Item
const FormModelItem = FormModel.Item
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const SelectOption = Select.Option

const { Meta } = Card
const { TabPane } = Tabs
const Breadcrumbtem = Breadcrumb.Item
// const MenuItem = Menu.Item
// const SubMenu = Menu.SubMenu
// const MenuDivider = Menu.Divider
// const MenuItemGroup = Menu.ItemGroup
// const DropdownButton = Dropdown.Button
// const CollapsePanel = Collapse.Panel
// const StepsStep = Steps.Step
const RangePicker = DatePicker.RangePicker
const MonthPicker = DatePicker.MonthPicker
const WeekPicker = DatePicker.WeekPicker

const components = [
  Layout,
  Header,
  Content,
  Sider,
  Footer,
  Row,
  Col,
  Form, FormItem,
  FormModel, FormModelItem,
  Input,
  InputNumber,
  Select, SelectOption,
  Cascader,
  Radio, RadioGroup,
  Checkbox, CheckboxGroup,
  // Switch,
  // Rate,
  Upload,
  Button,
  // Tag,
  Meta,
  Card,
  Table,
  Tabs, TabPane,
  Tree,
  Breadcrumb, Breadcrumbtem,
  // Menu,
  // Dropdown, DropdownButton,
  // MenuItem, SubMenu, MenuDivider, MenuItemGroup,
  // Collapse, CollapsePanel,
  // Steps, StepsStep,
  Divider,
  Icon,
  Badge,
  Avatar,
  Modal,
  Popconfirm,
  Popover,
  Progress,
  DatePicker,
  RangePicker,
  MonthPicker,
  WeekPicker,
  Drawer,
  BackTop,
  Tooltip,
  Empty,
  ConfigProvider
]
components.map(component => {
  Vue.use(component)
})

Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$destroyAll = Modal.destroyAll
Vue.prototype.$message = message
Vue.prototype.$Form = Form
