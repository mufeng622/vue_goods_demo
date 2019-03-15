<template>
    <div class="goodsOneCon" ref="goodsMesWrapper">
        <div>
            <div class="goodsMesT">
                <span @click="closeGoodsOne">&lt;</span>
                <img :src="goodsOne.image" :alt="goodsOne.name">
            </div>
            <div class="goodsMesTitle">
                <h5>{{goodsOne.name}}</h5>
                <div>
                    <div class="goodsMesTitleL">
                        <p><span>月售 {{goodsOne.sellCount}} 份</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>好评率 {{goodsOne.rating}} %</span></p>
                        <strong>￥ {{goodsOne.price}}</strong>
                    </div>
                    <div class="goodsMesTitleR">
                        <span @click="reduceGoodsOne(goodIdx)">-</span>
                        <em>{{goodsOne.goodNum}}</em>
                        <span @click="AddGoodsOne(goodIdx)">+</span>
                    </div>
                </div>
            </div>
            <div class="goodsMesText" v-if="goodsOne.info">
                <p>{{goodsOne.info}}</p>
            </div>
            <div class="goodsMesList">
                <DiscountList :totalList="oneRatings" :goodList="oneDiscountHighList" :badList="oneDiscountFailList" :textList="oneIsShowTextDiscount" :totalShowList="oneDiscountShowList" @changeShow="changeShow"></DiscountList>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Bscroll from 'better-scroll';
import DiscountList from '@/commons/DiscountList';

export default {
    name: 'GoodsMes',
    components: {DiscountList},
    computed: {
        ...mapState([
            'goodsOne', 'goodIdx', 'oneRatings', 'oneDiscountHighList', 'oneDiscountFailList', 'oneIsShowTextDiscount', 'oneDiscountShowList'
        ])
    },
    methods: {
        ...mapActions([
            'isShowGoodOne', 'addCartNumPrice', 'reduceCartNumPrice', 'oneDiscountTextIsShow', 'choseGoodsOne'
        ]),
        initScroll(){
            this.discountScroll = new Bscroll(this.$refs.goodsMesWrapper, {
                probeType: 3,
                click: true
            })
        },
        //返回关闭当前展示商品
        closeGoodsOne(){
            this.isShowGoodOne()
        },
        //增加商品
        AddGoodsOne(val){
            this.addCartNumPrice(val)
        },
        //减少商品
        reduceGoodsOne(val){
            this.reduceCartNumPrice(val);
        },
        //是否只显示有文字的评价
        changeShow(discountTabCur){
            this.oneDiscountTextIsShow(discountTabCur)
        }
    },
    created(){
        this.$nextTick(()=>{
            this.initScroll()
        });

        //create阶段加载当前商品信息
        this.choseGoodsOne(this.goodIdx)
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
@mixin borderRadius($radius){
        -webkit-border-radius: $radius;
        -moz-border-radius: $radius;
        border-radius: $radius;
}
.goodsMesList{
    background: #fff;
    font-size: .24rem;
}
.goodsOneCon{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 1.12rem;
    z-index: 10;
    background: #f3f5f7;
}
.goodsMesT{
    width: 100%;
    position: relative;
    span{
        display: block;
        position: absolute;
        left: .3rem;
        top: .3rem;
        color: #fff;
        width: .4rem;
        height: .8rem;
        text-align: center;
        line-height: .8rem;
        font-size: .48rem;
    }
    img{
        width: 100%;
    }
}
.goodsMesTitle,
.goodsMesText{
    background: #fff;
    margin-bottom: .4rem;
    font-size: .24rem;
    padding: .2rem .4rem;
    h5{
        font-size: .32rem;
        margin-bottom: .2rem;
    }
    &>div{
        @include flexRow;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        strong{
            margin-top: .1rem;
            color: #e20;
        }
    }
    .goodsMesTitleR{
        font-size: .28rem;
        span{
            display: inline-block;
            width: .36rem;
            height: .36rem;
            border: .02rem solid #00a0dc;
            text-align: center;
            line-height: .36rem;
            @include borderRadius(50%);
            color: #00a0dc;
        }
        em{
            font-style: normal;
            padding: 0 .1rem;
        }
    }
}
.goodsMesText p{
    line-height: 1.75;
    text-indent: 2em;
}
</style>

