<template>
  <div class="content">
    <div class="title">退货订单详情</div>
    <div class="table">
      <div class="item">
        <div class="left">订单编号:</div>
        <div class="right">{{ myPostForm.order_id }}</div>
      </div>
      <div class="item">
        <div class="left">退款总价:</div>
        <div class="right red">￥{{ myPostForm.price }}</div>
      </div>

      <div class="item">
        <div class="left">申请时间:</div>
        <div class="right">{{ formatTime(myPostForm.apply_refund_time) }}</div>
      </div>

      <div class="item">
        <div class="left">申请退款人:</div>
        <div class="right">{{ myPostForm.nickname }}（{{ myPostForm.membership_id }}）</div>
      </div>

      <div class="item">
        <div class="left">退货物流公司:</div>
        <div class="right">{{ formatExpress(myPostForm.express_company) }}</div>
      </div>
      <div class="item">
        <div class="left">退货物流单号:</div>
        <div class="right">{{ myPostForm.express_code }}</div>
      </div>
      <div class="item" style="padding: 5px 3px">
        <div class="left">退货订单状态:</div>
        <div class="right">

          <el-select v-model="myPostForm.status" :disabled="ifDisabled" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>

        </div>
      </div>

      <div v-if="myPostForm.status==5||myPostForm.status==7" class="item" style="padding: 5px 3px">
        <div class="left">商家收货人:</div>
        <div class="right">
          <div style="margin-left: 10px"> 收货人：</div>
          <el-input v-model="myPostForm.refund_contacts" placeholder="请输入收货人" style="width: 140px"/>
          <div style="margin-left: 10px"> 联系方式：</div>
          <el-input v-model="myPostForm.refund_phone" placeholder="联系方式" style="width: 140px"/>
        </div>
      </div>
      <div v-if="myPostForm.status==5||myPostForm.status==7" class="item" style="padding: 5px 3px">
        <div class="left">商家收货地址：</div>
        <div class="right">
          <el-input v-model="myPostForm.refund_address" placeholder="收货地址" style="width: 420px"/>
        </div>
      </div>


      <div v-if="myPostForm.status>=5" class="item" style="padding: 5px 3px">
        <div class="left">退货快递公司：</div>
        <div class="right">
          <el-select v-model="myPostForm.refund_express_company" placeholder="请选择" style="width: 120px" disabled>
            <el-option
              v-for="item in express"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div v-if="myPostForm.status>=5" class="item" style="padding: 5px 3px">
        <div class="left">退货快递编号：</div>
        <div class="right">
          <el-input v-model="myPostForm.refund_express_code" placeholder="暂无" disabled style="width: 420px"/>
        </div>
      </div>


      <div class="item">
        <div class="left">订单备注：</div>
        <div class="right">{{ myPostForm.remark }}</div>
      </div>
      <div class="item">
        <el-button type="primary" style="margin-left: 10px" @click="submitForm">确定</el-button>
      </div>
    </div>

    <div class="title">商品信息</div>
    <div class="goods">
      <el-table
        :data="myPostForm.goods"
        style="width: 100%">
        <el-table-column
          prop="pic"
          label="图片"
          width="100">
          <template slot-scope="scope">
            <div
              :style="'background-image: url('+scope.row.pic1+')'"
              class="display-pic"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题"
          width="250"/>
        <el-table-column
          prop="price"
          label="价格">
          <template slot-scope="scope">
            <a style="color: red;">￥{{ scope.row.price }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"/>
        <el-table-column
          prop="price"
          label="小计">
          <template slot-scope="scope">
            <a style="color: red;">￥{{ scope.row.price*scope.row.num }}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getOrderDetail} from '@/api/order'
  import {updateOrder} from '@/api/order'
  import {parseTime} from '@/utils'

  export default {
    name: 'RefundDetail',
    data() {
      return {
        ifDisabled: false,
        express: [
          {
            value: 0,
            label: '暂无'
          }, {
            value: 1,
            label: '顺丰快递'
          }, {
            value: 2,
            label: '中通快递'
          }, {
            value: 3,
            label: '圆通快递'
          }, {
            value: 4,
            label: '申通快递'
          }, {
            value: 5,
            label: '其他'
          }],
        options: [
          {
            value: 4,
            label: '待退款'
          }, {
            value: 5,
            label: '同意退款'
          }, {
            value: 6,
            label: '拒绝退款'
          }, {
            value: 7,
            label: '退款完成'
          }
        ],
        tableData: [],
        myPostForm: {
          refund_express_company: '',
          refund_express_code: '',
          expressCompany: '',
          expressNum: '',
          status: '',
          contact: '',
          phone: ''
        }
      }
    },
    mounted() {
      console.log(this.$route.params.id)
      this.fetchDetail(this.$route.params.id)
      // this.getAllTypes()
    },
    methods: {
      formatTime(v) {
        return parseTime(v)
      },
      formatExpress(v) {
        switch (v) {
          case 1:
            return '顺丰快递'
          case 2:
            return '中通快递'
          case 3:
            return '圆通快递'
          case 4:
            return '申通快递'
          default:
            return '其他'
        }
      },
      fetchDetail(id) {
        getOrderDetail(id).then(response => {
          console.log(response, 555)
          this.myPostForm = response.data
          if (this.myPostForm.status == 7) {
            this.ifDisabled = true
          }
        })
      },
      submitForm() {
        console.log(this.myPostForm)
        if ((this.myPostForm.status == 5 || this.myPostForm.status == 7) && (this.myPostForm.refund_address == '' || this.myPostForm.refund_contacts == '' || this.myPostForm.refund_phone == '')) {
          this.$message({
            type: 'error',
            message: '收货信息不能为空！'
          })
          return
        }
        console.log(this.myPostForm, 123)

        updateOrder(this.myPostForm).then(response => {
          console.log(response)
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .content {
    padding: 20px;
    box-sizing: border-box;
    .title {
      width: 100%;
      padding: 10px 0;
    }
    .table {
      border-radius: 5px;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid gainsboro;
      .item {
        align-items: center;
        width: 100%;
        border-bottom: 1px solid gainsboro;
        display: flex;
        justify-content: flex-start;
        padding: 13px 0;
        font-size: 13px;
        box-sizing: border-box;
        .left {
          width: 100px;
        }
        .right {
          display: flex;
          align-items: center;
          margin-left: 20px;
          color: #757575;
        }
        .red {
          color: red
        }
      }
    }
    .goods {
      border-radius: 5px;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid gainsboro;
      .display-pic {
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
    }
  }
</style>
