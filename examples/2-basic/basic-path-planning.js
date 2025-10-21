/**
 * Basic Example - 3D A* Path Planning
 *
 * This example demonstrates:
 * 1. Basic path planning between two points
 * 2. Setting no-fly zones
 * 3. Viewing results
 */

const AStar3DPathPlanner = require('../../src/AStar3DPathPlanner')

// Create planner instance
const planner = new AStar3DPathPlanner({
  gridResolution: 100,  // 100 meters grid resolution
  maxIterations: 50000  // Maximum A* iterations
})

// Define no-fly zones (example: restricted airspace)
const noFlyZones = [
  {
    name: 'Airport Restricted Zone',
    south_lat: 41.740,
    north_lat: 41.745,
    west_lng: 123.370,
    east_lng: 123.380,
    min_altitude: 0,
    max_altitude: 300
  },
  {
    name: 'Military Zone',
    south_lat: 41.735,
    north_lat: 41.738,
    west_lng: 123.390,
    east_lng: 123.400,
    min_altitude: 0,
    max_altitude: 500
  }
]

// Set no-fly zones
planner.setNoFlyZones(noFlyZones)

// Define start and end points
const start = {
  lat: 41.748,   // Shenyang, China (example)
  lng: 123.362,
  altitude: 100  // 100 meters
}

const end = {
  lat: 41.733,
  lng: 123.413,
  altitude: 120  // 120 meters
}

// Plan path
console.log('========================================')
console.log('🚁 UAV 3D Path Planning Demo')
console.log('========================================')
console.log('Start Point:', start)
console.log('End Point:', end)
console.log('No-Fly Zones:', noFlyZones.length)
console.log('========================================')

const result = planner.planPath(start, end, {
  gridResolution: 100,
  smoothPath: true
})

if (result.success) {
  console.log('\n✅ Path Planning Successful!')
  console.log('----------------------------------------')
  console.log('Total Waypoints:', result.statistics.totalWaypoints)
  console.log('Total Distance:', result.statistics.totalDistance, 'meters')
  console.log('Max Altitude:', result.statistics.maxAltitude, 'meters')
  console.log('Min Altitude:', result.statistics.minAltitude, 'meters')
  console.log('----------------------------------------')

  console.log('\n📍 First 5 Waypoints:')
  result.path.slice(0, 5).forEach((waypoint, index) => {
    console.log(`  ${index + 1}. Lat: ${waypoint.lat.toFixed(6)}, Lng: ${waypoint.lng.toFixed(6)}, Alt: ${waypoint.altitude.toFixed(1)}m`)
  })

  console.log('\n📊 Path can be visualized using Cesium.js or other 3D mapping libraries')
} else {
  console.error('\n❌ Path Planning Failed!')
  console.error('Error:', result.error)
}

console.log('\n========================================')
