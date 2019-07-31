<template>
  <div class="calcbar">
    <h5 class="font20 fw">{{$t('cale.cale0')}}</h5>
    <div class="tab">
      <el-radio-group v-model="radio">
        <el-radio :label="1">{{$t('cale.cale1')}}</el-radio>
        <el-radio :label="2" class="mr_50">{{$t('type.4')}}</el-radio>
      </el-radio-group>
    </div>

    <div class="result">
      <ul>
        <li>{{$t('cale.cale3')}}<label>{{parrakeInfo.day}} <span class="fCN">{{symbol}}</span></label></li>
        <li>{{$t('cale.cale4')}}<label>{{parrakeInfo.week}} <span class="fCN">{{symbol}}</span></label></li>
        <li>{{$t('cale.cale5')}}<label>{{parrakeInfo.month}} <span class="fCN">{{symbol}}</span></label></li>
        <li>{{$t('cale.cale6')}}<label>{{parrakeInfo.year}} <span class="fCN">{{symbol}}</span></label></li>
      </ul>
    </div>

    <div class="caleFrom partake" v-show="radio.toString() === '1' ">
      <el-form :model="partakeForm" :rules="partakeRules" ref="partakeForm">
        <el-form-item :label="$t('public.entrust')" prop="entrust">
          <el-input v-model="partakeForm.entrust"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.proportion')+'(%)'" prop="ratio">
          <el-input v-model="partakeForm.ratio"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.creditValue')" prop="credit">
          <el-input v-model="partakeForm.credit"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.allEntrust')" prop="allEntrust">
          <el-input v-model="partakeForm.allEntrust"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="caleFrom partake" v-show="radio.toString() === '2' ">
      <el-form :model="newNodeFrom" :rules="newNodeRules" ref="newNodeFrom">
        <el-form-item :label="$t('public.bond')" prop="newEnsure">
          <el-input v-model="newNodeFrom.newEnsure"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.proportion') +'(%)'" prop="newRadio">
          <el-input v-model="newNodeFrom.newRadio"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.creditValue')" prop="newCredit">
          <el-input v-model="newNodeFrom.newCredit"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.allEntrust')" prop="newAllEntrust">
          <el-input v-model="newNodeFrom.newAllEntrust"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.entrust')" prop="newEntrust">
          <el-input v-model="newNodeFrom.newEntrust"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {BigNumber} from 'bignumber.js'

  export default {
    data() {
      let checkEntrust = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('cale.cale7')))
        }
        value = Number(value);
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 2000 || value > 500000) {
            callback(new Error(this.$t('cale.cale8')))
          } else {
            callback()
          }
        } else {
          callback(new Error(this.$t('cale.cale9')))
        }
      };
      let checkRatio = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('cale.cale10')))
        }
        value = Number(value);
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 10 || 100 < value) {
            callback(new Error(this.$t('cale.cale11')))
          } else {
            callback()
          }
        } else {
          callback(new Error(this.$t('cale.cale12')))
        }
      };
      let checkCredit = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('cale.cale13')))
        }
        value = Number(value);
        if (typeof value === 'number' && !isNaN(value)) {
          if (value >= 0 && 1 < value) {
            callback(new Error(this.$t('cale.cale14')))
          } else {
            callback()
          }
        } else {
          callback(new Error(this.$t('cale.cale15')))
        }
      };
      let checkAllEntrust = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('cale.cale16')))
        }
        value = Number(value);
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 200000 || value > 100000000) {
            callback(new Error(this.$t('cale.cale17')))
          } else {
            callback()
          }
        } else {
          callback(new Error(this.$t('cale.cale18')))
        }
      };

      let checkNewEnsure = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('cale.cale19')))
        }
        value = Number(value);
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 20000 || value > 200000) {
            callback(new Error(this.$t('cale.cale20')))
          } else {
            callback()
          }
        } else {
          callback(new Error(this.$t('cale.cale21')))
        }
      };
      let checkNewRatio = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('cale.cale10')))
        }
        value = Number(value);
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 10 || 100 < value) {
            callback(new Error(this.$t('cale.cale11')))
          } else {
            callback()
          }
        } else {
          callback(new Error(this.$t('cale.cale12')))
        }
      };
      let checkNewCredit = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('cale.cale13')))
        }
        value = Number(value);
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 0 || value > 1) {
            callback(new Error(this.$t('cale.cale14')))
          } else {
            callback()
          }
        } else {
          callback(new Error(this.$t('cale.cale15')))
        }
      };
      let checkNewAllEntrust = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('cale.cale16')))
        }
        value = Number(value);
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 200000 || value > 100000000) {
            callback(new Error(this.$t('cale.cale17')))
          } else {
            callback()
          }
        } else {
          callback(new Error(this.$t('cale.cale18')))
        }
      };
      let checkNewEntrust = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('cale.cale22')))
        }
        value = Number(value);
        if (typeof value === 'number' && !isNaN(value)) {
          if (value < 200000 || value > 500000) {
            callback(new Error(this.$t('cale.cale23')))
          } else {
            callback()
          }
        } else {
          callback(new Error(this.$t('cale.cale24')))
        }
      };
      return {
        radio: 1,
        //委托节点计算器
        partakeForm: {
          entrust: 2000,
          ratio: 10,
          credit: 1,
          allEntrust: this.$store.state.NULSNumber.consensusTotal / 100000000,
        },
        partakeRules: {
          entrust: [{validator: checkEntrust, trigger: 'change'}],
          ratio: [{validator: checkRatio, trigger: 'change'}],
          credit: [{validator: checkCredit, trigger: 'change'}],
          allEntrust: [{validator: checkAllEntrust, trigger: 'change'}],
        },
        //创建节点计算器
        newNodeFrom: {
          newEnsure: 20000,
          newRadio: 10,
          newCredit: 1,
          newAllEntrust: this.$store.state.NULSNumber.consensusTotal / 100000000,
          newEntrust: 200000
        },
        newNodeRules: {
          newEnsure: [{validator: checkNewEnsure, trigger: 'change'}],
          newRadio: [{validator: checkNewRatio, trigger: 'change'}],
          newCredit: [{validator: checkNewCredit, trigger: 'change'}],
          newAllEntrust: [{validator: checkNewAllEntrust, trigger: 'change'}],
          newEntrust: [{validator: checkNewEntrust, trigger: 'change'}],
        },
        symbol:sessionStorage.hasOwnProperty('symbol') ? sessionStorage.getItem('symbol') :'NULS',//默认symbol
      };
    },
    created() {
    },
    watch: {
      radio(val, oldVal) {
        //console.log('new: %s, old: %s', val, oldVal);
        if (oldVal === 1) {
          this.$refs['partakeForm'].resetFields();
        } else {
          this.$refs['newNodeFrom'].resetFields();
        }
      }
    },
    computed: {
      parrakeInfo() {
        //this.count('partakeForm');
        let newInfo = {day: 0, week: 0, month: 0, year: 0};
        let BN = BigNumber.clone();
        BN.config({DECIMAL_PLACES: 4});
        if (this.radio.toString() === '2') {
          const newYear = this.newNodeFrom.newCredit * this.newNodeFrom.newEnsure * 5000000 / this.newNodeFrom.newAllEntrust
            + this.newNodeFrom.newCredit * this.newNodeFrom.newEntrust * 5000000 * this.newNodeFrom.newRadio * 0.01 / this.newNodeFrom.newAllEntrust;
          newInfo.year = BN(newYear).div(1).toNumber();
        } else {
          const newYear = this.partakeForm.credit * (1 - this.partakeForm.ratio * 0.01) * 5000000 * this.partakeForm.entrust / this.partakeForm.allEntrust;
          newInfo.year = BN(newYear).div(1).toNumber();
        }
        newInfo.month = BN(newInfo.year).div(12).toNumber();
        newInfo.day = BN(newInfo.year).div(365).toNumber();
        newInfo.week = BN(newInfo.day).multipliedBy(7).toNumber();
        return newInfo
      }
    },
    methods: {
      count(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  .calcbar {
    h5 {
      border-bottom: @BD1;
      margin: -35px 0 0 0;
      padding-bottom: 20px;
    }
    .tab {
      margin: 20px 0 14px;
    }
    .result {
      width: 100%;
      height: 91px;
      margin: 0 auto;
      background-color: @Bcolour1;
      border: @BD1;
      ul {
        li {
          width: 325px;
          height: 40px;
          float: left;
          line-height: 40px;
          color: @Acolor3;
          &:nth-child(1) {
            border-bottom: @BD1;
            margin: 5px 0 0 20px;
            padding: 0 20px 0 0;
          }
          &:nth-child(2) {
            border-bottom: @BD1;
            margin: 5px 0 0 0;
            padding: 0 0 0 20px;
          }
          &:nth-child(2n) {
            border-left: @BD1;
          }
          &:nth-child(3) {
            margin: 0 0 0 20px;
            padding: 0 20px 0 0;
          }
          &:nth-child(4) {
            padding: 0 0 0 20px;
          }
          label {
            float: right;
            color: @Acolor;
          }
        }
      }
    }

    .caleFrom {
      background-color: @Bcolour1;
      margin: 20px 0 0 0;
      padding: 10px 20px;
      .el-form-item__label {
        color: @Acolor3;
      }
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: @Ncolour !important;
    }

    @media screen and (max-width: 1000px) {
      .result {
        ul {
          li {
            width: 46%;
            &:nth-child(1) {
              border-bottom: @BD1;
              margin: 0.25rem 0 0 1rem;
              padding: 0 1rem 0 0;
            }
            &:nth-child(2) {
              border-bottom: @BD1;
              margin: 0.25rem 0 0 0;
              padding: 0 0 0 1rem;
            }
            &:nth-child(2n) {
              border-left: @BD1;
            }
            &:nth-child(3) {
              margin: 0 0 0 1rem;
              padding: 0 1rem 0 0;
            }
            &:nth-child(4) {
              padding: 0 0 0 1rem;
            }
            label {
              span {
                display: none;
              }
            }
          }
        }
      }
    }

  }

</style>
