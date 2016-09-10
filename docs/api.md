## Typedefs

<dl>
<dt><a href="#DataMutator">DataMutator</a> ⇒ <code>Object</code> | <code>undefined</code> | <code>null</code></dt>
<dd><p>Mutate node data.</p>
<p>It treats the node atomically and only modifies its own properties.
Structural properties should be left untouched and modified in the layout
mutator instead.
If <code>null</code> is returned, the node is marked as removed and processed by the
layout mutator.</p>
</dd>
<dt><a href="#LayoutMutator">LayoutMutator</a> : <code>function</code></dt>
<dd><p>Mutate node layout.</p>
<p>It treats the node as a black box that has a position in the tree. It
modifies its structural properties and may alter ancestors, siblings or
descendants nodes.</p>
</dd>
</dl>

<a name="DataMutator"></a>

## DataMutator ⇒ <code>Object</code> &#124; <code>undefined</code> &#124; <code>null</code>
Mutate node data.

It treats the node atomically and only modifies its own properties.
Structural properties should be left untouched and modified in the layout
mutator instead.
If `null` is returned, the node is marked as removed and processed by the
layout mutator.

**Kind**: global typedef  
**Returns**: <code>Object</code> &#124; <code>undefined</code> &#124; <code>null</code> - The node itself, nothing or `null`.  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Object</code> | Node to be mutated. |
| context | <code>Context</code> | Walk context. |

<a name="LayoutMutator"></a>

## LayoutMutator : <code>function</code>
Mutate node layout.

It treats the node as a black box that has a position in the tree. It
modifies its structural properties and may alter ancestors, siblings or
descendants nodes.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>&#x27;identity&#x27;</code> &#124; <code>&#x27;replace&#x27;</code> &#124; <code>&#x27;remove&#x27;</code> | Type of layout mutation. |
| node | <code>Object</code> &#124; <code>null</code> | Node to be mutated. |
| parentNode | <code>Object</code> | Parent of the node to be mutated. |

