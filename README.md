# 🚁 AeroMind

<div align="center">

### 3D A* pathfinding for UAVs with no-fly zone avoidance and real-time Cesium visualization

**[English](#english) • [中文](#中文)**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D12.0.0-brightgreen)](https://nodejs.org/)
[![GitHub Stars](https://img.shields.io/github/stars/Zguoxu/AeroMind?style=social)](https://github.com/Zguoxu/AeroMind/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/Zguoxu/AeroMind?style=social)](https://github.com/Zguoxu/AeroMind/network/members)

**[🌐 Try Live Demo](https://zguoxu.github.io/AeroMind/)** | **[📚 Docs](docs/)** | **[💬 中文文档](#中文)**

</div>

---

## 🎬 Live Demo | 在线演示

![3D Path Planning Demo](https://github.com/Zguoxu/AeroMind/releases/download/v1.0.0/demo.gif)


> **Interactive Demo**: [Click here to try it online!](https://zguoxu.github.io/AeroMind/) | **在线演示**: [点击体验！](https://zguoxu.github.io/AeroMind/)

**3D A\* pathfinding with no-fly zone avoidance** | **3D A\*寻路算法 + 禁飞区智能规避**

- 🟢 **Start Point** → 🔴 **End Point** | 起点 → 终点
- 🟥 **No-Fly Zones** (Red 3D volumes) | 禁飞区（红色立体区域）
- ✨ **Optimized Path** (Cyan glowing line) | 优化路径（青色发光路径）
- 🚁 **Flight Animation** with trail effect | 飞行动画与尾迹效果

---

## English

### 🎯 Features

<table>
<tr>
<td width="50%">

#### 🧠 **Core Algorithm**
- ✅ 3D A* Pathfinding (26-direction search)
- ✅ No-fly zone intelligent avoidance
- ✅ Customizable grid resolution
- ✅ Path smoothing algorithms
- ✅ Zero external dependencies

</td>
<td width="50%">

#### 🎨 **Visualization**
- ✅ Interactive 3D Cesium map
- ✅ Real-time flight animation
- ✅ Bilingual UI (EN/中文)
- ✅ Mobile responsive design
- ✅ One-click demo (no installation!)

</td>
</tr>
</table>

### ⚡ Quick Start | 快速开始

**🎯 Choose Your Path | 选择你的方式:**

---

#### 🌐 Option 1: Online Demo (Fastest! No Installation Required)

**Just visit the live demo - that's it!**

👉 **[https://zguoxu.github.io/AeroMind/](https://zguoxu.github.io/AeroMind/)**

- ✅ Works in any modern browser (Chrome, Firefox, Edge, Safari)
- ✅ Interactive 3D visualization with Cesium.js
- ✅ Click "Start Planning" to see the path planning in action
- ✅ Bilingual UI (English/中文)
- ⚡ **No clone, no install, no setup!**

**Perfect for:** Quick preview, sharing demos, mobile devices

---

#### 💻 Option 2: Run Local Demo (For Development)

**Clone the repository and run the 3D visualization locally:**

**Step 1: Clone the repository**
```bash
git clone https://github.com/Zguoxu/AeroMind.git
cd AeroMind
```

**Step 2: Run the demo script**

**Windows:**
```bash
# Double-click this file, or run in terminal:
start-demo.bat
```

**macOS/Linux:**
```bash
# Double-click this file, or run in terminal:
./start-demo.sh
```

**What happens:**
- ✅ Automatically starts local HTTP server (Python or Node.js)
- ✅ Opens browser at `http://localhost:8000/visualization/standalone.html`
- ✅ Full 3D Cesium visualization with no CORS errors
- ✅ Edit code and refresh to see changes

**Perfect for:** Local development, customization, offline use

**⚠️ Important:** Do NOT directly open `visualization/standalone.html` by double-clicking. Modern browsers block Cesium's Web Workers when opened from `file://` protocol. Always use the demo scripts.

---

#### 🚀 Option 3: Run Command-Line Example

**See path planning results in your terminal:**

**Step 1: Clone the repository (if not already done)**
```bash
git clone https://github.com/Zguoxu/AeroMind.git
cd AeroMind
```

**Step 2: Run the hello-world example**
```bash
node examples/1-quick-start/hello-world.js
```

**Expected Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚁 AeroMind - Hello World Example
   3D A* Path Planning for UAVs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Start Point | 起点: Lat 41.748, Lng 123.362, Alt 100m
📍 End Point | 终点: Lat 41.733, Lng 123.413, Alt 120m

⏳ Planning path... | 正在规划路径...

✅ Path Planning Successful! | 路径规划成功！

📊 Flight Statistics | 飞行统计:
   • Total Waypoints | 总航点数: 52
   • Total Distance | 总距离: 4.61 km
   • Estimated Time | 预计时长: 5.1 min
   • Max Altitude | 最高高度: 120 m
```

**Perfect for:** Understanding the algorithm, testing parameters, CI/CD integration

**Prerequisites:** Node.js >= 12.0.0

---

#### 📦 Option 4: Use as Library in Your Project

**Integrate AeroMind into your own application:**

**Step 1: Add to your project**
```bash
# Copy the core algorithm file to your project
cp path/to/AeroMind/src/AStar3DPathPlanner.js your-project/lib/
```

**Step 2: Use in your code**
```javascript
const AStar3DPathPlanner = require('./lib/AStar3DPathPlanner')

// 1. Create planner instance
const planner = new AStar3DPathPlanner({
  gridResolution: 100,   // Grid size in meters
  maxIterations: 50000   // Max search iterations
})

// 2. Define no-fly zones (optional)
planner.setNoFlyZones([
  {
    name: 'Airport Restricted Zone',
    south_lat: 41.740, north_lat: 41.745,
    west_lng: 123.370, east_lng: 123.380,
    min_altitude: 0, max_altitude: 300
  }
])

// 3. Plan the path - just one line!
const result = planner.planPath(
  { lat: 41.748, lng: 123.362, altitude: 100 },  // Start
  { lat: 41.733, lng: 123.413, altitude: 120 }   // End
)

// 4. Use the results
if (result.success) {
  console.log('✅ Path found!')
  console.log('Distance:', result.statistics.totalDistance, 'm')
  console.log('Waypoints:', result.path.length)
  console.log('Flight time:', result.statistics.totalTimeMinutes, 'min')

  // Access the path
  result.path.forEach((waypoint, index) => {
    console.log(`${index}: (${waypoint.lat}, ${waypoint.lng}, ${waypoint.altitude}m)`)
  })
} else {
  console.error('❌ Path planning failed:', result.message)
}
```

**Perfect for:** Production applications, custom integrations, research projects

**Zero dependencies!** The core algorithm is pure JavaScript.

### 📖 Examples

| Example | Description | Difficulty | Run |
|---------|-------------|------------|-----|
| [Hello World](examples/1-quick-start/hello-world.js) | 10 lines to get started | ⭐ Beginner | `node examples/1-quick-start/hello-world.js` |
| [Basic Planning](examples/2-basic/basic-path-planning.js) | Complete features demo | ⭐⭐ Easy | `node examples/2-basic/basic-path-planning.js` |
| [Performance Test](examples/3-advanced/performance-comparison.js) | Compare different resolutions | ⭐⭐⭐ Advanced | `node examples/3-advanced/performance-comparison.js` |
| [Cesium Integration](examples/4-integration/cesium-integration.js) | 3D visualization integration | ⭐⭐⭐ Advanced | See [code example](examples/4-integration/cesium-integration.js) |

### 🎨 Visualize with Cesium.js

```javascript
// Convert path to Cesium format
const cesiumPositions = result.path.map(waypoint =>
  Cesium.Cartesian3.fromDegrees(
    waypoint.lng,
    waypoint.lat,
    waypoint.altitude
  )
)

// Add to viewer
viewer.entities.add({
  polyline: {
    positions: cesiumPositions,
    width: 8,
    material: new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.2,
      color: Cesium.Color.CYAN
    })
  }
})
```

### 🔧 Performance Tuning

| Grid Resolution | Computation Time | Path Quality | Best For |
|----------------|------------------|--------------|----------|
| **50m** | Slow (high detail) | Very detailed | Dense urban obstacles |
| **100m** ⭐ | Medium | Good balance | General use cases |
| **150m** | Fast | Coarse | Long-distance planning |

**Recommendations:**
- Urban (many obstacles): **50m**
- Balanced performance: **100m** (recommended)
- Long-range sparse area: **150m**

### 📊 Algorithm Comparison

| Algorithm | Pros | Cons | Best For |
|-----------|------|------|----------|
| **A\*** ⭐ | Guaranteed shortest path, efficient | Memory intensive | Static environments |
| RRT | Fast, handles complex spaces | Non-optimal paths | Dynamic environments |
| Dijkstra | Always optimal | Slower than A* | When heuristic unavailable |

### 📚 API Documentation

#### Constructor

```javascript
new AStar3DPathPlanner({
  gridResolution: 100,   // Grid cell size in meters (default: 100)
  maxIterations: 50000   // Max A* iterations (default: 50000)
})
```

#### Methods

##### `planPath(start, end, options)`

Plans a 3D path from start to end.

**Parameters:**
- `start` (Object): `{lat, lng, altitude}` - Starting point
- `end` (Object): `{lat, lng, altitude}` - Ending point
- `options` (Object):
  - `gridResolution` (Number): Override grid resolution
  - `cruiseAltitude` (Number): Cruise altitude in meters
  - `smoothPath` (Boolean): Enable path smoothing

**Returns:**
```javascript
{
  success: true,
  path: [{lat, lng, altitude}, ...],
  statistics: {
    totalWaypoints: 52,
    totalDistance: 4612,       // meters
    totalTimeMinutes: 5.1,     // minutes
    maxAltitude: 120,          // meters
    minAltitude: 0,            // meters
    averageSpeed: 15           // m/s
  }
}
```

##### `setNoFlyZones(zones)`

Sets no-fly zones for obstacle avoidance.

**Parameters:**
```javascript
[{
  name: 'Zone Name',
  south_lat: 41.740,
  north_lat: 41.745,
  west_lng: 123.370,
  east_lng: 123.380,
  min_altitude: 0,
  max_altitude: 300
}]
```

### 🛠️ Project Structure

```
AeroMind/
├── visualization/              # 🎬 Interactive demos
│   └── standalone.html         # Single-file demo (just open it!)
├── examples/                   # 📚 Usage examples
│   ├── 1-quick-start/          # Beginner-friendly
│   ├── 2-basic/                # Complete features
│   ├── 3-advanced/             # Performance tuning
│   └── 4-integration/          # Integration guides
├── src/
│   └── AStar3DPathPlanner.js   # Core algorithm (548 lines)
├── docs/
│   ├── ALGORITHM.md            # Algorithm explanation
│   └── QUICK_START.md          # Quick start guide
└── README.md
```

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🌟 Star History

If you find this project helpful, please give it a ⭐ star on GitHub!

### 👤 Author

**Zguoxu**

- GitHub: [@Zguoxu](https://github.com/Zguoxu)
- Project Link: [https://github.com/Zguoxu/AeroMind](https://github.com/Zguoxu/AeroMind)

### 📚 References

- Hart, P. E.; Nilsson, N. J.; Raphael, B. (1968). "A Formal Basis for the Heuristic Determination of Minimum Cost Paths"
- LaValle, S. M. (1998). "Rapidly-exploring random trees: A new tool for path planning"
- Fast-Planner (HKUST Aerial Robotics Group)

---

## 中文

### 🎯 功能特点

<table>
<tr>
<td width="50%">

#### 🧠 **核心算法**
- ✅ 3D A*寻路算法（26方向搜索）
- ✅ 禁飞区智能规避
- ✅ 可自定义网格分辨率
- ✅ 路径平滑处理
- ✅ 零外部依赖

</td>
<td width="50%">

#### 🎨 **可视化演示**
- ✅ 交互式3D Cesium地图
- ✅ 实时飞行动画
- ✅ 中英双语界面
- ✅ 移动端响应式
- ✅ 一键演示（无需安装！）

</td>
</tr>
</table>

### ⚡ 快速开始 | Quick Start

**🎯 选择你的方式 | Choose Your Path:**

---

#### 🌐 方式1: 在线演示（最快！无需安装）

**直接访问在线演示 - 就是这么简单！**

👉 **[https://zguoxu.github.io/AeroMind/](https://zguoxu.github.io/AeroMind/)**

- ✅ 在任何现代浏览器中都能使用（Chrome、Firefox、Edge、Safari）
- ✅ 交互式 3D Cesium.js 可视化
- ✅ 点击 "Start Planning" 按钮即可看到路径规划演示
- ✅ 中英双语界面
- ⚡ **无需克隆、无需安装、无需配置！**

**适合场景：** 快速预览、分享演示、移动设备访问

---

#### 💻 方式2: 本地运行演示（用于开发）

**克隆仓库并在本地运行 3D 可视化：**

**步骤1: 克隆仓库**
```bash
git clone https://github.com/Zguoxu/AeroMind.git
cd AeroMind
```

**步骤2: 运行演示脚本**

**Windows:**
```bash
# 双击此文件，或在终端运行：
start-demo.bat
```

**macOS/Linux:**
```bash
# 双击此文件，或在终端运行：
./start-demo.sh
```

**会发生什么：**
- ✅ 自动启动本地 HTTP 服务器（Python 或 Node.js）
- ✅ 在浏览器中打开 `http://localhost:8000/visualization/standalone.html`
- ✅ 完整的 3D Cesium 可视化，无 CORS 错误
- ✅ 编辑代码后刷新即可看到更改

**适合场景：** 本地开发、自定义修改、离线使用

**⚠️ 重要提示：** 请勿通过双击直接打开 `visualization/standalone.html`。现代浏览器会阻止通过 `file://` 协议打开的 Cesium Web Workers。请始终使用演示脚本。

---

#### 🚀 方式3: 运行命令行示例

**在终端中查看路径规划结果：**

**步骤1: 克隆仓库（如果还没有的话）**
```bash
git clone https://github.com/Zguoxu/AeroMind.git
cd AeroMind
```

**步骤2: 运行 hello-world 示例**
```bash
node examples/1-quick-start/hello-world.js
```

**预期输出：**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚁 AeroMind - Hello World Example
   3D A* Path Planning for UAVs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Start Point | 起点: Lat 41.748, Lng 123.362, Alt 100m
📍 End Point | 终点: Lat 41.733, Lng 123.413, Alt 120m

⏳ Planning path... | 正在规划路径...

✅ Path Planning Successful! | 路径规划成功！

📊 Flight Statistics | 飞行统计:
   • Total Waypoints | 总航点数: 52
   • Total Distance | 总距离: 4.61 km
   • Estimated Time | 预计时长: 5.1 min
   • Max Altitude | 最高高度: 120 m
```

**适合场景：** 理解算法、测试参数、CI/CD 集成

**前置要求：** Node.js >= 12.0.0

---

#### 📦 方式4: 在你的项目中集成使用

**将 AeroMind 集成到你自己的应用中：**

**步骤1: 添加到你的项目**
```bash
# 复制核心算法文件到你的项目
cp path/to/AeroMind/src/AStar3DPathPlanner.js your-project/lib/
```

**步骤2: 在代码中使用**
```javascript
const AStar3DPathPlanner = require('./lib/AStar3DPathPlanner')

// 1. 创建路径规划器实例
const planner = new AStar3DPathPlanner({
  gridResolution: 100,   // 网格大小（米）
  maxIterations: 50000   // 最大搜索迭代次数
})

// 2. 定义禁飞区（可选）
planner.setNoFlyZones([
  {
    name: '机场限制区',
    south_lat: 41.740, north_lat: 41.745,
    west_lng: 123.370, east_lng: 123.380,
    min_altitude: 0, max_altitude: 300
  }
])

// 3. 规划路径 - 只需一行代码！
const result = planner.planPath(
  { lat: 41.748, lng: 123.362, altitude: 100 },  // 起点
  { lat: 41.733, lng: 123.413, altitude: 120 }   // 终点
)

// 4. 使用结果
if (result.success) {
  console.log('✅ 找到路径！')
  console.log('距离:', result.statistics.totalDistance, '米')
  console.log('航点数:', result.path.length)
  console.log('飞行时长:', result.statistics.totalTimeMinutes, '分钟')

  // 访问路径数据
  result.path.forEach((waypoint, index) => {
    console.log(`${index}: (${waypoint.lat}, ${waypoint.lng}, ${waypoint.altitude}m)`)
  })
} else {
  console.error('❌ 路径规划失败:', result.message)
}
```

**适合场景：** 生产应用、自定义集成、研究项目

**零依赖！** 核心算法是纯 JavaScript 实现。

### 📖 示例列表

| 示例 | 说明 | 难度 | 运行 |
|------|------|------|------|
| [Hello World](examples/1-quick-start/hello-world.js) | 10行代码快速上手 | ⭐ 入门 | `node examples/1-quick-start/hello-world.js` |
| [基础规划](examples/2-basic/basic-path-planning.js) | 完整功能演示 | ⭐⭐ 简单 | `node examples/2-basic/basic-path-planning.js` |
| [性能测试](examples/3-advanced/performance-comparison.js) | 对比不同分辨率 | ⭐⭐⭐ 进阶 | `node examples/3-advanced/performance-comparison.js` |
| [Cesium集成](examples/4-integration/cesium-integration.js) | 3D可视化集成 | ⭐⭐⭐ 进阶 | 查看[代码示例](examples/4-integration/cesium-integration.js) |

### 🎨 使用 Cesium.js 可视化

```javascript
// 将路径转换为Cesium格式
const cesiumPositions = result.path.map(waypoint =>
  Cesium.Cartesian3.fromDegrees(
    waypoint.lng,
    waypoint.lat,
    waypoint.altitude
  )
)

// 添加到视图
viewer.entities.add({
  polyline: {
    positions: cesiumPositions,
    width: 8,
    material: new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.2,
      color: Cesium.Color.CYAN
    })
  }
})
```

### 🔧 性能优化

| 网格分辨率 | 计算时间 | 路径质量 | 适用场景 |
|-----------|---------|---------|---------|
| **50m** | 慢（高细节） | 非常详细 | 城市密集障碍物 |
| **100m** ⭐ | 中等 | 平衡良好 | 通用场景 |
| **150m** | 快 | 粗糙 | 长距离规划 |

**建议:**
- 城市环境（障碍物多）：**50m**
- 性能平衡：**100m**（推荐）
- 长距离稀疏区域：**150m**

### 📊 算法对比

| 算法 | 优点 | 缺点 | 最适合 |
|-----|------|------|--------|
| **A\*** ⭐ | 保证最短路径，高效 | 内存占用大 | 静态环境 |
| RRT | 快速，处理复杂空间 | 路径非最优 | 动态环境 |
| Dijkstra | 总是最优 | 比A*慢 | 无启发函数时 |

### 📚 API 文档

#### 构造函数

```javascript
new AStar3DPathPlanner({
  gridResolution: 100,   // 网格单元大小（米）（默认: 100）
  maxIterations: 50000   // 最大A*迭代次数（默认: 50000）
})
```

#### 方法

##### `planPath(start, end, options)`

规划从起点到终点的3D路径。

**参数:**
- `start` (Object): `{lat, lng, altitude}` - 起点
- `end` (Object): `{lat, lng, altitude}` - 终点
- `options` (Object):
  - `gridResolution` (Number): 覆盖默认网格分辨率
  - `cruiseAltitude` (Number): 巡航高度（米）
  - `smoothPath` (Boolean): 启用路径平滑

**返回值:**
```javascript
{
  success: true,
  path: [{lat, lng, altitude}, ...],
  statistics: {
    totalWaypoints: 52,
    totalDistance: 4612,       // 米
    totalTimeMinutes: 5.1,     // 分钟
    maxAltitude: 120,          // 米
    minAltitude: 0,            // 米
    averageSpeed: 15           // m/s
  }
}
```

##### `setNoFlyZones(zones)`

设置禁飞区用于避障。

**参数:**
```javascript
[{
  name: '空域名称',
  south_lat: 41.740,
  north_lat: 41.745,
  west_lng: 123.370,
  east_lng: 123.380,
  min_altitude: 0,
  max_altitude: 300
}]
```

### 🛠️ 项目结构

```
AeroMind/
├── visualization/              # 🎬 交互式演示
│   └── standalone.html         # 单文件演示（直接打开！）
├── examples/                   # 📚 使用示例
│   ├── 1-quick-start/          # 新手友好
│   ├── 2-basic/                # 完整功能
│   ├── 3-advanced/             # 性能优化
│   └── 4-integration/          # 集成指南
├── src/
│   └── AStar3DPathPlanner.js   # 核心算法（548行）
├── docs/
│   ├── ALGORITHM.md            # 算法详解
│   └── QUICK_START.md          # 快速开始指南
└── README.md
```

### 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

详见 [CONTRIBUTING.md](CONTRIBUTING.md) 贡献指南。

### 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

### 🌟 Star 历史

如果这个项目对您有帮助，请在 GitHub 上给它一个 ⭐ star！

### 👤 作者

**Zguoxu**

- GitHub: [@Zguoxu](https://github.com/Zguoxu)
- 项目链接: [https://github.com/Zguoxu/AeroMind](https://github.com/Zguoxu/AeroMind)

### 📚 参考文献

- Hart, P. E.; Nilsson, N. J.; Raphael, B. (1968). "A Formal Basis for the Heuristic Determination of Minimum Cost Paths"
- LaValle, S. M. (1998). "Rapidly-exploring random trees: A new tool for path planning"
- Fast-Planner (港科大空中机器人实验室)

---

<div align="center">

⭐ **如果这个项目对您有帮助，请给它一个 Star！**

💡 **If you find this project helpful, please give it a Star!**

**[🌐 Try Live Demo](https://zguoxu.github.io/AeroMind/)** | **[📖 Documentation](docs/)** | **[🤝 Contribute](CONTRIBUTING.md)**

</div>
