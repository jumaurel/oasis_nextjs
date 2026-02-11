/**
 * Import JSON exporté de Firestore → PostgreSQL via Prisma
 *
 * Lit les fichiers migration/data/structures.json et migration/data/saved_surveys.json
 * et insère les données dans la base PostgreSQL.
 *
 * Les réponses orphelines (structure ou enquête supprimée) sont ignorées.
 *
 * Usage: node scripts/firebase-import.mjs
 *        node scripts/firebase-import.mjs --dry-run   (pour voir sans écrire)
 */

import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, "..", "migration", "data");
const DRY_RUN = process.argv.includes("--dry-run");

const prisma = new PrismaClient();

// ── Helpers ──────────────────────────────────────────────────

/** Map Firebase survey type string → Prisma enum */
function mapSurveyType(firebaseType) {
  const map = {
    "AIRE": "AIRE",
    "MOTS": "MOTS",
    "AIRE+MOTS": "AIRE_ET_MOTS",
  };
  return map[firebaseType] || "AIRE_ET_MOTS";
}

/** Map Firebase status string → Prisma enum */
function mapStatus(firebaseStatus) {
  const map = {
    "En cours": "EN_COURS",
    "Fermée": "FERMEE",
    "Expirée": "EXPIREE",
  };
  return map[firebaseStatus] || "EN_COURS";
}

/**
 * Parse saved_survey Date field ("09/2024" or "MM/YYYY") → Date object
 * Falls back to current date if unparseable.
 */
function parseDatePassation(dateStr) {
  if (!dateStr) return new Date();

  // Format "MM/YYYY"
  const match = dateStr.match(/^(\d{1,2})\/(\d{4})$/);
  if (match) {
    return new Date(parseInt(match[2]), parseInt(match[1]) - 1, 1);
  }

  // Try ISO
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

/**
 * Parse age string → integer.
 * Firebase stores "30", "40" etc. as strings.
 */
function parseAge(ageStr) {
  const n = parseInt(ageStr, 10);
  return isNaN(n) ? 0 : n;
}

// ── Main ─────────────────────────────────────────────────────

async function main() {
  if (DRY_RUN) {
    console.log("🏜️  Mode DRY RUN — aucune écriture en base\n");
  }

  const structuresData = JSON.parse(
    readFileSync(resolve(DATA_DIR, "structures.json"), "utf-8")
  );
  const savedSurveysData = JSON.parse(
    readFileSync(resolve(DATA_DIR, "saved_surveys.json"), "utf-8")
  );

  // Maps: firebaseId → prisma id (for linking)
  const structureIdMap = new Map(); // firebase structure id → prisma id
  const structureNameMap = new Map(); // firebase structure name → prisma id
  const surveyIdMap = new Map(); // firebase survey id → prisma id

  // ── 1. Import structures ──────────────────────────────────

  console.log("📦 Import des structures...");
  let structureCount = 0;

  for (const s of structuresData) {
    const data = {
      name: s.structureName,
      referentEmail: s.email || "",
    };

    if (DRY_RUN) {
      console.log(`   [DRY] Structure: ${data.name} (${s.firebaseId})`);
      // Simulate IDs for dry run
      structureIdMap.set(s.firebaseId, `dry_${s.firebaseId}`);
      structureNameMap.set(s.structureName, `dry_${s.firebaseId}`);
    } else {
      const created = await prisma.structure.create({ data });
      structureIdMap.set(s.firebaseId, created.id);
      structureNameMap.set(s.structureName, created.id);
    }
    structureCount++;
  }
  console.log(`   ✅ ${structureCount} structures\n`);

  // ── 2. Import surveys ─────────────────────────────────────

  console.log("📋 Import des enquêtes...");
  let surveyCount = 0;

  for (const s of structuresData) {
    const prismaStructureId = structureIdMap.get(s.firebaseId);

    for (const sv of s.surveys) {
      const data = {
        name: sv.name || "Enquête sans nom",
        startDate: new Date(sv.startDate),
        expirationDate: new Date(sv.expirationDate),
        maxResponses: sv.maxResponse ? parseInt(sv.maxResponse, 10) : null,
        status: mapStatus(sv.status),
        surveyType: mapSurveyType(sv.survey),
        viewCount: sv.openedCount || 0,
        startedCount: sv.openedSurveyCount || 0,
        structureId: prismaStructureId,
      };

      if (DRY_RUN) {
        console.log(`   [DRY] Enquête: ${data.name} (${sv.firebaseId}) → type=${data.surveyType}, status=${data.status}`);
        surveyIdMap.set(sv.firebaseId, `dry_${sv.firebaseId}`);
      } else {
        const created = await prisma.survey.create({ data });
        surveyIdMap.set(sv.firebaseId, created.id);
      }
      surveyCount++;
    }
  }
  console.log(`   ✅ ${surveyCount} enquêtes\n`);

  // ── 3. Import saved surveys (responses) ────────────────────

  console.log("💾 Import des réponses...");
  let importedCount = 0;
  let skippedCount = 0;

  for (const ss of savedSurveysData) {
    const enqueteId = ss["Enquête"];
    const structureName = ss["Structure"];

    // Skip orphaned records
    const prismaSurveyId = enqueteId ? surveyIdMap.get(enqueteId) : null;
    const prismaStructureId = structureNameMap.get(structureName);

    if (!prismaSurveyId || !prismaStructureId) {
      skippedCount++;
      continue;
    }

    const data = {
      age: parseAge(ss["Age"]),
      genre: ss["Genre"] || "",
      region: ss["Région"] || "",
      specialite: ss["Spécialité"] || "",
      typePratique: ss["ModalitéPratique"] || "",
      datePassation: parseDatePassation(ss["Date"]),
      reponses: ss["Données"] || {},
      structureId: prismaStructureId,
      surveyId: prismaSurveyId,
    };

    if (DRY_RUN) {
      console.log(`   [DRY] Réponse: age=${data.age}, genre=${data.genre}, structure=${structureName}, enquête=${enqueteId}`);
    } else {
      await prisma.savedSurvey.create({ data });
    }
    importedCount++;
  }
  console.log(`   ✅ ${importedCount} réponses importées`);
  console.log(`   ⏭️  ${skippedCount} réponses ignorées (orphelines)\n`);

  // ── Résumé ─────────────────────────────────────────────────

  console.log("═══════════════════════════════════════");
  console.log("📊 Résumé de l'import :");
  console.log(`   Structures : ${structureCount}`);
  console.log(`   Enquêtes   : ${surveyCount}`);
  console.log(`   Réponses   : ${importedCount} importées, ${skippedCount} ignorées`);
  if (DRY_RUN) {
    console.log("\n   ℹ️  Aucune donnée écrite (mode dry-run)");
  }
  console.log("═══════════════════════════════════════\n");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
