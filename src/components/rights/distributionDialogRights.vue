<template>
  <el-dialog title="分配权限"
             :visible.sync="dialogParams.distributionVisible"
  >
    <pre>
<!--    {{dataForms}}-->
          </pre>

    <el-tree
      :data="dataForms.treeRights"
      ref="treeRights"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="dialogParams.checkedKeys"
      :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelSubmit">取 消</el-button>
      <el-button type="primary" @click="distributionSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'distributionDialogRights',
  props: ['dialogParams', 'dataForms'],
  data () {
    return {
      defaultProps:{
        children:'children',
        label:'authName'
      }
    }
  },
  methods: {
    cancelSubmit () {
      this.dialogParams.distributionVisible = false
    },
    distributionSubmit () {
      this.dialogParams.distributionVisible = false
      //不额外创建参数了，就使用这个参数传递checkedKeys
      this.dialogParams.checkedKeys=[...this.$refs.treeRights.getCheckedKeys(),...this.$refs.treeRights.getHalfCheckedKeys()]
      this.$emit('distributionSubmit')

    }
  }
}
</script>

<style scoped>

</style>
