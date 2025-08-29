import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

interface LeafletAddressPickerProps {
  onAddressSelect: (address: string, lat: number, lng: number) => void;
}

const ClickHandler: React.FC<
  LeafletAddressPickerProps & {
    setMarker: React.Dispatch<React.SetStateAction<[number, number]>>;
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

const getAddress = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en&countrycodes=th`
    );
    const data = await response.json();
    return data.display_name || `Lat: ${lat}, Lng: ${lng}`;
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return `Lat: ${lat}, Lng: ${lng}`;
  }
};

const AddressAutocomplete: React.FC<LeafletAddressPickerProps> = ({
  onAddressSelect,
}) => {
  const [marker, setMarker] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    13.7563, 100.5018,
  ])

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
  return (
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
  );
};

export default AddressAutocomplete;
