<template>
  <div class="content">
    <div class="title">退货订单详情</div>
    <div class="table">
      <div class="item">
        <div class="left">订单编号:</div>
        <div class="right">55221554</div>
      </div>
      <div class="item">
        <div class="left">退款总价:</div>
        <div class="right">￥512</div>
      </div>

      <div class="item">
        <div class="left">申请时间:</div>
        <div class="right">2019-02-28 15:10:41</div>
      </div>


      <div class="item">
        <div class="left">申请退款人:</div>
        <div class="right">大番薯（5521542）</div>
      </div>

      <div class="item">
        <div class="left">退货物流单号:</div>
        <div class="right">顺丰快递（554225422）</div>
      </div>

      <div class="item" style="padding: 5px 3px">
        <div class="left">退货订单状态:</div>
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

      <div class="item"  style="padding: 5px 3px">
        <div class="left">商家收货人:</div>
        <div class="right">
          <div style="margin-left: 10px"> 收货人：</div>
          <el-input v-model="postForm.contact" placeholder="请输入收货人" style="width: 140px"></el-input>
          <div style="margin-left: 10px"> 联系方式：</div>
          <el-input v-model="postForm.phone" placeholder="联系方式" style="width: 140px"></el-input>
        </div>
      </div>
      <div class="item"  style="padding: 5px 3px">
        <div class="left">商家收货地址：</div>
        <div class="right">
          <el-input v-model="postForm.phone" placeholder="收货地址" style="width: 420px"></el-input>
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
    name: "refundDetail",
    data() {
      return {
        options: [{
          value: '0',
          label: '申请中'
        }, {
          value: '1',
          label: '商家同意退款'
        }, {
          value: '2',
          label: '商家拒绝退款'
        }, {
          value: '3',
          label: '退款完成'
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
        postForm:{
          expressCompany:'',
          expressNum:'',
          status:'',
          contact:'',
          phone:''
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
