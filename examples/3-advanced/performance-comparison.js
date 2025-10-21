/**
 * Advanced Example - Complex 3D Path Planning
 *
 * This example demonstrates:
 * 1. Multiple no-fly zones
 * 2. Different grid resolutions
 * 3. Path smoothing
 * 4. Performance comparison
 */

const AStar3DPathPlanner = require('../../src/AStar3DPathPlanner')

console.log('========================================')
console.log('🚁 Advanced UAV 3D Path Planning Demo')
console.log('========================================\n')

// Create multiple no-fly zones (complex scenario)
const complexNoFlyZones = [
  {
    name: 'Airport Zone',
    south_lat: 41.740,
    north_lat: 41.745,
    west_lng: 123.370,
    east_lng: 123.380,
    min_altitude: 0,
    max_altitude: 300
  },
  {
    name: 'Military Base',
    south_lat: 41.735,
    north_lat: 41.738,
    west_lng: 123.390,
    east_lng: 123.400,
    min_altitude: 0,
    max_altitude: 500
  },
  {
    name: 'Residential High-Rise',
    south_lat: 41.742,
    north_lat: 41.744,
    west_lng: 123.385,
    east_lng: 123.388,
    min_altitude: 0,
    max_altitude: 150
  }
]

const start = {
  lat: 41.748,
  lng: 123.362,
  altitude: 100
}

const end = {
  lat: 41.733,
  lng: 123.413,
  altitude: 120
}

// Test different grid resolutions
const resolutions = [50, 100, 150]

console.log('Testing different grid resolutions...\n')

resolutions.forEach(resolution => {
  console.log(`\n--- Testing with ${resolution}m grid resolution ---`)

  const planner = new AStar3DPathPlanner({
    gridResolution: resolution,
    maxIterations: 50000
  })

  planner.setNoFlyZones(complexNoFlyZones)

  const startTime = Date.now()
  const result = planner.planPath(start, end, {
    gridResolution: resolution,
    smoothPath: true
  })
  const endTime = Date.now()

  if (result.success) {
    console.log('✅ Planning Time:', (endTime - startTime), 'ms')
    console.log('📍 Waypoints:', result.statistics.totalWaypoints)
    console.log('📏 Distance:', result.statistics.totalDistance, 'meters')
    console.log('🏔️  Max Altitude:', result.statistics.maxAltitude, 'meters')
  } else {
    console.log('❌ Failed:', result.error)
  }
})

console.log('\n========================================')
console.log('💡 Observations:')
console.log('- Smaller grid = More waypoints, longer computation')
console.log('- Larger grid = Fewer waypoints, faster computation')
console.log('- Choose grid size based on obstacle density')
console.log('========================================')
