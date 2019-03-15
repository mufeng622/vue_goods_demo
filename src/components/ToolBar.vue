<template>
    <div>
        <div class="toolbar">
            <ul>
                <router-link to="/goods" active-class="shopbar-cur" tag="li">商品</router-link>
                <router-link to="/discount" active-class="shopbar-cur" tag="li">评论</router-link>
                <router-link to="/shoper" active-class="shopbar-cur" tag="li">商家</router-link>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ToolBar'
}
</script>

<style scoped lang="scss">
@mixin flexRow{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        -webkit-flex-direction: row;
}
.toolbar ul{
    @include flexRow;
    height: .8rem;
    border-bottom: .02rem solid #f3f3f3;
    li{
        -webkit-flex: 1;
        flex: 1;
        text-align: center;
        line-height: .8rem;
        font-size: .28rem;
        color: #333;
        &.shopbar-cur{
            color: #e20;
        }
    }
}
</style>
