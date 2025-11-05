'use client';

import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function MapComponent() {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    fetch('/iran.geojson')
      .then(response => response.json())
      .then(data => setGeoData(data));
  }, []);

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const props = feature.properties;
      layer.bindPopup(`
        <div style="font-family: Arial, sans-serif; min-width: 200px;">
          <h3 style="margin: 0 0 10px 0; color: #2c3e50;">${props.name}</h3>
          <p style="margin: 5px 0;"><strong>Persian Name:</strong> ${props.name_fa}</p>
          <p style="margin: 5px 0;"><strong>Capital:</strong> ${props.capital}</p>
          <p style="margin: 5px 0;"><strong>Population:</strong> ${props.population.toLocaleString()}</p>
          <p style="margin: 5px 0;"><strong>Area:</strong> ${props.area_km2.toLocaleString()} km²</p>
        </div>
      `);
    }
  };

  const geoJSONStyle = {
    fillColor: '#3498db',
    weight: 3,
    opacity: 1,
    color: '#2c3e50',
    fillOpacity: 0.6
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '15px 30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem', color: '#2c3e50' }}>
          Islamic Republic of Iran
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '1.2rem', color: '#7f8c8d' }}>
          جمهوری اسلامی ایران
        </p>
      </div>

      <MapContainer
        center={[32.4279, 53.6880]}
        zoom={5}
        style={{ width: '100%', height: '100%' }}
        minZoom={4}
        maxZoom={12}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={geoJSONStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        fontSize: '0.9rem',
        maxWidth: '250px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Map Information</h4>
        <p style={{ margin: '5px 0', color: '#34495e' }}>
          <strong>Coordinates:</strong> 32.4279°N, 53.6880°E
        </p>
        <p style={{ margin: '5px 0', color: '#34495e' }}>
          Click on the country for more details
        </p>
      </div>
    </div>
  );
}
