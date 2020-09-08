import {
  computed,
  reactive,
  toRefs,
  watch,
  onMounted,
} from '@vue/composition-api'

export function useFetch(computedFn) {
  if (typeof computedFn != 'function') {
    throw 'arg of useFetch must be a function'
  }
  var argRef = computed(computedFn)
  if (!argRef.value.api) {
    throw 'api is required'
  }
  const state = reactive({
    data: null,
    loading: true,
    error: null,
    isInitial: true,
    filters: {
      ...(argRef.value.params || {}),
    },
  })
  const fetchData = () => {
    state.filters = {
      ...(argRef.value.params || {}),
    }
    state.loading = true
    argRef.value
      .api({
        params: argRef.value.params,
      })
      .then(res => {
        state.data = res
      })
      .catch(error => {
        state.error = error
      })
      .finally(() => {
        state.loading = false
        state.isInitial = false
      })
  }
  onMounted(fetchData)
  watch(argRef, fetchData)
  return {
    ...toRefs(state),
    refetch: fetchData,
  }
}
