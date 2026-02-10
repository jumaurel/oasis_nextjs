"use client";

import { useState } from "react";
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
import { toastManager } from "@/components/ui/toast";
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
      toastManager.add({
        title: "Structure créée",
        description: "La structure a été créée avec succès.",
        type: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Une erreur est survenue";
      setServerError(message);
      toastManager.add({
        title: "Erreur",
        description: message,
        type: "error",
      });
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
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Créer un compte</DialogTitle>
        </DialogHeader>
        <DialogPanel>
          {serverError && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-destructive">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nom du compte</Label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Ex: CHU de Lyon"
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="referentEmail">Email référent.e</Label>
              <Input
                type="email"
                id="referentEmail"
                {...register("referentEmail")}
                placeholder="referent@structure.fr"
              />
              {errors.referentEmail && (
                <p className="text-sm text-destructive">
                  {errors.referentEmail.message}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <DialogClose
                render={<Button variant="outline" className="flex-1" />}
              >
                Annuler
              </DialogClose>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting && <Spinner />}
                {isSubmitting ? "Création..." : "Créer"}
              </Button>
            </div>
          </form>
        </DialogPanel>
      </DialogPopup>
    </Dialog>
  );
}
