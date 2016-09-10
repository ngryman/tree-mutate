import clone from 'clone'

export function noop() {}

export function identity(node) {
  return node
}

export function copy(node) {
  return clone(node)
}

export function copyValue(value, newNode) {
  return function(node) {
    return (value !== node.value ? node : newNode || copy(node))
  }
}

export function skipValue(value) {
  return function(node) {
    return (value !== node.value ? node : null)
  }
}

export function layout(mutation, node, parentNode, index) {
  if ('remove' === mutation) {
    parentNode.children.splice(index, 1)
  }
  else if ('replace' === mutation) {
    parentNode.children[index] = node
  }
}
