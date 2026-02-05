import { z } from "zod";

export const surveyTypes = ["AIRE", "MOTS", "AIRE_ET_MOTS"] as const;

export const createCampaignSchema = z
  .object({
    name: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(100, "Le nom ne peut pas dépasser 100 caractères"),
    structureId: z.string().min(1, "Veuillez sélectionner une structure"),
    startDate: z.string().min(1, "Veuillez sélectionner une date de démarrage"),
    expirationDate: z
      .string()
      .min(1, "Veuillez sélectionner une date d'expiration"),
    maxResponses: z
      .number()
      .int()
      .positive("Le nombre doit être positif")
      .optional()
      .nullable(),
    surveyType: z.enum(surveyTypes, {
      message: "Veuillez sélectionner un type de questionnaire",
    }),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.expirationDate);
      return end > start;
    },
    {
      message: "La date d'expiration doit être après la date de démarrage",
      path: ["expirationDate"],
    },
  );

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
