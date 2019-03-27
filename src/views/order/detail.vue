<template>
  <div class="content">
    <div class="title">订单详情</div>
    <div class="table">
      <div class="item">
        <div class="left">订单编号:</div>
        <div class="right">55221554</div>
      </div>
      <div class="item">
        <div class="left">物流费用:</div>
        <div class="right">￥12</div>
      </div>
      <div class="item">
        <div class="left">订单总价:</div>
        <div class="right">￥512</div>
      </div>
      <div class="item">
        <div class="left">使用余额:</div>
        <div class="right">￥512</div>
      </div>
      <div class="item">
        <div class="left">实际支付:</div>
        <div class="right">￥512</div>
      </div>
      <div class="item">
        <div class="left">下单时间:</div>
        <div class="right">2019-02-28 15:10:41</div>
      </div>
      <div class="item">
        <div class="left">付款时间:</div>
        <div class="right">2019-02-28 15:10:41</div>
      </div>

      <div class="item">
        <div class="left">分销商:</div>
        <div class="right">大番薯（5521542）</div>
      </div>
      <div class="item">
        <div class="left">联系人:</div>
        <div class="right">张三（1234567890）</div>
      </div>
      <div class="item">
        <div class="left">地址信息：</div>
        <div class="right">河南省郑州市中原路146号</div>
      </div>

      <div class="item" style="padding: 5px 3px">
        <div class="left">订单状态:</div>
        <div class="right">

          <el-select v-model="postForm.status" placeholder="请选择">
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
          <el-select v-model="postForm.expressCompany" placeholder="请选择" style="width: 120px">
            <el-option
              v-for="item in express"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div style="margin-left: 10px"> 快递单号：</div>
          <el-input v-model="postForm.expressNum" placeholder="请输入快递单号" style="width: 140px"></el-input>
        </div>
      </div>
      <div class="item">
        <div class="left">订单备注：</div>
        <div class="right"></div>
      </div>
      <div class="item">
        <el-button type="primary" style="margin-left: 10px">确定</el-button>
      </div>
    </div>

    <div class="title">商品信息</div>
    <div class="goods">
      <el-table
        :data="tableData"
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
          prop="account"
          label="小计">
          <template slot-scope="scope">
            <a style="color: red;">￥{{scope.row.account}}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data() {
      return {
        options: [{
          value: '0',
          label: '待付款'
        }, {
          value: '1',
          label: '待发货'
        }, {
          value: '2',
          label: '待收货'
        }, {
          value: '3',
          label: '已完成'
        }, {
          value: '4',
          label: '待退款'
        }, {
          value: '5',
          label: '已退款'
        }
        ],
        tableData: [
          {
          pic: '2016-05-02',
          name: '2018新款潮时尚大气斜挎包迷你单肩包托特包',
          price: '52',
          num: '1',
          account: '52',
        },
          {
            pic: '2016-05-02',
            name: '2018新款潮时尚大气斜挎包迷你单肩包托特包',
            price: '52',
            num: '1',
            account: '52',
          },
        ],
        express: [
          {
          value: '1',
          label: '顺丰快递'
        }, {
          value: '2',
          label: '中通快递'
        }, {
          value: '3',
          label: '圆通快递'
        }, {
          value: '4',
          label: '申通快递'
        }, {
          value: '5',
          label: '其他'
        }],
        postForm:{
          expressCompany:'',
          expressNum:'',
          status:''
        }
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
