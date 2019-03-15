<template>
    <div id="app">
        <ShopTop></ShopTop>
        <ToolBar></ToolBar>
        <router-view></router-view>
    </div>
</template>

<script>
import ShopTop from '@/components/ShopTop';
import ToolBar from '@/components/ToolBar';

export default {
    name: 'App',
    components: {ShopTop, ToolBar},
    created(){
        this.$store.dispatch('initState')
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
ul, li{
    list-style: none;
}
a{
    text-decoration: none;
}
img{
    border: none 0;
    display: block;
}
body, html{
    width: 100%;
    height: 100%;
}
#app{
    width: 100%;
    height: 100%;
}
</style>
