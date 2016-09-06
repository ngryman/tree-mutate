import crawl from 'tree-crawl'

/**
 * Walk over a **mutable** tree and invoke **mutators** on each node.
 *
 * Depending on mutators implementation, `morphMmutable` can apply an
 * **homomorphism** or an **isomorphism** to the original tree.
 *
 * @param {Object} root Root node of the tree to be morphed.
 * @param {Function} nodeMutator Mutate original node data.
 * @param {Function} layoutMutator Mutate original node layout.
 * @return {Object} The mutated tree.
 */
export default function mutate(root, nodeMutator, layoutMutator) {
  // Both mutators are mandatory
  if ('function' !== typeof nodeMutator) {
    throw new TypeError('nodeMutator is not a function')
  }
  if ('function' !== typeof layoutMutator) {
    throw new TypeError('layoutMutator is not a function')
  }

  crawl(root, (node, context) => {
    // Mutate current node.
    const ret = nodeMutator(node, context)

    // If the node mutation returned `null` layout mutation will have to remove
    // the current node.
    let layoutMutation = (null === ret ? 'remove' : 'identity')

    // If a remove layout mutation is scheduled the library adapt the walking
    // behavior in consequence. The root will simply break the walk, any other
    // node will be flagged as removed.
    if ('remove' === layoutMutation) {
      if (node === root) {
        root = null
        layoutMutation = 'identity'
        context.break()
      }
      else {
        context.remove()
      }
    }

    // Inovke the layout mutator.
    layoutMutator(layoutMutation, node, context.parent)
  })

  return root
}
