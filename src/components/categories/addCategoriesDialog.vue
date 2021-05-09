<template>
  <div class="addCategories_container">
    <el-dialog title="添加分类" :visible.sync="dialogParams.addVisible"
    >
      <el-form :model="dataForm.addForm"
               :rules="rules"
               ref="addForm"
      >
        <el-form-item label="分类名称"
                      label-width="80px"
                      prop="cat_name">
          <el-input v-model="dataForm.addForm.cat_name"></el-input>
        </el-form-item>

        <el-form-item label="父类分类"
                      label-width="80px"
                      style="width: 100%"
        >
          <el-cascader
            :options="dataForm.addForm.categoriesList"
            :props="props"
            v-model="dataForm.addForm.selectKeys"
            clearable
            style="width: 100%"
            ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addCategoriesDialog',
  props: ['dialogParams', 'dataForm'],
  data () {
    return {
      props: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value:'cat_id',
        checkStrictly:true
      },
      rules:{
        cat_name:[
          {required:true,message:'必须填写',trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    cancelSubmit () {
      this.dialogParams.addVisible = false
    },
    addSubmit () {
      this.$refs.addForm.validate(valid=>{
        if (valid){
          this.dialogParams.addVisible = false
          this.$emit('addRequest')
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
