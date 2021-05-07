
//复制粘贴代码模板
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

