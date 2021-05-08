<template>
  <div class="distribution_container">
    <el-dialog title="分配角色" :visible.sync="dialogParams.distributionVisible"

    >
      <p>当前用户：{{ dataForms.distributionForm.username }}</p>
      <p>当前角色：{{ dataForms.distributionForm.role_name }}</p>
      <p>分配新角色：
        <el-select v-model="dataForms.distributionForm.changeRole_id" placeholder="请选择">
          <el-option v-for="(item,index) in dataForms.distributionForm.roleList"
                     :key="index"
                     :label="item.roleName"
                     :value="item.id"
          ></el-option>

        </el-select>
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="distributionSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'distributionDialogUsers',
  props: ['dialogParams', 'dataForms'],
  methods:{
    cancelSubmit(){
      this.dialogParams.distributionVisible=false
      this.dataForms.distributionForm.changeRole_id=''
    },
    distributionSubmit(){
      this.dialogParams.distributionVisible=false
      this.$emit('distributionRequest')
    }
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 15px;
}
</style>
