import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useRef } from "react";

// Fix icon di React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Komponen kecil buat handle zoom ke marker
function MapFocus({ lat, lon }) {
  const map = useMap();
  if (lat && lon) {
    map.setView([lat, lon], 16, { animate: true });
  }
  return null;
}

export default function RecommendationList({ items }) {
  const [selectedId, setSelectedId] = useState(null);

  const center = items.length > 0
    ? [items[0].latitude || items[0].Latitude, items[0].longitude || items[0].Longitude]
    : [-7.7956, 110.3695];

  const selectedItem = items.find(i => i.toko_id === selectedId);
  const selectedLat = selectedItem?.latitude || selectedItem?.Latitude;
  const selectedLon = selectedItem?.longitude || selectedItem?.Longitude;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* List sebelah kiri */}
      <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
        {items.map((item) => {
          const isSelected = item.toko_id === selectedId;
          return (
            <div
              key={item.toko_id}
              onClick={() => setSelectedId(item.toko_id)}
              className={`border p-4 rounded shadow cursor-pointer transition ${
                isSelected ? "bg-blue-50 border-blue-400" : ""
              }`}
            >
              <h2 className="text-xl font-bold">{item.Title || item.title}</h2>
              <div className="text-sm text-gray-700 space-y-1 mt-1">
                {Object.entries(item).map(([key, value]) => {
                  const hiddenKeys = [
                    'title', 'Title',
                    'similarity_score', 'skor', 'jarak_km',
                    'Page_URL', 'page_url',
                    'toko_id', 'type', 'jenis',
                    'Latitude', 'Longitude', 'latitude', 'longitude'
                  ];
                  if (hiddenKeys.includes(key)) return null;
                  if (key.toLowerCase().includes('phone') && (value === null || isNaN(value))) return null;
                  return (
                    <p key={key}>
                      <span className="font-semibold">{key}:</span> {value}
                    </p>
                  );
                })}
              </div>
              <div className="text-sm text-gray-800 mt-3 space-y-1">
                {item.jarak_km && <p>📍 Jarak: {item.jarak_km.toFixed(2)} km</p>}
                {item.similarity_score && <p>🔍 Similarity: {item.similarity_score.toFixed(3)}</p>}
                {item.skor && <p>🔥 Skor: {item.skor.toFixed(4)}</p>}
                {(item.Page_URL || item.page_url) && (
                  <a
                    href={item.Page_URL || item.page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline block"
                  >
                    🌐 Lihat di Google Maps
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Map sebelah kanan */}
      <div className="h-[80vh]">
        <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {selectedLat && selectedLon && (
            <MapFocus lat={selectedLat} lon={selectedLon} />
          )}
          {items.map((item) => {
            const lat = item.latitude || item.Latitude;
            const lon = item.longitude || item.Longitude;
            if (!lat || !lon) return null;

            const isSelected = item.toko_id === selectedId;
            return (
              <Marker key={item.toko_id} position={[lat, lon]}>
                <Popup>
                  <strong>{item.Title || item.title}</strong>
                  <br />
                  {item.jarak_km && `Jarak: ${item.jarak_km.toFixed(2)} km`}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
