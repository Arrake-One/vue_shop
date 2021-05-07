<template>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#2F323E"
      text-color="#fff"
      active-text-color="#3D97F3"
      :collapse="isCollapse"
      :style="{width:isCollapse?'64px':'200px'}"
      :collapse-transition="false"
      :default-active="this.$route.path"
      router
      >
      <div class="toggle_button_aside"
           @click="isCollapse=!isCollapse">
        |||
      </div>
      <el-submenu v-for="(item,index) in menuList"
                  :index="item.id+''"
                  :key="item.id"
                  >
        <template slot="title">
          <i :class="iconsMenu[index]"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item v-for="subItem in item.children"
                        :index="'/' + subItem.path"
                        :key="subItem.id">
            <i class="el-icon-menu"></i>
            <span>{{subItem.authName}}</span>
          </el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  name: 'Aside',
  data(){
    return {
      menuList:[],
      iconsMenu:[
        'iconfont icon-users',
        'iconfont icon-tijikongjian',
        'iconfont icon-shangpin',
        'iconfont icon-danju',
        'iconfont icon-baobiao'
      ],
      isCollapse:false
    }
  },
  created () {
    this.$http.get('menus').then(response=>{
      if (response.data.meta.status === 200) {
          this.menuList=response.data.data
      }else {
        this.$message.error(response.data.meta.msg)
      }
    }).catch(e=>{
      console.log(e)
    })
  }
}
</script>

<style lang="less" scoped>
.el-menu{
  width: 100%;
  height: 100%;
  i{
    margin-right: 15px;
  }
}
.toggle_button_aside{
  background-color: #474C5F;
  color: #fff;
  letter-spacing: 3px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
}
</style>
