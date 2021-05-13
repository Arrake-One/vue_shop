<template>
  <div class="categories_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="4">
          <el-button type="primary"
                     @click="addCategories"
          >添加分类</el-button>
        </el-col>
      </el-row>
<!--      使用依赖vue-table-tree-grid-->
      <tree-table
        class="tree_table"
        :data="categoriesData"
        :columns="columns"
        border
        show-index
        index-text="#"
        :selection-type="false"
        :expand-type="false"
      >
        <template v-slot:validity="{row}">
          <i class="el-icon-success"
             style="color:lightgreen;font-size: 15px"
              v-if="!row.cat_deleted"
          ></i>
          <i class="el-icon-error"
             style="color: red;font-size: 15px"
             v-else
          ></i>
        </template>

        <template v-slot:level="{row}">
          <el-tag type="primary"
                  v-if="row.cat_level===0"
          >一级</el-tag>
          <el-tag type="warning"
                  v-if="row.cat_level===1"
          >二级</el-tag>
          <el-tag type="success"
                  v-if="row.cat_level===2"
          >三级</el-tag>
        </template>

        <template v-slot:option="{row}">
          <el-button icon="el-icon-edit"
                     type="primary"
                     size="mini"
          >编辑</el-button>
          <el-button icon="el-icon-delete"
                     type="danger"
                     size="mini"
          >删除</el-button>
        </template>
      </tree-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pagenum"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    >

    </el-pagination>
    </el-card>
    <add-categories-dialog
      :dialogParams="dialogParams"
      :dataForm="dataForm"
      @addRequest="addRequest"
    ></add-categories-dialog>
  </div>
</template>

<script>
import addCategoriesDialog from '@/components/categories/addCategoriesDialog'

export default {
  name: 'categories',
  data () {
    return {
      categoriesData: [],
      pagination: {
        pagenum: 1,
        pageSizes: [1, 5, 10, 20],
        pageSize: 5,
        total: 0,
      },
      getListParams: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      dialogParams:{
        addVisible:false,
      },
      dataForm:{
        addForm: {
          categoriesList:[],
          selectKeys:[],
          cat_pid:'',
          cat_name:'',
          cat_level:0
        }
      },
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          //插槽名
          template: 'validity',
          type: 'template'
        },
        {
          label: '等级',
          template: 'level',
          type:'template'
        },
        {
          label: '操作',
          template: 'option',
          type:'template'
        }
      ]
    }
  },
  methods: {
    getCategoriesList () {
      this.$http.get('/categories', {
        params: this.getListParams
      }).then(response => {
        if (response.data.meta.status === 200) {
          this.categoriesData = response.data.data.result
          this.pagination.total = response.data.data.total
          this.pagination.pageSize = this.getListParams.pagesize
          this.pagination.pagenum = this.getListParams.pagenum
        } else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e => {
        console.log(e)
        this.$message.error('网络请求失败，请检查网络')
      })
    },
    addCategories(){
      this.dialogParams.addVisible=true
      let addForm = this.dataForm.addForm
      //格式化表单
      addForm.selectKeys=[]
      addForm.cat_name=''
      addForm.cat_level=0
      addForm.cat_pid=0
      this.$http.get('/categories',{
        params:{
          type:2
        }
      }).then(response => {
        if (response.data.meta.status === 200) {
          this.dataForm.addForm.categoriesList=response.data.data
        } else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e => {
        console.log(e)
        this.$message.error('网络请求失败，请检查网络')
      })

    },
    addRequest(){
      let addForm = this.dataForm.addForm
      let addLength = addForm.selectKeys.length
      //顶级元素父元素为0
      addLength!==0?addForm.cat_pid=addForm.selectKeys[addLength-1]:addForm.cat_pid=0
      addForm.cat_level=addLength
      this.$http.post('/categories',{
        cat_pid:addForm.cat_pid,
        cat_name:addForm.cat_name,
        cat_level:addForm.cat_level
      }).then(response=>{
        if (response.data.meta.status === 201) {
          this.$message.success(response.data.meta.msg)
          this.getCategoriesList()
        } else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e => {
        console.log(e)
        this.$message.error('网络请求失败，请检查网络')
      })
    },
    handleSizeChange(pageSize){
      this.getListParams.pageSize=pageSize
      this.getCategoriesList()
    },
    handleCurrentChange(pagenum){
      this.getListParams.pagenum=pagenum
      this.getCategoriesList()
    }
  },
  created () {
    this.getCategoriesList()
  },
  components:{
    addCategoriesDialog
  }
}
</script>

<style lang="less" scoped>
.tree_table {
  margin-top: 15px;
}
</style>
