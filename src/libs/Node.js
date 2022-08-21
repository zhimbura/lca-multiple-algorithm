export class Node {
    constructor(id) {
        this.id = id
        this.childNodes = []
        this.parentNode = null
        Object.seal(this)
    }

    addChildren(child) {
        if (!this.childNodes.includes(child)) {
            this.childNodes.push(child)
            child.setParent(this)
        }
    }

    setParent(parent) {
        this.parentNode = parent
        parent.addChildren(this)
    }

    getAllChildren() {
        return [
            ...this.childNodes,
            ...this.childNodes.flatMap(child => child.getAllChildren())
        ]
    }

    /***
     * Находит наименьшего общего родителя для нескольких элементов
     * @param allNodes - Массив выбранных элементов
     * @returns {Node|null} null если в allNodes будет корень дерева
     */
    getLowestCommonAncestor(allNodes) {
        if (~allNodes.indexOf(this)) {
            return this.parentNode
        } else if (this.childNodes.length === 0) {
            return null
        } else {
            let childParents = new Set()
            for (let child of this.childNodes) {
                let parent = child.getLowestCommonAncestor(allNodes)
                if (parent) {
                    childParents.add(parent)
                }
            }
            if (childParents.size > 1) {
                return this
            } else if (childParents.size === 1) {
                return childParents.values().next().value
            } else {
                return null
            }
        }
    }

    getLowestCommonAncestor2(allNodes) {
        let mapParentsCount = new Map()
        let tmpArray = allNodes.slice()
        while (tmpArray.length > 0) {
            for (let i = tmpArray.length - 1; i >= 0; i--) {
                let parent = tmpArray[i]?.parentNode
                if (!parent) {
                    tmpArray.splice(i, 1)
                    continue
                }
                let newCount = (mapParentsCount.get(parent) || 0) + 1
                if (newCount === allNodes.length) {
                    return parent
                }
                mapParentsCount.set(parent, newCount)
                tmpArray.splice(i, 1, parent)
            }
        }
        return null
    }
}
