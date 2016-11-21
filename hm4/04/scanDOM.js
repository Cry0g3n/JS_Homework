function scanDOM() {
    let result = {};

    let getData = function (startElement) {
        let domStructure = (startElement || document.querySelector('html')).childNodes || [];

        for (let node of domStructure) {
            let nodeType = node.nodeType,
                classList = node.classList || [],
                nodeName = node.nodeName;

            if (nodeType === 3 || nodeType === 8) {
                let count = result['textNodesCount'] || 0;
                result['textNodesCount'] = ++count;
            }
            else {
                result['classes'] = result['classes'] || {};
                let classes = result['classes'];
                for (let cl of classList) {
                    let classCount = classes[cl] || 0;
                    classes[cl] = ++classCount;
                }

                result['tags'] = result['tags'] || {};
                let tags = result['tags'];
                let tagCount = tags[nodeName] || 0;
                tags[nodeName] = ++tagCount;

                getData(node);
            }
        }
    };

    let printResult = function (result) {
        for (let item in result) {
            switch (item) {
                case 'textNodesCount':
                    console.log('Текстовых узлов: ' + result[item]);
                    break;
                case 'classes':
                    let classes = result[item] || {};
                    for (let cl in classes) {
                        console.log('Элементов с классом ' + cl + ': ' + classes[cl]);
                    }
                    break;
                case 'tags':
                    let tags = result[item] || {};
                    for (let tag in tags) {
                        console.log('Тэгов ' + tag.toLowerCase() + ': ' + tags[tag]);
                    }
                    break;
            }
        }
    };

    getData();
    printResult(result);
}

module.exports = scanDOM;