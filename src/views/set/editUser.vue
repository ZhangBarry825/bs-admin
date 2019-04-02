<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :class-name="'sub-navbar '+postForm.status">
        <!--<CommentDropdown v-model="postForm.comment_disabled" />-->
        <!--<PlatformDropdown v-model="postForm.platforms" />-->
        <!--<SourceUrlDropdown v-model="postForm.source_uri" />-->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">确定
        </el-button>
        <!--<el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>-->
      </sticky>

      <div class="createPost-main-container" style="width: 500px">

        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="头像:">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="/api/admin/upload/upload"
            name="files">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="手机号(账号):">
          <el-input
            :rows="1"
            v-model="myPostForm.username"
            type="number"
            class="article-textarea"
            autosize
            placeholder="请输入手机号"/>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="角色">
          <el-select v-model="myPostForm.roles" placeholder="请选择" disabled>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="昵称:">
          <el-input
            :rows="1"
            v-model="myPostForm.nickname"
            type="text"
            class="article-textarea"
            autosize
            placeholder="请输入昵称"/>
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="姓名:">
          <el-input
            :rows="1"
            v-model="myPostForm.name"
            type="text"
            class="article-textarea"
            autosize
            placeholder="请输入姓名"/>
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="密码:">
          <el-input
            :rows="1"
            v-model="myPostForm.password"
            type="password"
            class="article-textarea"
            autosize
            placeholder="请输入密码"/>
        </el-form-item>

        <el-form-item style="margin-bottom: 40px;" label-width="100px" label="确认密码:">
          <el-input
            :rows="1"
            v-model="myPostForm.repeatPassword"
            type="password"
            class="article-textarea"
            autosize
            placeholder="请确认密码"/>
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
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { userSearch } from '@/api/remoteSearch'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import { newUser } from '@/api/user'
import { userInfo } from '@/api/user'
import { getUserDetail } from '@/api/user'
import { updateUser } from '@/api/user'

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
  name: '',
  nickname: '',
  username: '',
  password: '',
  repeatPassword: '',
  avatar: ''
}
export default {
  name: 'EditUser',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
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
        name: [{ validator: validateRequire }],
        price: [{ validator: validateRequire }],
        express: [{ validator: validateRequire }],
        num: [{ validator: validateRequire }],
        type: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {},
      imageUrl: '',
      options: [
        {
          value: 'admin',
          label: '系统管理员'
        }, {
          value: 'manager',
          label: '普通管理员'
        }
      ]
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
  mounted() {
    this.fetchDetail()
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
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('updateVisitedView', route)
    },
    submitForm() {
      console.log(this.myPostForm)
      if (this.myPostForm.avatar == '') {
        this.$message({
          type: 'error',
          message: '请上传头像！'
        })
      } else if (this.myPostForm.username == '') {
        this.$message({
          type: 'error',
          message: '手机号不能为空！'
        })
      } else if (!(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(this.myPostForm.username))) {
        this.$message({
          type: 'error',
          message: '请输入正确的手机号！'
        })
      } else if (this.myPostForm.nickname == '') {
        this.$message({
          type: 'error',
          message: '昵称不能为空！'
        })
      } else if (this.myPostForm.name == '') {
        this.$message({
          type: 'error',
          message: '姓名不能为空！'
        })
      } else if (this.myPostForm.password == '') {
        this.$message({
          type: 'error',
          message: '密码不能为空！'
        })
      } else if (this.myPostForm.password.length < 6) {
        this.$message({
          type: 'error',
          message: '密码必须大于6位！'
        })
      } else if (this.myPostForm.repeatPassword == '') {
        this.$message({
          type: 'error',
          message: '请确认密码！'
        })
      } else if (this.myPostForm.repeatPassword != this.myPostForm.password) {
        this.$message({
          type: 'error',
          message: '两次密码不一致！'
        })
      } else {
        updateUser(this.myPostForm).then(response => {
          console.log(response)
          this.postForm.status = 'published'
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })

          getUserDetail(this.myPostForm.id).then(response => {
            this.$store.commit('SET_AVATAR', response.data.avatar)
          }).catch(err => {
            console.log(err)
          })
        })
      }
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
    addSpec() {
      if (this.specification.length < 10) {
        this.specification.push({ name: '' })
      }
    },
    reduceSpec() {
      if (this.specification.length > 1) {
        this.specification.splice(this.specification.length - 1)
      }
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.myPostForm.avatar = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    fetchDetail() {
      userInfo().then(response => {
        console.log(response)
        getUserDetail(response.data.id).then(response1 => {
          this.myPostForm = response1.data
          this.myPostForm.password = ''
          this.imageUrl = 'http://bs-api.barry.umdev.cn/' + response1.data.avatar
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    border: 1px solid gainsboro;
    border-radius: 10px;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    border-radius: 10px;
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
