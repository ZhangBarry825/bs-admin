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
        label="提现单号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="membershipNum"
        label="会员号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="用户"
        width="100">
      </el-table-column>
      <el-table-column
        prop="encashType"
        label="提现方式"
        width="100">
        <template slot-scope="scope">
          余额
        </template>
      </el-table-column>
      <el-table-column
        prop="account"
        label="提现金额"
        width="100">
        <template slot-scope="scope">
          <a style="color: red;">￥{{scope.row.account}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="申请时间">
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态"
        width="100"
        :filters="[{ text: '已驳回', value: '0' },{ text: '申请中', value: '1' }, { text: '已执行', value: '2' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status==2? 'primary' : 'danger'"
            disable-transitions>{{formatter(scope.row.status)}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==1"
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">打款
          </el-button>
          <el-button
            v-if="scope.row.status!=1"
            disabled
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">打款
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.status==1"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">驳回
          </el-button>
          <el-button
            size="mini"
            v-if="scope.row.status!=1"
            type="danger"
            disabled
            @click="handleDelete(scope.$index, scope.row)">驳回
          </el-button>
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
    name: "Encash",
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
            status: '1',
            encashType: '1',
          },
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '0',
            encashType: '0',
          },
          {
            orderNum: '1125244',
            fenxiaoshang: '大番薯',
            membershipNum: '55232',
            nickname: '雷神托尔',
            account: '552',
            time: '2019-02-28 15:10:41',
            status: '2',
            encashType: '1',
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
          return '已驳回'
        } else if (value == 1) {
          return '申请中'
        } else if (value == 2) {
          return '已执行'
        } else {
          return '未知'
        }
      },
      filterTag(value, row) {
        return row.status === value;
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
