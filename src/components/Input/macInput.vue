<template>
  <div class="macAdress">
    <div v-for="(item,index) in macAddress" style="display: flex">
      <input ref="macInput"  v-model="item.value" type="text" class="macInputClass"  @keyup="turnMacPosition(item,index,$event)"/>
      <div v-if="index!==5">:</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'macInput',
  components: {},
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      macAddress: [
        {
          value: ''
        },{
          value: ''
        },{
          value: ''
        },{
          value: ''
        },{
          value:''
        },{
          value:''
        }
      ]
    }
  },
  watch: {
    macAddress: { // 双向数据绑定的value
      handler: function (newVal, oldVal) {
        let str = ''
        for (const i in this.macAddress) {
          str += this.macAddress[i].value
        }
        if (str === '000000000000') {
          str = ''
        }
        this.$emit('input', str)
      },
      deep: true
    }
  },

  methods:{
    // 光标位置判断
    turnMacPosition(item, index, event) {
      let self = this;
      let e = event || window.event;
      if (e.keyCode === 37) { // 左箭头向左跳转，左一不做任何措施
        if(index !== 0 && e.currentTarget.selectionStart === 0) {
          self.$refs.macInput[index - 1].focus();
        }
      } else if (e.keyCode == 39) { // 右箭头向右跳转，右一不做任何措施
        if(index !== 5 && e.currentTarget.selectionStart === item.value.toString().length) {
          self.$refs.macInput[index + 1].focus();
        }
      } else if (e.keyCode === 8) { // 删除键把当前数据删除完毕后会跳转到前一个input，左一不做任何处理
        if(index !== 5 && item.value === '') {
          self.$refs.macInput[index - 1].focus();
        }
      } else if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 190) {// 回车键、空格键、冒号均向右跳转，右一不做任何措施
        if(index !== 5) {
          self.$refs.macInput[index + 1].focus();
        }
      } else if (item.value.toString().length === 2) { // 满2位，光标自动向下一个文本框
        if(index !== 5) {
          self.$refs.macInput[index + 1].focus();
        }
      }
    },
    initValue(str){
      let MacStr=str.split("-")
      console.log(MacStr)
      this.macAddress[0].value=MacStr[0]
      this.macAddress[1].value=MacStr[1]
      this.macAddress[2].value=MacStr[2]
      this.macAddress[3].value=MacStr[3]
      this.macAddress[4].value=MacStr[4]
      this.macAddress[5].value=MacStr[5]
    },
    getMac(){
      let str=this.macAddress[0].value+"-"+
        this.macAddress[1].value+"-"+
        this.macAddress[2].value+"-"+
        this.macAddress[3].value+"-"+
        this.macAddress[4].value+"-"+
        this.macAddress[5].value
      return str
    }
  }
};
</script>

<style lang="scss" scoped>
.macAdress{
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 196px;
  height: 36px;
  padding-inline-start: 0px;
}
.macAdress li{
  position: relative;
  height: 36px;
  margin: 0;
  list-style-type: none;
}
.macInputClass{
  border: none;
  width: 40px;
  height: 34px;
  text-align: center;
  background: transparent;
  font-family: "微软雅黑";
  }
.macAdress li div{
  position: absolute;
  bottom: 8px;
  right: 0;
  border-radius: 50%;
  background: #505050;
  width: 2px;
  height: 2px;
}
/*只需要6个div*/
.macAdress li:last-child div{
  display: none;
}
/*取消掉默认的input focus状态*/
.macAdress input:focus{
  outline: none;
}
</style>
