<template>
  <div class="content">
    <div class="title">订单详情</div>
    <div class="table">
      <div class="item">
        <div class="left">订单编号:</div>
        <div class="right">{{myPostForm.order_id}}</div>
      </div>
      <div class="item">
        <div class="left">物流费用:</div>
        <div class="right red">￥{{myPostForm.express_cost}}</div>
      </div>
      <div class="item">
        <div class="left">订单总价:</div>
        <div class="right red">￥{{myPostForm.price}}</div>
      </div>
      <!--<div class="item">-->
      <!--<div class="left">使用余额:</div>-->
      <!--<div class="right red">￥{{myPostForm.price}}</div>-->
      <!--</div>-->
      <div class="item">
        <div class="left">实际支付:</div>
        <div class="right red" v-if="myPostForm.status!=0">￥{{myPostForm.price}}</div>
        <div class="right red" v-if="myPostForm.status==0">￥0</div>
      </div>
      <div class="item">
        <div class="left">下单时间:</div>
        <div class="right">{{formatTime(myPostForm.create_time)}}</div>
      </div>
      <div class="item">
        <div class="left">付款时间:</div>
        <div class="right" v-if="myPostForm.status!=0">{{formatTime(myPostForm.pay_time)}}</div>
        <div class="right" v-if="myPostForm.status==0">-</div>
      </div>

      <div class="item">
        <div class="left">分销商:</div>
        <div class="right">{{myPostForm.shopper}}（{{myPostForm.shopper_id}}）</div>
      </div>
      <div class="item">
        <div class="left">联系人:</div>
        <div class="right">{{myPostForm.contacts}}（{{myPostForm.phone}}）</div>
      </div>
      <div class="item">
        <div class="left">地址信息：</div>
        <div class="right">{{myPostForm.address}}</div>
      </div>

      <div class="item" style="padding: 5px 3px">
        <div class="left">订单状态:</div>
        <div class="right">

          <el-select v-model="myPostForm.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </div>
      </div>
      <div class="item">
        <div class="left">配送方式：</div>
        <div class="right" style="display: flex;justify-content: flex-start">
          <div style=""> 快递公司：</div>
          <el-select v-model="myPostForm.express_company" placeholder="请选择" style="width: 120px">
            <el-option
              v-for="item in express"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div style="margin-left: 10px"> 快递单号：</div>
          <el-input v-model="myPostForm.express_code" placeholder="请输入快递单号" style="width: 140px"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="left">订单备注：</div>
        <div class="right">{{myPostForm.remark}}</div>
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
            <div class="display-pic"
                 :style="'background-image: url('+require('../../assets/display/5c1477307e.jpg')+')'"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="标题"
          width="250">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
          <template slot-scope="scope">
            <a style="color: red;">￥{{scope.row.price}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="price"
          label="小计">
          <template slot-scope="scope">
            <a style="color: red;">￥{{scope.row.price*scope.row.num}}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getOrderDetail} from "@/api/order";
  import {parseTime} from "@/utils";
  import {updateOrder} from "@/api/order";

  export default {
    name: "detail",
    data() {
      return {
        options: [
          {
            value: 0,
            label: '待付款'
          }, {
            value: 1,
            label: '待发货'
          }, {
            value: 2,
            label: '待收货'
          }, {
            value: 3,
            label: '已完成'
          },
          // {
          //   value: 4,
          //   label: '待退款'
          // }, {
          //   value: 7,
          //   label: '已退款'
          // }
        ],
        tableData: [],
        express: [
          {
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
        myPostForm: {
          expressCompany: '',
          expressNum: '',
          status: '',
          goods: []
        }
      }
    },
    methods: {
      formatTime(v) {
        return parseTime(v)
      },
      fetchDetail(id) {
        getOrderDetail(id).then(response => {
          console.log(response, 555)
          this.myPostForm = response.data
        })
      },
      submitForm() {
        console.log(this.myPostForm)
        if (this.myPostForm.status > 1  && this.myPostForm.express_code == '') {
          this.$message({
            type: 'error',
            message: '快递编号不能为空！'
          });
          return;
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
    },
    computed:{
      newVal: function () {
        return ''
      }
    },
    mounted() {
      console.log(this.$route.params.id)
      this.fetchDetail(this.$route.params.id)
      // this.getAllTypes()
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
