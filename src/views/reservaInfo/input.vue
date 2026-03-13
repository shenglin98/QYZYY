<template>
  <!-- style="width: 100%" -->
  <span class="myinput">
    <span>{{ prefix || myPrefix }}</span>
    <el-input
      style="width: 1.8rem"
      size="mini"
      :disabled="disabled"
      :value="inputValue"
      @input="handleInput"
    />
    <span>{{ suffix || mySuffix }}</span>
  </span>
</template>

<script>
export default {
  props: {
    value: String,
    index: Number,
    prefix: String,
    suffix: String,
    count: Number,
    disabled: Boolean,
    item: Object,
    mark: {
      type: String,
      default: "|X|",
    },
    content: String,
  },
  watch: {
    value: {
      handler(newVal) {
        this.inputValue = newVal ? newVal.split(this.mark)[this.index] : "";
      },
      immediate: true,
    },
    content: {
      handler(newVal) {
        if (newVal) {
          const res = newVal.split(this.mark);
          const params = ["myPrefix", "mySuffix"];
          params.forEach((v, k) => {
            this[v] = `${res[k]}${k ? "," : ""}`;
          });
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      inputValue: "",
      myPrefix: "",
      mySuffix: "",
    };
  },
  methods: {
    handleInput(value) {
      let val = "";
      if (this.value) {
        const res = this.value.split(this.mark);
        res[this.index] = value;
        val = res.join(this.mark);
      } else {
        val = Array.from(new Array(this.count))
          .map((v, k) => {
            if (k === this.index) {
              return value;
            }
            return "";
          })
          .join(this.mark);
      }
      var Flag = false;
      console.log(val);
      this.$emit(
        "updateValue",
        val.split("|X|").filter((v) => v),
        this.item,
        (Flag = this.count === 1 ? true : false)
      );
      this.$emit("update:value", val);
    },
  },
};
</script>
