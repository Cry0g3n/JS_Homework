function deleteTextNodes(container) { debugger;
    let childNodes = container.childNodes,
        removeCandidates = [];

    for (let node of childNodes) {
        if (node.nodeType === 3) {
           removeCandidates.push(node);
        }
        else if (node.childNodes.length) {
            deleteTextNodes(node);
        }
    }

    for (let candidate of removeCandidates) {
        candidate.remove();
    }
}

module.exports = deleteTextNodes;