<template>
  <div class="content">
    <TopHeader></TopHeader>


    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="订单号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="membershipNum"
        label="会员号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="退款人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="account"
        label="退款金额"
        width="100">
        <template slot-scope="scope">
          <a style="color: red;">￥{{scope.row.account}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        width="250">
      </el-table-column>

      <el-table-column
        prop="status"
        label="订单状态"
        width="100">
        <template slot-scope="scope">
          {{formatter(scope.row.status)}}
        </template>
      </el-table-column>

      <el-table-column
        prop="ifRefund"
        label="是否退款"
        width="100"
        :filters="[{ text: '未退款', value: false }, { text: '已退款', value: true }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.ifRefund? 'success' : 'warning'"
            disable-transitions>{{formatter2(scope.row.ifRefund)}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">详情
          </el-button>
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="danger"-->
          <!--@click="handleDelete(scope.$index, scope.row)">删除-->
          <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>


    <el-pagination
      class="pageNum"
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>

  </div>
</template>

<script>
  import TopHeader from '@/components/TopHeader'

  export default {
    name: "OrderRefund",
    components: {TopHeader},
    data() {
      return {
        tableData: [
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '2',
            ifRefund: false
          },
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '1',
            ifRefund: false
          },
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '2',
            ifRefund:false
          },
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '1',
            ifRefund:true
          },
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '1',
            ifRefund:true
          },
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '2',
            ifRefund:true
          },
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '1',
            ifRefund:true
          },
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '2',
            ifRefund:true
          },
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '2',
            ifRefund:true
          },
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '2',
            ifRefund:true
          }
        ],
        multipleSelection: []
      }
    },


    methods: {

      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },


      formatter(value) {
        if (value == 0) {
          return '待付款'
        } else if (value == 1) {
          return '待发货'
        } else if (value == 2) {
          return '已发货'
        } else if (value == 3) {
          return '已完成'
        } else {
          return '未知'
        }
      },
      formatter2(value){
        if(value){
          return "已退款"
        }else {
          return "未退款"
        }
      },
      filterTag(value, row) {
        return row.ifRefund === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .content {
    padding: 10px;
    box-sizing: border-box;
    .pageNum {
      margin-top: 10px;
    }
    .display-pic {
      width: 50px;
      height: 50px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
</style>
