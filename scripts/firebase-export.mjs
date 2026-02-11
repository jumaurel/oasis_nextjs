/**
 * Export Firestore → JSON files
 *
 * Exporte les collections Firestore en fichiers JSON dans migration/data/
 * Collections exportées : structures (+ sous-collection surveys), saved_surveys
 *
 * Usage: node scripts/firebase-export.mjs
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "..", "migration", "data");

const serviceAccount = JSON.parse(
  readFileSync(resolve(__dirname, "questio.json"), "utf-8")
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function writeJson(filename, data) {
  mkdirSync(DATA_DIR, { recursive: true });
  const path = resolve(DATA_DIR, filename);
  writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ ${filename} (${Array.isArray(data) ? data.length : Object.keys(data).length} entrées)`);
}

async function exportStructures() {
  const snapshot = await db.collection("structures").get();
  const structures = [];

  for (const doc of snapshot.docs) {
    const data = doc.data();

    // Récupérer les sous-collections surveys
    const surveysSnapshot = await doc.ref.collection("surveys").get();
    const surveys = surveysSnapshot.docs.map((surveyDoc) => ({
      firebaseId: surveyDoc.id,
      ...surveyDoc.data(),
    }));

    structures.push({
      firebaseId: doc.id,
      ...data,
      surveys,
    });
  }

  writeJson("structures.json", structures);
  return structures;
}

async function exportSavedSurveys() {
  const snapshot = await db.collection("saved_surveys").get();
  const savedSurveys = snapshot.docs.map((doc) => ({
    firebaseId: doc.id,
    ...doc.data(),
  }));

  writeJson("saved_surveys.json", savedSurveys);
  return savedSurveys;
}

async function main() {
  console.log("\n🔄 Export Firestore → JSON\n");

  const structures = await exportStructures();
  const savedSurveys = await exportSavedSurveys();

  // Résumé
  const totalSurveys = structures.reduce((acc, s) => acc + s.surveys.length, 0);
  console.log("\n📊 Résumé :");
  console.log(`   Structures : ${structures.length}`);
  console.log(`   Enquêtes   : ${totalSurveys}`);
  console.log(`   Réponses   : ${savedSurveys.length}`);
  console.log(`\n📁 Fichiers exportés dans : ${DATA_DIR}\n`);
}

main().catch(console.error);
