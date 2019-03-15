import Vue from 'vue';
import vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(vuex);

const state = {
    //店铺信息
    seller: '',
    //商品列表
    goodsList: '',
    //评价内容
    ratings: '',
    //购物车商品数量
    cartNum: 0,
    //商品总价
    totalPrice: 0,
    //购物车商品列表
    cartList: [],
    //复制一份ratings列表，用于展示列表内容
    discountShowList: [],
    //评价满意列表，用于获取数量和切换时替换内容
    discountHighList: [],
    //评价不满意列表，用于获取数量和切换时替换内容
    discountFailList: [],
    //是否只显示有文字的评价
    isShowTextDiscount: false,
    //选择某一个商品
    goodsOne: {},
    //是否显示当前商品
    isShowGoodsOnce: false,
    //当前选中的商品是哪个
    goodIdx: {},
    //单个商品评价内容
    oneRatings: '',
    //单个商品评价内容copy
    oneDiscountShowList: [],
    //单个商品好评
    oneDiscountHighList: [],
    //单个商品差评
    oneDiscountFailList: [],
    //单个商品是否只显示有文字评价
    oneIsShowTextDiscount: false
};

export default new vuex.Store({
    state,
    actions,
    mutations,
    getters
})
