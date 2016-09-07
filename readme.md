# tree-mutate

> Agnostic tree mutation library.

[![travis][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]

[travis-image]: https://img.shields.io/travis/ngryman/tree-mutate.svg?style=flat
[travis-url]: https://travis-ci.org/ngryman/tree-mutate
[codecov-image]: https://img.shields.io/codecov/c/github/ngryman/tree-mutate.svg
[codecov-url]: https://codecov.io/github/ngryman/tree-mutate


**tree-mutate** allows you to apply either **homomorphisms** or **isomorphisms** to a tree. You can mutate nodes at a **data level** and at a **structural level**. In other words, `tree-mutate` lets you easily create high-order functions such as **map** or **filter** that work well with your tree structure.

`tree-mutate` works around **mutators**. Those mutators contain logic to handle tree mutations. Depending on your needs and your tree structure, you can mutate your tree however you want, making `tree-mutate` a versatile and agnostic tree mutation library.


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

See [more examples](test/examples.js).


## API

See the [api](docs/api.md) documentation.

## Related

 - [tree-morph](https://github.com/ngryman/tree-morph) Little brother of `tree-mutate`, but for **immutable** trees.
 - [tree-crawl](https://github.com/ngryman/tree-crawl) Generic tree traversal library. This module uses it.

## License

MIT © [Nicolas Gryman](http://ngryman.sh)
