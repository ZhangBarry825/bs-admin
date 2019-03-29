<template>
  <div class="content">
    <TopHeader  :New="'/commodity/addType'" @DeleteSelected="DeleteSelected"></TopHeader>


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
        label="分类序号">
        <template slot-scope="scope">{{ scope.row.type_id }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="分类名称">
      </el-table-column>
      <!--<el-table-column-->
        <!--label="分类图片"-->
        <!--show-overflow-tooltip>-->
        <!--<template slot-scope="scope">-->
          <!--<div class="display-pic" :style="'background-image: url('+require('../../assets/display/5c1477307e.jpg')+')'"></div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="childrenNum"
        label="子分类数量">
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
  import {getAllTypes} from "@/api/goodsType";
  import {deleteGoodsType} from "@/api/goodsType";

  export default {
    name: "CommodityType",
    components: {TopHeader},
    data(){
      return{
        tableData: [],
        selected: [],
        loading: false,
        page_size: 10,
        page_num: 1,
        all_num: 0,
      }
    },


    methods:{
      DeleteSelected(){
        console.log(this.selected)
        var toDelete=[]
        for(let i=0;i<this.selected.length;i++){
          toDelete[i]=this.selected[i].id
        }
        this.$confirm('删除这些分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteGoodsType(toDelete).then(response => {
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
      handleSelectionChange(val) {
        this.selected = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({path:`/commodity/editType/${row.id}`})
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGoodsType([row.id]).then(response => {
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
      getData(page = 1) {
        this.loading = true
        getAllTypes(this.page_size, page,1).then(response => {
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
