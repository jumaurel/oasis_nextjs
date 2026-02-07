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
  updateStructureSchema,
  type UpdateStructureInput,
} from "@/lib/validations/structure";

interface EditStructureDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  structure: {
    id: string;
    name: string;
    referentEmail: string;
  };
}

export function EditStructureDialog({
  open,
  onClose,
  onSuccess,
  structure,
}: EditStructureDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateStructureInput>({
    resolver: zodResolver(updateStructureSchema),
    defaultValues: {
      name: structure.name,
      referentEmail: structure.referentEmail,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: structure.name,
        referentEmail: structure.referentEmail,
      });
    }
  }, [open, structure, reset]);

  const onSubmit = async (data: UpdateStructureInput) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch(`/api/structures/${structure.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la mise à jour");
      }

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
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Modifier la structure</DialogTitle>
        </DialogHeader>
        <DialogPanel>
          {serverError && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-destructive">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-name">Nom de la structure</Label>
              <Input
                type="text"
                id="edit-name"
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
              <Label htmlFor="edit-referentEmail">Email du référent</Label>
              <Input
                type="email"
                id="edit-referentEmail"
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
              <DialogClose render={<Button variant="outline" className="flex-1" />}>
                Annuler
              </DialogClose>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting && <Spinner />}
                {isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </form>
        </DialogPanel>
      </DialogPopup>
    </Dialog>
  );
}
