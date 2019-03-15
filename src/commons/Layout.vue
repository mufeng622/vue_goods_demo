<template>
    <div class="layout" @click.stop="closeLay()">
        <slot></slot>
        <span class="close" @click.stop="closeLay()">&times;</span>
    </div>
</template>

<script>
export default {
    name: 'Layout',
    props: ['is_layout'],
    methods: {
        closeLay(){
            this.$emit('closeLayPar')
        }
    }
}
</script>

<style lang="scss" scoped>
.layout{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: rgba(0, 0, 0, .7);
    .close{
        position: absolute;
        right: .4rem;
        top: .4rem;
        font-size: .36rem;
        color: #fff;
        z-index: 100;
    }
}
</style>

