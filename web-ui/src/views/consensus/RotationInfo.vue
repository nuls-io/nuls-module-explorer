<template>
  <div class="rotation-info bg-gray" v-loading="rotationInfoLoading">
    <div class="bg-white">
      <h2 class="title w1200 font16 fw">{{rotation}} {{$t('rotationInfo.rotationInfo0')}}</h2>
    </div>
    <div class="info_tabs w1200">
      <h3 class="tabs_title tabs_header capitalize">{{$t('public.basicInfo')}}</h3>
      <ul class="ul">
        <li class="tabs_infos fl"><p>{{$t('consensus.consensus9')}}<span class="mobile_s">{{rotationInfo.startTime}}-{{rotationInfo.endTime}}</span>
        </p></li>
        <li class="tabs_infos fl"><p>{{$t('public.yellowCard')}}<span>{{rotationInfo.yellowCardCount}}</span></p></li>
        <li class="tabs_infos fl"><p>{{$t('consensus.consensus10')}}<span>{{rotationInfo.memberCount}}</span></p></li>
        <li class="tabs_infos fl"><p>{{$t('public.redCard')}}<span>{{rotationInfo.redCardCount}}</span></p></li>
        <li class="tabs_infos fl"><p>{{$t('consensus.consensus11')}} <span>{{rotationInfo.producedBlockCount}}</span>
        </p></li>
        <li class="tabs_infos fl"><p>{{$t('public.lostRate')}}<span>{{rotationInfo.lostRate}}</span></p></li>
      </ul>
    </div>
    <div class="r_tab w1200">
      <el-col :span="24">
        <h4 class="cards-title font16">{{$t('rotationInfo.rotationInfo3')}}</h4>
        <el-switch class="hide-switch fr" v-model="hideSwitch"
                   @change="showRY"
                   :width="32"
                   :inactive-text="$t('rotationInfo.rotationInfo1')">
        </el-switch>
        <el-table :data="rotationList" stripe border style="width: 100%; margin:45px 0 100px 0;"
                  v-loading="rotationInfoLoading">
          <el-table-column label="" width="30">
          </el-table-column>
          <el-table-column :label="$t('public.height')" width="120" align="left">
            <template slot-scope="scope">
              <span v-if="rotation === '1' " class="cursor-p click" @click="toUrl('blockInfo',scope.row.blockHeight)">{{ scope.row.blockHeight }}</span>
              <span v-else>
                <span v-show="scope.row.blockHeight === 0 && scope.row.newTime - scope.row.times >= 0">
                  <i class="iconfont font20" :class="scope.row.yellow ? 'icon-huang yellow' : 'icon-huang yellow' "></i>
                </span>
                <span v-show="scope.row.blockHeight !== 0" class="cursor-p click"
                      @click="toUrl('blockInfo',scope.row.blockHeight)">
                  {{ scope.row.blockHeight === 0 ? '--': scope.row.blockHeight }}
                </span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="time" :label="$t('public.time')" width="160" align="left"></el-table-column>
          <el-table-column prop="txCount" :label="$t('public.transactionNo')" width="120"
                           align="left"></el-table-column>
          <el-table-column prop="txid" :label="$t('public.outNode')" min-width="180" align="left">
            <template slot-scope="scope">
              <label class="cursor-p" v-show="scope.row.seedPacked ">
                {{$t('public.seedNode')}}
              </label>
              <span class="cursor-p click" @click="toUrl('consensusInfo',scope.row.agentHash)"
                    v-show="!scope.row.seedPacked">
                {{ scope.row.agentName}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="order" :label="$t('rotationInfo.rotationInfo2')" width="120"
                           align="left"></el-table-column>
          <!-- <el-table-column prop="strua" label="状态" width="120" align="center">
           </el-table-column>-->
          <el-table-column prop="fee" :label="$t('public.blockReward')+'(NULS)'" width="120" align="left">
            <template slot-scope="scope">
              {{ scope.row.reward}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {getLocalTime, timesDecimals} from '@/api/util.js'

  export default {
    data() {
      return {
        //轮次编号
        rotation: this.$route.query.rotation,
        //轮次详情
        rotationInfo: [],
        //轮次详情加载动画
        rotationInfoLoading: true,
        //隐藏开关
        hideSwitch: false,
        //列表信息
        rotationList: [],
        rotationListOld: [],
      }
    },
    created() {
      this.getRotationInfo(this.rotation);
    },
    mounted() {
    },
    methods: {

      /**
       * 获轮次详细信息根据轮次编号
       */
      getRotationInfo(rotation) {
        this.$post('/', 'getRoundInfo', [rotation])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              response.result.startTime = moment(getLocalTime(response.result.startTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              response.result.endTime = moment(getLocalTime(response.result.endTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              //response.result.lostRate = Times(response.result.lostRate, 100).toString();
              this.rotationInfo = response.result;

              for (let item of  response.result.itemList) {
                item.times = item.time;
                let date = new Date();
                let min = date.getSeconds();
                date.setSeconds(min - 10);
                let newTime = date.getTime().toString();
                item.newTime = Number(newTime.substring(0, newTime.length - 3));
                item.time = moment(getLocalTime(item.time * 1000)).format('YYYY-MM-DD HH:mm:ss');
                item.reward = timesDecimals(item.reward, 8);
                item.seedPacked = item.agentHash ? false : true;
              }
              this.rotationList = response.result.itemList;
              this.rotationInfoLoading = false;
            }
          })
      },

      /**
       * @disc: 红牌显示
       * @params:
       * @date: 2019-09-19 16:49
       * @author: Wave
       */
      showRY() {
        if (this.hideSwitch) {
          this.rotationListOld = this.rotationList;
          let newList = [];
          for (let item of this.rotationList) {
            if (item.yellow) {
              newList.push(item)
            }
          }
          this.rotationList = newList;
        } else {
          this.rotationList = this.rotationListOld;
        }
      },

      /**
       * url 连接跳转
       * @param name
       * @param parmes
       */
      toUrl(name, parmes) {
        this.$router.push({
          name: name,
          query: name === 'blockInfo' ? {height: parmes} : {hash: parmes}
        })
      },

    },
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .rotation-info {
    .bg-white {
      height: 70px;
      .title {
        margin: 20px auto;
      }
    }
    .info_tabs {
      margin: 0 auto 20px;
      .ul {
        min-height: 130px;
        li {
          p {
            .mobile_s {
              @media screen and (max-width: 1000px) {
                font-size: 0.8rem;
              }
            }
          }
        }
      }
    }

    .r_tab {
      @media screen and (max-width: 1000px) {
        width: 95%;
      }
      .titles {
        margin: 20px auto 0;
        padding-bottom: 5px;
        border-bottom: @BD1;
      }
      .cards-title {
        float: left;
        line-height: 40px;
      }
      .hide-switch {
        margin: 20px 0 0 0;
        padding-bottom: 10px;
      }
    }

  }
</style>
