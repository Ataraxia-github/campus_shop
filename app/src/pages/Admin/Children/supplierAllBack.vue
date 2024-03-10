<template>
<!-- 空白页作跳转中转站 -->
  <div></div>
</template>

<script>
export default {
    beforeMount(){
        this.TickBack()
    },
    methods:{
        TickBack(){
            this.$router.replace('/admin/mastergoods')
        }
    }
}
</script>

<style>

</style>