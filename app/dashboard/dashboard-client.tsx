"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CreateStructureDialog } from "@/components/structures/create-structure-dialog";
import { CreateSurveyDialog } from "@/components/surveys/create-survey-dialog";
import { Card, CardHeader, CardTitle, CardAction, CardPanel } from "@/components/ui/card";
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

interface Structure {
  id: string;
  name: string;
  referentEmail: string;
  createdAt: string;
  _count: {
    surveys: number;
    savedSurveys: number;
  };
}

interface Survey {
  id: string;
  name: string;
  startDate: string;
  expirationDate: string;
  maxResponses: number | null;
  status: string;
  surveyType: string;
  structure: {
    id: string;
    name: string;
  };
  _count: {
    savedSurveys: number;
  };
}

interface DashboardClientProps {
  userName: string;
}

export function DashboardClient({ userName }: DashboardClientProps) {
  void userName; // Used in header via session
  const router = useRouter();
  const [structures, setStructures] = useState<Structure[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStructureDialogOpen, setIsStructureDialogOpen] = useState(false);
  const [isSurveyDialogOpen, setIsSurveyDialogOpen] = useState(false);

  const fetchStructures = useCallback(async () => {
    try {
      const response = await fetch("/api/structures");
      if (response.ok) {
        const data = await response.json();
        setStructures(data);
      }
    } catch (error) {
      console.error("Error fetching structures:", error);
    }
  }, []);

  const fetchSurveys = useCallback(async () => {
    try {
      const response = await fetch("/api/surveys");
      if (response.ok) {
        const data = await response.json();
        setSurveys(data);
      }
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchStructures(), fetchSurveys()]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchStructures, fetchSurveys]);

  const totalResponses = structures.reduce(
    (acc, s) => acc + s._count.savedSurveys,
    0,
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Main Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="text-accent-teal">Liste des </span>
              <span className="text-accent-red">Comptes</span>
            </CardTitle>
            <CardAction>
              <Button
                variant="outline"
                className="border-2 border-accent-green bg-accent-green-light text-accent-green hover:bg-green-100"
                onClick={() => setIsStructureDialogOpen(true)}
              >
                Créer un compte
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </Button>
            </CardAction>
          </CardHeader>

          <CardPanel>
            {/* Structures Table */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Spinner className="size-8 text-accent-teal" />
                <p className="mt-3 text-sm text-muted-foreground">Chargement...</p>
              </div>
            ) : structures.length === 0 ? (
              <div className="rounded-lg border border-border bg-background p-8 text-center">
                <p className="text-muted-foreground">Aucune structure créée.</p>
                <button
                  onClick={() => setIsStructureDialogOpen(true)}
                  className="mt-3 text-sm font-medium text-accent-teal hover:underline"
                >
                  Créer votre première structure
                </button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Compte</TableHead>
                    <TableHead className="text-center">Email référent</TableHead>
                    <TableHead className="text-center">Nombre de réponses total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {structures.map((structure) => (
                    <TableRow
                      key={structure.id}
                      className="cursor-pointer"
                      onClick={() => router.push(`/dashboard/${structure.id}`)}
                    >
                      <TableCell className="font-medium">
                        {structure.name}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {structure.referentEmail}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {structure._count.savedSurveys}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardPanel>
        </Card>

        {/* Recent Surveys Section */}
        {surveys.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                <span className="text-accent-teal">Enquêtes </span>
                <span className="text-accent-red">récentes</span>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Structure</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead className="text-center">Réponses</TableHead>
                    <TableHead className="text-center">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {surveys.slice(0, 5).map((survey) => (
                    <TableRow key={survey.id}>
                      <TableCell className="font-medium">
                        {survey.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {survey.structure.name}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {survey.surveyType === "AIRE_ET_MOTS"
                          ? "AIRE & MOTS"
                          : survey.surveyType}
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {survey._count.savedSurveys}
                        {survey.maxResponses ? ` / ${survey.maxResponses}` : ""}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            survey.status === "EN_COURS"
                              ? "success"
                              : survey.status === "FERMEE"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {survey.status === "EN_COURS"
                            ? "En cours"
                            : survey.status === "FERMEE"
                              ? "Fermée"
                              : "Expirée"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardPanel>
          </Card>
        )}

        {/* Stats row */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardPanel>
              <p className="text-sm font-medium text-muted-foreground">Structures</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {isLoading ? "–" : structures.length}
              </p>
            </CardPanel>
          </Card>
          <Card>
            <CardPanel>
              <p className="text-sm font-medium text-muted-foreground">Enquêtes</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {isLoading ? "–" : surveys.length}
              </p>
            </CardPanel>
          </Card>
          <Card>
            <CardPanel>
              <p className="text-sm font-medium text-muted-foreground">
                Réponses collectées
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {isLoading ? "–" : totalResponses}
              </p>
            </CardPanel>
          </Card>
        </div>
      </div>

      <CreateStructureDialog
        open={isStructureDialogOpen}
        onClose={() => setIsStructureDialogOpen(false)}
        onSuccess={() => {
          fetchStructures();
          fetchSurveys();
        }}
      />

      <CreateSurveyDialog
        open={isSurveyDialogOpen}
        onClose={() => setIsSurveyDialogOpen(false)}
        onSuccess={() => {
          fetchSurveys();
          fetchStructures();
        }}
      />
    </div>
  );
}
