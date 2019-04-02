<template>
  <div class="content">
    <TopHeader :new="'/'" :disabled-new="true" @DeleteSelected="DeleteSelected"/>

    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"/>
      <el-table-column
        prop="membership_id"
        label="会员号"/>
      <el-table-column
        prop="nickname"
        label="昵称"/>
      <el-table-column
        prop="phone"
        label="手机"/>
      <el-table-column
        prop="referrer"
        label="推荐人"/>
      <el-table-column
        prop="commission"
        label="可提现佣金">
        <template slot-scope="scope">
          <a style="color: red;">￥{{ scope.row.commission }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="sale_account"
        label="销售额">
        <template slot-scope="scope">
          <a style="color: red;">￥{{ scope.row.sale_account }}</a>
        </template>
      </el-table-column>
      <el-table-column
        :filters="[{ text: '待审核', value: 1 },{ text: '已通过', value: 2 },{ text: '已拒绝', value: 3 },{ text: '已禁用', value: 4 }]"
        :filter-method="filterTag"
        prop="status"
        label="审核状态"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status==2? 'primary' : 'danger'"
            disable-transitions>{{ formatter(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="时间">
        <template slot-scope="scope">
          <a>{{ formatTime(scope.row.create_time) }}</a>
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
      :total="all_num"
      class="pageNum"
      background
      layout="prev, pager, next"
      @current-change="changPage"/>

  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader'
import { allSaleMembers } from '@/api/membership'
import { parseTime } from '@/utils'
import { deleteMembership } from '@/api/membership'

export default {
  name: 'SaleUser',
  components: { TopHeader },
  data() {
    return {
      tableData: [
        {
          membership_id: 1125244,
          nickname: '大番薯',
          phone: '15138380000',
          referrer: '雷神托尔',
          commission: 552,
          sale_account: 423,
          create_time: 1553674956,
          status: 1
        }
      ],
      selected: [],
      loading: false,
      page_size: 10,
      page_num: 1,
      all_num: 0
    }
  },
  mounted() {
    this.getData()
  },

  methods: {
    DeleteSelected() {
      console.log(this.selected)
      var toDelete = []
      for (let i = 0; i < this.selected.length; i++) {
        toDelete[i] = this.selected[i].id
      }
      this.$confirm('删除这些分销用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMembership(toDelete).then(response => {
          if (response.msg == 'success') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getData(this.page_num)
          }
          console.log(response)
        })
      }).catch(() => {

      })
    },
    handleSelectionChange(val) {
      this.selected = val
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push({ path: `/sale/detailUser/${row.id}` })
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('删除该分销用户 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMembership([row.id]).then(response => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData(this.page_num)
        })
      }).catch(() => {

      })
    },
    formatTime(v) {
      return parseTime(v)
    },

    formatter(value) {
      if (value == 1) {
        return '待审核'
      } else if (value == 2) {
        return '已通过'
      } else if (value == 3) {
        return '已拒绝'
      } else if (value == 4) {
        return '已禁用'
      } else {
        return '未知'
      }
    },
    filterTag(value, row) {
      return row.status === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    getData(page = 1) {
      this.loading = true
      allSaleMembers(this.page_size, page).then(response => {
        console.log(response)
        this.loading = false
        if (response.data.rows.length < 1 && this.page_num > 1) {
          this.page_num--
          this.getData(this.page_num)
        } else {
          this.all_num = response.data.count
          this.tableData = response.data.rows
        }
      })
    },
    changPage(e) {
      this.page_num = e
      this.getData(e)
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
