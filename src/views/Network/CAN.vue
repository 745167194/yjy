<template>
  <div>
    <el-form :model="Form" ref="Form" label-width="150px" label-position="left">

      <el-form-item :label="$t('networkIndex.canIndex.channelName')" prop="Channel">
        <el-select v-model="Form.Channel">
            <el-option label="CAN1" value="CAN1" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.canIndex.protocol')" prop="Protocol">
        <el-select v-model="Form.Protocol">
          <el-option label="CAN-1" value="CAN-1" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.canIndex.workingMode')" prop="WorkingMode">
        <el-select v-model="Form.WorkingMode">
          <el-option label="normal" value="normal" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('networkIndex.canIndex.baud')" prop="BPS">
        <el-select v-model="Form.BPS">
          <el-option label="250" value="250" ></el-option>
        </el-select>
        K
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">{{ $t('apply') }}</el-button>

        <el-button  style="margin: 20px" @click="Default()">{{ $t('default') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CAN",
  data(){
    return {
      Form:{
        Channel:'CAN1',
        Protocol:'CAN-1',
        WorkingMode:'normal',
        BPS:'250'
      }
    }
  },
  methods:{
    submitForm() {
      let data=this.Form
      this.$api.CallRpc('CANChannelSetting','CANChannelSetting',data)
    },
    Refresh(){
      this.$refs.Form.resetFields();
    },
    Default(){
      this.Form.BPS='250'
      this.Form.Channel='CAN1'
      this.Form.Protocol='CAN-1'
      this.Form.WorkingMode='normal'
    },
  }
}
</script>

<style scoped>

</style>
