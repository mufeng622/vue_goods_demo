<template>
    <div class="cart" v-if="cartList.length > 0 && isCartShow">
        <div class="cart-con">
            <div class="cart-header">
                <h5>购物车</h5>
                <span @click="clearCart()">清空</span>
            </div>
            <div class="cart-list">
                <ul>
                    <li v-for="(cartGood, idx) in cartList" :key="idx">
                        <span class="cartGoodName">{{cartGood.name}}</span>
                        <div class="cartGoodPri">
                            <strong>￥{{cartGood.price}}</strong>
                            <span @click="cartReduceNum(cartGood.parObj)">-</span>
                            <em>{{cartGood.goodNum}}</em>
                            <span @click="addCartNumPrice(cartGood.parObj)">+</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="cart-bg"></div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
    name: 'Cart',
    props: ['isCartShow'],
    computed: {
        ...mapState([
            'cartList'
        ])
    },
    methods: {
        ...mapActions([
            'addCartNumPrice', 'reduceCartNumPrice', 'clearCartNumPrice'
        ]),
        //购物车内部点击减少触发事件，在购物车没有商品时，修改购物车显示为false
        cartReduceNum(val){
            this.reduceCartNumPrice(val);
            if(this.cartList.length <= 0){
                this.$emit('isCartShowPar')
            }
        },
        //清空购物车，在购物车没有商品时，修改购物车显示为false
        clearCart(){
            this.clearCartNumPrice();
            this.$emit('isCartShowPar')
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
.cart{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
}
.cart-bg{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 1.12rem;
    z-index: 15;
    background: rgba(7, 17, 27, .6);
}
.cart-con{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 1.12rem;
    z-index: 20;
    background: #fff;
    .cart-header{
        @include flexRow;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-align-items: center;
        align-items: center;
        font-size: .28rem;
        background: #f3f5f7;
        height: .8rem;
        padding: 0 .3rem;
        h5{
            font-size: .28rem;
            font-weight: normal;
        }
        span{
            color: #00a0dc;
        }
    }
}
.cart-list li{
    border-bottom: .02rem solid  #f3f3f3;
    padding: .12rem .3rem;
    @include flexRow;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    font-size: .24rem;
    .cartGoodPri{
        strong{
            color: #e20;
            margin-right: .4rem;
        }
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
</style>
