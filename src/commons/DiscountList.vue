<template>
    <div>
        <dl class="discount-tab">
            <dd v-for="discountTab in discountTabs" :key="discountTab.type" :class="discountTabClass(discountTab.type)" @click="changeDiscount(discountTab.type, $event)">
                {{discountTab.title}}
                <i>{{choseDiscountTab(discountTab.type)}}</i>
            </dd>
        </dl>
        <div class="lookText" @click="changeShowText($event, discountTabCur)">
            <span :class="textList ? 'chose-cur' : ''"></span>
            <label>只看有内容的评价</label>
        </div>
        <ul class="discount-list">
            <li v-for="(discount, idx) in totalShowList" :key="idx">
                <div class="discount-user-img">
                    <img :src="discount.avatar" :alt="discount.username">
                </div>
                <div class="discount-user">
                    <p class="discount-username">
                        <span>{{discount.username}}</span>
                        <span class="times">{{discount.rateTime | timers}}</span>
                    </p>
                    <Star v-if="discount.source" :starScore="discount.score" :isStarNumShow='isDiscountStarNumShow'></Star>
                    <p v-if="discount.text" class="dis-text">{{discount.text}}</p>
                    <dl v-if="discount.recommend && discount.recommend.length > 0" class="discount-high">
                        <dt>推荐：</dt>
                        <dd v-for="(dis, index) in discount.recommend">{{dis}}</dd>
                    </dl>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Star from './Star';

export default {
    name: 'DiscountList',
    components: {Star},
    data(){
        return {
            //评价tab
            discountTabs: [
                {
                    title: '全部',
                    type: 'ALL'
                },
                {
                    title: '满意',
                    type: 'HIGH'
                },
                {
                    title: '不满意',
                    type: 'FAIL'
                }
            ],
            discountTabCur: 'ALL',
            isDiscountStarNumShow: false
        }
    },
    props: ['totalList', 'goodList', 'badList', 'totalShowList', 'textList'],
    computed: {
        //根据不同type返回不同状态的评价数目
        choseDiscountTab(){
            return (type)=>{
                if(type === 'HIGH'){
                    return this.goodList.length
                }else if(type === 'FAIL'){
                    return this.badList.length
                }else{
                    return this.totalList.length
                }
            }
        }
    },
    methods: {
        ...mapActions([
            'discountListDispatch'
        ]),
        //评价tab类名
        discountTabClass(type){
            if(type === this.discountTabCur){
                return 'discount-cur'
            }else if(type === 'ALL' || type === 'HIGH'){
                return 'discount-normal'
            }else{
                return 'discount-fail'
            }
        },
        //切换评价tab触发事件
        changeDiscount(type, event){
            if(!event._constructed){
                return;
            }
            this.discountTabs.map((discountTab)=>{
                if(type === discountTab.type){
                    this.discountTabCur = type
                }
            });
            this.discountListDispatch(type);
        },
        //是否只显示有文字评价切换
        changeShowText(event, discountTabCur){
            if(!event._constructed){
                return;
            }
            this.$emit('changeShow', discountTabCur);
            this.discountListDispatch(discountTabCur);
        },
    },
    filters: {
        timers(val){
            const dates = new Date(val);
            const years = dates.getFullYear();
            let months = dates.getMonth() + 1;
            let days = dates.getDate();
            let hours = dates.getHours();
            let minutes = dates.getMinutes();

            if(months < 10) months = '0' + months;
            if(days < 10) days = '0' + days;
            if(hours < 10) hours = '0' + hours;
            if(minutes < 10) minutes = '0' + minutes;

            return `${years}-${months}-${days} ${hours} : ${minutes}`
        }
    }
}
</script>

<style scoped lang="scss">
@mixin flexRow{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    -webkit-flex-direction: row;
}
@mixin borderRadius($radius){
        -webkit-border-radius: $radius;
        -moz-border-radius: $radius;
        border-radius: $radius;
    }
.discount-tab{
    padding: .4rem 0 .4rem .4rem;
    dd{
        display: inline-block;
        margin-right: .16rem;
        padding: .2rem .3rem;
        &.discount-cur{
            background: #00a0dc;
            color: #fff;
        }
        &.discount-normal{
            background: rgba(0,160,220,0.2);
        }
        &.discount-fail{
            background: rgba(77,85,93,0.2);
        }
        i{
            font-style: normal;
            padding-left: .08rem;
        }
    }
}
.discount-list li{
    @include flexRow;
    padding: .3rem;
    border-top: .02rem solid #f3f3f3;
}
.discount-user-img{
    width: .56rem;
    margin-right: .24rem;
    img{
        width: .56rem;
        height: .56rem;
        @include borderRadius(50%)
    }
}
.discount-user{
    -webkit-flex: 1;
    flex: 1;
    .discount-username{
        @include flexRow;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        .times{
            color: #999;
        }
    }
    .discount-high{
        margin-top: .2rem;
        dt{
            display: inline-block;
            color: #00a0dc;
        }
        dd{
            display: inline-block;
            border: .02rem solid #999;
            margin: 0 .04rem .04rem;
            padding: .02rem .04rem;
            color: #999;
            @include borderRadius(.04rem);
        }
    }
}
.lookText{
        padding: .3rem 0 .3rem .4rem;
        border-top: .02rem solid #f3f3f3;
        @include flexRow;
        -webkit-align-items: center;
        align-items: center;
        span{
            width: .32rem;
            height: .32rem;
            border: .04rem solid #999;
            text-align: center;
            line-height: .32rem;
            margin-right: .08rem;
            position: relative;
            @include borderRadius(50%);
            &:before{
                content: '';
                display: block;
                width: .24rem;
                height: .24rem;
                position: absolute;
                left: .04rem;
                top: .04rem;
                background: #999;
                @include borderRadius(50%);
            }
            &.chose-cur{
                border: .04rem solid #00c850;
                &:before{
                    background: #00c850;
                }
            }
        }
    }
</style>
