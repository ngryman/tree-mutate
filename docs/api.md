<a name="mutate"></a>

## mutate(root, dataMutator, layoutMutator) ⇒ <code>Object</code>
Walk over a **mutable** tree and invoke **mutators** on each node.

Mutators implements how mutations occur. They happen at 2 different levels:
- data level: mutate node data
- layout level: mutate node layout

**Kind**: global function  
**Returns**: <code>Object</code> - The mutated tree.  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>Object</code> | Root node of the tree. |
| dataMutator | <code>function</code> | Mutate node data. |
| layoutMutator | <code>function</code> | Mutate node layout. |

