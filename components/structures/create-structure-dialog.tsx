"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@/components/ui/dialog";
import {
  createStructureSchema,
  type CreateStructureInput,
} from "@/lib/validations/structure";

interface CreateStructureDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateStructureDialog({
  open,
  onClose,
  onSuccess,
}: CreateStructureDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateStructureInput>({
    resolver: zodResolver(createStructureSchema),
  });

  const onSubmit = async (data: CreateStructureInput) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch("/api/structures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  return (
    <Dialog open={open} onClose={handleClose} title="Nouvelle structure">
      {serverError && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-accent-red">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Nom de la structure
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
            placeholder="Ex: CHU de Lyon"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-accent-red">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="referentEmail"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Email du référent
          </label>
          <input
            type="email"
            id="referentEmail"
            {...register("referentEmail")}
            className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
            placeholder="referent@structure.fr"
          />
          {errors.referentEmail && (
            <p className="mt-1 text-sm text-accent-red">
              {errors.referentEmail.message}
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
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary-light disabled:opacity-50"
          >
            {isSubmitting ? "Création..." : "Créer"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
