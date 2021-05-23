<template>
  <div class="p-md-6 p-grid">
    <div class="p-col-6" style="margin: 7px">
      <label>Deep</label><br/>
      <InputNumber id="maxDeep" showButtons v-model="maxDeep" mode="decimal" :min="1" :max="100"/>
    </div>
    <div class="p-col-6" style="margin: 7px">
      <label>Count Child</label><br/>
      <InputNumber id="maxChild" showButtons v-model="maxChild" mode="decimal" :min="2" :max="100"/>
    </div>
    <Button label="Create" @click="createTree" style="margin: 7px"/>
<!--    <Button label="Find" @click="markCommonParents" style="margin: 7px"/>-->
    <template v-if="tree">
      <div class="tree">
        <ul>
          <NodeViewer :node="tree" :common="common" :selected="selected" @change="markCommonParents"></NodeViewer>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import {TreeHelper} from "@/libs/TreeHelper";
import NodeViewer from "@/components/NodeViewer";
import {Node} from "@/libs/Node";

export default {
  name: 'TreeViewer',
  components: {NodeViewer},
  data() {
    return {
      common: Node,
      selected: new Set(),
      maxDeep: 5,
      maxChild: 2,
      treeHelper: new TreeHelper(),
      tree: null
    }
  },
  props: {},
  methods: {
    createTree() {
      this.common = null
      this.selected = new Set()
      this.treeHelper.resetId()
      this.tree = this.treeHelper.generateTree(this.maxDeep, this.maxChild)
      console.log(this.tree)
    },
    markCommonParents() {
      if (this.tree) {
        let nodes = Array.from(this.selected)
        this.common = this.tree.getLowestCommonAncestor(nodes)
      }
    }
  }
}
</script>
<style>
body {
  font-family: sans-serif;
  font-size: 15px;
}

.tree {
  transform: rotate(180deg);
  transform-origin: 50%;
  overflow-x: auto;
}

.tree ul {
  position: relative;
  padding: 1em 0;
  white-space: nowrap;
  margin: 0 auto;
  text-align: center;
}

.tree ul::after {
  content: "";
  display: table;
  clear: both;
}

.tree li {
  display: inline-block;
  vertical-align: top;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 1em 0.5em 0 0.5em;
}

.tree li::before, .tree li::after {
  content: "";
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #ccc;
  width: 50%;
  height: 1em;
}

.tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid #ccc;
}

.tree li:only-child::after, .tree li:only-child::before {
  display: none;
}

.tree li:only-child {
  padding-top: 0;
}

.tree li:first-child::before, .tree li:last-child::after {
  border: 0 none;
}

.tree li:last-child::before {
  border-right: 1px solid #ccc;
  border-radius: 0 5px 0 0;
}

.tree li:first-child::after {
  border-radius: 5px 0 0 0;
}

.tree ul ul::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid #ccc;
  width: 0;
  height: 1em;
}

.tree li a {
  border: 1px solid #ccc;
  padding: 0.5em 0.75em;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  color: #333;
  position: relative;
  top: 1px;
  transform: rotate(180deg);
}

.tree li .active,
.tree li .active {
  background: #e9453f;
  color: #fff;
  border: 1px solid #e9453f;
}

.tree li .common,
.tree li .common {
  background: #3f6fe9;
  color: #fff;
  border: 1px solid #3f42e9;
}

.tree li .active + ul li::after,
.tree li .active + ul li::before,
.tree li .active + ul::before,
.tree li .active + ul ul::before {
  border-color: #e9453f;
}
</style>
