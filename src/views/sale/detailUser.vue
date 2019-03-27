<template>
  <div class="content">
    <div class="title">用户详情</div>
    <div class="table">
      <div class="item">
        <div class="left">会员ID:</div>
        <div class="right">55221554</div>
      </div>
      <div class="item">
        <div class="left">昵称:</div>
        <div class="right">大番薯</div>
      </div>
      <div class="item">
        <div class="left">姓名:</div>
        <div class="right">张三</div>
      </div>
      <div class="item">
        <div class="left">手机:</div>
        <div class="right">15222121211</div>
      </div>
      <div class="item">
        <div class="left">可提现佣金:</div>
        <div class="right money">￥512</div>
      </div>
      <div class="item">
        <div class="left">销售额:</div>
        <div class="right money">￥512</div>
      </div>
      <div class="item">
        <div class="left">审核状态:</div>
        <el-select v-model="postForm.status" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <div class="left">注册时间:</div>
        <div class="right">2019-02-28 15:10:41</div>
      </div>

      <div class="item">
        <div class="left">推荐人:</div>
        <div class="right">小番薯（5521542）</div>
      </div>
      <div class="item">
        <div class="left">
          <el-button type="primary" size="medium ">保存</el-button>
        </div>
      </div>
    </div>
    <div class="title">下属二级分销商</div>
    <div class="table">
      <div class="item">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="memebershipID"
            label="会员ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="commission"
            label="佣金余额"
            width="100">
            <template slot-scope="scope">
              <a style="color: red;">￥{{scope.row.commission}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="account"
            label="余额"
            width="100">
            <template slot-scope="scope">
              <a style="color: red;">￥{{scope.row.account}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="saleAccount"
            label="营销额"
            width="120">
            <template slot-scope="scope">
              <a style="color: red;">￥{{scope.row.saleAccount}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核状态"
            width="120">

            <template slot-scope="scope">
              {{formatter(scope.row.status)}}
            </template>
          </el-table-column>

          <el-table-column
            prop="date"
            label="加入日期">
          </el-table-column>

        </el-table>
      </div>
    </div>
    <div class="title">下属三级分销商</div>
    <div class="table">
      <div class="item">
        <el-table
          :data="tableData2"
          style="width: 100%">
          <el-table-column
            prop="memebershipID"
            label="会员ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="commission"
            label="佣金余额"
            width="100">
            <template slot-scope="scope">
              <a style="color: red;">￥{{scope.row.commission}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="account"
            label="余额"
            width="100">
            <template slot-scope="scope">
              <a style="color: red;">￥{{scope.row.account}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="saleAccount"
            label="营销额"
            width="120">
            <template slot-scope="scope">
              <a style="color: red;">￥{{scope.row.saleAccount}}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核状态"
            width="120">

            <template slot-scope="scope">
              {{formatter(scope.row.status)}}
            </template>
          </el-table-column>

          <el-table-column
            prop="date"
            label="加入日期">
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "DetailUser",
    data() {
      return {
        tableData: [
          {
            memebershipID: '112515543',
            nickname: '老夫子',
            commission: '55',
            saleAccount: '0',
            account: '0',
            status: '0',
            date: '2016-05-02',
            name: '王小虎',
          },
          {
            memebershipID: '112515543',
            nickname: '老夫子',
            commission: '0',
            saleAccount: '0',
            account: '0',
            status: '1',
            date: '2016-05-02',
            name: '王小虎',
          },
        ],
        tableData2: [
          {
            memebershipID: '112515543',
            nickname: '秦先生',
            commission: '55',
            saleAccount: '554',
            account: '554',
            status: '2',
            date: '2016-05-02',
            name: '王宝强',
          },
          {
            memebershipID: '112515543',
            nickname: '燕小六',
            commission: '55',
            saleAccount: '554',
            account: '554',
            status: '2',
            date: '2016-05-02',
            name: '王大陆',
          },
        ],
        options: [
          {
            value: '1',
            label: '申请中'
          }, {
            value: '0',
            label: '已拒绝'
          }, {
            value: '2',
            label: '已同意'
          }
        ],
        postForm: {
          status: '1'
        }
      }
    },


    methods: {
      formatter(value) {
        if (value == 0) {
          return '已拒绝'
        } else if (value == 1) {
          return '申请中'
        } else if (value == 2) {
          return '已同意'
        } else {
          return '未知'
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .content {
    padding: 10px;
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
        .money {
          color: red;
        }
      }
      .item:last-child {
        border-bottom: none;
      }
    }
  }
</style>
