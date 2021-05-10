<template>
  <div class="header_home_container">
    <div class="left_header_home">
      <div class="logo_bg_home"></div>
      <span>电商后台管理系统</span>
    </div>
    <div class="right_header_home">
      <el-button @click="logout" type="info">logout</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout () {
      sessionStorage.removeItem('token')
      this.$router.push('/')
      this.$message.success('退出成功')
    }
  },
}
</script>

<style lang="less" scoped>
.header_home_container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left_header_home {
    display: flex;
    align-items: center;

    .logo_bg_home {
      display: inline-block;
      height: 60px;
      width: 60px;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("../../assets/logo.png");
      background-size: 60px 60px;
    }

    span {
      color: #fff;
      margin-left: 15px;
      font-size: 20px;
    }

  }

  .right_header_home {
    .el-button {
      margin-right: 15px;
    }
  }
}

</style>
