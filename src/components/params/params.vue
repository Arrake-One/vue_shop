<template>

  <div class="params_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert type="warning"
                title="注意：只允许为第三级分类设置相关参数！"
                show-icon
                :closable="false"
      ></el-alert>
      <div class="margin_top">
        选择商品分类：
        <el-cascader
          :options="categoriesList"
          :props="props"
          clearable
          @change="handleClick"
          v-model="selectKeys"
          ></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="动态参数" name="dynamic">
            <dynamic-params-component :dynamicParams="dynamicParams"
                                      :componentParams="componentParams"
                                      :addIsDisabled="addIsDisabled"
                                      :getDynamicParams="getDynamicParams"
            ></dynamic-params-component>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="static">
<!--          //传方法进去-->
          <static-params-component
            :staticAttribute="staticAttribute"
            :componentParams="componentParams"
            :addIsDisabled="addIsDisabled"
            :getStaticParams="getStaticParams"
          ></static-params-component>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>

</template>

<script>
import dynamicParamsComponent from '@/components/params/dynamicParamsComponent'
import staticParamsComponent from '@/components/params/staticParamsComponent'

export default {
  name: 'params',
  data(){
    return {
      categoriesList:[],
      selectKeys:[],
      //原则上讲，这两个数据传入组件为了方便修改，应该放在一个参数里面的
      staticAttribute:[],
      dynamicParams:[],
      componentParams:{
        cat_id:0
      },
      props:{
        expandTrigger: 'hover',
        label: 'cat_name',
        value:'cat_id',
        children:'children'
      },
      //tabs component select
      activeName:'dynamic',
    }
  },
  methods:{
    getCategoriesList(){
        this.$http.get('/categories').then(response=>{
          if (response.data.meta.status === 200) {
              this.categoriesList=response.data.data
          }else {
              this.$message.error(response.data.meta.msg)
          }
        }).catch(e=>{
          console.log(e)
          this.$message.error("网络请求失败，请检查网络")
        })
    },
    getStaticParams(){
      this.$http.get(`categories/${this.selectKeys[2]}/attributes`,{
        params:{
          sel:'only'
        }
      }).then(response=>{
        if (response.data.meta.status === 200) {
          response.data.data.forEach(item=>{
            item.attr_vals=''===item.attr_vals?[]:item.attr_vals.split(',')
            item.inputVisible=false
            item.tagValue=''
          })
          this.staticAttribute=response.data.data
        }else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e=>{
        console.log(e)
        this.$message.error("网络请求失败，请检查网络")
      })
    },
    //知道我为什么不通过传一个参数将它们封装起来吗？
    //因为我不知道怎么起它们的方法名，叫getParams缺少点东西不合适
    //叫getStaticOrDynamicParams太长了，也不合适
    getDynamicParams(){
      this.$http.get(`categories/${this.selectKeys[2]}/attributes`,{
        params:{
          sel:'many'
        }
      }).then(response=>{
        if (response.data.meta.status === 200) {
          response.data.data.forEach(item=>{
            item.attr_vals=''===item.attr_vals?[]:item.attr_vals.split(',')
            item.inputVisible=false
            item.tagValue=''
          })
          this.dynamicParams=response.data.data
        }else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e=>{
        console.log(e)
        this.$message.error("网络请求失败，请检查网络")
      })

    },
    handleClick(){
      sessionStorage.setItem('categoriesActive',this.activeName)
      if (this.selectKeys.length !== 3) {
        this.dynamicParams=[]
        this.staticAttribute=[]
        return
      }
      this.componentParams.cat_id=this.selectKeys[2]
      if (this.activeName==='static'){
        this.getStaticParams()
      }else if(this.activeName==='dynamic'){
        this.getDynamicParams()
      }

    }
  },
  computed:{
    addIsDisabled(){
      return this.selectKeys.length !== 3
    }
  },
  created () {
    this.getCategoriesList()
    // console.log(sessionStorage.getItem('categoriesActive'))
    // this.activeName=null
    let categoriesActive=sessionStorage.getItem('categoriesActive')
    if (categoriesActive){
      this.activeName=categoriesActive
    }else {
      this.activeName='dynamic'
      sessionStorage.setItem('categoriesActive','dynamic')
    }
  },
  components:{
    //为什么起这么长的名字
    //背单词！！！
    dynamicParamsComponent,
    staticParamsComponent
  }
}
</script>

<style scoped>

</style>
