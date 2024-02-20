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
        <el-table :data="rotationList" style="width: 100%; margin:45px 0 100px 0;"
                  v-loading="rotationInfoLoading">
          <el-table-column label="" width="10">
          </el-table-column>
          <el-table-column :label="$t('public.height')" align="left" min-width="100">
            <template slot-scope="scope">
              <router-link
                v-if="rotation === '1'"
                class="cursor-p click"
                tag="a" :to="computePath('blockInfo', scope.row.blockHeight)">
                {{ scope.row.blockHeight }}
              </router-link>
              <span v-else>
                <span v-show="scope.row.blockHeight === 0 && scope.row.newTime - scope.row.times >= 0">
                  <i class="iconfont font20" :class="scope.row.yellow ? 'icon-huang yellow' : 'icon-huang yellow' "></i>
                </span>
                <router-link
                  v-show="scope.row.blockHeight !== 0"
                  class="cursor-p click"
                  tag="a" :to="computePath('blockInfo', scope.row.blockHeight)">
                  {{ scope.row.blockHeight === 0 ? '--': scope.row.blockHeight }}
                </router-link>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="time" :label="$t('public.time')" align="left" min-width="130"></el-table-column>
          <el-table-column prop="txCount" :label="$t('public.transactionNo')" min-width="160"
                           align="left"></el-table-column>
          <el-table-column prop="txid" :label="$t('public.outNode')" align="left" min-width="130">
            <template slot-scope="scope">
              <label class="cursor-p" v-show="scope.row.seedPacked ">
                {{$t('public.seedNode')}}
              </label>
              <router-link
                v-show="!scope.row.seedPacked"
                class="cursor-p click"
                tag="a" :to="computePath('ConsensusInfo', scope.row.agentHash)">
                {{ scope.row.agentName }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="order" :label="$t('rotationInfo.rotationInfo2')" min-width="100"
                           align="left"></el-table-column>
          <!-- <el-table-column prop="strua" label="state" width="120" align="center">
           </el-table-column>-->
          <el-table-column prop="fee" :label="$t('public.blockReward')+'(NULS)'" align="left" min-width="160">
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
        //Round number
        rotation: this.$route.query.rotation,
        //Round details
        rotationInfo: [],
        //Load animation for round details
        rotationInfoLoading: true,
        //Hidden switch
        hideSwitch: false,
        //List information
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
       * Obtain detailed information about the round based on the round number
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
                item.reward = item.reward ? timesDecimals(item.reward, 8) : 0;
                item.seedPacked = item.agentHash ? false : true;
              }
              this.rotationList = response.result.itemList;
              this.rotationInfoLoading = false;
            }
          })
      },

      /**
       * @disc: Red card display
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

      computePath(name, params) {
        return { name, query: name === 'blockInfo' ? {height: params} : {hash: params} }
      }
    },
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";
  .rotation-info {
    .bg-white {
      background: initial;
      .title{
        margin: 0 auto;
        padding: 24px 0;
        font-size: 20px;
        color: #000000;
      }
    }
    .info_tabs {
      margin: 0 auto 20px;
      h3{
        margin: 0;
      }
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
        margin: 10px 0 0 0;
        padding-bottom: 10px;
      }
    }
  }

  @media (max-width: 1220px){
    .rotation-info{
      .info_tabs{
        padding: 0 .5rem;
        .ul{
          .tabs_infos{
            width: 50%;
          }
        }
      }
    }
    .r_tab{
      padding: 0 .5rem;
    }
    .bg-white{
      padding: 0 .5rem;
    }
    .w1200{
      width: initial;
    }
  }
</style>
