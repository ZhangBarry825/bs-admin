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
        label="商品编号"
        width="120">
        <template slot-scope="scope">{{ scope.row.num }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="250">
      </el-table-column>
      <el-table-column
        label="价格"
        width="100"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div style="color: red">{{scope.row.price}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        width="100"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag
            type="primary"
            disable-transitions>{{scope.row.type}}
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
        prop="isSale"
        label="标签"
        :filters="[{ text: '正常', value: true }, { text: '下架', value: false }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isSale? 'primary' : 'danger'"
            disable-transitions>{{formatter(scope.row.isSale)}}
          </el-tag>
        </template>
      </el-table-column>


      <el-table-column
        prop="left"
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
    name: "CommodityList",
    components: {TopHeader},
    data() {
      return {
        tableData: [{
          num: '251354',
          name: '2018新款百搭斜挎包水貂毛口袋包链条包单肩包',
          type: '包',
          price: '￥215',
          pic: '../../assets/display/5c1477307e.jpg',
          left: '500',
          isSale: true
        },
          {
            num: '251354',
            name: '2018新款百搭斜挎包水貂毛口袋包链条包单肩包',
            type: '包',
            price: '￥215',
            pic: '../../assets/display/5c1477307e.jpg',
            left: '500',
            isSale: false
          },
          {
            num: '251354',
            name: '2018新款百搭斜挎包水貂毛口袋包链条包单肩包',
            type: '包',
            price: '￥215',
            pic: '../../assets/display/5c1477307e.jpg',
            left: '500',
            isSale: false
          },
          {
            num: '251354',
            name: '2018新款百搭斜挎包水貂毛口袋包链条包单肩包',
            type: '包',
            price: '￥215',
            pic: '../../assets/display/5c1477307e.jpg',
            left: '500',
            isSale: true
          },
          {
            num: '251354',
            name: '2018新款百搭化妆品化妆品化妆品',
            type: '化妆品',
            price: '￥55',
            pic: '../../assets/display/5c1477307e.jpg',
            left: '500',
            isSale: true
          },
          {
            num: '251354',
            name: '2018新款百搭化妆品化妆品化妆品',
            type: '化妆品',
            price: '￥55',
            pic: '../../assets/display/5c1477307e.jpg',
            left: '500',
            isSale: true
          },
          {
            num: '251354',
            name: '2018新款百搭化妆品化妆品化妆品',
            type: '化妆品',
            price: '￥55',
            pic: '../../assets/display/5c1477307e.jpg',
            left: '500',
            isSale: true
          },
          {
            num: '251354',
            name: '2018新款百搭化妆品化妆品化妆品',
            type: '化妆品',
            price: '￥55',
            pic: '../../assets/display/5c1477307e.jpg',
            left: '500',
            isSale: true
          },
          {
            num: '251354',
            name: '2018新款百搭化妆品化妆品化妆品',
            type: '化妆品',
            price: '￥55',
            pic: '../../assets/display/5c1477307e.jpg',
            left: '500',
            isSale: true
          },
          {
            num: '251354',
            name: '2018新款百搭化妆品化妆品化妆品',
            type: '化妆品',
            price: '￥55',
            pic: '../../assets/display/5c1477307e.jpg',
            left: '500',
            isSale: true
          }
        ],
        multipleSelection: []
      }
    },


    methods: {
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
