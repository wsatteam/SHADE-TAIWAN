// functions/src/index.ts
// Firebase Cloud Function 範例：接收使用者上報（位置與圖片），儲存到 Firestore + Storage

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();
const bucket = admin.storage().bucket();

export const submitReport = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    // 範例預期 body: { lat, lon, description, imageBase64 }
    const { lat, lon, description, imageBase64 } = req.body || {};
    if (typeof lat !== 'number' || typeof lon !== 'number') {
      return res.status(400).json({ error: 'Invalid lat/lon' });
    }

    const created = new Date().toISOString();

    const reportRef = await db.collection('reports').add({ lat, lon, description: description || '', created });

    if (imageBase64) {
      // store image to storage
      const buffer = Buffer.from(imageBase64, 'base64');
      const file = bucket.file(`reports/${reportRef.id}.jpg`);
      await file.save(buffer, { contentType: 'image/jpeg' });
      await reportRef.update({ imagePath: file.name });
    }

    return res.status(200).json({ ok: true, id: reportRef.id });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});
