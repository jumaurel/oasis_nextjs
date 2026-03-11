"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EditStructureDialog } from "@/components/structures/edit-structure-dialog";
import { CreateSurveyDialog } from "@/components/surveys/create-survey-dialog";
import { EditSurveyDialog } from "@/components/surveys/edit-survey-dialog";
import { extractSurveyData } from "@/lib/extract-survey-data";
import { toastManager } from "@/components/ui/toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardPanel,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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

interface Survey {
  id: string;
  name: string;
  startDate: string;
  expirationDate: string;
  maxResponses: number | null;
  status: string;
  surveyType: string;
  viewCount: number;
  startedCount: number;
  _count: {
    savedSurveys: number;
  };
}

interface Structure {
  id: string;
  name: string;
  referentEmail: string;
  createdAt: string;
  surveys: Survey[];
}

interface StructureDetailClientProps {
  id: string;
}

export function StructureDetailClient({ id }: StructureDetailClientProps) {
  const [structure, setStructure] = useState<Structure | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSurveyDialogOpen, setIsSurveyDialogOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [deletingSurveyId, setDeletingSurveyId] = useState<string | null>(null);
  const [extractingSurveyId, setExtractingSurveyId] = useState<string | null>(
    null,
  );
  const [isDeletingStructure, setIsDeletingStructure] = useState(false);
  const router = useRouter();

  const fetchStructure = useCallback(async () => {
    try {
      const response = await fetch(`/api/structures/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError("Structure non trouvée");
          return;
        }
        throw new Error("Erreur lors du chargement");
      }
      const data = await response.json();
      setStructure(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const handleDeleteSurvey = async (surveyId: string) => {
    setDeletingSurveyId(surveyId);
    try {
      const response = await fetch(`/api/surveys/${surveyId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la suppression");
      }

      fetchStructure();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setDeletingSurveyId(null);
    }
  };

  const handleExtractData = async (e: React.MouseEvent, surveyId: string) => {
    e.stopPropagation();
    setExtractingSurveyId(surveyId);
    try {
      await extractSurveyData(surveyId);
      toastManager.add({
        title: "Export réussi",
        description: "Le fichier Excel a été téléchargé.",
        type: "success",
      });
    } catch (err) {
      toastManager.add({
        title: "Erreur",
        description:
          err instanceof Error ? err.message : "Erreur lors de l'export",
        type: "error",
      });
    } finally {
      setExtractingSurveyId(null);
    }
  };

  const handleDeleteStructure = async () => {
    setIsDeletingStructure(true);
    try {
      const response = await fetch(`/api/structures/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la suppression");
      }

      router.push("/dashboard");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsDeletingStructure(false);
    }
  };

  useEffect(() => {
    fetchStructure();
  }, [fetchStructure]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center py-12">
            <Spinner className="size-8 text-accent-teal" />
            <p className="mt-3 text-sm text-muted-foreground">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !structure) {
    return (
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <Card>
            <CardPanel>
              <p className="text-destructive">{error || "Compte non trouvé"}</p>
              <Link
                href="/dashboard"
                className="mt-3 inline-block text-sm font-medium text-accent-teal hover:underline"
              >
                Retour au tableau de bord
              </Link>
            </CardPanel>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-1 text-base  hover:text-foreground transition-colors"
          >
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
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Retour au tableau de bord
          </Link>
        </div>

        {/* Structure Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="text-accent-teal">Compte : </span>
              <span className="text-accent-red">{structure.name}</span>
            </CardTitle>
            <CardAction>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(true)}
              >
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Modifier
              </Button>
            </CardAction>
          </CardHeader>
          <CardPanel>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                Email référent :{" "}
                <span className="font-medium text-foreground">
                  {structure.referentEmail}
                </span>
              </p>
            </div>
          </CardPanel>
        </Card>

        {/* Surveys Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              <span className="text-accent-teal">Liste des </span>
              <span className="text-accent-red">enquêtes</span>
            </CardTitle>
            <CardAction>
              <Button
                variant="outline"
                className="border-2 border-accent-green bg-accent-green-light text-accent-green hover:bg-green-100"
                onClick={() => setIsSurveyDialogOpen(true)}
              >
                Créer une enquête
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </Button>
            </CardAction>
          </CardHeader>
          <CardPanel>
            {structure.surveys.length === 0 ? (
              <div className="rounded-lg border border-border bg-background p-8 text-center">
                <p className="text-muted-foreground">
                  Aucune enquête pour cette structure.
                </p>
                <button
                  onClick={() => setIsSurveyDialogOpen(true)}
                  className="mt-3 text-sm font-medium text-accent-teal hover:underline"
                >
                  Créer la première enquête
                </button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">Date de début</TableHead>
                    <TableHead className="text-center">
                      Date d&apos;expiration
                    </TableHead>
                    <TableHead className="text-center">Réponses</TableHead>
                    <TableHead className="text-center">Vues</TableHead>
                    <TableHead className="text-center">Démarrées</TableHead>
                    <TableHead className="text-center">
                      Taux de complétion
                    </TableHead>
                    <TableHead className="text-center">Statut</TableHead>
                    <TableHead className="text-center">
                      Extraire données
                    </TableHead>
                    <TableHead className="text-center">Supprimer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {structure.surveys.map((survey) => (
                    <TableRow
                      key={survey.id}
                      onClick={() => setSelectedSurvey(survey)}
                      className="cursor-pointer"
                    >
                      <TableCell className="font-medium">
                        {survey.name}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {survey.surveyType === "AIRE_ET_MOTS"
                          ? "AIRE & MOTS"
                          : survey.surveyType}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {new Date(survey.startDate).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {new Date(survey.expirationDate) < new Date() ? (
                          <Badge variant="warning" size="lg">
                            {new Date(survey.expirationDate).toLocaleDateString(
                              "fr-FR",
                            )}
                          </Badge>
                        ) : (
                          new Date(survey.expirationDate).toLocaleDateString(
                            "fr-FR",
                          )
                        )}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {survey._count.savedSurveys}
                        {survey.maxResponses ? ` / ${survey.maxResponses}` : ""}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {survey.viewCount}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {survey.startedCount}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {survey.startedCount > 0
                          ? `${Math.round((survey._count.savedSurveys / survey.startedCount) * 100)}%`
                          : "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            survey.status === "EN_COURS"
                              ? "success"
                              : survey.status === "FERMEE"
                                ? "warning"
                                : "destructive"
                          }
                          size="lg"
                        >
                          {survey.status === "EN_COURS"
                            ? "Activée"
                            : survey.status === "FERMEE"
                              ? "Fermée"
                              : "Expirée"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-muted-foreground hover:text-accent-teal"
                          onClick={(e: React.MouseEvent) =>
                            handleExtractData(e, survey.id)
                          }
                          disabled={extractingSurveyId === survey.id}
                        >
                          {extractingSurveyId === survey.id ? (
                            <Spinner className="size-4" />
                          ) : (
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
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                              />
                            </svg>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell
                        className="text-center"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      >
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="text-muted-foreground hover:text-destructive"
                                disabled={deletingSurveyId === survey.id}
                              />
                            }
                          >
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
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </AlertDialogTrigger>
                          <AlertDialogPopup>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Confirmer la suppression
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer cette enquête
                                ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogClose
                                render={<Button variant="outline" />}
                              >
                                Annuler
                              </AlertDialogClose>
                              <AlertDialogClose
                                render={
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleDeleteSurvey(survey.id)
                                    }
                                  />
                                }
                              >
                                Supprimer
                              </AlertDialogClose>
                            </AlertDialogFooter>
                          </AlertDialogPopup>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardPanel>
        </Card>
        {/* Delete Structure */}
        <div className="mt-6 flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button variant="destructive" disabled={isDeletingStructure} />
              }
            >
              {isDeletingStructure ? (
                <Spinner className="size-4" />
              ) : (
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              )}
              Supprimer ce compte
            </AlertDialogTrigger>
            <AlertDialogPopup>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer le compte</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer le compte{" "}
                  <strong>{structure.name}</strong> ? Cette action est
                  irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose render={<Button variant="outline" />}>
                  Annuler
                </AlertDialogClose>
                <AlertDialogClose
                  render={
                    <Button
                      variant="destructive"
                      onClick={handleDeleteStructure}
                    />
                  }
                >
                  Supprimer
                </AlertDialogClose>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialog>
        </div>
      </div>

      <EditStructureDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSuccess={fetchStructure}
        structure={structure}
      />

      <CreateSurveyDialog
        open={isSurveyDialogOpen}
        onClose={() => setIsSurveyDialogOpen(false)}
        onSuccess={fetchStructure}
        structureId={structure.id}
      />

      {selectedSurvey && (
        <EditSurveyDialog
          open={!!selectedSurvey}
          onClose={() => setSelectedSurvey(null)}
          onSuccess={fetchStructure}
          survey={selectedSurvey}
        />
      )}
    </div>
  );
}
