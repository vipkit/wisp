<template>
  <div>
    <div class="root">
      <SlickList
        v-model="items"
        class="list"
        lock-axis="y"
        helper-class="sorting-item"
      >
        <SlickItem
          v-for="(item, index) in items"
          :key="'slick-list' + index"
          :index="index"
          class="list-item darkgrey sort-item"
        >
          <div class="w-1/3">
            {{
              item.name ||
              item.title ||
              (item.article ? item.article.title : '')
            }}
          </div>
          <div v-if="item.imageUrl" class="w-1/3 flex justify-center">
            <div>
              <img
                width="64"
                :src="item.imageUrl + '?imageMogr2/thumbnail/!40p'"
              />
            </div>
          </div>
          <div class="flex justify-end w-1/3">
            <div>
              <span class="position-mark">{{ index + 1 }}</span>
            </div>
          </div>
        </SlickItem>
      </SlickList>
    </div>
    <div class="flex justify-center">
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button type="primary" size="mini" @click="save">确定</el-button>
    </div>
  </div>
</template>
<script>
import { SlickList, SlickItem } from 'vue-slicksort'
export default {
  components: {
    SlickItem,
    SlickList,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      items: this.list,
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    save() {
      this.$emit(
        'save',
        this.items.map(item => item.id)
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.root {
  height: 450px;
  overflow: scroll;
}
.sort-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;
  user-select: none;
  font-weight: 400;
  cursor: move;
  z-index: 10000;
  .position-mark {
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #777;
    border-radius: 10px;
  }
}
.sorting-item {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}
</style>
