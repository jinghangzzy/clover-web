<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <a-divider>用户资料</a-divider>
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="currentUserInfo.userAvatar">
            </div>
            <div class="username">{{ currentUserInfo.loginName }}
              <a-icon v-if="currentUserInfo.userGender !== 2 " type="man" :style="{ fontSize: '18px', color: '#08c' }"/>
              <a-icon v-if="currentUserInfo.userGender === 2 " type="woman" :style="{ fontSize: '18px', color: '#ff4777' }"/>
            </div>
            <div class="bio">{{ currentUserInfo.userDescription }}</div>
          </div>
          <div class="account-center-detail" style="text-align: center;margin-bottom: 24px;">
            <div>
              <a-icon type="phone" style="width: 20px;margin-bottom: 12px;"/>{{ currentUserInfo.userPhone }}
            </div>
            <div>
              <a-icon type="mail" style="width: 20px;"/>{{ currentUserInfo.userEmail }}
            </div>
          </div>
          <!-- <a-divider/> -->
          <div style="margin-bottom: 100px;">
            <div style="text-align: center;padding-left: 8px; padding-right: 8px;align: center;width:50%;float:left;">
              <div style="font-size: 12px;">注册时间</div>
              <div style="font-size: 19px;color: rgb(24, 144, 255);"><a-icon type="clock-circle" theme="twoTone" :style="{fontSize: '18px',width: '30px'}"/>{{ time }}天</div>
            </div>
            <div style="text-align: center;padding-left: 8px; padding-right: 8px;align: center;width:50%;float:left;">
              <div style="font-size: 12px;">上次登录时间</div>
              <div style="font-size: 17px;color: rgb(24, 144, 255);">{{ lastLoginTime }}</div>
            </div>
          </div>
          <!-- <a-divider/> -->

          <div class="account-center-team">
            <a-divider>所在项目</a-divider>
            <a-spin :spinning="teamSpinning">
              <div class="members">
                <a-row>
                  <a-col :span="12" v-for="(item, index) in teams" :key="index">
                    <a>
                      <a-avatar size="small" :src="item.avatar"/>
                      <span class="member">{{ item.name }}</span>
                    </a>
                  </a-col>
                </a-row>
              </div>
            </a-spin>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card>
          <a-divider><a-icon type="history" :style="{fontSize: '18px',width: '30px'}"/>本月最近30条登录记录</a-divider>
          <a-table :columns="columns" :data-source="loginHistoryList" bordered :pagination="false" :rowKey="columns.key"> >
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { AppPage, ArticlePage, ProjectPage } from './page'

import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import { loginHistory } from '@/api/login'
export default {
  components: {
    RouteView,
    PageView,
    AppPage,
    ArticlePage,
    ProjectPage
  },
  data () {
    return {
      teams: [],
      teamSpinning: true,

      columns: [
        {
          title: '登录时间',
          dataIndex: 'loginTime',
          key: 'loginTime',
          ellipsis: true
        },
        {
          title: '登录IP',
          dataIndex: 'loginIp',
          key: 'loginIp',
          ellipsis: true
        },
        {
          title: '登录方式',
          dataIndex: 'loginType',
          key: 'loginType',
          ellipsis: true
        },
        {
          title: '登录地点',
          dataIndex: 'city',
          key: 'city',
          ellipsis: true
        }
      ],
      hasLoginHistory: false,
      loginHistoryList: [],
      lastLoginTime: '',

      tabListNoTitle: [
        {
          key: 'article',
          tab: '文章(8)'
        },
        {
          key: 'app',
          tab: '应用(8)'
        },
        {
          key: 'project',
          tab: '项目(8)'
        }
      ],
      noTitleKey: 'app'
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo'])
  },
  created () {
    this.createTime = this.currentUserInfo.createTime
    this.nowTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    this.time = dayjs(this.nowTime).diff(dayjs(this.createTime), 'day')
  },
  mounted () {
    this.getLoginHistory()
    this.getTeams()
  },
  methods: {
    getTeams () {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
        this.teamSpinning = false
      })
    },

    getLoginHistory () {
      loginHistory().then(response => {
        if (response.success) {
            this.hasLoginHistory = true
            this.loginHistoryList = response.data.loginHistory
            this.loginHistoryList.forEach(item => { item.loginType === 1 ? item.loginType = '账号密码登录' : item.loginType = '短信登录' })

            this.lastLoginTime = response.data.lastLoginTime
        } else {
            this.hasLoginHistory = false
            this.lastLoginTime = '当月无登录记录'
        }
      })
    },

    handleTabChange (key, type) {
      this[type] = key
    },

    handleTagClose (removeTag) {
      const tags = this.tags.filter(tag => tag !== removeTag)
      this.tags = tags
    },

    showTagInput () {
      this.tagInputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.focus()
      })
    },

    handleInputChange (e) {
      this.tagInputValue = e.target.value
    },

    handleTagInputConfirm () {
      const inputValue = this.tagInputValue
      let tags = this.tags
      if (inputValue && !tags.includes(inputValue)) {
        tags = [...tags, inputValue]
      }

      Object.assign(this, {
        tags,
        tagInputVisible: false,
        tagInputValue: ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;

    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }

    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }

  .account-center-detail {
    p {
      margin-bottom: 18px;
      padding-left: 46px;
      position: relative;
    }

  }

  .account-center-tags {
    .ant-tag {
      margin-bottom: 8px;
    }
  }

  .account-center-team {
    .members {
      a {
        display: block;
        margin: 12px 0;
        line-height: 24px;
        height: 24px;
        .member {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          max-width: 100px;
          vertical-align: top;
          margin-left: 12px;
          transition: all 0.3s;
          display: inline-block;
        }
        &:hover {
          span {
            color: #1890ff;
          }
        }
      }
    }
  }

  .tagsTitle,
  .teamTitle {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 12px;
  }
}
</style>
