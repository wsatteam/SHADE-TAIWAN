// src/services/uv.ts
// UV 指數與建議對應表與繪色輔助

export function uvCategory(uv: number) {
  if (uv < 3) return { level: '低', color: '#4CAF50', advice: '可以正常戶外活動，仍建議基礎防曬' };
  if (uv < 6) return { level: '中等', color: '#FFEB3B', advice: '建議戴帽子與塗防曬' };
  if (uv < 8) return { level: '高', color: '#FF9800', advice: '減少在戶外直曬的時間；使用防曬與遮蔽' };
  if (uv < 11) return { level: '很高', color: '#F44336', advice: '避免中午外出，穿著遮蔽且使用高係數防曬' };
  return { level: '危險', color: '#9C27B0', advice: '強烈避免長時間暴露，尋找室內遮蔽' };
}

export function uvToHeatmapWeight(uv: number) {
  // map UV index (0-12+) to heatmap weight (0-1)
  return Math.min(1, uv / 12);
}
