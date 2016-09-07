'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var crawl = _interopDefault(require('tree-crawl'));

/**
 * Walk over a **mutable** tree and invoke **mutators** on each node.
 *
 * Mutators implements how mutations occur. They happen at 2 different levels:
 * - data level: mutate node data
 * - layout level: mutate node layout
 *
 * @param {Object} root Root node of the tree.
 * @param {Function} dataMutator Mutate node data.
 * @param {Function} layoutMutator Mutate node layout.
 * @return {Object} The mutated tree.
 */
function mutate(root, dataMutator, layoutMutator) {
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

    // Mutate node layout.
    layoutMutator(layoutMutation, node, context.parent)
  })

  return root
}

module.exports = mutate;