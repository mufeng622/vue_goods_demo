<template>
    <div v-show="goodsList">
        <div class="goodsList">
            <div class="goodsLeft-wrapper" ref="goodsLeftWrapper">
                <div class="goods-left">
                    <ul>
                        <li v-for="(good, idx) in goodsList" :key="idx" :class="foodCurNum === idx ? 'foodCur' : ''" @click="goodCur(idx, $event)">
                            <span>{{good.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="goodsRight-wrapper" ref="goodsRightWrapper">
                <div class="goods-right">
                    <div class="goods-right-item" v-for="(good, idx) in goodsList" :key="idx">
                        <h4>{{good.name}}</h4>
                        <ul class="food-con">
                            <li v-for="(food, index) in good.foods" :key="index">
                                <div class="food-l" @click="choseOnceGood({idx, index})">
                                    <div class="food-img">
                                        <img :src="food.image" :alt="food.name">
                                    </div>
                                    <div class="food-text">
                                        <h5>{{food.name}}</h5>
                                        <span>{{food.description ? food.description : ''}}</span>
                                        <p>月售{{food.sellCount}} 好评{{food.rating}}</p>
                                        <strong>￥{{food.price}}</strong>
                                    </div>
                                </div>
                                <div class="food-r">
                                    <span @click="reduceGoods({idx, index}, $event)">-</span>
                                    <em>{{food.goodNum}}</em>
                                    <span @click="addGoods({idx, index}, $event)">+</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <ShopBot :isCartShow="isCartShow" @isCartShowPar="isCartShowPar()"></ShopBot>

        <transition name="cartShow">
            <Cart :isCartShow="isCartShow" @isCartShowPar="isCartShowPar()"></Cart>
        </transition>

        <GoodsMes v-if="isShowGoodsOnce"></GoodsMes>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Bscroll from 'better-scroll';
import ShopBot from '@/components/ShopBot';
import Cart from '@/components/Cart';
import GoodsMes from '@/components/GoodsMes';

export default {
    name: 'Goods',
    components: {ShopBot, Cart, GoodsMes},
    data(){
        return {
            //当前选中的左侧分类
            foodCurNum: 0,
            foodScrollY: 0,
            isCartShow: false
        }
    },
    computed: {
        ...mapState([
            'goodsList', 'isShowGoodsOnce'
        ])
    },
    created(){
        //初始化商品列表滚动
        this.$nextTick(()=>{
            this.initScroll()
        });
    },
    methods: {
        ...mapActions([
            'addCartNumPrice', 'reduceCartNumPrice', 'isShowGoodOne', 'goodIndex'
        ]),
        //初始化滚动
        initScroll(){
            //右侧滚动事件
            this.Menuscroll = new Bscroll(this.$refs.goodsRightWrapper, {
                click: true,
                probeType: 3
            });
            //左侧滚动事件
            this.Toolscroll = new Bscroll(this.$refs.goodsLeftWrapper, {
                click: true
            });
            //右侧滚动时触发事件
            this.Menuscroll.on('scroll', (pos)=>{
                this.foodScrollY = Math.floor(Math.abs(pos.y));

                this.goodsScroll()
            })
        },
        //获取右侧需要滚动的高度
        getGoodHeight(idx){
            let goodHeight = 0;
            let goodItemCount = this.goodsList.length;
            for(var i = 0; i < goodItemCount; i++){
                if(i < idx){
                    var goodItemHeight = document.getElementsByClassName('goods-right-item')[i].clientHeight;
                    goodHeight += goodItemHeight
                }
            }
            return goodHeight;
        },
        //左侧导航点击事件
        goodCur(idx, event){
            //取消better-scroll默认的点击事件
            if(!event._constructed){
                return;
            }
            //获取当前左侧类目对应的右侧内容，并滚动到对应位置
            let el = document.getElementsByClassName('goods-right-item')[idx];
            this.Menuscroll.scrollToElement(el, this.getGoodHeight(idx))
        },
        //右侧滚动时，计算滚动高度，对应左侧菜单高亮
        goodsScroll(){
            let goodItemCount = this.goodsList.length;
            for(var i = 0; i < goodItemCount; i++){
                let goodItemPre = this.getGoodHeight(i);
                let goodItemNext = this.getGoodHeight(i + 1);
                if(this.foodScrollY + 10 > goodItemPre && this.foodScrollY < goodItemNext){
                    this.foodCurNum = i
                }
            }
        },
        //增加商品
        addGoods(val, event){
            if(!event._constructed){
                return;
            }
            this.addCartNumPrice(val);
        },
        //减少商品
        reduceGoods(val, event){
            if(!event._constructed){
                return;
            }
            this.reduceCartNumPrice(val);
        },
        //是否显示购物车
        isCartShowPar(){
            this.isCartShow = !this.isCartShow
        },
        //选择一个当前商品，进行展示
        choseOnceGood(val){
            this.goodIndex(val)
            this.isShowGoodOne()
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
@mixin borderRadius($radius){
    -webkit-border-radius: $radius;
    -moz-border-radius: $radius;
    border-radius: $radius;
}
.goodsList{
    width: 100%;
    display: flex;
    position: absolute;
    left: 0;
    top: 3.5rem;
    bottom: 1.12rem;
    overflow: hidden;
}
.goodsLeft-wrapper{
    width: 2rem;
    flex: 0 0 2rem;
    li{
        width: 1.6rem;
        padding: .4rem .2rem;
        font-size: .24rem;
        border-bottom: .02rem solid #f3f3f3;
        background: #f3f5f7;
        &:nth-child(2) span{
            padding-left: .28rem;
            @include backgroundImage('special_3');
            background-size: .24rem .24rem;
            background-repeat: no-repeat;
            background-position: 0 .04rem;
        }
        &:nth-child(3) span{
            padding-left: .28rem;
            @include backgroundImage('discount_3');
            background-size: .24rem .24rem;
            background-repeat: no-repeat;
            background-position: 0 .04rem;
        }
        &.foodCur{
            background: #fff;
        }
    }
}
.goodsRight-wrapper{
    -webkit-flex: 1;
    flex: 1;
    h4{
        font-size: .28rem;
        background: #f3f3f3;
        padding: .08rem 0 .08rem .08rem;
        font-weight: normal;
        color: #93999f;
    }
    .food-con{
        li{
            border-bottom: .02rem solid #f3f3f3;
            overflow: hidden;
            padding: .3rem .2rem;
            @include flexRow;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            .food-l{
                @include flexRow;
            }
            .food-img{
                width: 1.16rem;
                height: 1.16rem;
                overflow: hidden;
                margin-right: .1rem;
                img{
                    width: 1.16rem;
                    height: 1.16rem;
                }
            }
            .food-text{
                -webkit-flex: 1;
                flex: 1;
                font-size: .28rem;
                max-width: 2.3rem;
                h5, span{
                    display: block;
                    overflow: hidden;
                    -ms-text-overflow: ellipsis;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                span, p, strong{
                    font-size: .24rem;
                }
                strong{
                    color: #e20;
                }
            }
            .food-r{
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
    }
}
.cartShow-enter-active,
.cartShow-leave-active{
    -webkit-transition: all .5s;
    -moz-transition: all .5s;
    -ms-transition: all .5s;
    -o-transition: all .5s;
    transition: all .5s;
}
.cartShow-enter,
.cartShow-leave-to{
    opacity: 0;
}
</style>
