<template>
  <div class="content">
    <TopHeader :New="'/'" @DeleteSelected="DeleteSelected"  :DisabledNew="true"></TopHeader>


    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="membership_id"
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
        width="120">
      </el-table-column>
      <el-table-column
        prop="referrer"
        label="推荐人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="余额">
        <template slot-scope="scope">
          <a style="color: red;">￥{{scope.row.balance}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="expense"
        label="消费额">
        <template slot-scope="scope">
          <a style="color: red;">￥{{scope.row.expense}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="注册时间"
        width="170">
        <template slot-scope="scope">
          <a>{{ formatTime(scope.row.create_time) }}</a>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">改密
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
  import {getAllMemberships} from "@/api/membership";
  import {parseTime} from "@/utils";
  import {resetPassword} from "@/api/membership";
  import {deleteMembership} from "@/api/membership";

  export default {
    name: "Membership",
    components: {TopHeader},
    data() {
      return {
        tableData: [],
        selected: [],
        loading: false,
        page_size: 10,
        page_num: 1,
        all_num: 0,

      }
    },


    methods: {
      handleSelectionChange(val){
        this.selected=val
      },
      DeleteSelected(){
        console.log(this.selected)
        var toDelete=[]
        for(let i=0;i<this.selected.length;i++){
          toDelete[i]=this.selected[i].id
        }
        this.$confirm('删除这些会员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteMembership(toDelete).then(response => {
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
      handleEdit(index, row) {
        console.log(index, row);
        this.$confirm('重置该用户的密码为123456, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetPassword(row.id).then(response => {
            console.log(response)
            this.$message({
              type: 'success',
              message: '重置成功!'
            });
          })
        }).catch(() => {

        });
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteMembership([row.id]).then(response => {
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
      formatTime(v){
        return parseTime(v)
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
      },
      getData(page = 1) {
        this.loading = true
        getAllMemberships(this.page_size, page).then(response => {
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
      }
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
