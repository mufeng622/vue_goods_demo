import axios from 'axios';

const actions = {
    //获取初始化数据
    initState: (context)=>{
        axios.get('./static/data.json').then((response)=>{
            context.commit('INIT_STATE', response.data)
        }).catch(err => {
            console.log(err)
        })
    },

    //增加购物车数量和价格
    addCartNumPrice: ({commit}, val)=>{
        commit('ADD_CART_NUM_PRICE', val)
    },

    //减少购物车数量和价格
    reduceCartNumPrice: ({commit}, val)=>{
        commit('REDUCE_CART_NUM_PRICE', val)
    },

    //清空购物车
    clearCartNumPrice: ({commit})=>{
        commit('CLEAR_CART_NUM_PRICE')
    },

    //切换评价列表tab
    discountListDispatch: ({commit}, val)=>{
        commit('DISCOUNT_CHANGE_LIST', val)
    },

    //触发切换是否只显示文字评论
    discountTextIsShow: ({commit}, val)=>{
        commit('DISCOUNT_TEXT_IS_SHOW', val)
    },

    //单个商品触发切换是否只显示文字评论
    oneDiscountTextIsShow: ({commit}, val)=>{
        commit('ONE_DISCOUNT_TEXT_IS_SHOW', val)
    },

    //选择一个商品展示
    choseGoodsOne: ({commit}, val)=>{
        commit('CHOSE_ONE_GOOD', val)
    },

    //是否展示当前商品
    isShowGoodOne: ({commit})=>{
        commit('CHANGE_SHOW_ONE_GOOD')
    },

    //点击触发后看当前选中的是第几个商品
    goodIndex: ({commit}, val)=>{
        commit('GOOD_IDX', val)
    }
}

export default actions;
