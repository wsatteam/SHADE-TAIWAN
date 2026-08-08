// src/services/cwb.ts
// 範例：從中央氣象局（CWB）取得紫外線資料的簡易 service。
// 注意：CWB Open Data 的實際 API endpoint 與參數可能不同，此處以常見模式示範。

export type CwbUvStation = {
  stationId: string;
  obsTime: string;
  uvIndex: number;
  lat: number;
  lon: number;
};

export async function fetchCwbUvNearby(lat: number, lon: number): Promise<CwbUvStation[]> {
  const apiKey = process.env.CWB_API_KEY || '';
  if (!apiKey) throw new Error('CWB_API_KEY is not set in environment');

  // 範例 endpoint（請根據官方文件調整）
  const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0005-001?Authorization=${apiKey}&format=JSON`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`CWB API error: ${res.status}`);
  const json = await res.json();

  // 以下為範例解析，依實際回傳格式修改
  const records = json.records?.UV1hrObs || [];

  // 只做簡單 map，實作時請改為更嚴謹的欄位檢查
  const stations: CwbUvStation[] = records.map((r: any) => ({
    stationId: r.stno || r.stationId || 'unknown',
    obsTime: r.obsTime || r.time || '',
    uvIndex: Number(r.UVI || r.uv || 0),
    lat: Number(r.lat || 0),
    lon: Number(r.lon || 0),
  }));

  // 可以在此加入以 distance 排序或過濾附近站點的邏輯
  return stations;
}
