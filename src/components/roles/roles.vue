<template>
  <div class="users_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-button type="primary" @click="dialogParams.addVisible=true">添加角色</el-button>
      <el-table :data="RolesData"
                stripe
                style="width: 100%"
                border
      >
        <el-table-column type="expand" v-slot="{row}">
          <el-row v-for="(item1,index) in row.children"
                  :class="[index===0?'dividerTop':'','dividerBottom','col_center']"
                  :key="item1.id"
          >
            <el-col :span='6'
            >
              <el-tag closable @close="deleteRights(row,item1.id)">
                {{ item1.authName }}
              </el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>

            <el-col :span='18'>
              <el-row v-for="(item2,index) in item1.children"
                      :class="[index===item1.children.length-1?'':'dividerBottom','col_center']"
                      :key="item2.id">
                <el-col :span="6">
                  <el-tag type="success" closable
                          @close="deleteRights(row,item2.id)"
                  >
                    {{ item2.authName }}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>

                <el-col :span="18">
                    <el-tag  v-for="item3 in item2.children"
                             @close="deleteRights(row,item3.id)"
                             :key="item3.id" type="warning" closable>
                      {{ item3.authName }}
                    </el-tag>
                </el-col>

              </el-row>
            </el-col>

          </el-row>


        </el-table-column>
        <el-table-column
          type="index"
          label="#"
        >
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色"
        >
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="描述"
        >
        </el-table-column>

        <el-table-column
          label="编辑"
          align="center"
          v-slot="{row}"
        >
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="mini"
          >编辑
          </el-button>

          <el-button type="danger"
                     icon="el-icon-delete"
                     size="mini"
          >删除
          </el-button>

          <el-button type="warning"
                     icon="el-icon-setting"
                     size="mini"
                     @click="distributionClick(row)"
          >分配权限
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <distribution-dialog-rights
      :dialogParams="dialogParams"
      :dataForms="dataForms"
      @distributionSubmit="distributionRequest"
    >
    </distribution-dialog-rights>

  </div>



</template>

<script>
import distributionDialogRights from '@/components/rights/distributionDialogRights'

export default {
  name: 'roles',
  data () {
    return {
      RolesData: [],
      dataForms:{
        treeRights:[]
      },
      dialogParams:{
        distributionVisible:false,
        roleId:'',
        checkedKeys:[]
      },
    }
  },
  created () {
   this.getRolesList()
  },
  methods:{
    getRolesList(){
      this.$http.get('/roles').then(response => {
        if (response.data.meta.status === 200) {
          this.RolesData = response.data.data
        } else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e => {
        console.log(e)
        this.$message.error('网络请求失败，请检查网络')
      })
    },
    deleteRights(row,right_id){
      let role_id=row.id
      this.$confirm('确认删除该权限吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$http.delete(`roles/${role_id}/rights/${right_id}`).then(response=>{
          if (response.data.meta.status === 200) {
            //妙笔，不用更新页面，返回的数据仅是权限信息
            row.children=response.data.data
            this.$message.success(response.data.meta.msg)
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
    //row用于获取权限id，用作勾选
    distributionClick(row){
      this.$http.get('/rights/tree').then(response=>{
        if (response.data.meta.status===200){
          this.dataForms.treeRights=response.data.data
        }else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e=>{
        this.$message.error("网络请求失败，请检查网络")
        console.error(e)
      })
      this.dialogParams.distributionVisible=true
      this.dialogParams.checkedKeys=[]
      this.getRightId(row)

      //为后面提交数据作铺垫
      this.dialogParams.roleId=row.id

    },
    getRightId(rights){
      if (!rights.children){
        this.dialogParams.checkedKeys.push(rights.id)
      }else {
        rights.children.forEach(item=>{
          this.getRightId(item)
        })
      }
    },
    /*
    按钮表单提交的
    */
    distributionRequest(){
        this.$http.post(`roles/${this.dialogParams.roleId}/rights`,{
          //需要将参数转换为字符串
          rids:this.dialogParams.checkedKeys.join(',')
        }).then(response=>{
          if (response.data.meta.status===200){
            //刷新一遍数据
            this.getRolesList()
            this.$message.success(response.data.meta.msg)
          }else {
            this.$message.error(response.data.meta.msg)
          }
        }).catch(e=>{
          this.$message.error("网络请求失败，请检查网络")
          console.error(e)
        })
    }
  },

  components:{
    distributionDialogRights
  }
}
</script>

<style lang="less" scoped>
.dividerTop{
  border-top: 1px solid #eee;
}
.dividerBottom{
  border-bottom:1px solid #eee;
}
.el-tag{
  margin:7px;
}
.col_center{
  display: flex;
  align-items: center;
}
</style>
