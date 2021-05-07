<template>
  <div class="login_container">
    <div class="login_board">
      <div class="login_logo">
        <div class="login_img"></div>
      </div>
      <el-form ref="login_form" :rules="rules" :model="login_form" class="login_form">
        <el-form-item prop="username">
          <el-input v-model="login_form.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="login_form.password" prefix-icon="iconfont icon-3702mima"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item class="login_buttons">
          <el-button type="primary" @click="login">login</el-button>
          <el-button type="info" @click="resetForm">reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      login_form: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      },

    }
  },
  methods: {
    resetForm () {
      this.$refs.login_form.resetFields()
    },
    login () {
      this.$refs.login_form.validate(valid => {
        if (valid) {

          let duration = 1000
          this.$message({
            message: '登录中。。。',
            duration,
            type: 'success',
          })
          let reminder = setTimeout(() => {
            if (location.href.search('/login') !== -1) {
              this.$message.error('服务器响应超时,请重试')
            }
          }, duration)

          axios.post('/login', this.login_form).then(response => {
            this.$message.closeAll()
            if (response.data.meta.status === 200) {

              this.$message.success(response.data.meta.msg)

              sessionStorage.setItem('token', response.data.data.token)

              this.$router.push({
                path: '/home'
              })
              clearTimeout(reminder)
            } else {
              this.$message.error(response.data.meta.msg)
              clearTimeout(reminder)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #0096c7;
  position: relative;

  .login_board {
    height: 300px;
    width: 500px;
    background-color: #fff;
    border-radius: 5px;

    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

    .login_logo {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);

      height: 130px;
      width: 130px;
      background-color: #fff;
      border-radius: 50%;
      border: 1px solid #eee;
      box-shadow: 0 0 15px #ddd;
      padding: 10px;

      .login_img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
        background-image: url("../assets/logo.png");
        background-clip: content-box;
        background-size: 100% 100%;
      }
    }

    .login_form {
      margin: 100px 20px;

      .login_buttons {
        margin-top: 30px;
        display: flex;
        justify-content: center;
      }
    }

  }
}
</style>
