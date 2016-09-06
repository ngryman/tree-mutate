# tree-mutate

> Agnostic tree mutation library.

[![travis][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]

[travis-image]: https://img.shields.io/travis/ngryman/tree-mutate.svg?style=flat
[travis-url]: https://travis-ci.org/ngryman/tree-mutate
[codecov-image]: https://img.shields.io/codecov/c/github/ngryman/tree-mutate.svg
[codecov-url]: https://codecov.io/github/ngryman/tree-mutate


**tree-mutate** to apply either **homomorphisms** or **isomorphisms** to a tree. You can basically mutate nodes at a **data level** and at a **structural level**. In other words, you can easily create high-order functions such as **map** or **filter** that work well with your tree structure.

The `api` allow to specify **mutators**. Those mutators contain the logic adapted to your needs and your tree structure making **tree-mutate** versatile and agnostic.


## Install

```bash
npm install --save tree-mutate
```

## Usage

```javascript
import mutate from 'tree-mutate'

// add a `depth` property to each node
tree = mutate(tree, (node, context) => { node.depth = context.depth })

// only keep `type` property
tree = mutate(tree, node => pick(node, 'type'))

// filter nodes with type=foo
tree = mutate(tree, node => ('foo' === node.type ? node : null), remover)
```

See [more examples](test/examples.mutable.js).


## API

See the [api](docs/api.md) documentation.

## Related

 - [tree-mutate](https://github.com/ngryman/tree-mutate) Little brother of **tree-mutate**, but for **immutable** trees.
 - [tree-crawl](https://github.com/ngryman/tree-crawl) Generic tree traversal library. This module uses it.

## License

MIT © [Nicolas Gryman](http://ngryman.sh)
