//confirm
this.$confirm('确认删除该用户吗？','提示',{
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
}).then(()=>{
  this.$http.delete("/users/"+row.id).then(response=>{
    if (response.data.meta.status === 200) {
      this.$message.success(response.data.meta.msg)
      //去到最后一页
      this.getListParams.pagenum=Math.ceil((this.usersData.total-1)/this.getListParams.pagesize)
      this.getUserList()
    }else {
      this.$message.error(response.data.meta.msg)
    }
  }).catch(e=>{
    this.$message.error("网络请求失败，请检查网络")
    console.error(e)
  })
}).catch(()=>{
  this.$message.info("已取消")
})
//dialog
/*
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
 */

//tree
/*
<el-tree
  :data="data"
  show-checkbox
  node-key="id"
  :default-expanded-keys="[2, 3]"
  :default-checked-keys="[5]"
  :props="defaultProps">
</el-tree>
 */
