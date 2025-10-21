/**
 * AStar3DPathPlanner.js
 * 3D A* Pathfinding Algorithm for UAV/Drone Flight Planning
 *
 * Author: Zguoxu
 * License: MIT
 *
 * Features:
 * - 3D A* algorithm with 26-direction search
 * - No-fly zone avoidance
 * - Customizable grid resolution
 * - Path smoothing
 *
 * Reference:
 * - A* Algorithm (Hart, Nilsson, Raphael, 1968)
 * - 3D pathfinding for aerial robotics
 */

/**
 * 3D Grid Node
 * Represents a single node in the 3D grid
 */
class GridNode {
  constructor(x, y, z, lat, lng, altitude) {
    this.x = x                    // Grid X coordinate
    this.y = y                    // Grid Y coordinate
    this.z = z                    // Grid Z coordinate
    this.lat = lat                // Real latitude
    this.lng = lng                // Real longitude
    this.altitude = altitude      // Real altitude (meters)
    this.g = 0                    // Cost from start to current node
    this.h = 0                    // Heuristic cost from current to end
    this.f = 0                    // f = g + h
    this.parent = null            // Parent node
    this.walkable = true          // Is this node walkable?
  }

  /**
   * Update f value (f = g + h)
   */
  updateF() {
    this.f = this.g + this.h
  }
}

/**
 * Priority Queue for A* algorithm
 * Automatically sorts nodes by f value
 */
class PriorityQueue {
  constructor() {
    this.items = []
  }

  enqueue(node) {
    if (this.items.length === 0) {
      this.items.push(node)
    } else {
      let added = false
      for (let i = 0; i < this.items.length; i++) {
        if (node.f < this.items[i].f) {
          this.items.splice(i, 0, node)
          added = true
          break
        }
      }
      if (!added) {
        this.items.push(node)
      }
    }
  }

  dequeue() {
    return this.items.shift()
  }

  isEmpty() {
    return this.items.length === 0
  }

  contains(node) {
    return this.items.some(item =>
      item.x === node.x && item.y === node.y && item.z === node.z
    )
  }
}

/**
 * AStar3DPathPlanner
 * Main class for 3D path planning using A* algorithm
 */
class AStar3DPathPlanner {
  constructor(options = {}) {
    // Default parameters
    this.gridResolution = options.gridResolution || 100  // Grid resolution in meters
    this.maxIterations = options.maxIterations || 50000  // Max A* iterations
    this.noFlyZones = []  // No-fly zones (restricted airspaces)
  }

  /**
   * Plan a 3D path from start to end
   * @param {Object} start - Start point {lat, lng, altitude}
   * @param {Object} end - End point {lat, lng, altitude}
   * @param {Object} options - Optional parameters
   * @returns {Object} Result with path and statistics
   */
  planPath(start, end, options = {}) {
    console.log('[AStar3D] Starting path planning...')
    console.log('[AStar3D] Start:', start)
    console.log('[AStar3D] End:', end)

    try {
      // 1. Create 3D grid
      const gridData = this.create3DGrid(start, end, options)
      if (!gridData) {
        throw new Error('Failed to create 3D grid')
      }

      const { grid, startNode, endNode, gridInfo } = gridData

      // 2. Mark no-fly zones as non-walkable
      this.markNoFlyZones(grid, gridInfo)

      // 3. Run A* algorithm
      const path = this.findPathAStar(grid, startNode, endNode)

      if (!path || path.length === 0) {
        throw new Error('No path found')
      }

      // 4. Convert grid nodes to waypoints
      const waypoints = path.map(node => ({
        lat: node.lat,
        lng: node.lng,
        altitude: node.altitude
      }))

      // 5. Optional: smooth path
      const smoothedPath = options.smoothPath ? this.smoothPath(waypoints) : waypoints

      // 6. Calculate statistics
      const statistics = this.calculateStatistics(smoothedPath)

      console.log('[AStar3D] Path planning successful!')
      console.log('[AStar3D] Waypoints:', smoothedPath.length)
      console.log('[AStar3D] Total distance:', statistics.totalDistance.toFixed(2), 'meters')

      return {
        success: true,
        path: smoothedPath,
        statistics: statistics
      }

    } catch (error) {
      console.error('[AStar3D] Path planning failed:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Create 3D grid for A* algorithm
   */
  create3DGrid(start, end, options) {
    const gridResolution = options.gridResolution || this.gridResolution

    // Calculate boundaries
    const minLat = Math.min(start.lat, end.lat) - 0.01
    const maxLat = Math.max(start.lat, end.lat) + 0.01
    const minLng = Math.min(start.lng, end.lng) - 0.01
    const maxLng = Math.max(start.lng, end.lng) + 0.01
    const minAlt = Math.min(start.altitude, end.altitude)
    const maxAlt = Math.max(start.altitude, end.altitude) + 100

    // Calculate grid size
    const latRange = maxLat - minLat
    const lngRange = maxLng - minLng
    const altRange = maxAlt - minAlt

    // ~111km per degree latitude, ~100km per degree longitude
    const latMeters = latRange * 111000
    const lngMeters = lngRange * 100000
    const altMeters = altRange

    const gridX = Math.ceil(lngMeters / gridResolution)
    const gridY = Math.ceil(latMeters / gridResolution)
    const gridZ = Math.ceil(altMeters / gridResolution)

    const totalNodes = gridX * gridY * gridZ
    console.log(`[AStar3D] Grid size: ${gridX} x ${gridY} x ${gridZ} = ${totalNodes.toLocaleString()} nodes`)

    // Create 3D grid
    const grid = []
    for (let x = 0; x < gridX; x++) {
      grid[x] = []
      for (let y = 0; y < gridY; y++) {
        grid[x][y] = []
        for (let z = 0; z < gridZ; z++) {
          const lat = minLat + (y / gridY) * latRange
          const lng = minLng + (x / gridX) * lngRange
          const altitude = minAlt + (z / gridZ) * altRange
          grid[x][y][z] = new GridNode(x, y, z, lat, lng, altitude)
        }
      }
    }

    // Find start and end nodes
    const startNode = this.getGridNode(grid, start.lat, start.lng, start.altitude,
                                       minLat, maxLat, minLng, maxLng, minAlt, maxAlt,
                                       gridX, gridY, gridZ)
    const endNode = this.getGridNode(grid, end.lat, end.lng, end.altitude,
                                     minLat, maxLat, minLng, maxLng, minAlt, maxAlt,
                                     gridX, gridY, gridZ)

    if (!startNode.walkable || !endNode.walkable) {
      console.error('[AStar3D] Start or end node is not walkable!')
      return null
    }

    return { grid, startNode, endNode, gridInfo: { minLat, maxLat, minLng, maxLng, minAlt, maxAlt, gridX, gridY, gridZ } }
  }

  /**
   * Get grid node from real-world coordinates
   */
  getGridNode(grid, lat, lng, alt, minLat, maxLat, minLng, maxLng, minAlt, maxAlt, gridX, gridY, gridZ) {
    const x = Math.floor(((lng - minLng) / (maxLng - minLng)) * gridX)
    const y = Math.floor(((lat - minLat) / (maxLat - minLat)) * gridY)
    const z = Math.floor(((alt - minAlt) / (maxAlt - minAlt)) * gridZ)

    const clampedX = Math.max(0, Math.min(gridX - 1, x))
    const clampedY = Math.max(0, Math.min(gridY - 1, y))
    const clampedZ = Math.max(0, Math.min(gridZ - 1, z))

    return grid[clampedX][clampedY][clampedZ]
  }

  /**
   * Mark no-fly zones as non-walkable
   */
  markNoFlyZones(grid, gridInfo) {
    if (!this.noFlyZones || this.noFlyZones.length === 0) {
      console.log('[AStar3D] No no-fly zones defined')
      return
    }

    console.log(`[AStar3D] Marking ${this.noFlyZones.length} no-fly zones...`)

    let blockedCount = 0
    for (let x = 0; x < gridInfo.gridX; x++) {
      for (let y = 0; y < gridInfo.gridY; y++) {
        for (let z = 0; z < gridInfo.gridZ; z++) {
          const node = grid[x][y][z]

          for (const zone of this.noFlyZones) {
            if (this.isPointInZone(node.lat, node.lng, node.altitude, zone)) {
              node.walkable = false
              blockedCount++
              break
            }
          }
        }
      }
    }

    console.log(`[AStar3D] Blocked ${blockedCount} nodes`)
  }

  /**
   * Check if a point is inside a no-fly zone
   */
  isPointInZone(lat, lng, altitude, zone) {
    // Support both property name formats:
    // Format 1: south_lat, north_lat, west_lng, east_lng, min_altitude, max_altitude
    // Format 2: minLat, maxLat, minLng, maxLng, minAlt, maxAlt
    const minLat = zone.minLat ?? zone.south_lat
    const maxLat = zone.maxLat ?? zone.north_lat
    const minLng = zone.minLng ?? zone.west_lng
    const maxLng = zone.maxLng ?? zone.east_lng
    const minAlt = zone.minAlt ?? zone.min_altitude
    const maxAlt = zone.maxAlt ?? zone.max_altitude

    const inLatRange = lat >= minLat && lat <= maxLat
    const inLngRange = lng >= minLng && lng <= maxLng
    const inAltRange = altitude >= minAlt && altitude <= maxAlt
    return inLatRange && inLngRange && inAltRange
  }

  /**
   * A* algorithm core
   * Find the shortest path from start to end avoiding obstacles
   */
  findPathAStar(grid, startNode, endNode) {
    console.log('[AStar3D] Running A* algorithm...')

    const openList = new PriorityQueue()
    const closedList = []

    startNode.g = 0
    startNode.h = this.heuristic(startNode, endNode)
    startNode.updateF()

    openList.enqueue(startNode)

    let iterations = 0
    let closestNode = startNode
    let closestDistance = startNode.h

    while (!openList.isEmpty() && iterations < this.maxIterations) {
      iterations++

      const currentNode = openList.dequeue()

      // Progress logging
      if (iterations % 1000 === 0) {
        console.log(`[AStar3D] Iteration ${iterations}: distance to goal = ${this.heuristic(currentNode, endNode).toFixed(2)}`)
      }

      // Goal reached
      if (currentNode.x === endNode.x && currentNode.y === endNode.y && currentNode.z === endNode.z) {
        console.log(`[AStar3D] Path found in ${iterations} iterations!`)
        return this.reconstructPath(currentNode)
      }

      closedList.push(currentNode)

      // Track closest node to goal
      const distToEnd = this.heuristic(currentNode, endNode)
      if (distToEnd < closestDistance) {
        closestDistance = distToEnd
        closestNode = currentNode
      }

      // Get neighbors (26 directions in 3D)
      const neighbors = this.getNeighbors(grid, currentNode)

      for (const neighbor of neighbors) {
        // Skip non-walkable or closed nodes
        if (!neighbor.walkable || closedList.some(n => n.x === neighbor.x && n.y === neighbor.y && n.z === neighbor.z)) {
          continue
        }

        const tentativeG = currentNode.g + this.distance(currentNode, neighbor)

        const inOpenList = openList.contains(neighbor)
        if (!inOpenList || tentativeG < neighbor.g) {
          neighbor.parent = currentNode
          neighbor.g = tentativeG
          neighbor.h = this.heuristic(neighbor, endNode)
          neighbor.updateF()

          if (!inOpenList) {
            openList.enqueue(neighbor)
          }
        }
      }
    }

    // If no complete path found, return partial path to closest node
    if (closestDistance < startNode.h) {
      console.warn(`[AStar3D] No complete path found. Returning path to closest point (${closestDistance.toFixed(2)} units from goal)`)
      return this.reconstructPath(closestNode)
    }

    console.error('[AStar3D] No path found after', iterations, 'iterations')
    return null
  }

  /**
   * Heuristic function (Euclidean distance)
   */
  heuristic(node1, node2) {
    const dx = node2.x - node1.x
    const dy = node2.y - node1.y
    const dz = node2.z - node1.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }

  /**
   * Calculate distance between two nodes
   */
  distance(node1, node2) {
    const dx = node2.x - node1.x
    const dy = node2.y - node1.y
    const dz = node2.z - node1.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }

  /**
   * Get neighbor nodes (26 directions in 3D space)
   */
  getNeighbors(grid, node) {
    const neighbors = []
    const { x, y, z } = node

    // 26 directions (3x3x3 - center)
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) continue

          const nx = x + dx
          const ny = y + dy
          const nz = z + dz

          if (nx >= 0 && nx < grid.length &&
              ny >= 0 && ny < grid[0].length &&
              nz >= 0 && nz < grid[0][0].length) {
            neighbors.push(grid[nx][ny][nz])
          }
        }
      }
    }

    return neighbors
  }

  /**
   * Reconstruct path from end node to start
   */
  reconstructPath(endNode) {
    const path = []
    let current = endNode

    while (current) {
      path.unshift(current)
      current = current.parent
    }

    return path
  }

  /**
   * Smooth path using moving average
   */
  smoothPath(waypoints, windowSize = 3) {
    if (waypoints.length < 3) return waypoints

    const smoothed = []

    for (let i = 0; i < waypoints.length; i++) {
      if (i === 0 || i === waypoints.length - 1) {
        // Keep start and end unchanged
        smoothed.push(waypoints[i])
      } else {
        // Moving average smoothing
        const start = Math.max(0, i - Math.floor(windowSize / 2))
        const end = Math.min(waypoints.length, i + Math.ceil(windowSize / 2))
        const window = waypoints.slice(start, end)

        const avgLat = window.reduce((sum, p) => sum + p.lat, 0) / window.length
        const avgLng = window.reduce((sum, p) => sum + p.lng, 0) / window.length
        const avgAlt = window.reduce((sum, p) => sum + p.altitude, 0) / window.length

        smoothed.push({
          lat: avgLat,
          lng: avgLng,
          altitude: avgAlt
        })
      }
    }

    return smoothed
  }

  /**
   * Calculate 3D distance between two points
   */
  calculate3DDistance(p1, p2) {
    // Haversine formula for horizontal distance
    const R = 6371000 // Earth radius in meters
    const dLat = (p2.lat - p1.lat) * Math.PI / 180
    const dLng = (p2.lng - p1.lng) * Math.PI / 180

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const horizontalDist = R * c

    // Vertical distance
    const verticalDist = Math.abs(p2.altitude - p1.altitude)

    // 3D distance
    return Math.sqrt(horizontalDist * horizontalDist + verticalDist * verticalDist)
  }

  /**
   * Calculate path statistics
   */
  calculateStatistics(waypoints) {
    let totalDistance = 0
    let totalTime = 0
    let maxAltitude = 0
    let minAltitude = Infinity
    const cruiseSpeed = 15 // m/s (default speed)

    for (let i = 0; i < waypoints.length - 1; i++) {
      const p1 = waypoints[i]
      const p2 = waypoints[i + 1]

      const segmentDist = this.calculate3DDistance(p1, p2)
      totalDistance += segmentDist
      totalTime += segmentDist / cruiseSpeed

      maxAltitude = Math.max(maxAltitude, p1.altitude)
      minAltitude = Math.min(minAltitude, p1.altitude)
    }

    return {
      totalWaypoints: waypoints.length,
      totalDistance: Math.round(totalDistance),
      totalTime: Math.round(totalTime),
      totalTimeMinutes: Math.round(totalTime / 60 * 10) / 10,
      maxAltitude: Math.round(maxAltitude),
      minAltitude: Math.round(minAltitude),
      averageSpeed: Math.round(totalDistance / totalTime * 10) / 10
    }
  }

  /**
   * Set no-fly zones
   * @param {Array} zones - Array of no-fly zones
   *
   * Recommended format:
   * [{
   *   name: 'Zone Name',
   *   south_lat: 41.740, north_lat: 41.745,
   *   west_lng: 123.370, east_lng: 123.380,
   *   min_altitude: 0, max_altitude: 300
   * }]
   *
   * Legacy format (also supported for backward compatibility):
   * [{minLat, maxLat, minLng, maxLng, minAlt, maxAlt, name}]
   */
  setNoFlyZones(zones) {
    this.noFlyZones = zones
    console.log(`[AStar3D] Set ${zones.length} no-fly zones`)
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AStar3DPathPlanner
}
