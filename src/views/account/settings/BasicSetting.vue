<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">

        <a-form layout="vertical">
          <a-form-item
            :label="$t('account.settings.basic.loginname')+'：(花名不可修改，联系管理员修改)'"
          >
            <a-input :placeholder="$t('account.settings.basic.loginname-message')" :disabled="true" v-model="loginName" />
          </a-form-item>

          <a-form-item
            :label="$t('account.settings.basic.username')+'：'"
          >
            <a-input
              :placeholder="$t('account.settings.basic.username-message')"
              v-model="userName"
              v-decorator="[
                'userName',
                { rules: [{ required: true, message: 'Please input your name' }] },
              ]"/>
          </a-form-item>

          <a-form-item
            :label="'性别：'"
          >
            <a-radio-group v-model="userGender" @change="onChange">
              <a-radio :value="0||1">
                男
              </a-radio>
              <a-radio :value="2">
                女
              </a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item
            :label="$t('account.settings.basic.profile')+'：'"
          >
            <a-textarea rows="4" :placeholder="$t('account.settings.basic.profile-message')" v-model="userDescription"/>
          </a-form-item>

          <!-- <a-form-item
            :label="$t('account.settings.basic.phone')"
            :required="false"
          >
            <a-input placeholder="example@ant.design" v-model="currentUserInfo.userPhone"/>
          </a-form-item> -->

          <a-form-item>
            <a-button type="primary">{{ $t('account.settings.basic.update') }}</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
          <!-- <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div> -->
          <img :src="currentUserInfo.userAvatar"/>
        </div>
        <div class="upload-button">
          <a-upload
            name="file"
            :before-upload="beforeUpload"
            @change="handleChange"
            :showUploadList="false"
            action="https://clover-api.codecareer.cn/api/user/userInfo/uploadAvatar"
            method="post"
            :headers="headers"
          >
            <a-button> <a-icon type="upload" /> 更换头像 </a-button>
          </a-upload>
        </div>
      </a-col>

    </a-row>

    <!-- <avatar-modal ref="modal" @ok="setavatar"/> -->

  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { baseMixin } from '@/store/app-mixin'
import { mapGetters } from 'vuex'
import storage from 'store'
import store from '@/store'

export default {
  mixins: [baseMixin],
  components: {
    AvatarModal
  },
  data () {
    return {
      file: '',
      headers: {
        'Access-Token': ''
      },
      loginName: '',
      userName: '',
      userGender: 0,
      userDescription: ''
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo'])
  },
  created () {
    this.headers['Access-Token'] = storage.get('Access-Token')
    this.loginName = this.currentUserInfo.loginName
    this.userName = this.currentUserInfo.userName
    this.userGender = this.currentUserInfo.userGender
    this.userDescription = this.currentUserInfo.userDescription
  },
  methods: {

    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        // this.$message.success(`${info.file.name} file uploaded successfully`)
        this.$message.success(`头像上传成功`)
        store.dispatch('GetInfo')
      } else if (info.file.status === 'error') {
        // this.$message.error(`${info.file.name} file upload failed.`)
        this.$message.error(`头像上传失败`)
      }
    },

    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('头像需要是JPG或PNG格式!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小需要小于2MB!')
      }
      if (isJpgOrPng && isLt2M) {
         this.file = file
      }
      return isJpgOrPng && isLt2M
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }

  .upload-button {
    text-align: center;
    margin:30px;
  }
</style>
