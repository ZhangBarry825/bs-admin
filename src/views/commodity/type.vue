<template>
  <div class="content">
    <TopHeader></TopHeader>


    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="分类序号"
        width="120">
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称"
        width="250">
      </el-table-column>
      <el-table-column
        label="分类图片"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="display-pic" :style="'background-image: url('+require('../../assets/display/5c1477307e.jpg')+')'"></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="child"
        label="子分类数量"
        width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<div style="margin-top: 20px">-->
    <!--<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
    <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
    <!--</div>-->

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
    name: "CommodityType",
    components: {TopHeader},
    data(){
      return{
        tableData: [{
          num: '251354',
          name: '包',
          type:'包',
          price: '￥215',
          pic:'../../assets/display/5c1477307e.jpg',
          child:'2'
        },
          {
            num: '251354',
            name: '彩妆',
            type:'包',
            price: '￥215',
            pic:'../../assets/display/5c1477307e.jpg',
            child:'2'
          },
          {
            num: '251354',
            name: '日用品',
            type:'包',
            price: '￥215',
            pic:'../../assets/display/5c1477307e.jpg',
            child:'2'
          }
        ],
        multipleSelection: []
      }
    },


    methods:{
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .content{
    padding: 10px;
    box-sizing: border-box;
    .pageNum{
      margin-top: 10px;
    }
    .display-pic{
      width: 50px;
      height: 50px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
</style>
