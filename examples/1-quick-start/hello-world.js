/**
 * 🚀 Hello World - Simplest Example | 最简单的使用示例
 *
 * This example shows how to complete 3D path planning in 10 lines of code!
 * 这个示例展示了如何用 10 行代码完成 3D 路径规划！
 *
 * Usage | 运行方式:
 *   node examples/1-quick-start/hello-world.js
 */

const AStar3DPathPlanner = require('../../src/AStar3DPathPlanner')

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('🚁 AeroMind - Hello World Example')
console.log('   3D A* Path Planning for UAVs')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

// 1️⃣ Create planner instance | 创建路径规划器
const planner = new AStar3DPathPlanner()

// 2️⃣ Define start and end points (Shenyang, China example) | 定义起点和终点（沈阳市区）
const start = { lat: 41.748, lng: 123.362, altitude: 100 }
const end = { lat: 41.733, lng: 123.413, altitude: 120 }

console.log('📍 Start Point | 起点:', `Lat ${start.lat}, Lng ${start.lng}, Alt ${start.altitude}m`)
console.log('📍 End Point | 终点:', `Lat ${end.lat}, Lng ${end.lng}, Alt ${end.altitude}m\n`)

// 3️⃣ Plan the path | 规划路径
console.log('⏳ Planning path... | 正在规划路径...\n')
const result = planner.planPath(start, end)

// 4️⃣ View results | 查看结果
if (result.success) {
  console.log('✅ Path Planning Successful! | 路径规划成功！\n')
  console.log('📊 Flight Statistics | 飞行统计:')
  console.log('   • Total Waypoints | 总航点数:', result.statistics.totalWaypoints)
  console.log('   • Total Distance | 总距离:', (result.statistics.totalDistance / 1000).toFixed(2), 'km')
  console.log('   • Estimated Time | 预计时长:', result.statistics.totalTimeMinutes.toFixed(1), 'min | 分钟')
  console.log('   • Max Altitude | 最高高度:', result.statistics.maxAltitude, 'm')
  console.log('   • Min Altitude | 最低高度:', result.statistics.minAltitude, 'm')
  console.log('   • Average Speed | 平均速度:', result.statistics.averageSpeed, 'm/s\n')

  console.log('🛤️  First 5 Waypoints Preview | 前 5 个航点预览:')
  result.path.slice(0, 5).forEach((waypoint, index) => {
    console.log(`   ${index + 1}. Lat ${waypoint.lat.toFixed(6)}, Lng ${waypoint.lng.toFixed(6)}, Alt ${waypoint.altitude}m`)
  })

  console.log('\n🎉 Done! Want to see 3D visualization? | 完成！想看 3D 可视化效果？')
  console.log('   👉 Run: start-demo.bat (Windows) or start-demo.sh (Mac/Linux)')
  console.log('   👉 运行: start-demo.bat (Windows) 或 start-demo.sh (Mac/Linux)')
} else {
  console.error('❌ Path Planning Failed | 路径规划失败:', result.message)
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
