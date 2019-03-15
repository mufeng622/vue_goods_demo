<template>
    <div class="discount-wrap" ref="discountWrapper">
        <div class="discount">
            <div class="discount-top">
                <div class="discount-shop-l">
                    <strong>{{seller.score}}</strong>
                    <p>综合评分</p>
                    <span>高于周边商家{{seller.rankRate}}</span>
                </div>
                <div class="discount-shop-r">
                    <Star :starScore="seller.serviceScore" :starName="starSer" :isStarNumShow="isStarNumShow"></Star>
                    <Star :starScore="seller.foodScore" :starName="starShop" :isStarNumShow="isStarNumShow"></Star>

                    <p>送达时间<span>{{seller.deliveryTime}}分钟</span></p>
                </div>
            </div>

            <div class="discount-con">
                <DiscountList :totalList="ratings" :goodList="discountHighList" :badList="discountFailList" :totalShowList="discountShowList" :textList="isShowTextDiscount" @changeShow="changeShow"></DiscountList>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Star from '@/commons/Star';
import DiscountList from '@/commons/DiscountList';
import Bscroll from 'better-scroll';

export default {
    name: 'Discount',
    data(){
        return {
            starSer: '服务态度',
            starShop: '商品评分',
            //传给Star组件，是否显示具体评分数
            isStarNumShow: true
        }
    },
    components: {Star, DiscountList},
    computed: {
        ...mapState([
            'seller', 'ratings', 'discountHighList', 'discountFailList', 'discountShowList', 'isShowTextDiscount'
        ])
    },
    methods: {
        ...mapActions([
            'discountTextIsShow'
        ]),
        //初始化滚动
        initScroll(){
            this.discountScroll = new Bscroll(this.$refs.discountWrapper, {
                probeType: 3,
                click: true
            })
        },
        changeShow(discountTabCur){
            this.discountTextIsShow(discountTabCur);
        }
    },
    created(){
        this.$nextTick(()=>{
            this.initScroll()
        })
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
.discount-wrap{
    position: absolute;
    top: 3.5rem;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
}
.discount{
    background: #f3f5f7;
}
.discount-top{
    width: 100%;
    font-size: .24rem;
    background: #fff;
    border-bottom: .01rem solid #f3f3f3;
    margin-bottom: .4rem;
    @include flexRow;
}
.discount-shop-l{
    padding: .5rem .3rem;
    width: 2.2rem;
    text-align: center;
    border-right: .02rem solid #f3f3f3;
    strong{
        font-size: .48rem;
        color: #f90;
        margin-bottom: .3rem;
    }
    span{
        color: #999;
    }
}
.discount-shop-r{
    -webkit-flex: 1;
    flex: 1;
    padding: .48rem 0 0 .8rem;
    p span{
        margin-left: .24rem;
        color: #999;
    }
}
.discount-con{
    background: #fff;
    font-size: .24rem;
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
