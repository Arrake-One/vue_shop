<template>
  <el-dialog title="修改用户" :visible.sync="dialogParams.editVisible"
  >
    <el-form ref="editForm" :model="dataForms.editForm"
             label-width="80px"
             :rules="rules"
    >
      <el-form-item label="用户名">
        <el-input v-model="dataForms.editForm.username"
                  disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForms.editForm.email" ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="dataForms.editForm.mobile" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit('editForm')">取 消</el-button>
      <el-button type="primary" @click="editSubmit('editForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'editDialog',
  props: ['dialogParams', 'dataForms'],
  data () {
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
      rules:{
        email: [
          { validator: emailValidator,required:true, trigger: 'blur' }
        ],
        mobile: [
          { validator: mobileValidator, required:true,trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    //按下表单确定后的处理函数
    editSubmit (editForm) {
      this.$refs[editForm].validate(valid=>{
        if (valid){
          this.dialogParams.editVisible = false
          this.$emit('editRequest',)
        }
      })

    },
    cancelSubmit(editForm){
      this.dialogParams.editVisible = false
      this.$refs[editForm].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
