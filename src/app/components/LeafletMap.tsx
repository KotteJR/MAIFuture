'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

type LeafletMapProps = {
  center: [number, number];
  zoom?: number;
  className?: string;
};

export default function LeafletMapComponent({ center, zoom = 4, className }: LeafletMapProps) {
  return (
    <MapContainer {...({ center, zoom, className, scrollWheelZoom: true, style: { width: '100%', height: '100%' } } as any)}>
      {/* Light basemap with subtle blue accents */}
      <TileLayer
        {...({
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
        } as any)}
      />
      {/* Blue dot for Skopje */}
      <CircleMarker
        {...({
          center,
          radius: 3,
          pathOptions: { color: '#1d4ed8', weight: 2, fillColor: '#0063FF', fillOpacity: 0.8 },
        } as any)}
      >
        <Popup>Skopje</Popup>
      </CircleMarker>
    </MapContainer>
  );
}


