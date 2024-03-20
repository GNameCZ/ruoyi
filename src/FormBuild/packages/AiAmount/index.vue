<template>
  <div class="ai-amount">
    <el-input-number v-model="state.innerValue" style="width: 100%" v-bind="$attrs" @input="handleInput"></el-input-number>
    <div v-if="props.showChinese" class="explain-text">大写：{{ chinese }}</div>
  </div>
</template>
<script lang="ts" setup name="AiAmount">
import { getAmountChinese } from '../utils';

interface PropType {
  modelValue: string;
  showChinese: string;
}

const emits = defineEmits(['update:modelValue']);
const props = defineProps<PropType>();

const state = reactive({
  innerValue: props && props.modelValue
});

const chinese = computed(() => {
  return props.showChinese ? getAmountChinese(state.innerValue) : '';
});
const handleInput = (val) => {
  emits('update:modelValue', val);
};

watch(
  () => props.modelValue,
  (val: string) => {
    if (val !== state.innerValue) {
      state.innerValue = val;
    }
  }
);
</script>
<style lang="scss" scoped>
.explain-text {
  font-size: 12px;
  color: #aaa;
  line-height: 20px;
}
</style>
