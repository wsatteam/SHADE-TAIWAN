// src/components/OpenInMaps.tsx
import { Linking, Platform } from 'react-native';

export function openInGoogleMaps(lat: number, lon: number, label?: string) {
  const destination = `${lat},${lon}`;
  // Use Google Maps URL for directions (works on web & mobile)
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}${label ? `&destination_place_id=${encodeURIComponent(label)}` : ''}`;
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      // fallback to geo: (Android) or apple maps (iOS)
      const geoUrl = Platform.OS === 'ios' ? `maps:0,0?q=${encodeURIComponent(destination)}` : `geo:${destination}`;
      Linking.openURL(geoUrl).catch(() => {
        console.warn('無法開啟地圖應用');
      });
    }
  });
}
