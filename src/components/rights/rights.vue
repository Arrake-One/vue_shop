<template>
  <div class="users_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="getRightsList"
                border
                stripe
                style="width: 100%"
      >
        <el-table-column
          type="index"
          label="#"
        >
        </el-table-column>
        <el-table-column prop="authName"
                         label="权限名称"
        >
        </el-table-column>
        <el-table-column prop="path" label="路径">

        </el-table-column>

        <el-table-column v-slot="{row}" label="权限等级">
          <el-tag v-if="row.level==='0'">
            一级
          </el-tag>
          <el-tag type="success"
                  v-if="row.level==='1'"
          >
            二级
          </el-tag>
          <el-tag type="warning"
                  v-if="row.level==='2'"
          >
            三级
          </el-tag>
        </el-table-column>

      </el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'rights',
  data(){
    return {
      getRightsList:[]
    }
  },
  created () {
    this.$http.get('rights/list').then(response=>{
      if (response.data.meta.status === 200) {
        this.getRightsList=response.data.data
      }else {
        this.$message.error(response.data.meta.msg)
      }
    }).catch(e=>{
      console.log(e)
      this.$message.error("网络请求失败，请检查网络")
    })
  }
}
</script>

<style lang="less"scoped>

</style>
