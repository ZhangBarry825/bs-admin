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
        prop="membershipNum"
        label="会员号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机"
        width="100">
      </el-table-column>
      <el-table-column
        prop="recommend"
        label="推荐人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="commission"
        label="可提现佣金"
        width="100">
        <template slot-scope="scope">
          <a style="color: red;">￥{{scope.row.commission}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="saleAccount"
        label="销售额"
        width="100">
        <template slot-scope="scope">
          <a style="color: red;">￥{{scope.row.saleAccount}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="审核状态"
        width="100"
        :filters="[{ text: '待审核', value: '1' },{ text: '已通过', value: '2' },{ text: '已拒绝', value: '0' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status==2? 'primary' : 'danger'"
            disable-transitions>{{formatter(scope.row.status)}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">详情
          </el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">禁用
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
    name: "SaleUser",
    components: {TopHeader},
    data() {
      return {
        tableData: [
          {
            membershipNum:'1125244',
            nickname:'大番薯',
            phone:'15138380000',
            recommend:'雷神托尔',
            commission:'552',
            saleAccount:'423',
            time:'2019-02-28 15:10:41',
            status:'1',
          },
          {
            membershipNum:'1125244',
            nickname:'大番薯',
            phone:'15138380000',
            recommend:'[来自总店]',
            commission:'552',
            saleAccount:'423',
            time:'2019-02-28 15:10:41',
            status:'0',
          },
          {
            membershipNum:'1125244',
            nickname:'大番薯',
            phone:'15138380000',
            recommend:'雷神托尔',
            commission:'552',
            saleAccount:'423',
            time:'2019-02-28 15:10:41',
            status:'2',
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
        if(value==0){
          return '已拒绝'
        }else if(value==1){
          return '待审核'
        }else if(value==2){
          return '已通过'
        }else {
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
