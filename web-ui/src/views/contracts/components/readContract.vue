<template>
    <div class="read-contract">
        <div class="contract-method" v-for="(item, index) in modelData" :key="index">
            <span class="font14">{{ index + 1 }}.{{ item.name }}</span>
            <div>
                <img src="../img/lianjie.png" alt="">
                <img src="../img/zhankai.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { RUN_DEV} from '@/config'
export default {
    data() {
        return {
            searchContract: 'NULSd6Hgz4RrwwbJLSoJkrmMn9zaxvH6xwey7',
            modelData: [] //合约方法列表
        }
    },
    created(){
        this.getReadContract()
    },
    methods:{
        async getReadContract(){
            let chainId = null
            if(sessionStorage.getItem('chainId')){
                chainId = sessionStorage.getItem('chainId')
            }else{
                chainId = RUN_DEV ? 1 : 2;
            }
            const params = {"jsonrpc": "2.0", "method": 'getContract', "params": [Number(chainId),this.searchContract], "id": Math.floor(Math.random() * 1000)};
            const res = await axios.post('/',params)
            console.log(res, 'vvvvvvvvvvvvvvvvv')
            this.modelList(res.data.result.methods)
        },
        modelList(val) {
            let newData = val.filter(obj => !obj.event);
            newData = newData.filter(obj => obj.name !== '<init>');
            const array = newData
            array.forEach(element => {
                if(element.view){
                    this.modelData.push(element)
                }
            });
        },
    }
}
</script>

<style scoped lang="less">
.read-contract {
    .contract-method {
        margin-top: 12px;
        height: 44px;
        background: #F9FBFF;
        border: 1px solid #EBEBF4;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 16px;

        span {
            color: #000000;
        }

        div {
            img {
                margin-right: 16px;
            }
        }
    }
}
</style>