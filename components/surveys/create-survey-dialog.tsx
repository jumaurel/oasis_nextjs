"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
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
  structureId?: string;
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
  structureId,
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
      ...(structureId ? { structureId } : {}),
    },
  });

  useEffect(() => {
    if (open && !structureId) {
      fetchStructures();
    }
  }, [open, structureId]);

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
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Nouvelle enquête</DialogTitle>
        </DialogHeader>
        <DialogPanel>
          {serverError && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-destructive">
              {serverError}
            </div>
          )}

          {structures.length === 0 && !isLoadingStructures && !structureId ? (
            <div className="rounded-lg bg-accent-orange-light border border-amber-300 p-4 text-sm text-amber-800">
              Vous devez d&apos;abord créer une structure avant de pouvoir créer une
              enquête.
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {structureId ? (
                <input type="hidden" {...register("structureId")} value={structureId} />
              ) : (
                <div className="space-y-1.5">
                  <Label htmlFor="structureId">Structure</Label>
                  <select
                    id="structureId"
                    {...register("structureId")}
                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow focus-visible:border-ring focus-visible:ring-[3px] disabled:opacity-64 sm:h-8 sm:text-sm"
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
                    <p className="text-sm text-destructive">
                      {errors.structureId.message}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="name">Nom de l&apos;enquête</Label>
                <Input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="Ex: Enquête du 16/09/2024"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="surveyType">Type de questionnaire</Label>
                <select
                  id="surveyType"
                  {...register("surveyType")}
                  className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow focus-visible:border-ring focus-visible:ring-[3px] disabled:opacity-64 sm:h-8 sm:text-sm"
                >
                  <option value="">Sélectionner un type</option>
                  {surveyTypes.map((type) => (
                    <option key={type} value={type}>
                      {surveyTypeLabels[type]}
                    </option>
                  ))}
                </select>
                {errors.surveyType && (
                  <p className="text-sm text-destructive">
                    {errors.surveyType.message}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="startDate">Date de démarrage</Label>
                  <Input
                    type="date"
                    id="startDate"
                    {...register("startDate")}
                    defaultValue={today}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-destructive">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="expirationDate">Date d&apos;expiration</Label>
                  <Input
                    type="date"
                    id="expirationDate"
                    {...register("expirationDate")}
                    defaultValue={defaultExpiration}
                  />
                  {errors.expirationDate && (
                    <p className="text-sm text-destructive">
                      {errors.expirationDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="maxResponses">
                  Nombre maximum de réponses{" "}
                  <span className="text-muted-foreground">(optionnel)</span>
                </Label>
                <Input
                  type="number"
                  id="maxResponses"
                  {...register("maxResponses", {
                    setValueAs: (v) => (v === "" ? null : parseInt(v, 10)),
                  })}
                  placeholder="Illimité si vide"
                  min={1}
                />
                {errors.maxResponses && (
                  <p className="text-sm text-destructive">
                    {errors.maxResponses.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <DialogClose render={<Button variant="outline" className="flex-1" />}>
                  Annuler
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isSubmitting || (!structureId && isLoadingStructures)}
                  className="flex-1"
                >
                  {isSubmitting && <Spinner />}
                  {isSubmitting ? "Création..." : "Créer"}
                </Button>
              </div>
            </form>
          )}
        </DialogPanel>
      </DialogPopup>
    </Dialog>
  );
}
