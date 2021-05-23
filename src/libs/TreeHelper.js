import { Node } from "@/libs/Node";

export class TreeHelper {
    constructor() {
        this.uniqId = 0
    }

    resetId() {
        this.uniqId = 0
    }

    getUniqId() {
        return ++this.uniqId
    }

    generateTree(maxDeep = 5, maxChildNode = 3) {
        if (maxDeep >= 0) {
            let node = new Node(this.getUniqId())
            let localDeep = maxDeep - 1
            for (let i = 0; i < maxChildNode && localDeep > 0; i++) {
                let childTree = this.generateTree(localDeep, maxChildNode)
                node.addChildren(childTree)
            }
            return node
        } else {
            throw Error("Глубина не может быть отрицательной")
        }
    }
}