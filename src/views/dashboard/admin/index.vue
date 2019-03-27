<template>
  <div class="dashboard-editor-container">

    <!--<github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>-->

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    // expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [2, 3, 4, 5, 1, 7, 8,2, 3, 6, 5, 6, 7, 8, 5, 2,4,6],
    type:''
  },
  messages: {
    // expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData:  [22, 31, 43, 54, 1, 71, 82,2, 3, 6, 51, 6, 7, 8, 54, 2,4,6]
  },
  purchases: {
    // expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [2, 3, 4, 5, 11, 7, 8,22, 3, 6, 5, 62, 7, 8, 5, 2,14,6]
  },
  shoppings: {
    // expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData:  [2, 13, 4, 5, 1, 17, 8,2, 13, 6, 5, 16, 7, 8, 5, 12,4,6]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
