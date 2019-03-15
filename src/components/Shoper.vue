<template>
    <div class="shoper" ref="shoperWrapper" v-show="seller">
        <div class="shoper-con">
            <div class="shoper-name">
                <div class="shoper-top-name">
                    <div class="shoper-top-name-l">
                        <h5>{{seller.name}}</h5>
                        <Star :starScore="seller.serviceScore" :isStarNumShow="isShoperStarNumShow"></Star>
                        <p>月售{{seller.sellCount}}单</p>
                    </div>
                    <div class="shoper-top-name-r" @click="collectFun($event)">
                        <span :class="isCollect ? 'collect-cur' : ''">收藏</span>
                    </div>
                </div>
                <div class="shoper-top-score">
                    <dl>
                        <dd>
                            <i>起送价</i>
                            <span><strong>{{seller.minPrice}}</strong>元</span>
                        </dd>
                        <dd></dd>
                        <dd>
                            <i>商家配送</i>
                            <span><strong>{{seller.deliveryPrice}}</strong>元</span>
                        </dd>
                        <dd></dd>
                        <dd>
                            <i>平均配送时间</i>
                            <span><strong>{{seller.deliveryTime}}</strong>分钟</span>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="shoper-mes">
                <div class="shoper-notice">
                    <h4>公告与活动</h4>
                    <p>{{seller.bulletin}}</p>
                </div>
                <ul>
                    <li v-for="support in seller.supports" :key="support.type">
                        <i :class='classNames(support.type)'></i>
                        <span>{{support.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="shoper-img-box" v-show="seller && seller.pics && seller.pics.length > 0">
                <div class="shoper-img" ref="shoperImgWrapper">
                    <ul ref="shopperImgList">
                        <li v-for="(shoper, idx) in seller.pics" :key="idx">
                            <img :src="shoper" alt="idx">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="shoper-message">
                <h4>商家信息</h4>
                <p v-for="(info, idx) in seller.infos" :key="idx">
                    {{info}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import Bscroll from 'better-scroll';
import Star from '@/commons/Star';

export default {
    name: 'Shoper',
    created(){
        this.$nextTick(()=>{
            this.initScroll()
        })
    },
    data(){
        return {
            //传给Star组件，是否显示具体评分数
            isShoperStarNumShow: false,
            //是否收藏
            isCollect: false,

            isBegin: false,
            isOpen: false
        }
    },
    components: {Star},
    computed: {
        ...mapState([
            'seller'
        ])
    },
    methods: {
        initScroll(){
            this.shoperScroll = new Bscroll(this.$refs.shoperWrapper, {
                click: true
            })
            //if(this.seller && this.seller.pics && this.seller.pics.length > 0){
                this.shoperImgScroll = new Bscroll(this.$refs.shoperImgWrapper, {
                    scrollX: true,
                    eventPassthrough: 'vertical',
                    bounce: false
                })
            //}
        },
        //是否收藏点击事件
        collectFun(event){
            if(!event._constructed){
                return;
            }
            this.isCollect = !this.isCollect
        },
        //获取优惠的类名
        classNames(id){
            return 'support_' + id
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
@mixin backgroundImage($url){
    background-image: url('/static/images/' + $url + '@2x.png');
    @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
        background-image: url("/static/images/" + $url + '@3x.png');
    }
}
.shoper{
    width: 100%;
    position: absolute;
    left: 0;
    top: 3.5rem;
    bottom: 0;
    overflow: hidden;
    background: #f3f5f7;
}
.shoper-name,
.shoper-mes{
    width: 100%;
    background: #fff;
    margin-bottom: .4rem;
}
.shoper-top-name{
    padding: .3rem .4rem;
    font-size: .28rem;
    border-bottom: .01rem solid #f9f9f9;
    @include flexRow;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    h5{
        font-size: .28rem;
    }
    p{
        font-size: .24rem;
        color: #999;
    }
    span{
        display: block;
        padding-top: .74rem;
        font-size: .32rem;
        @include backgroundImage('star48_off');
        -webkit-background-size: .64rem .64rem;
        background-size: .64rem .64rem;
        background-position: center top;
        background-repeat: no-repeat;
        &.collect-cur{
            @include backgroundImage('star48_on');
        }
    }
}
.shoper-top-score{
    dl{
        padding: .3rem .4rem;
        font-size: .24rem;
        @include flexRow;
        -webkit-justify-content: space-around;
        justify-content: space-around;
        dd{
            text-align: center;
            &:nth-child(2),
            &:nth-child(4){
                width: .04rem;
                height: .9rem;
                background: #f9f9f9;
            }
        }
        i{
            display: block;
            font-style: normal;
            color: #999;
        }
        span{
            display: block;
            strong{
                font-size: .4rem;
            }
        }
    }
}
.shoper-notice{
    padding: .3rem .4rem;
    h4{
        font-size: .32rem;
        margin-bottom: .1rem;
    }
    p{
        font-size: .24rem;
        line-height: 2em;
    }
}
.shoper-mes{
    ul{
        padding: 0 .4rem;
    }
    li{
        border-top: .02rem solid #f3f3f3;
        font-size: .24rem;
        padding: .2rem 0;
        span{
            display: inline-block;
            vertical-align: middle;
        }
        i{
            display: inline-block;
            vertical-align: middle;
            width: .32rem;
            height: .32rem;
            -webkit-background-size: .32rem .32rem;
            background-size: .32rem .32rem;
            &.support_0{
                @include backgroundImage('decrease_2')
            }
            &.support_1{
                @include backgroundImage('discount_2')
            }
            &.support_2{
                @include backgroundImage('special_2')
            }
            &.support_3{
                @include backgroundImage('invoice_2')
            }
            &.support_4{
                @include backgroundImage('guarantee_2')
            }
        }
    }
}
.shoper-img-box{
    position: relative;
    height: 2.4rem;
    padding: .3rem .4rem;
    overflow: hidden;
    background: #fff;
    margin-bottom: .4rem;
}
.shoper-img{
    position: absolute;
    left: .4rem;
    top: .3rem;
    right: 0;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    ul{
        width: 11.2rem;
        @include flexRow;
        flex-wrap: nowrap;
        li{
            width: 2.4rem;
            height: 2.4rem;
            margin-right: .3rem;
            img{
                width: 2.4rem;
                height: 2.4rem;
            }
        }
    }
}
.shoper-message {
    padding: .3rem .4rem;
    background: #fff;
    h4{
        font-size: .32rem;
        margin-bottom: .1rem;
    }
    p{
        font-size: .24rem;
        line-height: 2em;
    }
}
@keyframes boxs {
    0%{
        -webkit-transform: rotate(0);
        -webkit-transform: rotate3d(0, 0, 1, 0);
    }
    6%{
        -webkit-transform: rotate(-8deg);
        -webkit-transform: rotate3d(0, 0, 1, -6deg);
    }
    18%, 30%, 42%, 54%, 66%, 78%, 90%{
        -webkit-transform: rotate(8deg);
        -webkit-transform: rotate3d(0, 0, 1, 6deg);
    }
    12%, 24%, 36%, 48%, 60%, 72%, 84%{
        -webkit-transform: rotate(-8deg);
        -webkit-transform: rotate3d(0, 0, 1, -6deg);
    }
    100%{
        -webkit-transform: rotate(0);
        -webkit-transform: rotate3d(0, 0, 1, 0);
    }
}
</style>
