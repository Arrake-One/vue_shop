<template>
  <div>
    <el-form-item label="商品名称" prop="goods_name">
      <el-input v-model="addGoodsForm.goods_name"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" prop="goods_price">
      <el-input v-model="addGoodsForm.goods_price"></el-input>
    </el-form-item>
    <el-form-item label="商品重量" prop="goods_weight">
      <el-input v-model="addGoodsForm.goods_weight"></el-input>
    </el-form-item>
    <el-form-item label="商品数量" prop="goods_number">
      <el-input v-model="addGoodsForm.goods_number"></el-input>
    </el-form-item>
    <el-form-item label="商品分类"
                  prop="goods_cat">
      <el-cascader
        :options="categoriesList"
        :props="props"
        v-model="addGoodsForm.goods_cat"
        clearable
        @change="changeCascaderValue"
      ></el-cascader>

    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'basicInfo',
  props: ['addGoodsForm', 'rules'],
  data(){
    return {
      categoriesList:[],
      props: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value:'cat_id',
        children:'children',
      },
    }
  },
  methods:{
    getCategoriesList(){
      this.$http.get('categories').then(response=>{
        if (response.data.meta.status === 200) {
           this.categoriesList=response.data.data
        }else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e=>{
        console.log(e)
        this.$message.error(msgTemplate.catchInfo)
      })
    },
    changeCascaderValue(){
      if (this.addGoodsForm.goods_cat.length!==3){
        this.addGoodsForm.goods_cat=[]
      }
    }
  },
  created () {
    this.getCategoriesList()
  }
}
</script>

<style scoped>

</style>
