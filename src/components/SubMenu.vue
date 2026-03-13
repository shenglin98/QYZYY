<template>
  <div>
      <template v-for="(item) in submenu">
          <el-submenu 
          v-if="item.children && item.children.length>0" 
          :key="item.id" :index="'/index/list/'+item.id">
              <template slot="title">{{ status == '1'?item.name:item.name_en}}</template>
              <sub-menu :submenu="item.children" :status="status"  />
          </el-submenu>
          <el-menu-item v-else :key="item.id" :index="'/index/list/'+item.id">
              <span slot="title">{{ status == '1'?item.name:item.name_en}}</span>
          </el-menu-item>
      </template>
  </div>
</template>


<script>
import Cookies from 'js-cookie'
  export default {
    name: 'SubMenu',
    props: {
      submenu: Array,
      status:String
    }
  }
</script>
