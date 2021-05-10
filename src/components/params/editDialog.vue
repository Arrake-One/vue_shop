<template>
  <div>
  <el-dialog :title="'修改'+dialogParams.title" :visible.sync="dialogParams.editVisible"
  >
    <el-form :model="dialogForm.editForm.row"
             :rules="rules"
    >
      <el-form-item :label="dialogParams.title"
                    prop="attr_name" label-width="80px">
        <el-input v-model="dialogForm.editForm.row.attr_name"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit">取 消</el-button>
      <el-button type="primary" @click="addSubmit">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'editDialog',
  props:['dialogParams','dialogForm'],
  data(){
    return {
      rules:{
        attr_name:[
          {required:true,trigger:blur}
        ]
      },
    }
  },
  methods:{
    cancelSubmit(){
      this.dialogParams.editVisible=false
    },
    addSubmit(){
      this.dialogParams.editVisible=false
      this.$emit('editRequest')
    }
  }
}
</script>

<style scoped>

</style>
