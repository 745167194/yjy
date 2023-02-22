<template>
  <div style="width: 100%;height: 100%">
    <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" class="mytags">{{tag.name}}</el-tag>
  <el-table :data="tableData" style="width: 100%" >
    <el-table-column prop="date" label="日期" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
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
    /*methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },*/
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }],
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ]
      }
    }
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

<style lang="scss" scoped>
.mytags{
  margin: 5px;
}
</style>
