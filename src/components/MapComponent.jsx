import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

export default function MapComponent({ items }) {
  if (!items || items.length === 0) return null;

  const center = [
    items[0].latitude || items[0].Latitude,
    items[0].longitude || items[0].Longitude
  ];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-80 lg:h-full rounded shadow"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Marker
          key={item.toko_id}
          position={[item.latitude || item.Latitude, item.longitude || item.Longitude]}
        >
          <Popup>
            <strong>{item.title || item.Title}</strong><br />
            {item.jarak_km && `Jarak: ${item.jarak_km.toFixed(2)} km`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
