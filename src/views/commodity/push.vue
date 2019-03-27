<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :class-name="'sub-navbar '+postForm.status">
        <!--<CommentDropdown v-model="postForm.comment_disabled" />-->
        <!--<PlatformDropdown v-model="postForm.platforms" />-->
        <!--<SourceUrlDropdown v-model="postForm.source_uri" />-->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
        <!--<el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>-->
      </sticky>

      <div class="createPost-main-container">
        <el-row>

          <!--<Warning />-->

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="name">
              <MDinput v-model="myPostForm.name" :maxlength="100" name="name" required>
                商品名称
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="分类:" prop="type" class="postInfo-container-item">
                    <el-select v-model="myPostForm.type" placeholder="请选择">
                      <el-option
                        v-for="item in TypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="价格:" class="postInfo-container-item" prop="price">
                    <el-input v-model="myPostForm.price" placeholder="请输入价格(元)" type="number" min="0"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="运费:" class="postInfo-container-item" prop="express">
                    <el-input v-model="myPostForm.express" placeholder="请输入价格(元)" type="number" min="0"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="库存:" class="postInfo-container-item" prop="num">
                    <el-input v-model="myPostForm.num" placeholder="请输入库存(件)" type="number" min="0"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="规格:" class="postInfo-container-item" >
                    <el-input v-for="(item,index) in specification" v-model="item.name" :placeholder="'请输入规格'+index"></el-input>
                    <el-button-group>
                      <el-button type="primary" icon="el-icon-plus" @click="addSpec"></el-button>
                      <el-button type="primary" icon="el-icon-minus" @click="reduceSpec"></el-button>
                    </el-button-group>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="状态:" class="postInfo-container-item">
                    <a>下架</a>
                    <el-switch
                      v-model="myPostForm.status"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                    <a>正常</a>

                  </el-form-item>
                </el-col>
              </el-row>

            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="45px" label="图片:" class="postInfo-container-item">
            </el-form-item>
          </el-col>
        </el-row>



        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="myPostForm.pic1"/>
        </el-form-item>
        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="myPostForm.pic2"/>
        </el-form-item>
        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="myPostForm.pic3"/>
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label-width="45px" label="详情:" class="postInfo-container-item">
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" :height="400" v-model="myPostForm.content"/>
        </el-form-item>

      </div>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import Upload from '@/components/Upload/singleImage3'
  import MDinput from '@/components/MDinput'
  import Sticky from '@/components/Sticky' // 粘性header组件
  import {validURL} from '@/utils/validate'
  import {fetchArticle} from '@/api/article'
  import {userSearch} from '@/api/remoteSearch'
  import Warning from './Warning'
  import {CommentDropdown, PlatformDropdown, SourceUrlDropdown} from './Dropdown'

  const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform'],
    comment_disabled: false,
    importance: 0
  }
  const myDefaultForm = {
    name: '',//商品名称
    type: '',//商品类型
    price: '',//商品价格
    express: '',//运费价格
    status: '',//商品状态
    specification:[],//商品规格
    num: '',//商品库存
    pic1:'',//商品图片1
    pic2:'',//商品图片2
    pic3:'',//商品图片3
    content:''//商品详情
  }
  export default {
    name: 'CommodityPush',
    components: {Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateRequire = (rule, value, callback) => {
        if (value === '') {
          this.$message({
            message: rule.field + '为必传项',
            type: 'error'
          })
          callback(new Error(rule.field + '为必传项'))
        } else {
          callback()
        }
      }
      const validateSourceUri = (rule, value, callback) => {
        if (value) {
          if (validURL(value)) {
            callback()
          } else {
            this.$message({
              message: '外链url填写不正确',
              type: 'error'
            })
            callback(new Error('外链url填写不正确'))
          }
        } else {
          callback()
        }
      }
      return {
        postForm: Object.assign({}, defaultForm),
        myPostForm: Object.assign({}, myDefaultForm),
        loading: false,
        userListOptions: [],
        rules: {
          // image_uri: [{validator: validateRequire}],
          name: [{validator: validateRequire}],
          price: [{validator: validateRequire}],
          express: [{validator: validateRequire}],
          num: [{validator: validateRequire}],
          type: [{validator: validateRequire}],
          content: [{validator: validateRequire}],
          source_uri: [{validator: validateSourceUri, trigger: 'blur'}]
        },
        tempRoute: {},
        TypeOptions: [
          {
            value: '1',
            label: '包'
          },
          {
            value: '2',
            label: '化妆品'
          },
          {
            value: '3',
            label: '日用品'
          }
        ],
        typeNum: 1,
        specification: [{name: ''}],
      }
    },
    computed: {
      contentShortLength() {
        return this.postForm.content_short.length
      },
      lang() {
        return this.$store.getters.language
      }
    },
    created() {
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        this.fetchData(id)
      } else {
        this.postForm = Object.assign({}, defaultForm)
      }

      // Why need to make a copy of this.$route here?
      // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
      // https://github.com/PanJiaChen/vue-element-admin/issues/1221
      this.tempRoute = Object.assign({}, this.$route)
    },
    methods: {
      fetchData(id) {
        fetchArticle(id).then(response => {
          this.postForm = response.data
          // Just for test
          this.postForm.title += `   Article Id:${this.postForm.id}`
          this.postForm.content_short += `   Article Id:${this.postForm.id}`

          // Set tagsview title
          this.setTagsViewTitle()
        }).catch(err => {
          console.log(err)
        })
      },
      setTagsViewTitle() {
        const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
        const route = Object.assign({}, this.tempRoute, {title: `${title}-${this.postForm.id}`})
        this.$store.dispatch('updateVisitedView', route)
      },
      submitForm() {
        // this.postForm.display_time = parseInt(this.display_time / 1000)
        // console.log(this.postForm)
        // this.$refs.postForm.validate(valid => {
        //   if (valid) {
        //     this.loading = true
        //     this.$notify({
        //       title: '成功',
        //       message: '发布文章成功',
        //       type: 'success',
        //       duration: 2000
        //     })
        //     this.postForm.status = 'published'
        //     this.loading = false
        //   } else {
        //     console.log('error submit!!')
        //     return false
        //   }
        // })


      },
      draftForm() {
        if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
          this.$message({
            message: '请填写必要的标题和内容',
            type: 'warning'
          })
          return
        }
        this.$message({
          message: '保存成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
        this.postForm.status = 'draft'
      },
      getRemoteUserList(query) {
        userSearch(query).then(response => {
          if (!response.data.items) return
          this.userListOptions = response.data.items.map(v => v.name)
        })
      },
      addSpec(){
        if(this.specification.length<10){
          this.specification.push({name:''})
        }
      },
      reduceSpec(){
        if(this.specification.length>1){
          this.specification.splice(this.specification.length-1)
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>
