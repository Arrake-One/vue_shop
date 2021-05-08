//confirm
this.$confirm('确认删除该用户吗？','提示',{
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
}).then(()=>{
  this.$http.delete("/users/"+row.id).then(response=>{
    if (response.data.meta.status === 200) {
      this.$message.success(response.data.meta.msg)
      //如果查询当前的页码数大于当前页数，到最后一页去
      let last_page=Math.ceil((this.usersData.total-1)/this.getListParams.pagesize)
      if (this.getListParams.pagenum>last_page){
        this.getListParams.pagenum=last_page
      }
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
//breadcrumb
/*
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
 */

//search
/*
  <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">添加商品</el-button>
      </el-col>
    </el-row>
 */
//分页
/*
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
 */
//多选
/*
  <el-select v-model="formInline.region" placeholder="活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
 */
