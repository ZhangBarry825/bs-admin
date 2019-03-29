<template>
  <div class="content">
    <TopHeader :New="'/'" @DeleteSelected="DeleteSelected" :DisabledNew="true"></TopHeader>


    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="shopper"
        label="分销商">
      </el-table-column>
      <el-table-column
        prop="membership_id"
        label="会员号">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="price"
        label="金额">
        <template slot-scope="scope">
          <a style="color: red;">￥{{scope.row.price}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="时间">
        <template slot-scope="scope">
          <a>{{ formatTime(scope.row.create_time) }}</a>
        </template>
      </el-table-column>

      <el-table-column
        prop="status"
        label="订单状态"
        :filters="[{ text: '待退款', value: '4' },{ text: '同意退款', value: '5' }, { text: '拒绝退款', value:'6' }, { text: '退款完成', value:'7' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status==7? 'primary' : 'danger'"
            disable-transitions>{{formatter(scope.row.status)}}
          </el-tag>
        </template>
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
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-pagination
      :page-size="page_size"
      :current-page="page_num"
      @current-change="changPage"
      class="pageNum"
      background
      layout="prev, pager, next"
      :total="all_num">
    </el-pagination>

  </div>
</template>

<script>
  import TopHeader from '@/components/TopHeader'
  import {getAllOrder} from "@/api/order";
  import {parseTime} from "@/utils";
  import {deleteOrder} from "@/api/order";
  import {getRefundOrder} from "@/api/order";

  export default {
    name: "OrderRefund",
    components: {TopHeader},
    data() {
      return {
        tableData: [],
        selected: [],
        loading: false,
        page_size: 10,
        page_num: 1,
        all_num: 0,
        TypeOptions: [],
      }
    },
    methods: {
      DeleteSelected(){
        console.log(this.selected)
        var toDelete=[]
        for(let i=0;i<this.selected.length;i++){
          toDelete[i]=this.selected[i].id
        }
        this.$confirm('删除这些订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteOrder(toDelete).then(response => {
            if(response.msg=='success'){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getData(this.page_num)
            }
            console.log(response)

          })
        }).catch(() => {

        });
      },
      formatTime(v){
        return parseTime(v)
      },
      handleSelectionChange(val) {
        this.selected = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({path: `/order/refundDetail/${row.id}`})
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrder([row.id]).then(response => {
            console.log(response)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getData(this.page_num)
          })
        }).catch(() => {

        });
      },


      formatter(value) {
        if(value==4){
          return '待退款'
        }else if(value==5){
          return '同意退款'
        }else if(value==6){
          return '拒绝退款'
        }else if(value==7){
          return '退款完成'
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
      },
      getData(page = 1) {
        this.loading = true
        getRefundOrder(this.page_size, page).then(response => {
          console.log(response)
          this.loading = false
          if(response.data.rows.length < 1 && this.page_num>1){
            this.page_num--
            this.getData(this.page_num)
          }else {
            this.all_num = response.data.count
            this.tableData = response.data.rows
          }
        })
      },
      changPage(e) {
        this.page_num=e
        this.getData(e)
      },
    },
    mounted(){
      this.getData()
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
