<template>
  <div :class="wrpCls">
    <a-space align="start">
      <a-tooltip title="联系作者">
        <a-icon type="wechat" theme="filled" style="font-size: 16px;cursor: pointer;" @click="showModal"/>
      </a-tooltip>
      <a-tooltip title="消息中心">
        <a-icon type="bell" style="font-size: 16px;cursor: pointer;width: 80px" @click="goNotification"/>
      </a-tooltip>
      <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    </a-space>
    <div>
      <a-modal
        v-model="visibleModal"
        title="联系作者"
        on-ok="handleOk"
        width="380px"
        height="430px"
        :maskClosable="false">
        <template slot="footer">
          <a-button key="submit" type="primary" :loading="loadingModal" @click="handleOk">
            知道啦
          </a-button>
        </template>
        <p>
          <img src="../../../public\wechat.png" alt="微信二维码" width="330px" height="400px">
        </p>
      </a-modal>
    </div>
    <!-- <select-lang :class="prefixCls" /> -->
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'
import { mapState } from 'vuex'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  data () {
    return {
      showMenu: true,
      visibleModal: false,
      loadingModal: false
    }
  },
  methods: {
     showModal () {
        this.visibleModal = true
      },
      handleOk (e) {
        this.loadingModal = true
        setTimeout(() => {
          this.visibleModal = false
          this.loadingModal = false
        }, 400)
      },
      goNotification () {
        this.$router.push({ path: '/account/settings/notification' })
      }
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    },
    ...mapState({
      currentUser: state => state.user.currentUserInfo
    })
  }
}
</script>
