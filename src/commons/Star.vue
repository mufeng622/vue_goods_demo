<template>
    <div class="star-box">
        <span v-if="starName">{{starName}}</span>
        <dl>
            <dd v-for="star in 5" :class="star <= starStoreInit ? 'star_cur' : ''"></dd>
            <dt v-if="isStarNumShow">{{starScore}}</dt>
        </dl>
    </div>
</template>

<script>
export default {
    name: 'Star',
    props: ['starScore', 'starName', 'isStarNumShow'],
    computed: {
        starStoreInit(){
            return Math.floor(this.starScore)
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
@mixin backgroundImg($url){
    background-image: url("/static/images/" + $url + '@2x.png');
    @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3){
        background-image: url("/static/images/" + $url + '@3x.png');
    }
}
.star-box{
    @include flexRow;
    font-size: .24rem;
    span{
        margin-right: .2rem;
    }
    dl{
        margin-bottom: .2rem;
    }
    dd{
        display: inline-block;
        margin: 0 .04rem;
        width: .2rem;
        height: .2rem;
        -webkit-background-size: .2rem .2rem;
        background-size: .2rem .2rem;
        @include backgroundImg('star24_off');
        &.star_cur{
            @include backgroundImg('star24_on')
        }
    }
    dt{
        display: inline-block;
    }
}
</style>
