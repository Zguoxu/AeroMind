# 🚀 Quick Start Examples | 快速入门示例

**[English](#english) • [中文](#中文)**

Beginner-friendly examples to get you started in 5 minutes!

新手友好的入门示例，帮助你在 5 分钟内上手！

---

## English

### ✨ Hello World
**File**: `hello-world.js`
**Difficulty**: ⭐ Beginner
**Code**: Only 10 core lines!

**Features**:
- ✅ Basic 3D path planning
- ✅ Complete statistics output
- ✅ Clear bilingual comments

**How to run**:
```bash
node examples/1-quick-start/hello-world.js
```

**Expected output**:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚁 UAV 3D Path Planner - Hello World
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Start Point | 起点: Lat 41.748, Lng 123.362, Alt 100m
📍 End Point | 终点: Lat 41.733, Lng 123.413, Alt 120m

⏳ Planning path... | 正在规划路径...

✅ Path Planning Successful! | 路径规划成功！

📊 Flight Statistics | 飞行统计:
   • Total Waypoints | 总航点数: 52
   • Total Distance | 总距离: 4.61 km
   • Estimated Time | 预计时长: 5.1 min | 分钟
   ...
```

---

## 💡 Code Breakdown

```javascript
// 1️⃣ Create planner instance | 创建规划器实例
const planner = new AStar3DPathPlanner()

// 2️⃣ Define start and end points | 定义起点和终点
const start = { lat: 41.748, lng: 123.362, altitude: 100 }
const end = { lat: 41.733, lng: 123.413, altitude: 120 }

// 3️⃣ Plan the path (one line!) | 规划路径（一行代码！）
const result = planner.planPath(start, end)

// 4️⃣ Check results | 检查结果
if (result.success) {
  console.log('Waypoints:', result.statistics.totalWaypoints)
  console.log('Distance:', result.statistics.totalDistance, 'm')
}
```

That's it! 🎉

---

## 🎓 Learning Path

After completing Hello World, continue with:

1. **Current**: Hello World ✅
2. **Next**: [Basic Examples](../2-basic/) - Add no-fly zones and parameters
3. **Advanced**: [Advanced Examples](../3-advanced/) - Performance optimization
4. **Integration**: [Integration Examples](../4-integration/) - Real project integration

---

## ❓ FAQ

### Q: Path planning failed, what to do?
A: Check if start/end coordinates are valid and not at the same location.

### Q: How to see 3D visualization?
A: Run `start-demo.bat` (Windows) or `start-demo.sh` (Mac/Linux).

### Q: How to add no-fly zones?
A: See [Basic Examples](../2-basic/)

---

## 🎬 Next Steps

- 📖 Read [Main README](../../README.md)
- 🔧 Explore [Basic Examples](../2-basic/)
- 🌟 Try [3D Visualization](https://zguoxu.github.io/AeroMind/)

---

## 中文

### ✨ Hello World
**文件**: `hello-world.js`
**难度**: ⭐ 入门级
**代码行数**: 仅 10 行核心代码！

**功能**:
- ✅ 基础的 3D 路径规划
- ✅ 完整的统计信息输出
- ✅ 清晰的双语注释

**运行方式**:
```bash
node examples/1-quick-start/hello-world.js
```

**预期输出**:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚁 UAV 3D Path Planner - Hello World
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Start Point | 起点: Lat 41.748, Lng 123.362, Alt 100m
📍 End Point | 终点: Lat 41.733, Lng 123.413, Alt 120m

⏳ Planning path... | 正在规划路径...

✅ Path Planning Successful! | 路径规划成功！

📊 Flight Statistics | 飞行统计:
   • Total Waypoints | 总航点数: 52
   • Total Distance | 总距离: 4.61 km
   • Estimated Time | 预计时长: 5.1 min | 分钟
   ...
```

---

## 💡 代码解析

```javascript
// 1️⃣ Create planner instance | 创建规划器实例
const planner = new AStar3DPathPlanner()

// 2️⃣ Define start and end points | 定义起点和终点
const start = { lat: 41.748, lng: 123.362, altitude: 100 }
const end = { lat: 41.733, lng: 123.413, altitude: 120 }

// 3️⃣ Plan the path (one line!) | 规划路径（一行代码！）
const result = planner.planPath(start, end)

// 4️⃣ Check results | 检查结果
if (result.success) {
  console.log('航点数:', result.statistics.totalWaypoints)
  console.log('总距离:', result.statistics.totalDistance, 'm')
}
```

就是这么简单！🎉

---

## 🎓 学习路径

完成 Hello World 后，推荐按以下顺序学习：

1. **当前**: Hello World ✅
2. **下一步**: [基础示例](../2-basic/) - 添加禁飞区和参数调整
3. **进阶**: [高级示例](../3-advanced/) - 性能优化和算法定制
4. **实战**: [集成示例](../4-integration/) - 集成到实际项目

---

## ❓ 常见问题

### Q: 路径规划失败怎么办？
A: 检查起点和终点坐标是否有效，确保它们不在同一位置。

### Q: 如何看到 3D 可视化效果？
A: 运行 `start-demo.bat`（Windows）或 `start-demo.sh`（Mac/Linux）。

### Q: 如何添加禁飞区？
A: 请查看 [基础示例](../2-basic/)

---

## 🎬 下一步

- 📖 阅读 [主 README](../../README.md)
- 🔧 查看 [基础示例](../2-basic/)
- 🌟 体验 [3D 可视化](https://zguoxu.github.io/AeroMind/)
