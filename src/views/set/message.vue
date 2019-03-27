<template>
  <div class="content">
    <TopHeader  :New="'/set/pushMessage'" @DeleteSelected="DeleteSelected"></TopHeader>


    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="编号">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="通知标题"
        width="220">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容摘要">
        <template slot-scope="scope">
          <a class="huanhang">{{scope.row.content_short}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="通知时间">
        <template slot-scope="scope">
          <a>{{ formatTime(scope.row.create_time) }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<div style="margin-top: 20px">-->
    <!--<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
    <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
    <!--</div>-->

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
  import {getAllMessages} from "@/api/message";
  import {parseTime} from "@/utils";
  import {deleteMessage} from "@/api/message";


  export default {
    name: "Message",
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

      handleSelectionChange(val) {
        this.selected = val;
      },
      DeleteSelected(){
        console.log(this.selected)
        var toDelete=[]
        for(let i=0;i<this.selected.length;i++){
          toDelete[i]=this.selected[i].id
        }
        this.$confirm('删除这些通知, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteMessage(toDelete).then(response => {
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
        this.$router.push({path:`/set/editMessage/${row.id}`})
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('删除该通知, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMessage([row.id]).then(response => {
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
        if(value){
          return '正常'
        }
        return '下架'
      },
      filterTag(value, row) {
        return row.isSale === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

      formatTime(v){
        return parseTime(v)
      },

      getData(page = 1) {
        this.loading = true
        getAllMessages(this.page_size, page).then(response => {
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
    .huanhang{
      width: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;

    }
  }
</style>
