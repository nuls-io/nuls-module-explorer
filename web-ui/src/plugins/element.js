/*import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element);*/

import Vue from 'vue';
import {Menu,MenuItem,Input,Button,Tooltip,Radio,RadioGroup,Form,FormItem,Select,Option,Dialog,Switch,Table,TableColumn,Loading,Message,Pagination,Tabs,TabPane,Row,Col,Tree,CollapseTransition} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Dialog.name, Dialog);
Vue.component(Switch.name, Switch);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.component(Pagination.name, Pagination);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Tree.name, Tree);
Vue.component(CollapseTransition.name, CollapseTransition);
