# 🚀 React Performance Optimization with `useMemo`

This example demonstrates how **`useMemo()`** can significantly improve the performance of a React application by memoizing the result of an expensive calculation.

To clearly showcase the optimization, this demo intentionally uses an array containing **39,999,999 objects**, making the computation noticeably expensive.

---

# 📌 What is `useMemo()`?

`useMemo()` is a built-in React Hook that **memoizes the result of an expensive computation**.

Instead of recalculating the value on every component re-render, React caches the computed result and returns the cached value until one of the dependencies changes.

This helps reduce unnecessary computations and improves application performance.

### Syntax

```javascript
const memoizedValue = useMemo(() => {
  // Expensive calculation
  return computedValue;
}, [dependencies]);
```

---

# 📌 Problem Statement

Every time a React component re-renders, **all JavaScript code inside the component executes again**.

Consider the following expensive operation:

```javascript
items.find((item) => item.isSelected);
```

The selected item is intentionally placed as the **last element** of an array containing **39,999,999 objects**.

As a result, JavaScript must traverse almost the **entire array** before finding the selected item, making this computation expensive.

---

# ❌ Example 1 — Without `useMemo`

```javascript
const selectedItem = items.find((item) => item.isSelected);
```

## What happens?

- Component renders for the first time.
- `find()` traverses nearly **40 million objects**.
- The selected item is returned.

Now click **Increment Count**.

Although only the following state changes:

```javascript
setCount(count + 1);
```

React re-renders the component.

During **every re-render**, the following line executes again:

```javascript
items.find((item) => item.isSelected);
```

Even though `items` never changes, React still performs the same expensive traversal over **39,999,999 objects** on every render.

### Render Flow

```text
Initial Render
      │
      ▼
Traverse 39,999,999 objects
      │
      ▼
Selected Item Found

Click Button
      │
      ▼
Component Re-renders
      │
      ▼
Traverse 39,999,999 objects Again ❌

Click Again
      │
      ▼
Traverse 39,999,999 objects Again ❌

Click Again
      │
      ▼
Traverse 39,999,999 objects Again ❌
```

### Result

- ❌ Unnecessary calculations
- ❌ Higher CPU usage
- ❌ Longer render times
- ❌ Poor user experience
- ❌ Performance degrades as data size increases

---

# ✅ Example 2 — With `useMemo`

```javascript
const selectedItem = useMemo(
  () => items.find((item) => item.isSelected),
  [items],
);
```

## What happens?

On the **initial render**, React executes the expensive calculation **once**.

```text
Traverse 39,999,999 objects
```

The computed result is then **memoized (cached)**.

Whenever the component re-renders because of:

```javascript
setCount(count + 1);
```

React checks the dependency array.

```javascript
[items];
```

Since `items` has **not changed**, React simply returns the cached value instead of executing `find()` again.

No traversal occurs.

### Render Flow

```text
Initial Render
      │
      ▼
Traverse 39,999,999 objects
      │
      ▼
Cache Result ✅

Click Button
      │
      ▼
Component Re-renders
      │
      ▼
Dependency Changed?
      │
      ├── No
      │      │
      │      ▼
      │ Return Cached Value ✅
      │
      └── Yes
             │
             ▼
     Execute find() Again
```

### Result

- ✅ Expensive calculation executes only once.
- ✅ Subsequent renders reuse the cached value.
- ✅ Faster UI updates.
- ✅ Lower CPU utilization.
- ✅ Better overall application performance.

---

# 📊 Comparison

| Without `useMemo`                           | With `useMemo`                                           |
| :------------------------------------------ | :------------------------------------------------------- |
| Expensive calculation runs on every render  | Expensive calculation runs only when dependencies change |
| Traverses **39,999,999** objects repeatedly | Traverses **39,999,999** objects only once               |
| Wastes CPU cycles                           | Reuses cached value                                      |
| Slower renders                              | Faster renders                                           |
| Poor scalability                            | Better scalability                                       |

---

# 💡 Key Takeaway

> **`useMemo()` does NOT prevent a component from re-rendering.**

Instead, it prevents **expensive computations** from executing again when their dependencies have not changed.

The component still re-renders normally, but React returns the previously memoized value instead of recalculating it.

---

# 📌 When Should You Use `useMemo()`?

Use `useMemo()` when:

- An expensive calculation runs during rendering.
- The calculation depends on one or more values that change infrequently.
- Recalculating the value on every render negatively impacts performance.
- You want to avoid unnecessary computations.

Examples include:

- Filtering large datasets
- Sorting large arrays
- Searching through large collections
- Complex mathematical calculations
- Heavy data transformations

---

# 🚫 When Should You Avoid `useMemo()`?

Avoid using `useMemo()` when:

- The calculation is inexpensive.
- The value changes on every render.
- Memoization provides no measurable performance improvement.
- You're using it everywhere without profiling your application.

Remember:

> **`useMemo()` itself has a small overhead. Use it only when the performance benefit outweighs the cost of memoization.**

---

# ⚠️ Warning

> **This demo intentionally uses an array containing 39,999,999 objects to simulate an extremely expensive computation.**

Creating and storing such a large number of JavaScript objects requires a significant amount of memory and CPU resources.

Depending on your system specifications (available RAM, processor, and browser), you may experience:

- ⚠️ Long initial loading time
- ⚠️ High memory consumption
- ⚠️ Increased CPU usage
- ⚠️ Browser lag or temporary freezing
- ⚠️ Browser crashes or **"Out of Memory"** errors on systems with limited resources

This dataset is **not intended for production use**.

It is deliberately oversized to exaggerate the performance difference between recalculating an expensive operation on every render and reusing a memoized result with `useMemo()`, making the optimization easy to observe and understand.
