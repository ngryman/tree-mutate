import test from 'ava'
import spy from 'spy'
import clone from 'clone'
import mutate from '../index'
import tree from './helpers/tree'
import {
  noop,
  identity,
  skipValue,
  remove
} from './helpers/functions'

test.beforeEach(t => {
  t.context.tree = clone(tree)
})

test('return the input tree', t => {
  const tree = mutate(t.context.tree, identity, noop)
  t.is(tree, t.context.tree)
})

test('invoke data mutator on each node', t => {
  const dataMutator = spy()
  mutate(t.context.tree, dataMutator, noop)
  t.is(dataMutator.callCount, 6)
  t.true(dataMutator.calledWith(t.context.tree))
})

test('return null if data mutator skips root', t => {
  const tree = mutate(t.context.tree, skipValue(1), noop)
  t.is(tree, null)
})

test('break traversal if data mutator skips root', t => {
  const mutator = spy(skipValue(1))
  mutate(t.context.tree, mutator, remove)
  t.is(mutator.callCount, 1)
})

test('invoke layout mutator on each node', t => {
  const mutator = spy()
  mutate(t.context.tree, identity, mutator)
  t.is(mutator.callCount, 6)
})

test('invoke "identity" layout mutation by default', t => {
  const mutator = spy()
  mutate(t.context.tree, identity, mutator)
  t.true(mutator.alwaysCalledWith('identity'))
})

test('invoke "remove" layout mutation when data mutator returns null', t => {
  const mutator = spy(remove)
  mutate(t.context.tree, skipValue(2), mutator)
  t.true(mutator.calls[1].calledWith('remove'))
})

test('"remove" mutation skips removed node', t => {
  const mutator = spy(remove)
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
