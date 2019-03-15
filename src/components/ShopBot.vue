<template>
    <div class="shop-bot">
        <div class="shop-bot-con">
            <div class="cart-num">
                <div class="item">
                    <button type="button"  @click="isCartShowPar()"></button>
                    <sup>{{cartNum}}</sup>
                </div>
                <span class="cart-money">￥{{totalPrice}}</span>
            </div>
            <p class="sale-money">另需配送费￥{{seller.deliveryPrice}}元</p>
            <span v-if="totalPrice >= seller.minPrice" class="sale-submit" @click="submitOrder()">去结算</span>
            <span v-else class="sale-low">￥{{seller.minPrice}}元起送</span>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'ShopBot',
    props: ['isCartShow'],
    computed: {
        ...mapState([
            'seller', 'cartNum', 'totalPrice', 'cartList'
        ])
    },
    methods: {
        //是否显示购物车，父子组件传递事件
        isCartShowPar(){
            if(!this.cartList.length){
                return
            }
            this.$emit('isCartShowPar')
        },
        //模拟提交订单
        submitOrder(){
            alert('总价格为' + this.totalPrice + '元')
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
.shop-bot{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: .28rem;
    color: #fff;
    background: #141d27;
    z-index: 30;
}
.shop-bot-con{
    height: 1.12rem;
    @include flexRow;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
.cart-num{
    .item{
        position: relative;
        display: inline-block;
        top: -.1rem;
    }
    button{
        display: block;
        width: 1.12rem;
        height: 1.12rem;
        margin: -.28rem 0 0 .2rem;
        border: .12rem solid #141d27;
        outline: none;
        background: #fff;
        @include borderRadius(50%);
        &:before{
            content: '';
            display: block;
            margin-left: .25rem;
            width: .32rem;
            height: .32rem;
            background: url("../../static/images/buy_cart.png") no-repeat center center;
        }
    }
    sup{
        position: absolute;
        top: -.3rem;
        right: 0;
        display: block;
        width: .48rem;
        height: .48rem;
        color: #fff;
        text-align: center;
        line-height: .48rem;
        background: #e20;
        font-size: .24rem;
        @include borderRadius(50%);
    }
    .cart-money{
        margin-left: .3rem;
        font-size: .32rem;
        line-height: 1.12rem;
    }
}
.sale-money{
    line-height: 1.12rem;
}
.sale-low{
    width: 2rem;
    line-height: 1.12rem;
    text-align: center;
    background: #2b333b;
}
.sale-submit{
    width: 2rem;
    line-height: 1.12rem;
    text-align: center;
    background: #00b43c;
    color: #fff;
}
</style>
