"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@/components/ui/dialog";
import {
  createSurveySchema,
  surveyTypes,
  type CreateSurveyInput,
} from "@/lib/validations/survey";

interface Structure {
  id: string;
  name: string;
}

interface CreateSurveyDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const surveyTypeLabels: Record<(typeof surveyTypes)[number], string> = {
  AIRE: "AIRE",
  MOTS: "MOTS",
  AIRE_ET_MOTS: "AIRE & MOTS",
};

export function CreateSurveyDialog({
  open,
  onClose,
  onSuccess,
}: CreateSurveyDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [structures, setStructures] = useState<Structure[]>([]);
  const [isLoadingStructures, setIsLoadingStructures] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSurveyInput>({
    resolver: zodResolver(createSurveySchema),
    defaultValues: {
      maxResponses: null,
    },
  });

  useEffect(() => {
    if (open) {
      fetchStructures();
    }
  }, [open]);

  const fetchStructures = async () => {
    setIsLoadingStructures(true);
    try {
      const response = await fetch("/api/structures");
      if (response.ok) {
        const data = await response.json();
        setStructures(data);
      }
    } catch (error) {
      console.error("Error fetching structures:", error);
    } finally {
      setIsLoadingStructures(false);
    }
  };

  const onSubmit = async (data: CreateSurveyInput) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch("/api/surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          maxResponses: data.maxResponses || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création");
      }

      reset();
      onSuccess();
      onClose();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setServerError("");
    onClose();
  };

  // Date par défaut : aujourd'hui
  const today = new Date().toISOString().split("T")[0];
  // Date par défaut expiration : dans 30 jours
  const defaultExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return (
    <Dialog open={open} onClose={handleClose} title="Nouvelle enquête">
      {serverError && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-accent-red">
          {serverError}
        </div>
      )}

      {structures.length === 0 && !isLoadingStructures ? (
        <div className="rounded-lg bg-accent-orange-light border border-amber-300 p-4 text-sm text-amber-800">
          Vous devez d&apos;abord créer une structure avant de pouvoir créer une
          enquête.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="structureId"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Structure
            </label>
            <select
              id="structureId"
              {...register("structureId")}
              className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
              disabled={isLoadingStructures}
            >
              <option value="">
                {isLoadingStructures
                  ? "Chargement..."
                  : "Sélectionner une structure"}
              </option>
              {structures.map((structure) => (
                <option key={structure.id} value={structure.id}>
                  {structure.name}
                </option>
              ))}
            </select>
            {errors.structureId && (
              <p className="mt-1 text-sm text-accent-red">
                {errors.structureId.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Nom de l&apos;enquête
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
              placeholder="Ex: Enquête du 16/09/2024"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-accent-red">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="surveyType"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Type de questionnaire
            </label>
            <select
              id="surveyType"
              {...register("surveyType")}
              className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
            >
              <option value="">Sélectionner un type</option>
              {surveyTypes.map((type) => (
                <option key={type} value={type}>
                  {surveyTypeLabels[type]}
                </option>
              ))}
            </select>
            {errors.surveyType && (
              <p className="mt-1 text-sm text-accent-red">
                {errors.surveyType.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="startDate"
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Date de démarrage
              </label>
              <input
                type="date"
                id="startDate"
                {...register("startDate")}
                defaultValue={today}
                className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-accent-red">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="expirationDate"
                className="mb-1 block text-sm font-medium text-foreground"
              >
                Date d&apos;expiration
              </label>
              <input
                type="date"
                id="expirationDate"
                {...register("expirationDate")}
                defaultValue={defaultExpiration}
                className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
              />
              {errors.expirationDate && (
                <p className="mt-1 text-sm text-accent-red">
                  {errors.expirationDate.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="maxResponses"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Nombre maximum de réponses{" "}
              <span className="text-text-muted">(optionnel)</span>
            </label>
            <input
              type="number"
              id="maxResponses"
              {...register("maxResponses", {
                setValueAs: (v) => (v === "" ? null : parseInt(v, 10)),
              })}
              className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
              placeholder="Illimité si vide"
              min="1"
            />
            {errors.maxResponses && (
              <p className="mt-1 text-sm text-accent-red">
                {errors.maxResponses.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-text-muted transition-colors hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoadingStructures}
              className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary-light disabled:opacity-50"
            >
              {isSubmitting ? "Création..." : "Créer"}
            </button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
