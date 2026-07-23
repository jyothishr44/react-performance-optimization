# 🚀 React Performance Optimization

A collection of practical examples demonstrating how to optimize the performance of React applications using modern React optimization techniques and best practices.

This repository is designed to help developers understand **when**, **why**, and **how** to optimize React applications by comparing unoptimized implementations with optimized solutions. Each example focuses on a specific optimization technique and explains its impact using real-world scenarios.

---

## 📚 Current & Upcoming Topics

This repository currently includes (or will include in future updates):

* ✅ `useMemo()`
* 🚧 `React.memo()`
* 🚧 `useCallback()`
* 🚧 Key Props & Stable Keys
* 🚧 Lazy Loading (`React.lazy` & `Suspense`)
* 🚧 Code Splitting
* 🚧 List Virtualization
* 🚧 Debouncing & Throttling
* 🚧 Context Optimization
* 🚧 Memoization Patterns
* 🚧 Rendering Optimization Techniques
* 🚧 Other React Performance Best Practices

Each topic contains:

* ✅ Unoptimized implementation
* ✅ Optimized implementation
* ✅ Source code with comments
* ✅ Performance comparison
* ✅ Clear explanation of the optimization
* ✅ Best practices and interview insights

---

# 🚀 React Performance Optimization with `useMemo`

This example demonstrates how **`useMemo()`** can significantly improve the performance of a React application by memoizing the result of an expensive calculation.

To clearly showcase the optimization, the demo intentionally uses an array containing **39,999,999 objects**, making the computation noticeably expensive.

---

## 📌 Problem Statement

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

* Component renders for the first time.
* `find()` traverses nearly **40 million objects**.
* The selected item is returned.

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

* ❌ Unnecessary calculations
* ❌ Higher CPU usage
* ❌ Longer render times
* ❌ Poor user experience
* ❌ Performance degrades as data size increases

---

# ✅ Example 2 — With `useMemo`

```javascript
const selectedItem = useMemo(
  () => items.find((item) => item.isSelected),
  [items]
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
[items]
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

* ✅ Expensive calculation executes only once.
* ✅ Subsequent renders reuse the cached value.
* ✅ Faster UI updates.
* ✅ Lower CPU utilization.
* ✅ Better overall application performance.

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

# ⚠️ Warning

> **This demo intentionally uses an array containing 39,999,999 objects to simulate an extremely expensive computation.**

Creating and storing such a large number of JavaScript objects requires a significant amount of memory and CPU resources.

Depending on your system specifications (available RAM, processor, and browser), you may experience:

* ⚠️ Long initial loading time
* ⚠️ High memory consumption
* ⚠️ Increased CPU usage
* ⚠️ Browser lag or temporary freezing
* ⚠️ Browser crashes or **"Out of Memory"** errors on systems with limited resources

This dataset is **not intended for production use**.

It is deliberately oversized to exaggerate the performance difference between recalculating an expensive operation on every render and reusing a memoized result with `useMemo()`, making the optimization easy to observe and understand.

---

# 🛠️ Getting Started

## 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/react-performance-optimization.git
```

## 2️⃣ Navigate to the project

```bash
cd react-performance-optimization
```

## 3️⃣ Install dependencies

```bash
npm install
```

## 4️⃣ Start the development server

```bash
npm run dev
```

## 5️⃣ Open the application

Open the local URL displayed in your terminal (typically **http://localhost:5173** for Vite projects).

---

# 📂 Explore the Examples

Each optimization technique is organized into its own folder.

You can:

* Compare the **unoptimized** and **optimized** implementations.
* Observe render behavior.
* Monitor console logs and render counts.
* Understand when each optimization should (and should not) be used.

As this repository grows, more React performance optimization techniques and real-world examples will be added.

---

## ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates future improvements.
