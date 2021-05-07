<template>
  <el-container>
    <el-header>
     <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="auto">
          <Aside></Aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/Home/Header'
import Aside from '@/components/Home/Aside'
export default {
  name: 'Home',
  methods:{
  },
  components:{
    Header,
    Aside
  }
}
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
  .el-header{
    background-color: #343A3E;
    height: 60px;
    padding: 0;
  }
  .el-aside{
    background-color: #313441;
  }
  .el-main{
    background-color: #DFE2E6;
  }
}


</style>
