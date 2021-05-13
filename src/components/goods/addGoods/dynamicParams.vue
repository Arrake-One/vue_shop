<template>
  <div>
    <el-form-item
       :key="index"
       :label="item.attr_name"
      v-for="(item,index) in addGoodsForm.dynamicParams">

      <el-checkbox-group
        v-model="item.attr_vals"
       >
        <el-checkbox v-for="(item1,index) in item.attr_vals"
                     border
                     :label="item1" :key="index">
          {{item1}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name:'commodityParams',
  props:['addGoodsForm','rules'],
  data(){
   return {

   }
  },
  methods:{

  },
}
</script>

<style lang="less" scoped>
.el-checkbox{
  margin:0 0 0 15px ;
}
</style>
