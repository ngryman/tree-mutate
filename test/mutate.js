import test from 'ava'
import spy from 'spy'
import clone from 'clone'
import mutate from '../index'
import tree from './helpers/tree'
import {
  noop,
  identity,
  copy,
  copyValue,
  skipValue,
  layout
} from './helpers/functions'

test.beforeEach(t => {
  t.context.tree = clone(tree)
})

test('return the input tree', t => {
  const tree = mutate(t.context.tree, identity, noop)

  t.is(tree, t.context.tree)
})

test('invoke data mutator on each node', t => {
  const mutator = spy()
  mutate(t.context.tree, mutator, noop)

  t.is(mutator.callCount, 6)
  t.true(mutator.calledWith(t.context.tree))
})

test('return null if data mutator removes root', t => {
  const tree = mutate(t.context.tree, skipValue(1), noop)

  t.is(tree, null)
})

test('break traversal if data mutator skips root', t => {
  const mutator = spy(skipValue(1))
  mutate(t.context.tree, mutator, layout)

  t.is(mutator.callCount, 1)
})

test('replace node if data mutator return a non-null value', t => {
  const oldNode = t.context.tree.children[0]
  mutate(t.context.tree, copyValue(2), layout)

  t.not(t.context.tree.children[0], oldNode)
  t.deepEqual(t.context.tree.children[0], oldNode)
})

test('replace node with a subtree', t => {
  const newNode = {
    type: 'node',
    value: 2,
    children: [
      {
        type: 'leaf',
        value: 21
      }
    ]
  }
  const mutator = spy(copyValue(2, newNode))
  const newTree = mutate(t.context.tree, mutator, layout)

  t.is(newTree.children[0], newNode)
  t.is(mutator.callCount, 5)
})

test('return new root if data mutator return a non-null value', t => {
  const newTree = mutate(t.context.tree, node => {
    if (1 === node.value) {
      return copy(node)
    }
  }, layout)

  t.not(newTree, t.context.tree)
})

test('invoke layout mutator on each node', t => {
  const mutator = spy()
  mutate(t.context.tree, identity, mutator)

  t.is(mutator.callCount, 6)
})

test('set "identity" mutation by default', t => {
  const mutator = spy()
  mutate(t.context.tree, identity, mutator)

  t.true(mutator.alwaysCalledWith('identity'))
})

test('set "replace" mutation when data mutator returns a new node', t => {
  const mutator = spy()
  mutate(t.context.tree, copy, mutator)

  t.true(mutator.calls[0].calledWith('identity'))
  mutator.calls.shift()
  t.true(mutator.alwaysCalledWith('replace'))
})

test('set "remove" mutation when data mutator returns null', t => {
  const mutator = spy(layout)
  mutate(t.context.tree, skipValue(2), mutator)

  t.true(mutator.calls[1].calledWith('remove'))
})

test('"remove" mutation skips removed node', t => {
  const mutator = spy(layout)
  mutate(t.context.tree, skipValue(2), mutator)

  t.is(mutator.callCount, 4)
})

test('return null if tree is undefined', t => {
  const tree = mutate(null, noop, noop)

  t.is(tree, null)
})

test('complain about missing data mutator', t => {
  t.throws(
    () => mutate(t.context.tree, null, noop),
    'dataMutator is not a function'
  )
})

test('complain about missing layout mutator', t => {
  t.throws(
    () => mutate(t.context.tree, noop, null),
    'layoutMutator is not a function'
  )
})
