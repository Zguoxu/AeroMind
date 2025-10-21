/**
 * Cesium Integration Example
 *
 * This example demonstrates how to integrate AeroMind path planning
 * with Cesium.js for 3D visualization.
 *
 * 本示例演示如何将 AeroMind 路径规划与 Cesium.js 集成以实现 3D 可视化。
 *
 * Author: Zguoxu
 * License: MIT
 */

const AStar3DPathPlanner = require('../../src/AStar3DPathPlanner')

/**
 * Example: Plan a path and prepare for Cesium visualization
 * 示例：规划路径并准备 Cesium 可视化
 */
function planPathForCesium() {
  console.log('🚁 AeroMind - Cesium Integration Example')
  console.log('========================================\n')

  // 1. Create path planner | 创建路径规划器
  const planner = new AStar3DPathPlanner({
    gridResolution: 100  // 100m grid resolution | 100米网格分辨率
  })

  // 2. Define no-fly zones (example: Shenyang area) | 定义禁飞区（示例：沈阳地区）
  const noFlyZones = [
    {
      name: 'Shenyang Taoxian International Airport',
      south_lat: 41.630,
      north_lat: 41.650,
      west_lng: 123.470,
      east_lng: 123.500,
      min_altitude: 0,
      max_altitude: 500
    },
    {
      name: 'Military Restricted Zone',
      south_lat: 41.740,
      north_lat: 41.760,
      west_lng: 123.360,
      east_lng: 123.380,
      min_altitude: 0,
      max_altitude: 300
    }
  ]

  planner.setNoFlyZones(noFlyZones)

  // 3. Define start and end points | 定义起点和终点
  const start = {
    lat: 41.748,
    lng: 123.362,
    altitude: 100
  }

  const end = {
    lat: 41.633,
    lng: 123.513,
    altitude: 120
  }

  console.log('📍 Start Point | 起点:')
  console.log(`   Lat: ${start.lat}, Lng: ${start.lng}, Alt: ${start.altitude}m\n`)

  console.log('📍 End Point | 终点:')
  console.log(`   Lat: ${end.lat}, Lng: ${end.lng}, Alt: ${end.altitude}m\n`)

  // 4. Plan the path | 规划路径
  console.log('🔄 Planning path... | 规划路径中...\n')

  const result = planner.planPath(start, end, {
    smoothPath: true  // Enable path smoothing | 启用路径平滑
  })

  if (!result.success) {
    console.error('❌ Path planning failed! | 路径规划失败！')
    return null
  }

  // 5. Display results | 显示结果
  console.log('✅ Path Planning Successful! | 路径规划成功！\n')
  console.log('📊 Statistics | 统计信息:')
  console.log(`   Waypoints: ${result.statistics.totalWaypoints}`)
  console.log(`   Distance: ${(result.statistics.totalDistance / 1000).toFixed(2)} km`)
  console.log(`   Flight Time: ${result.statistics.totalTimeMinutes.toFixed(1)} minutes`)
  console.log(`   Max Altitude: ${result.statistics.maxAltitude} m`)
  console.log(`   Min Altitude: ${result.statistics.minAltitude} m\n`)

  // 6. Convert to Cesium format | 转换为 Cesium 格式
  console.log('🎨 Converting to Cesium format... | 转换为 Cesium 格式...\n')

  const cesiumPath = convertToCesiumFormat(result.path)

  // 7. Generate Cesium visualization code | 生成 Cesium 可视化代码
  console.log('📝 Cesium Visualization Code | Cesium 可视化代码:')
  console.log('='.repeat(60))
  console.log(generateCesiumCode(cesiumPath, noFlyZones))
  console.log('='.repeat(60))
  console.log('\n💡 Copy the above code into your Cesium viewer to visualize the path!')
  console.log('💡 将上面的代码复制到你的 Cesium 查看器中以可视化路径！\n')

  // 8. Suggest using standalone visualization | 建议使用独立可视化
  console.log('🌐 Or use our standalone visualization:')
  console.log('   Open: visualization/standalone.html\n')
  console.log('🌐 或使用我们的独立可视化页面：')
  console.log('   打开: visualization/standalone.html\n')

  return {
    path: result.path,
    cesiumPath: cesiumPath,
    statistics: result.statistics,
    noFlyZones: noFlyZones
  }
}

/**
 * Convert path to Cesium Cartesian3 format
 * 将路径转换为 Cesium Cartesian3 格式
 */
function convertToCesiumFormat(path) {
  return path.map(waypoint => ({
    longitude: waypoint.lng,
    latitude: waypoint.lat,
    height: waypoint.altitude
  }))
}

/**
 * Generate Cesium visualization code
 * 生成 Cesium 可视化代码
 */
function generateCesiumCode(cesiumPath, noFlyZones) {
  return `
// Add flight path | 添加飞行路径
viewer.entities.add({
  name: 'UAV Flight Path',
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
      ${cesiumPath.map(p => `${p.longitude}, ${p.latitude}, ${p.height}`).join(',\n      ')}
    ]),
    width: 8,
    material: new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.2,
      color: Cesium.Color.CYAN
    }),
    clampToGround: false
  }
});

// Add start point marker | 添加起点标记
viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(
    ${cesiumPath[0].longitude},
    ${cesiumPath[0].latitude},
    ${cesiumPath[0].height}
  ),
  point: {
    pixelSize: 15,
    color: Cesium.Color.GREEN,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2
  }
});

// Add end point marker | 添加终点标记
viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(
    ${cesiumPath[cesiumPath.length - 1].longitude},
    ${cesiumPath[cesiumPath.length - 1].latitude},
    ${cesiumPath[cesiumPath.length - 1].height}
  ),
  point: {
    pixelSize: 15,
    color: Cesium.Color.RED,
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2
  }
});

// Add no-fly zones | 添加禁飞区
${noFlyZones.map((zone, i) => `
viewer.entities.add({
  name: '${zone.name}',
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([
      ${zone.west_lng}, ${zone.south_lat},
      ${zone.east_lng}, ${zone.south_lat},
      ${zone.east_lng}, ${zone.north_lat},
      ${zone.west_lng}, ${zone.north_lat}
    ]),
    height: ${zone.min_altitude},
    extrudedHeight: ${zone.max_altitude},
    material: Cesium.Color.RED.withAlpha(0.3),
    outline: true,
    outlineColor: Cesium.Color.RED
  }
});`).join('\n')}

// Fly to path | 飞到路径位置
viewer.flyTo(viewer.entities);
`.trim()
}

// Run the example | 运行示例
if (require.main === module) {
  planPathForCesium()
}

module.exports = { planPathForCesium, convertToCesiumFormat }
