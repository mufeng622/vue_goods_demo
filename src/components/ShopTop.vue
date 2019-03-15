<template>
    <div>
        <div class="shopTop">
            <div class="shop-mes">
                <div class="shop-img"><img :src="seller.avatar" alt=""></div>
                <div class="shop-tex">
                    <h2><span>品牌</span>{{seller.name}}</h2>
                    <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
                    <p class="cheap_box">
                    <span class="cheap-text">
                        <i></i>
                        <em>在线支付满{{seller.ratingCount}}减{{seller.deliveryPrice}}</em>
                    </span>
                    <span class="cheap-point" v-if="seller.supports" @click="openLayPar()">{{seller.supports.length}}个&nbsp;&gt;</span>
                    </p>
                </div>
            </div>
            <div class="shop-notice" @click="openLayPar()">
                <span></span>
                <p>{{seller.bulletin}}</p>
                <i>&gt;</i>
            </div>
            <div class="shop-bg"><img :src="seller.avatar" alt="bg" width="100%" height="100%"></div>
        </div>

        <transition name="layToggle">
            <Layout v-if="is_layout" :islayout="is_layout" @closeLayPar="closeLayPar()">
                <div class="shop-mes-con">
                    <h3>{{seller.name}}</h3>
                    <dl class="star-count">
                        <dd v-for="star in 5" :class="star <= starScore ? 'starCur' : ''"></dd>
                    </dl>
                    <div class="shop-mes-cheap">
                        <h4>优惠信息</h4>
                        <ul>
                            <li v-for="support in seller.supports" :key="support.type">
                                <i :class='classNames(support.type)'></i>
                                <span>{{support.description}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="shop-mes-notice">
                        <h4>商家公告</h4>
                        <p>{{seller.bulletin}}</p>
                    </div>
                </div>
            </Layout>
        </transition>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import Layout from '@/commons/Layout';

export default {
    name: 'ShopTop',
    data(){
        return {
            is_layout: false
        }
    },
    components: {Layout},
    computed: {
        // ...mapGetters([
        //     'shopSeller'
        // ]),
        ...mapState([
            'seller'
        ]),
        //商家评分数，向下取整
        starScore(){
            return Math.floor(this.seller.foodScore)
        }
    },
    methods: {
        //获取优惠的类名
        classNames(id){
            return 'support_' + id
        },
        //关闭弹层
        closeLayPar(){
            this.is_layout = false;
        },
        //打开弹层
        openLayPar(){
            this.is_layout = true;
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
@mixin backgroundImg($url){
    background-image: url('/static/images/' + $url + '@2x.png');
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        background-image: url('/static/images/' + $url + '@3x.png');
    }
}
.shopTop{
    position: relative;
    overflow: hidden;
    .shop-bg{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        filter: blur(10px);
    }
}
.shop-mes{
    height: 2.12rem;
    overflow: hidden;
    background: rgba(7, 17, 27, .4);
    position: relative;
    @include flexRow;
    .shop-img{
        width: 1.28rem;
        height: 1.28rem;
        margin: .42rem .42rem;
        img{
            width: 100%;
        }
    }
    .shop-tex{
        color: #fff;
        margin-top: .42rem;
        flex: 1;
        padding-right: .2rem;
        h2{
            font-size: .32rem;
            line-height: .4rem;
            span{
                font-size: .20rem;
                padding: .02rem .12rem;
                background: #e20;
                margin-right: .08rem;
            }
        }
        p{
            font-size: .24rem;
            margin-top: .08rem;
            @include flexRow;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            i{
                display: inline-block;
                width: .24rem;
                height: .24rem;
                @include backgroundImg('decrease_1');
                -webkit-background-size: .24rem .24rem;
                background-size: .24rem .24rem;
            }
            em{
                font-style: normal;
                margin: 0 .1rem;
            }
        }
        .cheap_box{
            height: .4rem;
            line-height: .4rem;
            .cheap-point{
                height: .4rem;
                width: .9rem;
                text-align: center;
                @include borderRadius(.2rem);
                background: rgba(7, 17, 27, .6);
            }
            .cheap-text{
                @include flexRow;
                -webkit-align-items: center;
                align-items: center;
            }
        }
    }
}
.shop-notice{
    height: .56rem;
    line-height: .56rem;
    background: rgba(7, 17, 27, .2);
    color: #fff;
    padding: 0 .2rem;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    @include flexRow;
    span,p,i{
        font-size: .24rem;
    }
    span{
        margin-top: .16rem;
        margin-right: .08rem;
        height: .24rem;
        width: .44rem;
        @include backgroundImg('bulletin');
        -webkit-background-size: .44rem .24rem;
        background-size: .44rem .24rem;
    }
    p{
        flex: 1;
        margin-right: .1rem;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.shop-mes-con{
    padding: 1.4rem .8rem 0;
    overflow: hidden;
    color: #fff;
    h3{
        font-size: .36rem;
        text-align: center;
    }
    h4{
        font-size: .32rem;
        text-align: center;
        margin-bottom: .3rem;
    }
    div{
        margin-top: .4rem;
    }
}
.shop-mes-cheap li{
    font-size: .28rem;
    margin-bottom: .1rem;
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
            @include backgroundImg('decrease_2')
        }
        &.support_1{
            @include backgroundImg('discount_2')
        }
        &.support_2{
            @include backgroundImg('special_2')
        }
        &.support_3{
            @include backgroundImg('invoice_2')
        }
        &.support_4{
            @include backgroundImg('guarantee_2')
        }
    }
}
.shop-mes-notice{
    p{
        font-size: .24rem;
        text-indent: 2em;
        line-height: 1.75;
    }
}

.star-count{
    margin: .2rem auto;
    text-align: center;
    dd{
        display: inline-block;
        margin: 0 .1rem;
        width: .4rem;
        height: .4rem;
        @include backgroundImg('star24_off');
        &.starCur{
            @include backgroundImg('star24_on')
        }
    }
}
.layToggle-enter-active,
.layToggle-leave-active{
    -webkit-transition: opacity .65s;
    -moz-transition: opacity .65s;
    -ms-transition: opacity .65s;
    -o-transition: opacity .65s;
    transition: opacity .65s;
}
.layToggle-enter,
.layToggle-leave-to{
    opacity: 0;
}
</style>
