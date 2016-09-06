<a name="mutate"></a>

## mutate(root, nodeMutator, layoutMutator) ⇒ <code>Object</code>
Walk over a **mutable** tree and invoke **mutators** on each node.

Depending on mutators implementation, `morphMmutable` can apply an
**homomorphism** or an **isomorphism** to the original tree.

**Kind**: global function  
**Returns**: <code>Object</code> - The mutated tree.  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>Object</code> | Root node of the tree to be morphed. |
| nodeMutator | <code>function</code> | Mutate original node data. |
| layoutMutator | <code>function</code> | Mutate original node layout. |

