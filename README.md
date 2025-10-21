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

### ⚡ Quick Start (3 ways!)

#### Option 1: 🎬 **Try Interactive Demo** (Fastest!)

```bash
# Clone the repository - no installation needed!
git clone https://github.com/Zguoxu/AeroMind.git
cd AeroMind
```

**Two ways to run the demo:**

**Method 1: 🌐 Online Demo (Easiest - No Installation)**
- Visit: **[https://zguoxu.github.io/AeroMind/](https://zguoxu.github.io/AeroMind/)**
- ✅ Works perfectly in any browser
- ✅ No setup required

**Method 2: 💻 Local Server (For Development)**
```bash
# Windows - just double-click:
start-demo.bat

# macOS/Linux - just double-click:
start-demo.sh
```
- ✅ Automatically starts HTTP server and opens browser
- ✅ No CORS errors
- ⚙️ Required for local development

**⚠️ Important**: Do NOT directly open `visualization/standalone.html` in your browser. Due to Cesium's Web Workers, all modern browsers (Chrome, Edge, Firefox) will block it with CORS errors when opened from the file system. Always use one of the two methods above.

#### Option 2: 🚀 **Run Command-line Example**

```bash
# Run the hello-world example
node examples/1-quick-start/hello-world.js
```

**Output:**
```
✅ Path Planning Successful!

📊 Flight Statistics:
   • Total Waypoints: 52
   • Total Distance: 4.61 km
   • Estimated Time: 5.1 minutes
   • Max Altitude: 120 m
```

#### Option 3: 💻 **Use as Library**

```javascript
const AStar3DPathPlanner = require('./src/AStar3DPathPlanner')

// 1. Create planner
const planner = new AStar3DPathPlanner({ gridResolution: 100 })

// 2. Set no-fly zones
planner.setNoFlyZones([
  {
    name: 'Airport Restricted Zone',
    south_lat: 41.740, north_lat: 41.745,
    west_lng: 123.370, east_lng: 123.380,
    min_altitude: 0, max_altitude: 300
  }
])

// 3. Plan path (one line!)
const result = planner.planPath(
  { lat: 41.748, lng: 123.362, altitude: 100 },
  { lat: 41.733, lng: 123.413, altitude: 120 }
)

if (result.success) {
  console.log('Distance:', result.statistics.totalDistance, 'm')
  console.log('Waypoints:', result.path.length)
}
```

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

### ⚡ 快速开始（3种方式！）

#### 方式1: 🎬 **体验交互式演示**（最快！）

```bash
# 克隆仓库 - 无需安装任何东西！
git clone https://github.com/Zguoxu/AeroMind.git
cd AeroMind
```

**两种运行演示的方式：**

**方式1: 🌐 在线演示（最简单 - 无需安装）**
- 访问：**[https://zguoxu.github.io/AeroMind/](https://zguoxu.github.io/AeroMind/)**
- ✅ 在任何浏览器中完美运行
- ✅ 无需任何设置

**方式2: 💻 本地服务器（用于开发）**
```bash
# Windows - 直接双击：
start-demo.bat

# macOS/Linux - 直接双击：
start-demo.sh
```
- ✅ 自动启动HTTP服务器并打开浏览器
- ✅ 无CORS错误
- ⚙️ 本地开发必须使用此方式

**⚠️ 重要提示**：请勿直接在浏览器中打开 `visualization/standalone.html`。由于Cesium使用了Web Workers，所有现代浏览器（Chrome、Edge、Firefox）都会在从文件系统打开时阻止并显示CORS错误。请始终使用上述两种方法之一。

#### 方式2: 🚀 **运行命令行示例**

```bash
# 运行 hello-world 示例
node examples/1-quick-start/hello-world.js
```

**输出：**
```
✅ 路径规划成功！

📊 飞行统计:
   • 总航点数: 52
   • 总距离: 4.61 km
   • 预计时长: 5.1 分钟
   • 最高高度: 120 m
```

#### 方式3: 💻 **用作库集成**

```javascript
const AStar3DPathPlanner = require('./src/AStar3DPathPlanner')

// 1. 创建规划器
const planner = new AStar3DPathPlanner({ gridResolution: 100 })

// 2. 设置禁飞区
planner.setNoFlyZones([
  {
    name: '机场限制区',
    south_lat: 41.740, north_lat: 41.745,
    west_lng: 123.370, east_lng: 123.380,
    min_altitude: 0, max_altitude: 300
  }
])

// 3. 规划路径（一行代码！）
const result = planner.planPath(
  { lat: 41.748, lng: 123.362, altitude: 100 },
  { lat: 41.733, lng: 123.413, altitude: 120 }
)

if (result.success) {
  console.log('总距离:', result.statistics.totalDistance, '米')
  console.log('航点数:', result.path.length)
}
```

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
