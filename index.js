import crawl from 'tree-crawl'

/**
 * Mutate node data.
 *
 * It treats the node atomically and only modifies its own properties.
 * Structural properties should be left untouched and modified in the layout
 * mutator instead.
 * If `null` is returned, the node is marked as removed and processed by the
 * layout mutator.
 *
 * @callback DataMutator
 * @param {Object} node Node to be mutated.
 * @param {Context} context Walk context.
 * @return {Object|undefined|null} The node itself, nothing or `null`.
 */

 /**
  * Mutate node layout.
  *
  * It treats the node as a black box that has a position in the tree. It
  * modifies its structural properties and may alter ancestors, siblings or
  * descendants nodes.
  *
  * @callback LayoutMutator
  * @param {Object|null} node Node to be mutated.
  * @param {Object} parentNode Parent of the node to be mutated.
  */

/**
 * Walk over a **mutable** tree and invoke **mutators** on each node.
 *
 * Mutators implements mutations at 2 different levels:
 * - data level: mutate node data
 * - layout level: mutate node layout
 *
 * @param {Object} root Root node of the tree.
 * @param {Function} dataMutator Mutate node data.
 * @param {Function} layoutMutator Mutate node layout.
 * @return {Object} The mutated tree.
 */
export default function mutate(root, dataMutator, layoutMutator) {
  // Both mutators are mandatory
  if ('function' !== typeof dataMutator) {
    throw new TypeError('dataMutator is not a function')
  }
  if ('function' !== typeof layoutMutator) {
    throw new TypeError('layoutMutator is not a function')
  }

  crawl(root, (node, context) => {
    // Mutate node data.
    const ret = dataMutator(node, context)

    // If the data mutator returned `null` then layout mutator will have to
    // remove the node from the tree.
    let layoutMutation = (null === ret ? 'remove' : 'identity')

    // If a **remove** layout mutation is scheduled, the library adapts the
    // walk behavior in consequence: root will simply break the walk, any other
    // node is marked as removed.
    if ('remove' === layoutMutation) {
      if (0 === context.depth) {
        root = ret
        layoutMutation = 'identity'
        context.break()
      }
      else {
        context.remove()
      }
    }

    // Mutate node layout.
    layoutMutator(layoutMutation, node, context.parent)
  })

  return root
}
