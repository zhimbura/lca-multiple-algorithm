<template>
  <li @click.stop="toggleActive">
    <a href="#" :class="{'active': isActive, 'common': common === node}">{{ node.id }}</a>
    <ul v-if="node.childNodes.length > 0">
      <NodeViewer
          v-for="(child, index) in node.childNodes"
          :node="child"
          :common="common"
          :selected="selected"
          :key="index"
          @change="$emit('change')"
      ></NodeViewer>
    </ul>
  </li>
</template>

<script>
import {Node} from "@/libs/Node";

export default {
  name: "NodeViewer",
  props: {
    node: Node,
    common: Node,
    selected: Set
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive
      if (this.isActive) {
        this.selected.add(this.node)
      } else {
        this.selected.delete(this.node)
      }
      this.$emit("change")
    }
  }
}
</script>

<style scoped>
</style>