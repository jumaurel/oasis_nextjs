import { z } from "zod";

export const createStructureSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  referentEmail: z.string().email("Veuillez entrer une adresse email valide"),
});

export type CreateStructureInput = z.infer<typeof createStructureSchema>;
