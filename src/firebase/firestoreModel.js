/*
  firebaseModel.js

  Vad den här filen ska göra:
  - Vara ett gemensamt databaslager för Firestore.
  - Innehålla funktioner som läser och skriver appens data.

  Tanken:
  - Presenter -> Model -> firebaseModel -> Firestore
*/

import { db } from "./firebase.js";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

/*
  USER DATA
  Funktioner för användarprofil och grunddata.
*/

export async function getUserDocument(uid) {
  // TODO: hämta users/{uid}
}

export async function saveUserDocument(uid, userData) {
  // TODO: spara eller uppdatera users/{uid}
}

/*
  PROGRESS
  Funktioner för sparad progress per level.
*/

export async function getLevelProgress(uid, levelId) {
  // TODO: hämta users/{uid}/progress/{levelId}
}

export async function saveLevelProgress(uid, levelId, progressData) {
  // TODO: spara users/{uid}/progress/{levelId}
}

export async function getAllProgress(uid) {
  // TODO: hämta all progress för en användare
}

/*
  LEVELS
  Funktioner för att läsa leveldata från databasen.
*/

export async function getAllLevels() {
  // TODO: hämta alla levels från levels collection
}

export async function getLevelById(levelId) {
  // TODO: hämta en specifik level från levels/{levelId}
}

/*
  GAME SESSIONS
  Funktioner för att skapa och läsa en aktiv session mellan hemsidan och Raspberry Pi.
*/

export async function createGameSession(uid, levelId, deviceId) {
  // TODO: skapa eller uppdatera gameSessions/{uid}
}

export async function getGameSession(uid) {
  // TODO: hämta gameSessions/{uid}
}

export async function updateGameSession(uid, sessionData) {
  // TODO: uppdatera status/resultat för gameSessions/{uid}
}

/*
  GAME RESULTS
  Funktioner för att spara resultat från en spelomgång.
*/

export async function saveGameResult(uid, resultData) {
  // TODO: spara resultat i exempelvis gameResults/{uid}
}

export async function getLatestGameResult(uid) {
  // TODO: hämta senaste resultatet för användaren
}