<template>
  <div style="width: 100%;height: 100%">
    <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" class="mytags">{{tag.name}}</el-tag>
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">//实现过滤搜索
      <el-table-column label="Date" prop="date"></el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="province" prop="province"></el-table-column>
      <el-table-column label="city" prop="city"></el-table-column>
      <el-table-column label="address" prop="address"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from "axios";

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
          name: '大朋友',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '小朋友',
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
        ],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    mounted() {
      axios.get('/user/userinfo').then(res => {
        console.log("1111111111");
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
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
