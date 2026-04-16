/*
  ProgressModel.js

  - Skapat en modell för att spara och hämta spelarens progression.
  - Lagt progress under användaren så att varje spelare får sin egen sparade data.
  - Förberett för features som completed levels, stars, best score och senaste spelade bana.

  - All logik för sparad progress ska ligga i Model, inte i Presenter eller View.
  - Den här filen blir senare länken mellan webbsidan och spelets resultat från Raspberry Pi.
*/

import { db } from "../firebase/firebase.js";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";

export async function saveLevelProgress(uid, levelId, progressData) {
  const progressRef = doc(db, "users", uid, "progress", levelId);

  await setDoc(
    progressRef,
    {
      ...progressData,
      updatedAt: new Date().toISOString()
    },
    { merge: true }
  );
}

export async function getLevelProgress(uid, levelId) {
  const progressRef = doc(db, "users", uid, "progress", levelId);
  const snapshot = await getDoc(progressRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export async function getAllProgress(uid) {
  const progressCollectionRef = collection(db, "users", uid, "progress");
  const snapshot = await getDocs(progressCollectionRef);

  return snapshot.docs.map(function mapDoc(docSnap) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  });
}

export async function saveCurrentLevel(uid, levelId) {
  const userRef = doc(db, "users", uid);

  await setDoc(
    userRef,
    {
      currentLevel: levelId,
      updatedAt: new Date().toISOString()
    },
    { merge: true }
  );
}