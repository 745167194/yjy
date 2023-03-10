<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="User" name="User">
        <div>
          <el-form :model="AddForm">
            <el-form-item>
              <el-button @click="dialogFormVisible = true" type="primary">Add</el-button>
              <el-button @click="Delete" type="primary" :disabled.sync="butDisabled">Delete</el-button>
              <el-button @click="toggleSelection()">取消选择</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table ref="multipleTable" :data="AdminData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" >
            <el-table-column type="selection" width="100" ></el-table-column>
            <el-table-column prop="id" label="ID" width="400"></el-table-column>
            <el-table-column prop="account" label="Account" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div>
          <el-dialog title="添加用户" :visible.sync="dialogFormVisible" >
            <el-form :model="AddForm">
              <el-form-item label="工号" :label-width="formLabelWidth">
                <el-input v-model="AddForm.id" placeholder="请输入工号" style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="AddForm.account" placeholder="请输入账号" style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input type="password" v-model="AddForm.password" placeholder="请输入密码" style="width: 300px"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" :label-width="formLabelWidth">
                <el-input type="password" v-model="AddForm.acPassword" auto-complete="off" placeholder="请确认密码" style="width: 300px"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="Add">确 定</el-button>
            </div>
          </el-dialog>
        </div>

      </el-tab-pane>
      <el-tab-pane label="2" name="Group"></el-tab-pane>
      <el-tab-pane label="3" name="ONVIF"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: "Account",
  data() {
    return {
      activeName: 'User',
      AdminData:[],
      AddForm:{
        id:'',
        account:'',
        password:'',
        acPassword:''
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      butDisabled:true,
      multipleSelection: [],
      formLabelWidth: '120px'
    };
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    Add(){
     // console.log("add admin")
      if(this.AddForm.password===this.AddForm.acPassword){
        this.$api.account.addAdmin(this.AddForm.id,this.AddForm.account,this.AddForm.password).then(res=>{
          this.AdminData=res.data.data
        })
        this.dialogFormVisible = false
      }
      else {
        this.$message.error('两次密码不同！请检查输入');
      }
    },
    Delete(){
      let arr=[]
      this.multipleSelection.forEach(row=>arr.push(row.id))//得到每一行的id
      console.log(arr)
      this.$confirm('确定删除吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        callback: action => {
          if (action === 'confirm') {
            //批量删除
            this.$api.account.deleteAdmin(arr).then(res=>{
              this.AdminData=res.data.data
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
            })

          }
        }
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
        //this.butDisabled=true;
      }

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(this.multipleSelection.length!==0){
        this.butDisabled=false;
      }
      else {
        this.butDisabled=true;
      }

    },
    getAdmin(){
      this.$api.account.getAllAdmin().then(res=>{
        this.AdminData=res.data
        //console.log(this.AdminData)
      })
    }
  },
  mounted() {
    if(this.activeName==='User'){
      //console.log("User")
      this.getAdmin()
    }

  }
}
</script>

<style scoped>

</style>
