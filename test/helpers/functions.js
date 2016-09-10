import clone from 'clone'

export function noop() {}

export function identity(node) {
  return node
}

export function copy(node) {
  return clone(node)
}

export function skipValue(value) {
  return function(node) {
    return (value !== node.value ? node : null)
  }
}

export function remove(mutation, node, parentNode) {
  if ('remove' === mutation) {
    const index = parentNode.children.indexOf(node)
    parentNode.children.splice(index, 1)
  }
}
