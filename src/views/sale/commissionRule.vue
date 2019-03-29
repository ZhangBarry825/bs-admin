<template>
  <div class="content">
    <div class="box">

      <h2>佣金规则</h2>
      <div class="items">
        <div class="item title">
          <div class="left"></div>
          <div class="right">佣金比例</div>
        </div>
        <div class="item">
          <div class="left">一级分销商</div>
          <div class="right">
            <el-input v-model="postForm.level_one" placeholder="请输入内容" class="input"></el-input>
            <a>%(佣金比例的百分比)</a>
          </div>
        </div>
        <div class="item">
          <div class="left">二级分销商</div>
          <div class="right">
            <el-input v-model="postForm.level_two" placeholder="请输入内容" class="input"></el-input>
            <a>%(佣金比例的百分比)</a>
          </div>
        </div>
        <div class="item">
          <div class="left">三级分销商</div>
          <div class="right">
            <el-input v-model="postForm.level_three" placeholder="请输入内容" class="input"></el-input>
            <a>%(佣金比例的百分比)</a>
          </div>
        </div>

        <div class="item">
          <div class="left">
            <el-button type="primary" size="medium " @click="submitForm">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getRegulationDetail} from "@/api/regulation";
  import {updateRegulation} from "@/api/regulation";

  export default {
    name: "CommissionRule",
    data() {
      return {
        postForm: {
          level_one: '',
          level_two: '',
          level_three: '',
        }
      }
    },
    methods: {
      fetchDetail() {
        getRegulationDetail(1).then(response => {
          console.log(response, 555)
          this.postForm = response.data
        })
      },
      submitForm() {
        console.log(this.postForm)
        if (this.postForm.level_one == '' || this.postForm.level_two == ''|| this.postForm.level_three == '') {
          this.$message({
            type: 'error',
            message: '佣金比例不能为空！'
          });
          return;
        }
        console.log(this.postForm, 123)

        updateRegulation(this.postForm).then(response => {
          console.log(response)
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
        })

      }
    },
    mounted() {
      this.fetchDetail()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .content {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;

    .box {
      font-size: 15px;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;

      .items {
        width: 500px;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid gainsboro;
        .item {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          border-bottom: 1px solid gainsboro;
          display: flex;
          justify-content: flex-start;
          font-size: 13px;
          .left {
            width: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .right {
            a {
              margin-left: 5px;
              font-size: 13px;
            }
            .input {
              width: 100px;
            }
            width: calc(100% - 170px);
            display: flex;
            align-items: center;
          }
        }
        .item:last-child {
          border: none;
        }
      }
    }
  }
</style>
