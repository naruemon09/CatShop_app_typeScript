import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

interface LeafletAddressPickerProps {
  onAddressSelect: (address: string, lat: number, lng: number) => void;
}

const getAddress = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=th&countrycodes=th`
    );
    const data = await response.json();
    return data.display_name || `Lat: ${lat}, Lng: ${lng}`;
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return `Lat: ${lat}, Lng: ${lng}`;
  }
};

const ClickHandler: React.FC<
  LeafletAddressPickerProps & {
    setMarker: React.Dispatch<React.SetStateAction<[number, number] | null>>;
  }
> = ({ onAddressSelect, setMarker }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setMarker([lat, lng]);
      const address = await getAddress(lat, lng);
      onAddressSelect(address, lat, lng);
    },
  });
  return null;
};

const AddressAutocomplete: React.FC<LeafletAddressPickerProps> = ({
  onAddressSelect,
}) => {
  const [marker, setMarker] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    13.7563, 100.5018,
  ]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setMarker([lat, lng]);
        setMapCenter([lat, lng]);

        const address = await getAddress(lat, lng);
        onAddressSelect(address, lat, lng);
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        onAddressSelect("Bangkok, Thailand", 13.7563, 100.5018);
        setMarker([13.7563, 100.5018]);
      }
    );
  }, []);

  // search function
  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}&accept-language=th&countrycodes=th`
      );
      const data = await res.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = async (place: any) => {
    const lat = parseFloat(place.lat);
    const lng = parseFloat(place.lon);
    setMarker([lat, lng]);
    setMapCenter([lat, lng]);
    setQuery(place.display_name);
    setSuggestions([]);

    onAddressSelect(place.display_name, lat, lng);
  };

  return (
    <div>
      {/* Search Input */}
      <div style={{ marginBottom: "8px", position: "relative" }}>
        <input
          type="text"
          placeholder="ค้นหาสถานที่..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="form-control"
        />
        {suggestions.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "8px",
              border: "1px solid #ccc",
              position: "absolute",
              width: "100%",
              background: "white",
              zIndex: 1000,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {suggestions.map((place) => (
              <li
                key={place.place_id}
                onClick={() => handleSelect(place)}
                style={{ padding: "4px", cursor: "pointer" }}
              >
                {place.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {marker && <Marker position={marker} />}
        <ClickHandler onAddressSelect={onAddressSelect} setMarker={setMarker} />
      </MapContainer>
    </div>
  );
};

export default AddressAutocomplete;
