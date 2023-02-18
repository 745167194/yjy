<template>
  <div>table ID={{id}}</div><!--使用props进行参数传递-->
</template>

<script>
  export default {
    props:['id'],//使用props进行传参
    name:'Table',
    beforeRouteEnter:(to,from,next)=>{//钩子函数，在进入页面之前（去哪个组件，从哪个组件来，到下一个钩子函数）
      console.log("进入table"),
      next();//要去的下一个钩子函数或者路由
    },
    beforeRouteLeave:(to,from,next)=>{
      console.log("离开table"),
      next();//要去的下一个钩子函数或者路由
    },
    /*methods:{
      getData:function(){
        this.axios({
          method:'get',
          url:'http://localhost:8080/data.json',//data.json放到tomcat里
        }).then(function(repos){
          console.log(repos);//请求到数据并打数据
        }).catch(function(error){
          console.log(error);
        });
      }
    }*/
  }
</script>

<style>
</style>
