<template>
  <div style="height: 100%;width: 100%">

    <el-form :model="Form"  ref="Form">
      <el-form-item>{{$t('logIndex.searchDate')}}
        <el-date-picker :placeholder="$t('logIndex.selectDate')" v-model="Form.time" style="width: 200px;margin-right: 20px" value-format ="yyyy-MM-dd"></el-date-picker>
        {{$t('logIndex.type')}}
          <el-select v-model="Form.type" >
            <el-option :label="$t('all')" value="All"></el-option>
          <el-option :label="$t('system')" value="System"></el-option>
          <el-option :label="$t('config')" value="Config"></el-option>
          <el-option :label="$t('storage')" value="Storage"></el-option>
          <el-option :label="$t('myEvent')" value="Alarm Event"></el-option>
          <el-option :label="$t('record')" value="Record"></el-option>
          <el-option :label="$t('account')" value="Account"></el-option>
          <el-option :label="$t('security')" value="Security"></el-option>
        </el-select>
        <el-button @click="search">{{ $t('search') }}</el-button>
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
        <el-table-column :label="$t('logIndex.time')" prop="time"></el-table-column>
        <el-table-column :label="$t('logIndex.username')" prop="username"></el-table-column>
        <el-table-column :label="$t('logIndex.type')" prop="type"></el-table-column>
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


