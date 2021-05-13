<template>
  <div class="goods_container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    v-model="getGoodsParams.query"
                    clearable
                    @clear="getGoodsList"
          >
            <el-button slot="append" icon="el-icon-search"
                       @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addGoodsClick">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsData"
                border
                stripe
                style="width: 100%"
      >
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column label="商品名称"
                         prop="goods_name"
        >

        </el-table-column>
        <el-table-column label="商品价格(元)"
                         prop="goods_price"
                         :width="95"
        >

        </el-table-column>
        <el-table-column label="商品重量"
                         prop="goods_weight"
                         :width="70"
        >

        </el-table-column>
        <el-table-column label="创建时间"
                         prop="add_time"
                         :width="160"
                         v-slot="{row}"
        >
          {{row.add_time|dataFormat}}
        </el-table-column>
        <el-table-column label="操作"
                         :width="130"
                         v-slot="{row}"
        >
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-edit"
          ></el-button>
          <el-button type="danger"
                     size="mini"
                     icon="el-icon-delete"
                     @click="deleteClick(row)"
          ></el-button>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginationParams.currentPage"
        :page-sizes="paginationParams.pageSizes"
        :page-size="paginationParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationParams.total">
      </el-pagination>
    </el-card>


  </div>
</template>

<script>
export default {
  name: 'goods',
  data () {
    return {
      goodsData: [],
      paginationParams: {
        total: 0,
        currentPage: 1,
        pageSizes: [5, 10, 20, 50],
        pageSize: 10
      },
      getGoodsParams: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  methods: {
    getGoodsList () {
      this.$http.get('/goods', {
        params: this.getGoodsParams
      }).then(response => {
        if (response.data.meta.status === 200) {
          let data = response.data.data
          this.goodsData = data.goods
          this.paginationParams.currentPage = parseInt(data.pagenum)
          this.paginationParams.total = data.total
        } else {
          this.$message.error(response.data.meta.msg)
        }
      }).catch(e => {
        console.error(e)
        this.$message.error('网络请求失败,请检查网络')
      })
    },
    handleSizeChange (pageSize) {
      this.getGoodsParams.pagesize = pageSize
      this.getGoodsList()
    },
    handleCurrentChange (currentPage) {
      this.getGoodsParams.pagenum = currentPage
      this.getGoodsList()
    },
    deleteClick (row) {
      this.$confirm('确认删除该商品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/goods/' + row.goods_id).then(response => {
          if (response.data.meta.status === 200) {
            this.$message.success(response.data.meta.msg)
            //如果查询当前的页码数大于当前页数，到最后一页去
            let last_page = Math.ceil((this.paginationParams.total - 1) / this.paginationParams.pageSize)
            if (this.getGoodsParams.pagenum > last_page) {
              this.getGoodsParams.pagenum = last_page
            }
            this.getGoodsList()
          } else {
            this.$message.error(response.data.meta.msg)
          }
        }).catch(e => {
          this.$message.error('网络请求失败，请检查网络')
          console.error(e)
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    },
    addGoodsClick(){
      this.$router.push('/goods/add')
    }
  },
  created () {
    this.getGoodsList()
  }
}
</script>

<style>

</style>
