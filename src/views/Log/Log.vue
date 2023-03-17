<template>
  <div style="height: 100%;width: 100%">

    <el-form :model="Form"  ref="Form">
      <el-form-item>
        查找日期：<el-date-picker placeholder="选择日期" v-model="Form.time" style="width: 200px;margin-right: 20px" value-format ="yyyy-MM-dd"></el-date-picker>
        Type：
          <el-select v-model="Form.type" >
            <el-option label="All" value="All"></el-option>
          <el-option label="System" value="System"></el-option>
          <el-option label="Config" value="Config"></el-option>
          <el-option label="Storage" value="Storage"></el-option>
          <el-option label="Alarm Event" value="Alarm Event"></el-option>
          <el-option label="Record" value="Record"></el-option>
          <el-option label="Account" value="Account"></el-option>
          <el-option label="Security" value="Security"></el-option>
        </el-select>
        <el-button @click="search">Search</el-button>
      </el-form-item>
    </el-form>


      <el-table :data="LogData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="Time"><span>{{ props.row.time }}</span></el-form-item>
              <el-form-item label="Username"><span>{{ props.row.username }}</span></el-form-item>
              <el-form-item label="Type"><span>{{ props.row.type }}</span></el-form-item>
              <el-form-item label="log Content"><span>{{ props.row.content }}</span></el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="No." type="index"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Time" prop="time"></el-table-column>
        <el-table-column label="Username" prop="username"></el-table-column>
        <el-table-column label="Type" prop="type"></el-table-column>
      </el-table>

  </div>
</template>

<script>


import request from "../../utils/request";

export default {
  name: 'Log',
  inject:['reload'],//注入刷新页面的依赖
  props:['id'],//使用props进行传参
  data(){
    return{
      Form: {
        time:null,
        type:'All',
      },
      LogData:[]
    }
  },
  methods:{
    search(){
      let data=this.Form
      this.$api.CallRpc('searchLog','searchLog',data)
    },
    getLogData(){
      this.$api.CallRpc('getLog','getLog')
    }

  },
  mounted() {
    this.getLogData();
  }
}
</script>

<style lang="scss" >
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>


