
//复制粘贴代码模板
export default {
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
}

