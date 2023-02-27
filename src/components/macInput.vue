<template>
  <div id="wifi">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="index !== list.length - 1 ? 'box' : 'box-last'"
    >
      <el-input
        v-model="item.value"
        ref="contentWrap"
        @input="input(item.value, index)"
        maxlength="2"
        @change="change()"
        :disabled="isDisabled"
      />
      <span class="split" v-show="index !== list.length - 1"> : </span>
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
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},
  mounted() {},
  data() {
    return {
      list: [
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
        {
          value: '',
        },
      ],
      isDisabled: false,
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.setList();
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {
    setList() {
      if (
        this.value === undefined ||
        this.value === null ||
        this.value === ''
      ) {
        this.list = [
          {
            value: '',
          },
          {
            value: '',
          },
          {
            value: '',
          },
          {
            value: '',
          },
          {
            value: '',
          },
          {
            value: '',
          },
        ];
      } else {
        const array = this.value.split(':');
        if (array.length > 0) {
          this.list = [];
          let obj = [];
          array.forEach(function (element) {
            obj.push({
              value: element.toUpperCase(),
            });
          });
          this.list = obj;
        }
      }
    },
    change() {
      let res = '';
      this.list.forEach(function (element) {
        res += element.value + ':';
      });
      if (res !== '') {
        res = res.substring(0, res.length - 1);
      }
      this.$emit('input', res);
    },
    input(value, index) {
      if (value.length === 2) {
        this.$nextTick(() => {
          index++;
          if (index < this.list.length) {
            this.$refs.contentWrap[index].focus();
          }
        });
      } else {
        this.$nextTick(() => {
          if (this.list[index].value == '') {
            this.$refs.contentWrap[index - 1].focus();
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#wifi {
  display: flex;
  .box {
    width: calc(100% / 6);
    display: flex;
  }
  .box-last {
    width: calc((100% / 6) - 8px);
    display: flex;
  }
  .split {
    margin: auto 2px;
  }
  ::v-deep .el-input__inner {
    padding: 0px 5px;
    text-align: center;
  }
}
</style>
