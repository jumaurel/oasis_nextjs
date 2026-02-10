import * as XLSX from "xlsx";

interface ExportResponse {
  datePassation: string;
  age: number;
  genre: string;
  region: string;
  specialite: string;
  typePratique: string;
  reponses: Record<string, unknown>;
}

interface ExportData {
  surveyName: string;
  structureName: string;
  responses: ExportResponse[];
}

const dimensionLabels: Record<string, string> = {
  D1: "D1_Ma santé",
  D2: "D2_Santé perçue",
  D3: "D3_Avenir professionnel",
  D4: "D4_Se préserver",
  D5: "D5_Pression temporelle",
  D6: "D6_Equilibre émotionnel",
  D7: "D7_Gestion des RDV",
  D8: "D8_Activité clinique",
  D9: "D9_Activité administrative",
  D10: "D10_Formation professionnelle",
  D11: "D11_Tensions professionnelles",
  D12: "D12_Gestion des conflits",
  D13: "D13_Collaboration",
  D14: "D14_Conflits de valeurs",
  D15: "D15_Soutien social",
  D16: "D16_Qualité de vie",
};

// Clés potentiellement absentes selon le type de pratique (salarié vs libéral)
const optionalKeys = ["D1_2", "D8_4", "D15_5", "D13_7", "D13_8"];

export async function extractSurveyData(surveyId: string) {
  const response = await fetch(`/api/surveys/${surveyId}/export`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erreur lors de l'export");
  }

  const exportData: ExportData = await response.json();

  if (exportData.responses.length === 0) {
    throw new Error("Aucune réponse à exporter pour cette enquête");
  }

  // Flatten each response: demographics + individual réponses keys
  const data = exportData.responses.map((item) => {
    const flattenedData: Record<string, unknown> = {};

    // Add demographics
    flattenedData["Structure"] = exportData.structureName;
    flattenedData["Enquête"] = exportData.surveyName;
    flattenedData["Date"] = new Date(item.datePassation).toLocaleDateString(
      "fr-FR",
    );
    flattenedData["ModalitéPratique"] = item.typePratique;
    flattenedData["Age"] = item.age;
    flattenedData["Genre"] = item.genre;
    flattenedData["Région"] = item.region;
    flattenedData["Spécialité"] = item.specialite;

    // Flatten reponses
    const reponses = item.reponses as Record<string, unknown>;
    for (const key in reponses) {
      if (typeof reponses[key] === "object" && reponses[key] !== null) {
        Object.assign(flattenedData, reponses[key]);
      } else {
        flattenedData[key] = reponses[key];
      }
    }

    // Add missing optional keys
    optionalKeys.forEach((key) => {
      if (!(key in flattenedData)) {
        flattenedData[key] = "";
      }
    });

    return flattenedData;
  });

  // Order and rename columns
  const orderedData = data.map((item) => {
    const firstKeys = [
      "Structure",
      "Enquête",
      "Date",
      "ModalitéPratique",
      "Age",
      "Genre",
      "Région",
      "Spécialité",
    ];

    const otherKeys = Object.keys(item)
      .filter((key) => !firstKeys.includes(key))
      .sort((a, b) => {
        const [aMain, aSub] = a
          .split("_")
          .map((part, index) => (index === 1 ? parseInt(part, 10) : part));
        const [bMain, bSub] = b
          .split("_")
          .map((part, index) => (index === 1 ? parseInt(part, 10) : part));

        if (aMain !== bMain) {
          return String(aMain).localeCompare(String(bMain), undefined, {
            numeric: true,
          });
        }

        const aSubNum = isNaN(aSub as number) ? 0 : (aSub as number);
        const bSubNum = isNaN(bSub as number) ? 0 : (bSub as number);

        return aSubNum - bSubNum;
      });

    const orderedKeys = [...firstKeys, ...otherKeys];
    return orderedKeys.reduce(
      (obj: Record<string, unknown>, key) => {
        const newKey = key.replace(
          /(D\d+)/,
          (match) => dimensionLabels[match] || match,
        );

        // Convert to number if possible
        const potentialNumber = Number(item[key]);
        obj[newKey] = !isNaN(potentialNumber) ? potentialNumber : item[key];
        return obj;
      },
      {} as Record<string, unknown>,
    );
  });

  // Generate Excel file
  const ws = XLSX.utils.json_to_sheet(orderedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Format filename with date and survey name
  const now = new Date();
  const formattedDateTime =
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0") +
    "_" +
    now.getHours().toString().padStart(2, "0") +
    now.getMinutes().toString().padStart(2, "0");

  const fileName = `${formattedDateTime}_${exportData.surveyName}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
