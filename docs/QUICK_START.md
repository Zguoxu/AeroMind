# Quick Start Guide

## 快速开始指南

### 1. Clone Repository | 克隆仓库

```bash
git clone https://github.com/Zguoxu/AeroMind.git
cd AeroMind
```

### 2. Verify Installation | 验证安装

No dependencies needed! Just check Node.js version:

无需安装依赖！只需检查 Node.js 版本：

```bash
node --version  # Should be >= 12.0.0
```

### 3. Run Basic Example | 运行基础示例

```bash
node examples/1-quick-start/hello-world.js
```

Expected output | 预期输出：

```
========================================
🚁 UAV 3D Path Planning Demo
========================================
Start Point: { lat: 41.748, lng: 123.362, altitude: 100 }
End Point: { lat: 41.733, lng: 123.413, altitude: 120 }
No-Fly Zones: 2
========================================
[AStar3D] Starting path planning...
...
✅ Path Planning Successful!
Total Waypoints: 52
Total Distance: 4612 meters
```

### 4. Run Advanced Example | 运行高级示例

```bash
node examples/3-advanced/performance-comparison.js
```

This will test different grid resolutions and compare performance.

这将测试不同的网格分辨率并对比性能。

### 5. Integrate into Your Project | 集成到您的项目

```javascript
const AStar3DPathPlanner = require('./src/AStar3DPathPlanner')

const planner = new AStar3DPathPlanner({
  gridResolution: 100,
  maxIterations: 50000
})

// Set no-fly zones
planner.setNoFlyZones([
  {
    name: 'Restricted Area',
    minLat: 41.740,
    maxLat: 41.745,
    minLng: 123.370,
    maxLng: 123.380,
    minAlt: 0,
    maxAlt: 300
  }
])

// Plan path
const result = planner.planPath(
  { lat: 41.748, lng: 123.362, altitude: 100 },
  { lat: 41.733, lng: 123.413, altitude: 120 },
  { smoothPath: true }
)

if (result.success) {
  console.log('Path found with', result.path.length, 'waypoints')
}
```

### 6. Visualize with Cesium.js | 使用 Cesium 可视化

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
  name: 'UAV Flight Path',
  polyline: {
    positions: cesiumPositions,
    width: 3,
    material: Cesium.Color.BLUE,
    clampToGround: false
  }
})
```

## Troubleshooting | 故障排查

### Issue: "Cannot find module" | 问题：找不到模块

**Solution | 解决方案：**
Make sure you're running from the project root directory:
确保从项目根目录运行：

```bash
cd AeroMind
node examples/1-quick-start/hello-world.js
```

### Issue: "No path found" | 问题：找不到路径

**Possible causes | 可能原因：**
1. Start or end point is inside a no-fly zone | 起点或终点在禁飞区内
2. No-fly zones completely block the path | 禁飞区完全阻挡了路径
3. Grid resolution too large | 网格分辨率太大

**Solution | 解决方案：**
- Reduce grid resolution (e.g., from 150m to 50m) | 减小网格分辨率
- Check no-fly zone coordinates | 检查禁飞区坐标
- Increase maxIterations | 增加最大迭代次数

### Issue: Algorithm is too slow | 问题：算法太慢

**Solution | 解决方案：**
- Increase grid resolution (e.g., from 50m to 100m) | 增大网格分辨率
- Reduce the planning distance | 减少规划距离
- Limit the number of no-fly zones | 限制禁飞区数量

## Performance Tips | 性能建议

| Scenario | Grid Resolution | Max Iterations |
|----------|----------------|----------------|
| Urban (many obstacles) | 50m | 50000 |
| Suburban | 100m | 30000 |
| Rural (few obstacles) | 150m | 20000 |

| 场景 | 网格分辨率 | 最大迭代次数 |
|------|-----------|-------------|
| 城市（障碍物多） | 50m | 50000 |
| 郊区 | 100m | 30000 |
| 农村（障碍物少） | 150m | 20000 |

## Next Steps | 下一步

1. Read the [full README](../README.md) for detailed API documentation
   阅读[完整README](../README.md)了解详细API文档

2. Modify the examples to test your own scenarios
   修改示例代码测试您自己的场景

3. Integrate with Cesium.js for 3D visualization
   集成 Cesium.js 实现3D可视化

4. Consider contributing improvements!
   考虑贡献改进！

## Support | 支持

- GitHub Issues: https://github.com/Zguoxu/AeroMind/issues
- Author: Zguoxu
