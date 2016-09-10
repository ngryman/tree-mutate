import test from 'ava'
import clone from 'clone'
import mutate from '../index'
import tree from './helpers/tree'
import { noop, layout } from './helpers/functions'

test.beforeEach(t => {
  t.context.tree = clone(tree)
})

test('map', t => {
  function map(root, iteratee) {
    return mutate(root, iteratee, noop)
  }

  const tree = map(t.context.tree,
    (node, context) => {
      node.depth = context.depth
      delete node.type
      delete node.value
    }
  )

  t.deepEqual(tree, {
    depth: 0,
    children: [
      {
        depth: 1,
        children: [
          { depth: 2 },
          { depth: 2 }
        ]
      },
      {
        depth: 1,
        children: [
          { depth: 2 }
        ]
      }
    ]
  })
})

test('pluck', t => {
  function pluck(root, key) {
    return mutate(root, node => {
      Object.keys(node).forEach(k => {
        if ('children' !== k && k !== key) {
          delete node[k]
        }
      })
    }, noop)
  }

  const tree = pluck(t.context.tree, 'value')

  t.deepEqual(tree, {
    value: 1,
    children: [
      {
        value: 2,
        children: [
          { value: 3 },
          { value: 4 }
        ]
      },
      {
        value: 5,
        children: [
          { value: 6 }
        ]
      }
    ]
  })
})

test('filter', t => {
  function filter(root, predicate) {
    return mutate(root,
      node => predicate(node) ? node : null
    , layout)
  }

  const tree = filter(t.context.tree, node => 'node' === node.type)

  t.deepEqual(tree, {
    type: 'node',
    value: 1,
    children: [
      { type: 'node', value: 2, children: [] },
      { type: 'node', value: 5, children: [] }
    ]
  })
})
