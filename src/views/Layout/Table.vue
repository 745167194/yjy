<template>
  <div style="width: 100%;height: 100%">
    <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" class="mytags">{{tag.name}}</el-tag>
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" >//实现过滤搜索
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="设备名称"><span>{{ props.row.name }}</span></el-form-item>
            <el-form-item label="使用项目"><span>{{ props.row.region }}</span></el-form-item>
            <el-form-item label="购买日期"><span>{{ props.row.date }}</span></el-form-item>
            <el-form-item v-if="visual" label="购买时间"><span>{{ props.row.time }}</span></el-form-item>
            <el-form-item label="设备类型"><span>{{ props.row.type }}</span></el-form-item>
            <el-form-item label="特殊资源"><span>{{ props.row.resource }}</span></el-form-item>
            <el-form-item label="备注"><span>{{ props.row.desc }}</span></el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Date" prop="date,time">
        <template slot-scope="scope"> {{scope.row.date}} {{scope.row.time }}</template>
      </el-table-column>
      <el-table-column label="Region" prop="region"></el-table-column>
      <el-table-column label="Type" prop="type"></el-table-column>
      <el-table-column label="Resource" prop="resource"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)" >Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="使用项目" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择项目名称">
            <el-option label="项目一" value="项目一"></el-option>
            <el-option label="项目二" value="项目二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购买时间" required>
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;" value-format ="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">——</el-col>
          <el-col :span="11">
            <el-form-item prop="time">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.time" style="width: 100%;" value-format ="HH:mm:ss"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="类型一" name="type"></el-checkbox>
            <el-checkbox label="类型二" name="type"></el-checkbox>
            <el-checkbox label="类型三" name="type"></el-checkbox>
            <el-checkbox label="类型四" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="光之国能量源"></el-radio>
            <el-radio label="魔仙堡能量源"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,changeInfo()">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import axios from "axios";
  import request from "../../utils/request";

  export default {
    inject:['reload'],//注入刷新页面的依赖
    props:['id'],//使用props进行传参
    name:'Table',
  /*  beforeRouteEnter:(to,from,next)=>{//钩子函数，在进入页面之前（去哪个组件，从哪个组件来，到下一个钩子函数）
      console.log("进入table"),
      next();//要去的下一个钩子函数或者路由
    },
    beforeRouteLeave:(to,from,next)=>{
      console.log("离开table"),
      next();//要去的下一个钩子函数或者路由
    },*/
    data() {
      return {
        visual:'false',
        tableData: [],
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ],
        search: '',
        dialogTableVisible: false,
        dialogFormVisible: false,
        ruleForm: {
          id:'',
          name: '',
          region: '',
          date: '',
          time: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',

        rules: {//限定条件
          name: [
            { required: true, message: '请输入设备名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择使用项目', trigger: 'change' }
          ],
          date: [
            {  required: true, message: '请选择日期', trigger: 'change' }
          ],
          time: [
            {  required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个设备类型', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        }

      }
    },
    methods: {
      changeInfo(){
        this.$api.CallRpc('changeDevInfo','changeDevInfo',this.ruleForm)//参数中含id
          .then(res=>{
            this.reload()
            this.dialogFormVisible = false
          })
      },

      handleEdit(row) {
        this.dialogFormVisible = true  //弹出对话框表单
        this.ruleForm=row
      },

      handleDelete(index) {
        console.log(index);
        this.$api.CallRpc('deleteDev','deleteDev',{"index:":index})
          .then(res=>{
            this.reload()
          })
      },

      getTableData(){
        this.$api.CallRpc('getDev','getDev').then(res=>{
          //console.log(res.data)
          //this.tableData=res.data
        }).catch(res=>{
          console.log(res.error())
        })
      }
    },
    mounted() {
      this.getTableData()
    }
  }
</script>

<style lang="scss" scoped>
.mytags{
  margin: 5px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
