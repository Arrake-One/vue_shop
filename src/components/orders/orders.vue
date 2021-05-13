<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    v-model="getListParams.query"
                    clearable
                    @clear="getOrdersList"
          >
            <el-button slot="append" icon="el-icon-search"
                       @click="getOrdersList"
            ></el-button>
          </el-input>
        </el-col>

      </el-row>
      <el-table :data="ordersData"
                border
                stripe
                style="width: 100%"
      >
        <el-table-column type="index" label="#">
        </el-table-column>
        <el-table-column label="订单编号"
                         prop="order_number"
        >

        </el-table-column>
        <el-table-column label="订单价格"
                         prop="order_price"
        >

        </el-table-column>
        <el-table-column label="是否付款"
                         prop="pay_status"
                         v-slot="{row}"
        >
          <el-tag  type="success"
            v-if="row.order_pay==='1'">
              已经付款
          </el-tag>

          <el-tag  type="danger"
                  v-else>
          未付款
          </el-tag>
        </el-table-column>
        <el-table-column label="是否发货"
                         prop="is_send"
        >

        </el-table-column>
        <el-table-column label="下单时间"
                         prop="create_time"
                         v-slot="{row}"
        >
          {{row.create_time|dataFormat}}
        </el-table-column>
        <el-table-column label="操作"
                         :width="130"
                         v-slot="{row}"
        >
          <el-button type="primary"
                     size="mini"
                     icon="el-icon-edit"
                     @click="editClick"
          ></el-button>
          <el-button type="success"
                     size="mini"
                     icon="el-icon-location"
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
    <edit-dialog
      :dialogParams="dialogParams"
      :dialogForm="dialogForm">

    </edit-dialog>
  </div>
</template>

<script>
import editDialog from '@/components/orders/editDialog'
import cityData from '@/components/orders/citydata'
export default {
  name: 'orders',
  data(){
    return {
      dialogForm:{
        editForm:{
          address1:[],
          address2:''
        }
      },
      dialogParams:{
        editVisible:false,
        cityData
      },
      ordersData: [
        {
          "order_id": 47,
          "user_id": 133,
          "order_number": "itcast-59e7502d7993d",
          "order_price": 322,
          "order_pay": "1",
          "is_send": "是",
          "trade_no": "",
          "order_fapiao_title": "个人",
          "order_fapiao_company": "",
          "order_fapiao_content": "办公用品",
          "consignee_addr": "a:7:{s:6:\"cgn_id\";i:1;s:7:\"user_id\";i:133;s:8:\"cgn_name\";s:9:\"王二柱\";s:11:\"cgn_address\";s:51:\"北京市海淀区苏州街长远天地大厦305室\";s:7:\"cgn_tel\";s:11:\"13566771298\";s:8:\"cgn_code\";s:6:\"306810\";s:11:\"delete_time\";N;}",
          "pay_status": "1",
          "create_time": 1508331565,
          "update_time": 1508331565
        }
      ],
      paginationParams: {
        total: 0,
        currentPage: 1,
        pageSizes: [5, 10, 20, 50],
        pageSize: 10
      },
      getListParams: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
    }
  },
  methods:{
    getOrdersList () {
      this.$http.get('/orders', {
        params: this.getListParams
      }).then(response => {
        if (response.data.meta.status === 200) {
          let data = response.data.data
          this.ordersData = data.goods
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
      this.getListParams.pagesize = pageSize
      this.getOrdersList()
    },
    handleCurrentChange (currentPage) {
      this.getListParams.pagenum = currentPage
      this.getOrdersList()
    },
    editClick(){
      this.dialogForm.editForm.address1=[]
      this.dialogForm.editForm.address2=''
      this.dialogParams.editVisible=true
    }
  },
  created () {
    this.getOrdersList()
  },
  components:{
    editDialog
  }
}
</script>

<style scoped>

</style>
