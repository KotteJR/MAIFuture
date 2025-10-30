'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

type LeafletMapProps = {
  center: [number, number];
  zoom?: number;
  className?: string;
};

export default function LeafletMap({ center, zoom = 4, className }: LeafletMapProps) {
  return (
    <MapContainer center={center} zoom={zoom} className={className} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
      {/* Light basemap with subtle blue accents */}
      <TileLayer
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
      />
      {/* Blue dot for Skopje */}
      <CircleMarker center={center} radius={3} pathOptions={{ color: '#1d4ed8', weight: 2, fillColor: '#0063FF', fillOpacity: 0.8 }}>
        <Popup>Skopje</Popup>
      </CircleMarker>
    </MapContainer>
  );
}


