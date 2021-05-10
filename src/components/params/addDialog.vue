<template>
  <div>
    <el-dialog :title="'添加'+dialogParams.title" :visible.sync="dialogParams.addVisible"
    >
      <el-form :model="dialogForm.addForm"
               :rules="rules"
      >
        <el-form-item :label="dialogParams.title"
                      prop="addParam" label-width="80px">
          <el-input v-model="dialogForm.addForm.addParam"
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
  name: 'addDialog',
  props:['dialogParams','dialogForm'],
  data(){
    return {
      rules:{
        addParam:[
          {required:true,trigger:blur}
        ]
      },
    }
  },
  methods:{
    cancelSubmit(){
      this.dialogParams.addVisible=false
    },
    addSubmit(){
      this.dialogParams.addVisible=false
      this.$emit('addRequest')
    }
  }
}
</script>

<style scoped>

</style>
