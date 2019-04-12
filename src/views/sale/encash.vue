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
        prop="encash_id"
        label="提现单号"/>
      <el-table-column
        prop="membership_id"
        label="会员号"/>
      <el-table-column
        prop="nickname"
        label="用户"/>
      <el-table-column
        prop="encash_type"
        label="提现方式">
        <template slot-scope="scope">
          余额
        </template>
      </el-table-column>
      <el-table-column
        prop="account"
        label="提现金额">
        <template slot-scope="scope">
          <a style="color: red;">￥{{ scope.row.account }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="申请时间">
        <template slot-scope="scope">
          <a>{{ formatTime(scope.row.create_time) }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="pay_time"
        label="打款时间"
        width="180">
        <template slot-scope="scope">
          <a v-if="scope.row.status==1">{{ formatTime(scope.row.pay_time) }}</a>
          <a v-if="scope.row.status!=1">-</a>
        </template>
      </el-table-column>
      <el-table-column
        :filters="[{ text: '已驳回', value: 2 },{ text: '申请中', value: 0 }, { text: '已打款', value: 1 }]"
        :filter-method="filterTag"
        prop="status"
        label="状态"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status==1? 'primary' : 'danger'"
            disable-transitions>{{ formatter(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作"width="180">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.status==1"
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">打款
          </el-button>

          <el-button
            :disabled="scope.row.status==1"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">驳回
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
import { deleteEncash } from '@/api/encash'
import { allEncashs } from '@/api/encash'
import { parseTime } from '@/utils'
import { updateEncash } from '@/api/encash'

export default {
  name: 'Encash',
  components: { TopHeader },
  data() {
    return {
      tableData: [],
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
    formatTime(v) {
      return parseTime(v)
    },
    handleSelectionChange(val) {
      this.selected = val
    },
    DeleteSelected() {
      console.log(this.selected)
      var toDelete = []
      for (let i = 0; i < this.selected.length; i++) {
        toDelete[i] = this.selected[i].id
      }
      this.$confirm('删除这些提现记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEncash(toDelete).then(response => {
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
    handleEdit(index, row) {
      console.log(index, row)
      this.$confirm('确认打款, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateEncash(row.id, 1, row.membership_id, row.account).then(response => {
          if (response.msg == 'success') {
            this.$message({
              type: 'success',
              message: '打款成功!'
            })
            this.getData(this.page_num)
          }
          console.log(response)
        })
      }).catch(() => {

      })
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('确认驳回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateEncash(row.id, 2, row.membership_id, row.account).then(response => {
          if (response.msg == 'success') {
            this.$message({
              type: 'success',
              message: '驳回成功!'
            })
            this.getData(this.page_num)
          }
          console.log(response)
        })
      }).catch(() => {

      })
    },

    formatter(value) {
      if (value == 0) {
        return '申请中'
      } else if (value == 1) {
        return '已打款'
      } else if (value == 2) {
        return '已驳回'
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
      allEncashs(this.page_size, page).then(response => {
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
