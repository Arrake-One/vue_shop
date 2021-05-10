<template>
  <div>
    <el-button type="primary"
               size="mini"
               :disabled="addIsDisabled"
               @click="addClick"
    >添加参数
    </el-button>

    <el-table :data="dynamicParams"
              border
              stripe
    >
      <el-table-column type="expand" v-slot="{row}">
        <el-tag
          :key="index"
          v-for="(tag,index) in row.attr_vals"
          closable
          @close="handleClose(index,row)">
          {{tag}}
        </el-tag>
<!--       事实上失去enter隐藏input后，它还会执行失去焦点事件-->
        <el-input
          class="input-new-tag"
          v-if="row.inputVisible"
          v-model="row.tagValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm(row)"
          @blur="handleInputConfirm(row)"
        >
        </el-input>
        <el-button  class="button-new-tag"
                   size="small"
                    v-else
                    @click="showInputTag(row)"
                   >+ New Tag</el-button>
      </el-table-column>
      <el-table-column type="index"
                       label="#"
      ></el-table-column>

      <el-table-column label="参数名称"
                       prop="attr_name"
      >
      </el-table-column>

      <el-table-column label="操作" v-slot="{row}">
        <el-button type="primary"
                   icon="el-icon-edit"
                   size="mini"
                   @click="editClick(row)"
        >编辑</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="mini"
                   @click="deleteClick(row)"
        >删除</el-button>
      </el-table-column>
    </el-table>
    <add-dialog
      :dialogParams="dialogParams"
      :dialogForm="dialogForm"
      @addRequest="addRequest"
    ></add-dialog>
    <edit-dialog
      :dialogParams="dialogParams"
      :dialogForm="dialogForm"
      @editRequest="editRequest"
    ></edit-dialog>
  </div>

</template>

<script>
import addDialog from '@/components/params/addDialog'
import editDialog from '@/components/params/editDialog'

export default {
  name: 'dynamic',
  props:['dynamicParams','componentParams','addIsDisabled','getDynamicParams'],
  data(){
    return {
      dialogParams:{
        addVisible:false,
        editVisible:false,
        title:'动态参数'
      },
      dialogForm:{
        addForm:{
          addParam:''
        },
        editForm:{
          //当前行数据
          row:{}
        }
      }
    }
  },
  methods:{
    handleClose(index,row){
      row.attr_vals.splice(index,1)
      this.editDynamicParams(row)
    },
    handleInputConfirm(row){
      if (row.tagValue.trim().length === 0) {
          row.inputValue=''
          row.inputVisible=false
          return
      }
      row.attr_vals.push(row.tagValue.trim())
      row.inputVisible=false

      //在发出请求要前清空数据
      row.tagValue=''
      // console.log(row.attr_vals.join(','))
      this.editDynamicParams(row)
    },
    editDynamicParams(row){
      console.log(row)
      //row当前行数据
      this.$http.put(`categories/${row.cat_id}/attributes/${row.attr_id}`,{
        attr_name:row.attr_name,
        attr_sel:'many',
        attr_vals:row.attr_vals.join(',')
      }).then(response=>{
        if (response.data.meta.status===200){
          this.$message.success(response.data.meta.msg)
        }else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e=>{
        console.log(e)
        this.$message.error("网络请求失败，请检查网络")
      })
    },
    showInputTag(row){
      row.inputVisible=true
      //让文本框自动获取焦点
      //$nextTick页面重新渲染后的回调
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    addClick(){
      this.dialogParams.addVisible=true
      this.dialogForm.addForm.addParam=''
    },
    editClick(row){
      this.dialogParams.editVisible=true
      this.dialogForm.editForm.row=row
    },
    deleteClick(row){
      this.$confirm('确认删除该用户吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        console.log()
        this.$http.delete(`/categories/${row.cat_id}/attributes/${row.attr_id}`).then(response=>{
          if (response.data.meta.status === 200) {
            this.$message.success(response.data.meta.msg)
            this.getDynamicParams()
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
    addRequest(){
      this.$http.post(`/categories/${this.componentParams.cat_id}/attributes`,{
        attr_name:this.dialogForm.addForm.addParam,
        attr_sel:'many'
      }).then(response=>{
        if (response.data.meta.status===201){
          this.getDynamicParams()
          this.$message.success(response.data.meta.msg)
        }else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e=>{
        console.log(e)
        this.$message.error("网络请求失败，请检查网络")
      })
    },
    editRequest(){
      this.editDynamicParams(this.dialogForm.editForm.row)
    }
  },
  components:{
    addDialog,
    editDialog
  },

}
</script>

<style lang="less" scoped>
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.el-tag{
  margin-left: 10px;
}
.input-new-tag{
  margin-left: 10px;
  width: 120px;
  vertical-align: bottom;
}
</style>
