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
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { toastManager } from "@/components/ui/toast";
import {
  updateSurveySchema,
  surveyTypes,
  type UpdateSurveyInput,
} from "@/lib/validations/survey";

interface Survey {
  id: string;
  name: string;
  startDate: string;
  expirationDate: string;
  maxResponses: number | null;
  status: string;
  surveyType: string;
}

interface EditSurveyDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  survey: Survey;
}

const surveyTypeLabels: Record<(typeof surveyTypes)[number], string> = {
  AIRE_ET_MOTS: "AIRE & MOTS",
};

export function EditSurveyDialog({
  open,
  onClose,
  onSuccess,
  survey,
}: EditSurveyDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [localStatus, setLocalStatus] = useState(survey.status);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
  const publicLink = `${appUrl}/${survey.id}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateSurveyInput>({
    resolver: zodResolver(updateSurveySchema),
    defaultValues: {
      name: survey.name,
      surveyType: survey.surveyType as UpdateSurveyInput["surveyType"],
      startDate: new Date(survey.startDate).toISOString().split("T")[0],
      expirationDate: new Date(survey.expirationDate)
        .toISOString()
        .split("T")[0],
      maxResponses: survey.maxResponses ?? undefined,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: survey.name,
        surveyType: survey.surveyType as UpdateSurveyInput["surveyType"],
        startDate: new Date(survey.startDate).toISOString().split("T")[0],
        expirationDate: new Date(survey.expirationDate)
          .toISOString()
          .split("T")[0],
        maxResponses: survey.maxResponses ?? undefined,
      });
      setLocalStatus(survey.status);
      setServerError("");
    }
  }, [open, survey, reset]);

  const onSubmit = async (data: UpdateSurveyInput) => {
    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch(`/api/surveys/${survey.id}`, {
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

  const handleToggleStatus = async () => {
    setIsTogglingStatus(true);
    setServerError("");

    const newStatus = localStatus === "EN_COURS" ? "FERMEE" : "EN_COURS";

    try {
      const response = await fetch(`/api/surveys/${survey.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: survey.name,
          surveyType: survey.surveyType,
          startDate: new Date(survey.startDate).toISOString().split("T")[0],
          expirationDate: new Date(survey.expirationDate)
            .toISOString()
            .split("T")[0],
          maxResponses: survey.maxResponses,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors du changement de statut",
        );
      }

      toastManager.add({
        title: `Enquête ${newStatus === "EN_COURS" ? "activée" : "fermée"}`,
        description: `L'enquête a été ${newStatus === "EN_COURS" ? "activée" : "fermée"} avec succès.`,
        type: "success",
      });

      setLocalStatus(newStatus);
      onSuccess();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setIsTogglingStatus(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicLink);
      toastManager.add({
        title: "Lien copié",
        description: "Le lien public a été copié dans le presse-papier.",
        type: "success",
      });
    } catch {
      const input = document.createElement("input");
      input.value = publicLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      toastManager.add({
        title: "Lien copié",
        description: "Le lien public a été copié dans le presse-papier.",
        type: "success",
      });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setServerError("");

    try {
      const response = await fetch(`/api/surveys/${survey.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la suppression");
      }

      onSuccess();
      onClose();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    reset();
    setServerError("");
    onClose();
  };

  const statusBadgeVariant =
    localStatus === "EN_COURS"
      ? ("success" as const)
      : localStatus === "FERMEE"
        ? ("destructive" as const)
        : ("secondary" as const);

  const statusLabel =
    localStatus === "EN_COURS"
      ? "Enquête activée"
      : localStatus === "FERMEE"
        ? "Enquête fermée"
        : "Enquête expirée";

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>
            Editer l&apos;enquête :{" "}
            <span className="font-bold text-primary/80">{survey.name}</span>
          </DialogTitle>
        </DialogHeader>
        <DialogPanel>
          {serverError && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-destructive">
              {serverError}
            </div>
          )}

          {/* Status toggle section */}
          <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-background p-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                Statut :
              </span>
              <Badge size="lg" variant={statusBadgeVariant}>
                {statusLabel}
              </Badge>
            </div>
            {localStatus !== "EXPIREE" && (
              <div className="flex items-center gap-1.5">
                <Button
                  variant={localStatus === "EN_COURS" ? "default" : "outline"}
                  size="sm"
                  disabled={isTogglingStatus || localStatus === "EN_COURS"}
                  onClick={handleToggleStatus}
                >
                  {isTogglingStatus && localStatus !== "EN_COURS" && (
                    <Spinner />
                  )}
                  Activer
                </Button>
                <Button
                  variant={localStatus === "FERMEE" ? "default" : "outline"}
                  size="sm"
                  disabled={isTogglingStatus || localStatus === "FERMEE"}
                  onClick={handleToggleStatus}
                >
                  {isTogglingStatus && localStatus !== "FERMEE" && <Spinner />}
                  Fermer
                </Button>
              </div>
            )}
          </div>

          {/* Public link section */}
          <div className="mb-4 rounded-lg border border-border bg-background p-3">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Lien public de l&apos;enquête
            </label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                readOnly
                value={publicLink}
                className="flex-1"
              />
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>
                Copier
              </Button>
            </div>
          </div>

          {/* Edit form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-survey-name">Nom de l&apos;enquête</Label>
              <Input type="text" id="edit-survey-name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-survey-type">Type de questionnaire</Label>
              <select
                id="edit-survey-type"
                {...register("surveyType")}
                className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow focus-visible:border-ring focus-visible:ring-[3px] disabled:opacity-64 sm:h-8 sm:text-sm"
              >
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
                <Label htmlFor="edit-survey-startDate">Date de démarrage</Label>
                <Input
                  type="date"
                  id="edit-survey-startDate"
                  {...register("startDate")}
                />
                {errors.startDate && (
                  <p className="text-sm text-destructive">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="edit-survey-expirationDate">
                  Date d&apos;expiration
                </Label>
                <Input
                  type="date"
                  id="edit-survey-expirationDate"
                  {...register("expirationDate")}
                />
                {errors.expirationDate && (
                  <p className="text-sm text-destructive">
                    {errors.expirationDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-survey-maxResponses">
                Nombre maximum de réponses
              </Label>
              <Input
                type="number"
                id="edit-survey-maxResponses"
                {...register("maxResponses", {
                  setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
                })}
                placeholder="Ex: 50"
                min={1}
              />
              {errors.maxResponses && (
                <p className="text-sm text-destructive">
                  {errors.maxResponses.message}
                </p>
              )}
            </div>

            {/* Delete section */}
            <div className="mb-4 flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-3">
              <span className="text-sm font-medium text-destructive">
                Supprimer cette enquête
              </span>
              <AlertDialog>
                <AlertDialogTrigger
                  render={<Button variant="destructive-outline" size="sm" />}
                >
                  {isDeleting && <Spinner />}
                  {isDeleting ? "Suppression..." : "Supprimer"}
                </AlertDialogTrigger>
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Confirmer la suppression ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Êtes-vous sûr de vouloir supprimer cette enquête ? Cette
                      action est irréversible.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose render={<Button variant="outline" />}>
                      Annuler
                    </AlertDialogClose>
                    <AlertDialogClose
                      render={
                        <Button variant="destructive" onClick={handleDelete} />
                      }
                    >
                      Supprimer
                    </AlertDialogClose>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialog>
            </div>

            <div className="flex gap-3 pt-2">
              <DialogClose
                render={<Button variant="outline" className="flex-1" />}
              >
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
