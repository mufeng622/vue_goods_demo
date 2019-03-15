import Vue from 'vue';

const mutations = {
    //初始化获取数据
    INIT_STATE(state, val){
        state.seller = val.seller;
        state.goodsList = val.goods;
        state.ratings = state.discountShowList = val.ratings;

        state.goodsList.map((good, idx)=>{
            good.foods.map((food, index)=>{
                //vue中添加自定义的属性要用Vue.set或者vm.$set，否则无法触发后期修改
                Vue.set(food, 'goodNum', 0)
                Vue.set(food, 'parObj', {})
            })
        });
        //用户评价满意列表
        state.discountHighList = val.ratings.filter((discount)=>{
            return discount.rateType === 0
        })
        //用户评价不满意列表
        state.discountFailList = val.ratings.filter((discount)=>{
            return discount.rateType === 1
        })
    },

    //购物车商品数量和价格增加
    ADD_CART_NUM_PRICE(state, val){
        //当购物车里有当前商品时，不再增加商品，只修改数量
        if(state.goodsList[val.idx].foods[val.index].goodNum < 1){
            //购物车内部修改数量时需要用到外层idx和内层index，作为对象传递给当前商品
            state.goodsList[val.idx].foods[val.index].parObj['idx'] = val.idx;
            state.goodsList[val.idx].foods[val.index].parObj['index'] = val.index;
            //将当前商品添加到购物车列表
            state.cartList.push(state.goodsList[val.idx].foods[val.index])
        }

        state.cartNum += 1;
        state.totalPrice += state.goodsList[val.idx].foods[val.index].price;
        state.goodsList[val.idx].foods[val.index].goodNum += 1;
    },

    //购物车商品数量和价格减少
    REDUCE_CART_NUM_PRICE(state, val){
        if(state.goodsList[val.idx].foods[val.index].goodNum > 0){
            state.goodsList[val.idx].foods[val.index].goodNum -= 1;
            state.cartNum -= 1;
            state.totalPrice -= state.goodsList[val.idx].foods[val.index].price;
        }
        //减少商品时，当前商品数量为0时，从购物车里移除
        state.cartList.map((cartGood, id)=>{
            if(cartGood.goodNum < 1){
                state.cartList.splice(id, 1)
            }
        })
    },

    //清空购物车
    CLEAR_CART_NUM_PRICE(state){
        state.cartList = [];
        state.cartNum = 0;
        state.totalPrice = 0;
        state.goodsList.map((good)=>{
            good.foods.map((food)=>{
                food.goodNum = 0
            })
        })
    },

    //切换评价tab，获取不同状态的评价内容：FAIL为不满意， HIGH为满意， ALL为所有评价，切换前判断是否只显示文字
    DISCOUNT_CHANGE_LIST(state, val){
        //只显示有文字评价的过滤
        if(state.isShowTextDiscount){
            if(val === 'HIGH'){
                state.discountShowList = state.discountHighList.filter((discount)=>{
                    return discount.text
                })
            }else if(val === 'FAIL'){
                state.discountShowList = state.discountFailList.filter((discount)=>{
                    return discount.text
                })
            }else{
                state.discountShowList = state.ratings.filter((discount)=>{
                    return discount.text
                })
            }
        }else{
            //正常显示内容
            if(val === 'HIGH'){
                state.discountShowList = [...state.discountHighList]
            }else if(val === 'FAIL'){
                state.discountShowList = [...state.discountFailList]
            }else{
                state.discountShowList = [...state.ratings]
            }
        }

        //单个商品评价只显示有文字评价的过滤
        if(state.oneIsShowTextDiscount){
            if(val === 'HIGH'){
                state.oneDiscountShowList = state.oneDiscountHighList.filter((onediscount)=>{
                    return onediscount.text
                })
            }else if(val === 'FAIL'){
                state.oneDiscountShowList = state.oneDiscountFailList.filter((onediscount)=>{
                    return onediscount.text
                })
            }else{
                state.oneDiscountShowList = state.oneRatings.filter((onediscount)=>{
                    return onediscount.text
                })
            }
        }else{
            //正常显示内容
            if(val === 'HIGH'){
                state.oneDiscountShowList = [...state.oneDiscountHighList]
            }else if(val === 'FAIL'){
                state.oneDiscountShowList = [...state.oneDiscountFailList]
            }else{
                state.oneDiscountShowList = [...state.oneRatings]
            }
        }
    },

    //修改只显示文字评价状态
    DISCOUNT_TEXT_IS_SHOW(state){
        state.isShowTextDiscount = !state.isShowTextDiscount;
    },

    //选中某一个商品展示
    CHOSE_ONE_GOOD(state, val){
        state.goodsOne = state.goodsList[val.idx].foods[val.index];

        //获得单个商品评价信息
        state.oneRatings = state.oneDiscountShowList = [...state.goodsList[val.idx].foods[val.index].ratings];

        //单个商品用户评价满意列表
        state.oneDiscountHighList = state.oneRatings.filter((onediscount)=>{
            return onediscount.rateType === 0
        });
        //单个商品用户评价不满意列表
        state.oneDiscountFailList = state.oneRatings.filter((onediscount)=>{
            return onediscount.rateType === 1
        });
    },

    //某一个商品是否只显示有评价内容状态改变
    ONE_DISCOUNT_TEXT_IS_SHOW(state){
        state.oneIsShowTextDiscount = !state.oneIsShowTextDiscount;
    },

    //显示或者关闭当前展示商品页面
    CHANGE_SHOW_ONE_GOOD(state){
        state.isShowGoodsOnce = !state.isShowGoodsOnce;
        state.oneIsShowTextDiscount = false;
    },

    //当前选中的是哪个位置的商品
    GOOD_IDX(state, val){
        state.goodIdx['idx'] = val.idx;
        state.goodIdx['index'] = val.index;
    }
};

export default mutations
