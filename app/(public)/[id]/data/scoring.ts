// Max score par dimension selon le type de pratique
export const Q_salarie_MaxScore: Record<string, number> = {
  AIRE: 10,
  D1: 30,
  D2: 35,
  D3: 20,
  D4: 40,
  D5: 35,
  D6: 25,
  D7: 10,
  D8: 25,
  D9: 15,
  D10: 15,
  D11: 25,
  D12: 15,
  D13: 25,
  D14: 20,
  D15: 25,
  D16: 15,
};

export const Q_liberal_MaxScore: Record<string, number> = {
  AIRE: 10,
  D1: 30,
  D2: 35,
  D3: 20,
  D4: 40,
  D5: 40,
  D6: 25,
  D7: 20,
  D8: 20,
  D9: 25,
  D10: 15,
  D11: 25,
  D12: 15,
  D13: 35,
  D14: 20,
  D15: 20,
  D16: 15,
};

export type StetauscopeDataItem = {
  subject: string;
  Score: number;
  Seuil_bas: number;
  Seuil_moyen: number;
  Seuil_haut: number;
  fullMark: number;
};

export type AIREDataItem = {
  subject: string;
  Score: number;
  fullMark: number;
};

export const initialStetauscopeData: StetauscopeDataItem[] = [
  {
    subject: "Ma santé",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Santé perçue",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Avenir pro.",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Se préserver",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Pression temp.",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Equilibre émo.",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Gestion des RDV",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Activité clinique",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Act. administrative",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Formation pro.",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Gestion des conflits",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Tensions pro.",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Coopération",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Conflits valeurs",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Soutien social",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
  {
    subject: "Qualité de vie",
    Score: 0,
    Seuil_bas: 25,
    Seuil_moyen: 50,
    Seuil_haut: 75,
    fullMark: 5,
  },
];

export const initialAIREData: AIREDataItem[] = [
  { subject: "Attentes", Score: 0, fullMark: 5 },
  { subject: "Efficacité", Score: 0, fullMark: 5 },
  { subject: "Renforcements", Score: 0, fullMark: 5 },
  { subject: "Investissement", Score: 0, fullMark: 5 },
];

// Mapping dimension → label du graphe Stet'Auscope
export const dimensionToLabel: Record<string, string> = {
  D1: "Ma santé",
  D2: "Santé perçue",
  D3: "Avenir pro.",
  D4: "Se préserver",
  D5: "Pression temp.",
  D6: "Equilibre émo.",
  D7: "Gestion des RDV",
  D8: "Activité clinique",
  D9: "Act. administrative",
  D10: "Formation pro.",
  D11: "Gestion des conflits",
  D12: "Tensions pro.",
  D13: "Coopération",
  D14: "Conflits valeurs",
  D15: "Soutien social",
  D16: "Qualité de vie",
};

/**
 * Regroupe les réponses par dimension (D1, D2…) et calcule un score en %
 * par rapport au max de chaque dimension.
 */
export function regroupValuesInDomain(
  responses: Record<string, unknown>,
  typePratique: string,
): Record<string, number> {
  const domainValues: Record<string, number> = {};

  for (const [key, value] of Object.entries(responses)) {
    // Extraire la dimension (ex: D1, D2, AIRE…)
    const dimension = key.split("_")[0];
    if (!domainValues[dimension]) {
      domainValues[dimension] = 0;
    }
    const numericValue = Number(value);
    if (!isNaN(numericValue) && numericValue !== -1) {
      domainValues[dimension] += numericValue;
    }
  }

  const maxScore =
    typePratique === "liberal" ? Q_liberal_MaxScore : Q_salarie_MaxScore;

  for (const [key, value] of Object.entries(domainValues)) {
    if (maxScore[key]) {
      domainValues[key] = Math.round((value / maxScore[key]) * 100);
    }
  }

  return domainValues;
}

/**
 * Calcule les données du radar Stet'Auscope à partir des domainValues
 */
export function computeStetauscopeData(
  domainValues: Record<string, number>,
): StetauscopeDataItem[] {
  return initialStetauscopeData.map((item) => {
    const dimension = Object.entries(dimensionToLabel).find(
      ([, label]) => label === item.subject,
    );
    if (dimension && domainValues[dimension[0]] !== undefined) {
      return { ...item, Score: domainValues[dimension[0]] };
    }
    return item;
  });
}

/**
 * Calcule les données du radar AIRE à partir des réponses brutes
 */
export function computeAIREData(
  responses: Record<string, unknown>,
): AIREDataItem[] {
  const subjects = [
    "AIRE_Attentes",
    "AIRE_Efficacité",
    "AIRE_Renforcements",
    "AIRE_Investissement",
  ];

  const data: AIREDataItem[] = [];
  for (const subject of subjects) {
    if (subject in responses) {
      data.push({
        subject: subject.substring(5), // Enlever "AIRE_"
        Score: Number(responses[subject]),
        fullMark: 9,
      });
    }
  }

  return data.length > 0 ? data : initialAIREData;
}

/**
 * Retourne la couleur d'un point du radar Stet'Auscope en fonction de sa valeur
 */
export function getStetauscopeDotColor(
  value: number,
  index: string,
  isAddiction: boolean,
): string {
  if (index === "Santé perçue" && isAddiction) return "#e41a1c";
  if (value <= 15) return "#039625";
  if (value <= 30) return "#0edd3e";
  if (value <= 45) return "#d1db09";
  if (value <= 65) return "#db8711";
  return "#e41a1c";
}
