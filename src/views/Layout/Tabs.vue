<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      <el-table :data="tableData" border height="200" :summary-method="getSummaries" show-summary style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
        <el-table-column prop="amount2" label="数值 2（元）"></el-table-column>
        <el-table-column prop="amount3" label="数值 3（元）"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">
      <el-table :data="tableData" border show-summary style="width: 100% ; margin-top: 20px">//显示合计价格啥的
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="amount1" sortable label="数值 1"></el-table-column>
        <el-table-column prop="amount2" sortable label="数值 2"></el-table-column>
        <el-table-column prop="amount3" sortable label="数值 3"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
import request from "../../utils/request";

export default {
  name: "Tabs",
  data() {
    return {
      activeName: 'first',
      tableData: []
    };

  },
  methods: {
    handleClick(tab, event) {//标签点击事件
      console.log(tab, event);
    },
    getSummaries(param) {//求和函数
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });
      return sums;
    }
  },
  mounted() {
    this.$api.CallRpc('getSomething','getSomething')
  }
}
</script>

<style scoped>

</style>
