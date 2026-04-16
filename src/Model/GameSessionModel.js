/*
  GameSessionModel.js

  Vad Alex har gjort:
  - Skapat en modell för aktiva spelsessioner mellan webben och Raspberry Pi.
  - Lagt till realtidslyssnare med onSnapshot() så webben uppdateras direkt när Pi skriver resultat.
  - Förberett ett tydligt dataflöde med status: pending → running → finished.
  - Separerat session-hantering från resultat-hantering för renare struktur.

  Varför:
  - Vi behöver ett tydligt mellanlager mellan hemsidan och spelet på Raspberry Pi.
  - Firebase Firestore med onSnapshot() fungerar som gemensam realtidskommunikation.
  - Presentern ska bara anropa dessa funktioner och aldrig prata direkt med Firebase.

  Dataflöde:
  1. Webben anropar startGameSession() → skriver till gameSessions/{uid}
  2. Pi lyssnar på gameSessions/{uid} och ser status "pending"
  3. Pi kör spelet och skriver resultat till gameResults/{uid}
  4. Webben lyssnar med listenToGameResult() och uppdateras automatiskt
  5. Webben anropar finishGameSession() för att markera sessionen som klar
*/

import { db } from "../firebase/firebase.js";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

// Startar en ny spelsession när användaren väljer en level på webben.
// Pi lyssnar på detta dokument och börjar köra spelet när status är "pending".
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

// Hämtar en aktiv spelsession en gång (inte i realtid).
// Används till exempel för att kontrollera om det redan finns en pågående session.
export async function getGameSession(uid) {
  const sessionRef = doc(db, "gameSessions", uid);
  const snapshot = await getDoc(sessionRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}

// Markerar en session som avslutad och sparar resultatet.
// Anropas antingen från webben eller av Pi via sitt Python-script.
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

// Lyssnar i realtid på spelsessionen.
// Triggas automatiskt varje gång Pi uppdaterar status eller skriver nytt resultat.
// Returnerar en unsubscribe-funktion som ska anropas när komponenten unmountas.
export function listenToGameSession(uid, callbackACB) {
  const sessionRef = doc(db, "gameSessions", uid);

  const unsubscribe = onSnapshot(sessionRef, function onSessionUpdateACB(snapshot) {
    if (snapshot.exists()) {
      callbackACB(snapshot.data());
    }
  });

  return unsubscribe;
}

// Lyssnar i realtid på spelresultat från Pi.
// Triggas automatiskt när Pi skriver tillbaka score, stars och success till Firebase.
// Returnerar en unsubscribe-funktion som ska anropas när komponenten unmountas.
export function listenToGameResult(uid, callbackACB) {
  const resultRef = doc(db, "gameResults", uid);

  const unsubscribe = onSnapshot(resultRef, function onResultUpdateACB(snapshot) {
    if (snapshot.exists()) {
      callbackACB(snapshot.data());
    }
  });

  return unsubscribe;
}