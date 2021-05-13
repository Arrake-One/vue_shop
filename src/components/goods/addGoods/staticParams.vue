<template>
  <div>
    <el-form-item v-for="(item,index) in addGoodsForm.staticParams"
                  :key="index"
                  :label="item.attr_name"
    >
      <el-input v-model="item.attr_vals"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'staticParams',
  props:['addGoodsForm']
}
</script>

<style scoped>

</style>
