<template>
  <div class="content">
    <TopHeader  :New="'/commodity/push'" @DeleteSelected="DeleteSelected"></TopHeader>


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
        label="商品编号">
        <template slot-scope="scope">{{ scope.row.goods_id }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        label="价格"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div style="color: red">￥{{scope.row.price}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag
            type="primary"
            disable-transitions>{{formatter2(scope.row.type_id)}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="图片"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="display-pic"
               :style="'background-image: url('+require('../../assets/display/5c1477307e.jpg')+')'"></div>
        </template>
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态"
        :filters="[{ text: '正常', value: 1 }, { text: '下架', value: 0 }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status==1? 'primary' : 'danger'"
            disable-transitions>{{formatter(scope.row.status)}}
          </el-tag>
        </template>
      </el-table-column>


      <el-table-column
        prop="stock"
        label="库存"
        width="100">
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
  import {getAllGoods} from "@/api/goods";
  import {getAllTypes} from "@/api/goodsType";
  import {deleteGoods} from "@/api/goods";

  export default {
    name: "CommodityList",
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
        this.$confirm('删除这些商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteGoods(toDelete).then(response => {
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
        this.selected = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push({path:`/commodity/edit/${row.id}`})
      },
      handleDelete(index, row) {
        console.log(index, row);

        this.$confirm('删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGoods([row.id]).then(response => {
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
        if(value==1){
          return '正常'
        }else {
          return '下架'
        }
      },
      formatter2(value) {
        for(let i=0;i<this.TypeOptions.length;i++){
          if(value==this.TypeOptions[i].type_id){
            return this.TypeOptions[i].name
          }
        }
      },
      filterTag(value, row) {
        return row.isSale === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      getData(page = 1) {
        this.loading = true
        getAllGoods(this.page_size, page).then(response => {
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
      getAllTypes(){
        getAllTypes(1000000,1).then(response => {
          console.log(response.data,852)
          this.TypeOptions=response.data.rows
        })
      }
    },
    mounted(){
      this.getData()
      this.getAllTypes()
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
