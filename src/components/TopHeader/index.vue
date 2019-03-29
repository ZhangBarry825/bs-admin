<template>
  <div class="HeaderContent">

    <el-button-group>
      <el-button type="primary" icon="el-icon-edit" @click="NewOne" :disabled="DisabledNew">新建</el-button>
      <!--<el-button type="primary" icon="el-icon-share">分享</el-button>-->
      <el-button type="primary" icon="el-icon-delete" @click="DeleteSelected">删除</el-button>
    </el-button-group>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="formInline.user" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="formInline.region" placeholder="商品分类">
          <el-option label="分类一" value="shanghai"></el-option>
          <el-option label="分类二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "TopHeader",
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods:{
      onSubmit() {
        console.log('submit!');
      },
      NewOne(){
        this.$router.push({path: this.New})
      },
      DeleteSelected(){
        this.$emit('DeleteSelected')
      }
    },
    props:{
      New: {
        type: String,
        default: function () {
          return '/'
        }
      },
      DisabledNew: {
        type: Boolean,
        default: function () {
          return false
        }
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .HeaderContent {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid gainsboro;
    .demo-form-inline{
      margin-left: 20px;
    }
  }
</style>
