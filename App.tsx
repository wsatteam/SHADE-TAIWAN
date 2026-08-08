import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import SunCalc from 'suncalc';

export default function App() {
  const [location, setLocation] = useState(null as null | { latitude: number; longitude: number });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('需要定位權限以顯示地圖與周邊遮蔽資訊');
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      } catch (e) {
        setErrorMsg('無法取得位置資訊');
      }
    })();
  }, []);

  if (!location && !errorMsg) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
      <Text>取得定位中…</Text>
    </View>
  );

  if (errorMsg) return (
    <View style={styles.center}>
      <Text>{errorMsg}</Text>
    </View>
  );

  const now = new Date();
  const sunPos = SunCalc.getPosition(now, location!.latitude, location!.longitude);
  const altitudeDeg = (sunPos.altitude * 180) / Math.PI;
  const azimuthDeg = (sunPos.azimuth * 180) / Math.PI + 180; // convert to compass

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: location!.latitude,
          longitude: location!.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: location!.latitude, longitude: location!.longitude }}
          title="你的位置"
          description={`太陽方位: ${azimuthDeg.toFixed(0)}°, 高度: ${altitudeDeg.toFixed(1)}°`}
        />
      </MapView>
      <View style={styles.info}>
        <Text style={styles.title}>太陽資訊（即時）</Text>
        <Text>方位 (方位角): {azimuthDeg.toFixed(0)}°</Text>
        <Text>高度: {altitudeDeg.toFixed(1)}°</Text>
        <Text style={{ marginTop: 8 }}>建議：高度越低（早/晚）紫外線較低，正午時段注意防曬。</Text>
        <Button title="在 Google Maps 開啟導航" onPress={() => {/* open maps intent: implement later */}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  info: { padding: 12, backgroundColor: 'rgba(255,255,255,0.9)' },
  title: { fontWeight: 'bold', marginBottom: 4 }
});
