'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Initialize map
      mapInstance.current = L.map(mapRef.current).setView([40.7128, -74.0060], 12)

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance.current)

      // Sample location data
      const locations = [
        { lat: 40.7128, lng: -74.0060, name: 'Office', intensity: 'high' },
        { lat: 40.7589, lng: -73.9851, name: 'Home', intensity: 'medium' },
        { lat: 40.7505, lng: -73.9934, name: 'Restaurant', intensity: 'high' },
        { lat: 40.7614, lng: -73.9776, name: 'Park', intensity: 'low' },
        { lat: 40.7505, lng: -73.9876, name: 'Store', intensity: 'medium' }
      ]

      // Add markers for each location
      locations.forEach(location => {
        const color = location.intensity === 'high' ? '#dc2626' : 
                     location.intensity === 'medium' ? '#d97706' : '#059669'
        
        const marker = L.circleMarker([location.lat, location.lng], {
          radius: location.intensity === 'high' ? 15 : 
                 location.intensity === 'medium' ? 12 : 8,
          fillColor: color,
          color: color,
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.6
        }).addTo(mapInstance.current!)

        // Add popup
        marker.bindPopup(`
          <div style="text-align: center;">
            <strong>${location.name}</strong><br>
            <span style="color: ${color};">Intensity: ${location.intensity}</span>
          </div>
        `)
      })

      // Add heat layer effect
      const heatData = locations.map(loc => [loc.lat, loc.lng, 
        loc.intensity === 'high' ? 1 : loc.intensity === 'medium' ? 0.6 : 0.3])

      // Create a simple heat effect using circles
      locations.forEach(location => {
        const intensity = location.intensity === 'high' ? 0.8 : 
                         location.intensity === 'medium' ? 0.5 : 0.3
        
        L.circle([location.lat, location.lng], {
          radius: 200,
          fillColor: '#ff4444',
          color: '#ff4444',
          weight: 0,
          opacity: intensity,
          fillOpacity: intensity * 0.3
        }).addTo(mapInstance.current!)
      })
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  return (
    <div className="map-container">
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height: '500px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      />
    </div>
  )
}
