"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { CreateStructureDialog } from "@/components/structures/create-structure-dialog";
import { CreateSurveyDialog } from "@/components/surveys/create-survey-dialog";

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
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {/* Title Row */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              <span className="text-accent-teal">Liste des </span>
              <span className="text-accent-red">Comptes</span>
            </h1>
            <button
              onClick={() => setIsStructureDialogOpen(true)}
              className="flex items-center gap-2 rounded-lg border-2 border-accent-green bg-accent-green-light px-4 py-2.5 text-sm font-semibold text-accent-green transition-colors hover:bg-green-100"
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
            </button>
          </div>

          {/* Structures Table */}
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-border border-t-accent-teal" />
              <p className="mt-3 text-sm text-text-muted">Chargement...</p>
            </div>
          ) : structures.length === 0 ? (
            <div className="rounded-lg border border-border bg-background p-8 text-center">
              <p className="text-text-muted">Aucune structure créée.</p>
              <button
                onClick={() => setIsStructureDialogOpen(true)}
                className="mt-3 text-sm font-medium text-accent-teal hover:underline"
              >
                Créer votre première structure
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Ouvrir
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Compte
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Email référent
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Nombre de réponses total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {structures.map((structure) => (
                    <tr
                      key={structure.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link
                          href={`/dashboard/${structure.id}`}
                          className="inline-flex items-center text-text-muted hover:text-primary transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                            />
                          </svg>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                        {structure.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-text-muted">
                        {structure.referentEmail}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-text-muted">
                        {structure._count.savedSurveys}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Surveys Section */}
        {surveys.length > 0 && (
          <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                <span className="text-accent-teal">Enquêtes </span>
                <span className="text-accent-red">récentes</span>
              </h2>
              <button
                onClick={() => setIsSurveyDialogOpen(true)}
                className="flex items-center gap-2 rounded-lg border-2 border-accent-green bg-accent-green-light px-4 py-2 text-sm font-semibold text-accent-green transition-colors hover:bg-green-100"
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
              </button>
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Nom
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Structure
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Type
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Réponses
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {surveys.slice(0, 5).map((survey) => (
                    <tr
                      key={survey.id}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                        {survey.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-text-muted">
                        {survey.structure.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-text-muted">
                        {survey.surveyType === "AIRE_ET_MOTS"
                          ? "AIRE & MOTS"
                          : survey.surveyType}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-text-muted">
                        {survey._count.savedSurveys}
                        {survey.maxResponses ? ` / ${survey.maxResponses}` : ""}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-center">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            survey.status === "EN_COURS"
                              ? "border border-green-300 bg-green-50 text-accent-green"
                              : survey.status === "FERMEE"
                                ? "border border-gray-300 bg-gray-50 text-text-muted"
                                : "border border-red-300 bg-red-50 text-accent-red"
                          }`}
                        >
                          {survey.status === "EN_COURS"
                            ? "En cours"
                            : survey.status === "FERMEE"
                              ? "Fermée"
                              : "Expirée"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats row */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-medium text-text-muted">Structures</p>
            <p className="mt-1 text-2xl font-bold text-primary">
              {isLoading ? "–" : structures.length}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-medium text-text-muted">Enquêtes</p>
            <p className="mt-1 text-2xl font-bold text-primary">
              {isLoading ? "–" : surveys.length}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm font-medium text-text-muted">
              Réponses collectées
            </p>
            <p className="mt-1 text-2xl font-bold text-primary">
              {isLoading ? "–" : totalResponses}
            </p>
          </div>
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
