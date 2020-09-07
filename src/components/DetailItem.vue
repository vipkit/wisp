<template functional>
  <div
    :style="[{ padding: props.padding }]"
    :class="['flex', { 'p-y-md': !props.padding }, { 'is-half': !props.block }]"
  >
    <span v-if="props.title" class="data-title">{{ props.title }}</span>
    <slot v-if="props.value !== 0 && !props.value" />
    <span v-else class="data-value">{{ props.value }}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: undefined,
    },
    value: {
      type: [String, Number],
      default: undefined,
    },
    block: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: String,
      default: '',
    },
  },
}
</script>
