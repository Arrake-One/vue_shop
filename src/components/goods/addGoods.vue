<template>
  <div class="addGoods_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/goods'}">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-alert
        title="添加商品信息"
        show-icon
        center
        :closable="false"
        type="info">
      </el-alert>
<!--      <el-steps :active="active"-->
<!--                finish-status="success"-->
<!--      >-->
<!--        <el-step title="步骤 1"></el-step>-->
<!--        <el-step title="步骤 2"></el-step>-->
<!--        <el-step title="步骤 3"></el-step>-->
<!--        <el-step title="步骤 3"></el-step>-->
<!--        <el-step title="步骤 3"></el-step>-->
<!--        <el-step title="步骤 3"></el-step>-->
<!--      </el-steps>-->
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'addGoods',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.el-alert{
  height: 38px;
}

</style>
