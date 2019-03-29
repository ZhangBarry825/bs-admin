<template>
  <div class="content">
    <div class="box">

      <h2>分销规则</h2>
      <div class="items">
        <div class="item">
          <div class="left">分销级别</div>
          <div class="right">
            <el-select v-model="level" placeholder="请选择" disabled>
              <el-option
                v-for="item in levels"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <div class="left">成为分销商门槛</div>
          <div class="right">
            <el-select v-model="postForm.require_type" placeholder="请选择">
              <el-option
                v-for="item in conditions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="item" v-if="postForm.require_type==3">
          <div class="left">消费额设置</div>
          <div class="right">
            <el-input v-model="postForm.require_expense" type="number" min="0" placeholder="请输入消费额"
                      class="input"></el-input>
            <a> 元</a>
          </div>
        </div>
        <div class="item" v-if="postForm.require_type==1">
          <div class="left">门槛价格</div>
          <div class="right">
            <el-input v-model="postForm.require_price" type="number" min="0" placeholder="请输入价格"
                      class="input"></el-input>
            <a> 元</a>
          </div>
        </div>
        <div class="item">
          <div class="left">展示购买协议</div>
          <div class="right">
            <a style="margin-right: 5px">关闭 </a>
            <el-switch
              v-model="postForm.display_agreement"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            <a>展示</a>

          </div>
        </div>
        <div class="item">
          <div class="left">购买协议标题</div>
          <div class="right">
            <el-input v-model="postForm.agreement_title" placeholder="请输入内容"style="width:100%" class="input"></el-input>
          </div>
        </div>
        <div class="item">
          <div class="left">购买协议内容</div>
          <div class="right">
            <el-input
              type="textarea"
              :autosize="true"
              placeholder="请输入内容"
              v-model="postForm.agreement_content">
            </el-input>
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
    name: "SaleRule",
    data() {
      return {
        levels: [
          {
            value: 1,
            label: '一级'
          }, {
            value: 2,
            label: '二级'
          }, {
            value: 3,
            label: '三级'
          }
        ],
        conditions: [
          {
            value: 1,
            label: '直接购买'
          }, {
            value: 2,
            label: '购买任意商品'
          }, {
            value: 3,
            label: '消费额'
          }
        ],
        level: 3,
        postForm: {}
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
        if (this.postForm.require_type==1 && this.postForm.require_price=='') {
          this.$message({
            type: 'error',
            message: '门槛价格不能为空！'
          });
          return;
        }
        if (this.postForm.require_type==3 && this.postForm.require_expense=='') {
          this.$message({
            type: 'error',
            message: '消费额不能为空！'
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
        width: 600px;
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
          .left {
            width: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .right {
            font-size: 15px;
            a {
              font-size: 13px;
              margin-left: 10px;
            }
            .input {
              width: 120px;
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
