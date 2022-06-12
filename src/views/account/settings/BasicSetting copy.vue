<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">

        <a-form layout="vertical">
          <a-form-item
            :label="$t('account.settings.basic.nickname')"
          >
            <a-input :placeholder="$t('account.settings.basic.nickname-message')" v-model="loginName" />
          </a-form-item>
          <a-form-item
            :label="$t('account.settings.basic.profile')"
          >
            <a-textarea rows="4" :placeholder="$t('account.settings.basic.profile-message')" v-model="userDescription"/>
          </a-form-item>

          <a-form-item
            :label="$t('account.settings.basic.phone')"
            :required="false"
          >
            <a-input placeholder="example@ant.design" v-model="userPhone"/>
          </a-form-item>

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
          <img :src="userAvatar"/>
        </div>
        <div class="upload-button">
          <a-upload
            name="file"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :headers="headers"
            @change="handleChange"
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

export default {
  mixins: [baseMixin],
  components: {
    AvatarModal
  },
  data () {
    return {
      loginName: '',
      userAvatar: '',
      userDescription: '',
      userPhone: '',
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo'])
  },
  created () {
    this.loginName = this.currentUserInfo.loginName
    this.userAvatar = this.currentUserInfo.userAvatar
    this.userDescription = this.currentUserInfo.userDescription
    this.userPhone = this.currentUserInfo.userPhone
  },
  methods: {
    setavatar (url) {
      this.option.img = url
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
