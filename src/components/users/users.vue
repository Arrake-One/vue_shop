<template>
  <div class="users_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    v-model="getListParams.query"
                    clearable
                    @clear="getListByQuery"
          >
            <el-button slot="append" icon="el-icon-search" @click="getListByQuery()"></el-button>
          </el-input>
        </el-col>

        <el-button type="primary" @click="dialogParams.addVisible=true">添加用户</el-button>
      </el-row>

      <el-table
        :data="usersData.users"
        stripe
        style="width: 100%"
        border
        >
        <el-table-column
          type="index"
          label="#"
         >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
         >
        </el-table-column>
<!-- slot-scope=scope   scope.row {row} es6解构赋值  -->
        <el-table-column
          label="状态"
         v-slot="{row}"
          >
          <el-switch
            v-model="row.mg_state"
            @change="statusChange(row)"
          >
          </el-switch>
        </el-table-column>
        <el-table-column
          label="编辑"
          align="center"
          v-slot="{row}"
          >
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="mini"
                      @click="editClick(row)"
          ></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="mini"
                     @click="deleteClick(row)"
          ></el-button>

          <el-tooltip  effect="dark" content="分配角色" placement="top"
                        :enterable="false"
          >
            <el-button type="warning"
                       icon="el-icon-setting"
                       size="mini"
            ></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="usersData.pagenum"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="usersData.total">
        </el-pagination>


    </el-card>


    <!--        prop传递的值，不可以直接改变对象的地址值，可以改变对象的属性-->
    <editDialogUsers :dialogParams="dialogParams"
                     :dataForms="dataForms"
                     @editRequest="editRequest"
    ></editDialogUsers>
    <add-dialog-users
      :dialogParams="dialogParams"
      :dataForms="dataForms"
      @addRequest="addRequest"
    ></add-dialog-users>

  </div>
</template>

<script>
import editDialogUsers from '@/components/users/editDialogUsers'
import addDialogUsers from '@/components/users/addDialogUsers'
export default {
  name: 'users',
  data(){
    return {
      //返回的数据，不是小驼峰式的
      usersData:{
        total:0,
        pagenum: 0,
        users:[]
      },
      pagination:{
        pageSizes:[1,2,3,6],
        pageSize:2
      },
      getListParams:{
        query:'',
        pagenum:1,
        pagesize:2
      },
 //  prop传递的值，不可以直接改变对象的地址值，可以改变对象的属性
      //参数控制对话框是否可以见等
      dialogParams:{
        editVisible:false,
        addVisible:false
      },
      dataForms:{
        //这些都是用于回显的数据，但有些会被直接覆盖
        //比如editForm，写上去为了看起来顺眼
        editForm:{
          username:'',
          email: '',
          mobile:''
        },
        addForm:{
          username:'',
          password:'',
          email: '',
          mobile:''
        }
      }
    }
  },
  methods:{
    //根据data中的数据getListParams获取用户列表数据
    getUserList(){
      this.$http.get("/users",{
        params:this.getListParams
      }).then(response=>{
        if (response.data.meta.status===200){
          this.usersData=response.data.data
        }else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e=>{
        this.$message.error("网络请求失败，请检查网络")
        console.error(e)
      })
    },
    //监听分页，每页条数变化
    handleSizeChange(pageSize){
      this.pagination.pageSize=this.getListParams.pagesize=pageSize
      this.getUserList()
    },
    //用户列表当前页发生变化，执行
    handleCurrentChange(currentPage){
      this.getListParams.pagenum=currentPage
      this.getUserList()
    },
    //编辑点击处理函数
    editClick(row){
      //row为当前行的所有数据
      this.dialogParams.editVisible=true
      this.dataForms.editForm=row
    },
    deleteClick(row){
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
    },
    //编辑修改数据处理函数
    editRequest(){
      let editForm =this.dataForms.editForm
      this.$http.put(`/users/${editForm.id}`,{
        //曾将参数类型写错，花费20分钟排错，写成params{email:xxxx}
          email:editForm.email,
          mobile:editForm.mobile
      }).then(response=>{
        if (response.data.meta.status === 200) {
          //不必刷新一次，因为传的是地址值，哪怕没请求成功，它也会该数据
          //请求失败，这条语句不执行
          this.$message.success(response.data.meta.msg)
        }else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e=>{
        this.$message.error("网络请求失败，请检查网络")
        console.error(e)
      })
    },
    //添加用户处理函数
    addRequest(){
      let addForm =this.dataForms.addForm
      this.$http.post("/users",addForm).then(response=>{
        if (response.data.meta.status === 201) {
          this.$message.success(response.data.meta.msg)
          //item为属性名，遍历属性清空
          for(let item in addForm) {
            addForm[item]=''
          }
          //到最后一页去
          this.getListParams.pagenum=Math.ceil((this.usersData.total+1)/this.getListParams.pagesize)
          this.getUserList()
        }else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e=>{
        this.$message.error("网络请求失败，请检查网络")
        console.error(e)
      })
    },
    //状态按钮改变事件函数
    statusChange(userInfo){
      this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`).then(response=>{
        if (response.data.meta.status === 200) {
          this.$message.success(response.data.meta.msg)
        }else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e=>{
        this.$message.error("网络请求失败，请检查网络")
        console.error(e)
      })
    },
    //根据参数查询用户列表
    getListByQuery(){
      //因为已经在query携带了参数
      this.getUserList()
    },

  },
  created () {
    this.getUserList()
  },
  components:{
    editDialogUsers,
    addDialogUsers
  }
}
</script>

<style lang="less" scoped>
.box-card,.el-table{
  margin-top: 15px;
}
.el-table{
  font-size: 12px;
  margin-bottom: 15px;
}

</style>
