<template>
  <div class="nodata">
      <div class="nodeta-img">
        <img src="../../../static/image/4044.png" alt="">
      </div>
      <div class="mybtn">
        <el-button round type="primary" class="gohome" @click="gohome">Back to Home</el-button>
      </div>

  </div>
</template>

<script>
export default {
    name: 'NotFound',
    methods:{
        gohome(){
            this.$router.push('/')
        }
    }
}
</script>

<style>
body{
    width: 100%;
    height: 100%;
}
.nodata{
    position: relative;
    width: 100%;
    height: 100%;
    /* background: rgb(245, 253, 255); */
}
.nodeta-img{
    width: 750px;
    height: 750px;
    position: relative;
    margin: auto;
}
.nodeta-img img{
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: contain;
}
.mybtn{
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>