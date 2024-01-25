import moment from 'moment';
import { divisionDecimals, getLocalTime, timesDecimals } from '@/api/util';

export default {
  data() {
    return {
      // contractType: 'all'/'nrc20'/nrc721'/nrc1155
      hideSwitch: false,
      list: [],
      listLoading: true,
      pager: {
        total: 0,
        page: 1,
        rows: 15,
      }
    }
  },
  created() {
    const type = this.contractType === 'nrc20' ? 1 : -1;
    this.getContractList(type, false);
  },
  methods: {
    /**
     * Get a list of all contracts
     * @param type All contracts：-1、nrc20：1、nrc721：
     * @param hideNrc20 {boolean}
     */
    getContractList(type, hideNrc20) {
      const { page, rows } = this.pager;
      const contractType = this.contractType
      let method, params
      if (contractType === 'all' || contractType === 'nrc20') {
        method = 'getContractList'
        params = [page, rows, type, hideNrc20]
      } else {
        params = [page, rows]
        method = contractType === 'nrc721' ? 'getNrc721List' : 'getNrc1155List'
      }
      // const method = this.contractType !== 'nrc721' ? 'getContractList' : 'getNrc721List';
      // const params = this.contractType !== 'nrc721' ? [page, rows, type, hideNrc20] : [page, rows]
      this.$post('/', method, params)
        .then((response) => {
          //console.log(response);
          if (response.hasOwnProperty("result")) {
            for (let item of response.result.list) {
              item.createTime = moment(getLocalTime(item.createTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              if (this.contractType === 'nrc20') {
                if (item.decimals !== 0) {
                  item.totalSupply = timesDecimals(item.totalSupply, item.decimals);
                  item.fee = divisionDecimals(item.balance, this.decimals);
                }
              }
            }
            this.list = response.result.list;
            this.listLoading = false;
            this.pager.total = response.result.totalCount;
          }
        }).catch((error) => {
        console.log(error)
      })
    },
    changePageList() {
      if (this.contractType === 'all') {
        this.getContractList(-1, this.hideSwitch)
      } else if (this.contractType === 'nrc20') {
        this.getContractList(1, false)
      } else {
        this.getContractList(1, false);
      }
    },

    /**
     * hideNRC-20contract
     */
    hideNrc20List() {
      this.listLoading = true;
      this.getContractList(-1, this.hideSwitch);
    },

    /**
     * url Connection jump
     * @param name
     * @param contractAddress
     */
    toUrl(name, contractAddress) {
      let newQuery = {};
      if (name === 'contractsInfo') {
        newQuery = {contractAddress: contractAddress, tabName: 'first'}
      }else {
        newQuery = {contractAddress: contractAddress}
      }
      this.$router.push({
        name: name,
        query: newQuery
      })
    }
  }
}
