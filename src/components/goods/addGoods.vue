<template>
  <div class="addGoods_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/goods'}">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-alert
        title="添加商品信息"
        show-icon
        center
        :closable="false"
        type="info">
      </el-alert>
      <!--      :active要求为数值，通过减0，转类型，细节！！！-->
      <el-steps align-center
                :space="200"
                :active="activeIndex-0" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :model="addGoodsForm"
               label-position="top"
               ref="addGoodsDom"
               :rules="rules">
        <el-tabs tab-position="left"
                 class="margin_top"
                 v-model="activeIndex"
                 :before-leave="handleBeforeTab"
                 @tab-click="handleTab"
        >

          <el-tab-pane label="基本信息" name="0">
            <basic-info :addGoodsForm="addGoodsForm"
                        :rules="rules"
            ></basic-info>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <dynamic-params
              :addGoodsForm="addGoodsForm"
              :rules="rules"
            ></dynamic-params>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <static-params
              :addGoodsForm="addGoodsForm"
              :rules="rules"
            ></static-params>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              :action="activeURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :headers="headers"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addGoodsForm.goods_introduce"></quill-editor>
            <el-button type="primary" @click="addSubmit"
                       class="margin_top"
            >添加商品
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <el-dialog
      title="图片预览"
      :visible.sync="pictureVisible"
      width="50%">
      <img :src="pictureUrl" alt="" style="width: 100%">
    </el-dialog>

  </div>
</template>

<script>
import basicInfo from '@/components/goods/addGoods/basicInfo'
import dynamicParams from '@/components/goods/addGoods/dynamicParams'
import staticParams from '@/components/goods/addGoods/staticParams'
import _ from 'lodash'

export default {
  name: 'addGoods',
  data () {
    let check_cat = (rule, value, callback) => {
      if (this.addGoodsForm.goods_cat.length !== 3) {
        callback(new Error('请选择商品分类'))
      } else {
        callback()
      }
    }
    return {
      activeIndex: '0',
      pictureVisible: false,
      pictureUrl: '',
      activeURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      addGoodsForm: {
        goods_name: '',
        //分类列表
        goods_cat: [],
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        pics: [],
        attrs: [],
        dynamicParams: [],
        staticParams: []
      },
      rules: {
        goods_name: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }
        ],
        goods_cat: [
          {
            validator: check_cat,
            trigger: 'blur'
          }
        ],
        goods_price: [
          {
            required: true,
            message: '请输入商品价格',
            trigger: 'blur'
          }
        ],
        goods_number: [
          {
            required: true,
            message: '请输入商品数量',
            trigger: 'blur'
          }
        ],
        goods_weight: [
          {
            required: true,
            message: '请输入商品重量',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleTab () {
      if (this.activeIndex === '1') {
        this.getDynamicParams()
      } else if (this.activeIndex === '2') {
        this.getStaticParams()
      }
    },
    handleBeforeTab (to, from) {
      let flag = true
      if ((from - 0) === 0) {
        this.$refs.addGoodsDom.validateField(['goods_name', 'goods_cat'],
          (errorMsg) => {
            //如果没有验证成功返回空‘’，神之一笔
            if (errorMsg) {
              flag = false
            }
          })
      }

      if (!flag) {
        this.$message.error('请输入必须项')
      }
      return flag
    },
    getDynamicParams () {
      this.$http.get(`categories/${this.catId}/attributes`, {
        params: {
          sel: 'many'
        }
      }).then(response => {
        if (response.data.meta.status === 200) {
          this.addGoodsForm.dynamicParams = response.data.data
          this.addGoodsForm.dynamicParams.forEach(item => {
            item.attr_vals =
              item.attr_vals.length === 0 ? [] :
                item.attr_vals.split(',')
          })
        } else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e => {
        console.log(e)
        this.$message.error(msgTemplate.catchInfo)
      })
    },
    getStaticParams () {
      this.$http.get(`categories/${this.catId}/attributes`, {
        params: {
          sel: 'only'
        }
      }).then(response => {
        if (response.data.meta.status === 200) {
          this.addGoodsForm.staticParams = response.data.data
        } else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e => {
        console.log(e)
        this.$message.error(msgTemplate.catchInfo)
      })
    },
    handlePreview (file) {
      this.pictureVisible = true
      this.pictureUrl = file.response.data.url
    },
    handleRemove (file) {
      let filePath = file.response.data.tmp_path
      let index = this.addGoodsForm.pics.findIndex(x => {
        return x.pic === filePath
      })
      this.addGoodsForm.pics.splice(index, 1)
    },
    handleSuccess (res) {
      let pictureInfo = {
        pic: res.data.tmp_path
      }
      this.addGoodsForm.pics.push(pictureInfo)
    },
    addSubmit () {
      this.$refs.addGoodsDom.validate(valid => {
        if (!valid) {
          return this.$message.error('请填写表单必填项')
        }
        let form = _.cloneDeep(this.addGoodsForm)
        form.goods_cat = form.goods_cat.join(',')
        form.dynamicParams.forEach(item => {
          let newInfo = {
            'attr_id': item.attr_id,
            'attr_value': item.attr_vals.join(',')
          }
          form.attrs.push(newInfo)
        })

        form.staticParams.forEach(item => {
          let newInfo = {
            'attr_id': item.attr_id,
            'attr_value': item.attr_vals
          }
          form.attrs.push(newInfo)
        })
        this.$http.post('/goods', form).then(res => {
          if (res.data.meta.status === 201) {
            this.$message.success(res.data.meta.msg)
            this.$router.push('/goods')
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })

      })
    }
  },
  computed: {
    catId () {
      if (this.addGoodsForm.goods_cat.length === 3) {
        return this.addGoodsForm.goods_cat[2]
      } else {
        return null
      }
    }
  },
  components: {
    basicInfo,
    dynamicParams,
    staticParams
  }
}
</script>

<style lang="less" scoped>
.el-alert {
  height: 38px;
}


</style>
