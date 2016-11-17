function prepend(container, newElement) {
    if (container && newElement) {
        container.insertBefore(newElement, container.firstElementChild)
    }
}

module.exports = prepend;