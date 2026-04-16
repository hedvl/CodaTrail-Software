/*
  GameSessionModel.js

  - Skapat en första modell för aktiva spelsessioner.
  - Förberett ett dataflöde där webben väljer level och Raspberry Pi läser sessionen.
  - Gjort plats för att spara status som pending, running och finished.

  - Vi behöver ett tydligt mellanlager mellan hemsidan och spelet på Raspberry Pi.
  - Firebase kan fungera som gemensam kommunikationsyta mellan webben och spelet.
*/

import { db } from "../firebase/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function startGameSession(uid, levelId, deviceId = "pi-1") {
  const sessionRef = doc(db, "gameSessions", uid);

  await setDoc(
    sessionRef,
    {
      selectedLevel: levelId,
      deviceId: deviceId,
      status: "pending",
      startedAt: new Date().toISOString()
    },
    { merge: true }
  );
}

export async function getGameSession(uid) {
  const sessionRef = doc(db, "gameSessions", uid);
  const snapshot = await getDoc(sessionRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

export async function finishGameSession(uid, resultData) {
  const sessionRef = doc(db, "gameSessions", uid);

  await setDoc(
    sessionRef,
    {
      status: "finished",
      result: resultData,
      finishedAt: new Date().toISOString()
    },
    { merge: true }
  );
}