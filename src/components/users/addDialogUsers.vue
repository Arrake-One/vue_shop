<template>
  <el-dialog title="添加用户" :visible.sync="dialogParams.addVisible"
  >
    <el-form ref="addForm" :model="dataForms.addForm"
             label-width="80px"
             :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="dataForms.addForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password"
      >
        <el-input v-model="dataForms.addForm.password"
                  show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="password_repeat"
      >
        <el-input v-model="repeatPassword"
                  show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForms.addForm.email" ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="dataForms.addForm.mobile" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit">取 消</el-button>
      <el-button type="primary" @click="addSubmit">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
export default {
  name: 'addDialogUsers',
  props:['dialogParams','dataForms'],
  data(){
    let passwordValidator=(rule,value,callback)=>{
      if (!this.isRepeatPassword){
        callback(new Error("两次输入的密码不一致"))
      }else {
        callback()
      }
    }
    let passwordRepeatValidator=(rule,value,callback)=>{
      if (this.repeatPassword!==this.dataForms.addForm.password){
        this.isRepeatPassword=false
        //主动触发验证
        this.$refs.addForm.validateField('password')
        callback(new Error("两次输入的密码不一致"))
      }else {
        callback()
        this.isRepeatPassword=true
        //主动触发验证
        this.$refs.addForm.validateField('password')
      }
    }
    let emailValidator=(rule, value, callback)=>{
      let regEmail= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (!regEmail.test(value)){
        callback(new Error("请输入正确的邮箱"))
      }else {
        //必须写上，否则在调用validate效应数据时，传入的回调函数无效
        callback()
      }
    };
    let mobileValidator=(rule, value, callback)=>{
      let regMobile=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (!regMobile.test(value)){
        callback(new Error("请输入正确的手机号"))
      }else {
        callback()
      }
    };
    return {
      repeatPassword:'',
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          {validator:passwordValidator,trigger: 'blur'}
        ],
        password_repeat:[
          {validator:passwordRepeatValidator,trigger: 'blur',required: true}
        ],
        email: [
          { validator: emailValidator,required:true, trigger: 'blur' }
        ],
        mobile: [
          { validator: mobileValidator, required:true,trigger: 'blur' }
        ],
      },
      isRepeatPassword:true
    }
  },
  methods:{
    cancelSubmit(){
      this.dialogParams.addVisible=false
      this.$refs.addForm.resetFields()
      this.repeatPassword=''
    },
    addSubmit(){
      this.$refs.addForm.validate(valid=>{
        if (valid){
          this.$emit('addRequest')
          this.dialogParams.addVisible=false
          this.repeatPassword=''
        }
      })

    }
  }
}
</script>

<style scoped>

</style>
