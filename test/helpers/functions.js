function noop() {}

function identity(node) {
  return node
}

function skipValue(value) {
  return function(node) {
    return (value !== node.value ? node : null)
  }
}

function remove(mutation, node, parentNode) {
  if ('remove' === mutation) {
    const index = parentNode.children.indexOf(node)
    parentNode.children.splice(index, 1)
  }
}

module.exports = { noop, identity, skipValue, remove }
