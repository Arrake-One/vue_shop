<template>
<div>
  <el-dialog
    title="修改地址"
    :visible.sync="dialogParams.editVisible"
    width="50%"
   >
    <el-form ref="editForm" :model="dialogForm.editForm"
             label-width="90px"
             :rules="rules"
    >
      <el-form-item label="省市区/县" prop="address1">
        <el-cascader
          :options="dialogParams.cityData"
          :props="props"
          v-model="dialogForm.editForm.address1"
          clearable
          style="width: 100%"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="详细地址" prop="address2">
        <el-input v-model="dialogForm.editForm.address2"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
    <el-button @click="cancelSubmit">取 消</el-button>
    <el-button type="primary" @click="addSubmit">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'editDialog',
  props:['dialogForm','dialogParams'],
  data(){
    return {
     rules:{
       address1:[
         {required:require,message:'请选择地址',trigger:'blur'}
       ],
       address2:[
         {required:require,message:'请选择填写地址',trigger:'blur'}
       ]
     }
    }
  },
  methods:{
    cancelSubmit(){
      this.dialogParams.editVisible=false
    },
    addSubmit(){
      this.dialogParams.editVisible=false
    }
  }
}
</script>

<style scoped>

</style>
