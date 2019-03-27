<template>
  <div class="content">
    <TopHeader :New="'/set/newUser'" @DeleteSelected="DeleteSelected"></TopHeader>


    <el-table
      v-loading="loading"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="username"
        label="手机(账号)">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="type"
        label="角色">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.roles=='admin'? 'primary' : 'success'"
            disable-transitions>{{formatter(scope.row.roles)}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.roles!='admin'"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">改密
          </el-button>
          <el-button
            v-if="scope.row.roles=='admin'"
            disabled
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">改密
          </el-button>
          <el-button
            v-if="scope.row.roles!='admin'"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
          <el-button
            v-if="scope.row.roles=='admin'"
            disabled
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
  import {getAllSysUsers} from "@/api/user";
  import {resetPassword} from "@/api/user";
  import {deleteUser} from "@/api/user";

  export default {
    name: "SysUser",
    components: {TopHeader},
    data() {
      return {
        tableData: [],
        page_size: 10,
        page_num: 1,
        all_num: 0,
        loading: false,
        selected:[]
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
        this.$confirm('删除这些用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteUser(toDelete).then(response => {
            if(response.msg=='success'){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getData(this.page_num)
            }else {
              this.$message({
                type: 'error',
                message: '系统管理员禁止删除！'
              });
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

          deleteUser([row.id]).then(response => {
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
        if (value == 'admin') {
          return '系统管理员'
        } else if (value == 'manager') {
          return '普通管理员'
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
      },
      getData(page = 1) {
        this.loading = true
        getAllSysUsers(this.page_size, page).then(response => {
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
    mounted() {
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
