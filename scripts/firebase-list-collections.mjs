/**
 * Script de découverte : liste toutes les collections Firestore
 * et affiche un exemple de document pour chacune.
 *
 * Usage: node scripts/firebase-list-collections.mjs
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const serviceAccount = JSON.parse(
  readFileSync(resolve(__dirname, "questio.json"), "utf-8")
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function main() {
  // List top-level collections
  const collections = await db.listCollections();
  console.log(`\n=== ${collections.length} collection(s) trouvée(s) ===\n`);

  for (const col of collections) {
    const snapshot = await col.limit(1).get();
    const count = (await col.count().get()).data().count;
    console.log(`📁 ${col.id} (${count} documents)`);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      console.log(`   Exemple (id: ${doc.id}):`);
      console.log(`   ${JSON.stringify(doc.data(), null, 2).replaceAll("\n", "\n   ")}`);
    }
    console.log("");

    // Check sub-collections on the first document
    if (!snapshot.empty) {
      const subCollections = await snapshot.docs[0].ref.listCollections();
      for (const subCol of subCollections) {
        const subSnapshot = await subCol.limit(1).get();
        const subCount = (await subCol.count().get()).data().count;
        console.log(`   └─ 📁 ${col.id}/${snapshot.docs[0].id}/${subCol.id} (${subCount} documents dans ce doc)`);

        if (!subSnapshot.empty) {
          const subDoc = subSnapshot.docs[0];
          console.log(`      Exemple (id: ${subDoc.id}):`);
          console.log(`      ${JSON.stringify(subDoc.data(), null, 2).replaceAll("\n", "\n      ")}`);
        }
        console.log("");
      }
    }
  }
}

main().catch(console.error);
