# Algorithm Documentation

## 算法文档

### A* Algorithm for 3D Pathfinding

### 3D路径规划的A*算法

---

## Overview | 概述

This project implements the **A\* (A-star) pathfinding algorithm** for 3D aerial navigation. A\* is a best-first search algorithm that finds the shortest path between two points while avoiding obstacles.

本项目实现了用于三维空中导航的 **A\*（A-star）寻路算法**。A\* 是一种最佳优先搜索算法，可以在避开障碍物的同时找到两点之间的最短路径。

---

## Algorithm Steps | 算法步骤

### 1. Grid Construction | 网格构建

```
Step 1: Define 3D grid boundaries
- Calculate min/max latitude, longitude, altitude
- Divide space into grid cells based on resolution

步骤1：定义3D网格边界
- 计算纬度、经度、高度的最小/最大值
- 根据分辨率将空间划分为网格单元
```

**Example | 示例：**
```javascript
Grid Resolution: 100m
Coverage Area: 5km x 3km x 200m altitude
Result: 50 x 30 x 2 = 3,000 grid nodes
```

### 2. Obstacle Marking | 障碍物标记

```
Step 2: Mark no-fly zones
- Iterate through all grid nodes
- Check if node falls within any no-fly zone
- Mark non-walkable if inside restricted area

步骤2：标记禁飞区
- 遍历所有网格节点
- 检查节点是否在任何禁飞区内
- 如果在限制区域内则标记为不可通行
```

**No-Fly Zone Check | 禁飞区检查：**
```javascript
function isInNoFlyZone(lat, lng, alt, zone) {
  return (
    lat >= zone.minLat && lat <= zone.maxLat &&
    lng >= zone.minLng && lng <= zone.maxLng &&
    alt >= zone.minAlt && alt <= zone.maxAlt
  )
}
```

### 3. A* Search | A*搜索

```
Step 3: Execute A* algorithm
- Initialize start node with g=0, h=heuristic
- Add start to open list (priority queue)
- While open list not empty:
  - Get node with lowest f value
  - If goal reached, reconstruct path
  - Expand neighbors (26 directions in 3D)
  - Update costs and add to open list

步骤3：执行A*算法
- 初始化起始节点 g=0, h=启发值
- 将起点加入开放列表（优先队列）
- 当开放列表不为空时：
  - 获取f值最小的节点
  - 如果到达目标，重建路径
  - 扩展邻居节点（3D空间26个方向）
  - 更新代价并加入开放列表
```

### 4. Path Reconstruction | 路径重建

```
Step 4: Build path from goal to start
- Start at goal node
- Follow parent pointers back to start
- Reverse path to get start→goal order

步骤4：从目标到起点构建路径
- 从目标节点开始
- 沿父节点指针回溯到起点
- 反转路径得到起点→目标的顺序
```

---

## Core Components | 核心组件

### 1. Cost Functions | 代价函数

#### g(n) - Cost from Start | 从起点的代价

```javascript
g(n) = g(parent) + distance(parent, n)
```

- Accumulated cost from start to current node
- Uses Euclidean distance in grid space
- 从起点到当前节点的累积代价
- 使用网格空间中的欧几里得距离

#### h(n) - Heuristic Cost | 启发式代价

```javascript
h(n) = sqrt((n.x - goal.x)² + (n.y - goal.y)² + (n.z - goal.z)²)
```

- Estimated cost from current to goal
- Euclidean distance (admissible heuristic)
- 从当前节点到目标的估计代价
- 欧几里得距离（可接受的启发式）

#### f(n) - Total Cost | 总代价

```javascript
f(n) = g(n) + h(n)
```

- Total estimated cost of path through n
- Used to prioritize node expansion
- 经过n点的路径总估计代价
- 用于优先级排序节点扩展

### 2. Neighbor Expansion | 邻居扩展

In 3D space, each node has up to **26 neighbors**:

在3D空间中，每个节点最多有 **26个邻居**：

```
Direction offsets (dx, dy, dz):
方向偏移 (dx, dy, dz)：

- 6 face neighbors: (±1,0,0), (0,±1,0), (0,0,±1)
- 12 edge neighbors: (±1,±1,0), (±1,0,±1), (0,±1,±1)
- 8 corner neighbors: (±1,±1,±1)

Total: 26 neighbors (3x3x3 - center)
总计：26个邻居（3x3x3 - 中心点）
```

**Cost Calculation | 代价计算：**
```
Face move:   cost = 1.0
Edge move:   cost = √2 ≈ 1.414
Corner move: cost = √3 ≈ 1.732
```

### 3. Priority Queue | 优先队列

Uses a **sorted array** for simplicity:

使用**排序数组**实现简单：

```javascript
class PriorityQueue {
  enqueue(node) {
    // Insert node in sorted order by f value
    // 按f值排序插入节点
  }

  dequeue() {
    // Remove and return node with lowest f
    // 移除并返回f值最小的节点
  }
}
```

**Note | 注意：** For production, consider using a binary heap for O(log n) operations.
生产环境建议使用二叉堆以获得 O(log n) 复杂度。

---

## Complexity Analysis | 复杂度分析

### Time Complexity | 时间复杂度

```
O(b^d)

Where:
- b = branching factor (26 in 3D)
- d = depth of solution

其中：
- b = 分支因子（3D中为26）
- d = 解决方案深度
```

**In practice | 实际应用：**
- Best case: O(d) - straight line path
- Average case: O(n log n) - with good heuristic
- Worst case: O(b^d) - explores entire space

**实际情况：**
- 最佳情况：O(d) - 直线路径
- 平均情况：O(n log n) - 有好的启发式
- 最坏情况：O(b^d) - 探索整个空间

### Space Complexity | 空间复杂度

```
O(n)

Where:
- n = number of grid nodes
- Stores grid, open list, closed list

其中：
- n = 网格节点数
- 存储网格、开放列表、关闭列表
```

---

## Optimizations | 优化

### Current Implementation | 当前实现

1. ✅ **Priority Queue** - Explores lowest-cost nodes first
   **优先队列** - 优先探索低代价节点

2. ✅ **Early Termination** - Stops when goal found
   **提前终止** - 找到目标时停止

3. ✅ **Closed List** - Avoids re-exploring nodes
   **关闭列表** - 避免重复探索节点

4. ✅ **Grid-based** - Reduces continuous space to discrete
   **基于网格** - 将连续空间离散化

### Potential Improvements | 潜在改进

1. ⚪ **Jump Point Search** - Skip redundant nodes
   **跳点搜索** - 跳过冗余节点

2. ⚪ **Bidirectional A*** - Search from both ends
   **双向A*** - 从两端搜索

3. ⚪ **Hierarchical Planning** - Multi-resolution grids
   **分层规划** - 多分辨率网格

4. ⚪ **Dynamic Weighting** - Adjust heuristic weight
   **动态权重** - 调整启发式权重

---

## Comparison with Other Algorithms | 与其他算法对比

| Algorithm | Completeness | Optimality | Time | Space | Best Use Case |
|-----------|--------------|------------|------|-------|---------------|
| **A*** | ✅ Yes | ✅ Yes | Medium | Medium | Static obstacles |
| Dijkstra | ✅ Yes | ✅ Yes | Slow | Medium | No heuristic |
| Greedy Best-First | ⚠️ No | ❌ No | Fast | Low | Quick approximation |
| RRT | ✅ Yes | ❌ No | Fast | Low | Dynamic obstacles |
| PRM | ✅ Yes | ⚠️ Probabilistic | Medium | Medium | Complex spaces |

| 算法 | 完备性 | 最优性 | 时间 | 空间 | 最佳使用场景 |
|------|--------|--------|------|------|-------------|
| **A*** | ✅ 是 | ✅ 是 | 中等 | 中等 | 静态障碍物 |
| Dijkstra | ✅ 是 | ✅ 是 | 慢 | 中等 | 无启发式 |
| 贪婪最佳优先 | ⚠️ 否 | ❌ 否 | 快 | 低 | 快速近似 |
| RRT | ✅ 是 | ❌ 否 | 快 | 低 | 动态障碍物 |
| PRM | ✅ 是 | ⚠️ 概率性 | 中等 | 中等 | 复杂空间 |

---

## Example Walkthrough | 示例演示

### Scenario | 场景

```
Start:  (41.748°N, 123.362°E, 100m)
Goal:   (41.733°N, 123.413°E, 120m)
No-Fly: 2 zones (Airport, Military Base)
Grid:   100m resolution
```

### Execution | 执行

```
1. Create Grid
   - Size: 72 x 39 x 2 = 5,616 nodes
   - Coverage: 7.2km x 3.9km x 200m

2. Mark Obstacles
   - Blocked: 180 nodes (3.2%)
   - Walkable: 5,436 nodes (96.8%)

3. Run A*
   - Iterations: 1,051
   - Open list peak: ~300 nodes
   - Time: ~50ms

4. Result
   - Path found: 52 waypoints
   - Distance: 4,612 meters
   - Avoids all no-fly zones
```

### Visualization | 可视化

```
Side View (Altitude vs Distance):
侧视图（高度 vs 距离）：

120m |           ___---___
     |        __/          \__
100m |    ___/                \___
     |___/                        \___
     Start                          Goal

     * Shows smooth altitude changes
     * 显示平滑的高度变化
```

---

## References | 参考文献

1. **Hart, P.E., Nilsson, N.J., Raphael, B. (1968)**
   "A Formal Basis for the Heuristic Determination of Minimum Cost Paths"
   - Original A* algorithm paper
   - 原始A*算法论文

2. **LaValle, S.M. (1998)**
   "Rapidly-exploring Random Trees"
   - Alternative approach for path planning
   - 路径规划的替代方法

3. **Harabor, D., Grastien, A. (2011)**
   "Online Graph Pruning for Pathfinding on Grid Maps"
   - Jump Point Search optimization
   - 跳点搜索优化

4. **HKUST Aerial Robotics Group**
   "Fast-Planner: Quadrotor Trajectory Planning"
   - Real-world UAV path planning
   - 实际无人机路径规划

---

## FAQ | 常见问题

### Q: Why use A* instead of Dijkstra?
### 问：为什么使用A*而不是Dijkstra？

**A:** A* uses a heuristic to guide search toward the goal, making it much faster than Dijkstra for point-to-point planning. Dijkstra explores equally in all directions.

**答：** A*使用启发式引导搜索朝向目标，使其在点对点规划中比Dijkstra快得多。Dijkstra在所有方向上均匀探索。

### Q: Is the path guaranteed to be optimal?
### 问：路径是否保证最优？

**A:** Yes, if the heuristic is **admissible** (never overestimates). Our Euclidean distance heuristic is admissible, guaranteeing the shortest path.

**答：** 是的，如果启发式是**可接受的**（永不高估）。我们的欧几里得距离启发式是可接受的，保证最短路径。

### Q: How to handle moving obstacles?
### 问：如何处理移动障碍物？

**A:** Current implementation is for static environments. For dynamic obstacles, consider:
- Re-planning at intervals
- D* Lite algorithm
- RRT with replanning

**答：** 当前实现用于静态环境。对于动态障碍物，考虑：
- 定期重新规划
- D* Lite算法
- RRT重规划

### Q: What if no path exists?
### 问：如果不存在路径怎么办？

**A:** The algorithm returns the path to the closest reachable point to the goal, or null if start/goal is blocked.

**答：** 算法返回到最接近目标的可达点的路径，或者如果起点/目标被阻挡则返回null。

---

## License | 许可证

This algorithm implementation is released under the MIT License.

本算法实现使用 MIT 许可证发布。

---

**Author:** Zguoxu
**Last Updated:** 2025-10-20
