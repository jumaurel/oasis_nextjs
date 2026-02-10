import { z } from "zod";

export const demographicsSchema = z.object({
  age: z
    .number({ message: "Veuillez sélectionner votre tranche d'âge" })
    .int()
    .refine((v) => [20, 30, 40, 50, 60, 70].includes(v), {
      message: "Veuillez sélectionner votre tranche d'âge",
    }),
  genre: z.string().min(1, "Veuillez sélectionner un genre"),
  region: z.string().min(1, "Veuillez sélectionner votre région"),
  specialite: z.string().min(1, "Veuillez sélectionner votre spécialité"),
  typePratique: z
    .string()
    .min(1, "Veuillez sélectionner votre type de pratique"),
});

export type DemographicsInput = z.infer<typeof demographicsSchema>;

export const responseSchema = z.object({
  age: z
    .number()
    .int()
    .refine((v) => [20, 30, 40, 50, 60, 70].includes(v)),
  genre: z.string().min(1),
  region: z.string().min(1),
  specialite: z.string().min(1),
  typePratique: z.string().min(1),
  reponses: z.record(z.string(), z.unknown()),
});

export type ResponseInput = z.infer<typeof responseSchema>;
