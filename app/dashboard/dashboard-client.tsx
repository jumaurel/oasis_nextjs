"use client";

import { useState, useEffect, useCallback } from "react";
import { CreateStructureDialog } from "@/components/structures/create-structure-dialog";
import { CreateCampaignDialog } from "@/components/campaigns/create-campaign-dialog";

interface Structure {
  id: string;
  name: string;
  referentEmail: string;
  createdAt: string;
  _count: {
    campaigns: number;
    savedSurveys: number;
  };
}

interface Campaign {
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
  const [structures, setStructures] = useState<Structure[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStructureDialogOpen, setIsStructureDialogOpen] = useState(false);
  const [isCampaignDialogOpen, setIsCampaignDialogOpen] = useState(false);

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

  const fetchCampaigns = useCallback(async () => {
    try {
      const response = await fetch("/api/campaigns");
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchStructures(), fetchCampaigns()]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchStructures, fetchCampaigns]);

  const totalCampaigns = structures.reduce(
    (acc, s) => acc + s._count.campaigns,
    0,
  );
  const totalResponses = structures.reduce(
    (acc, s) => acc + s._count.savedSurveys,
    0,
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50 px-4 py-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              Bienvenue, {userName}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Structures
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
              {isLoading ? "-" : structures.length}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Campagnes
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
              {isLoading ? "-" : totalCampaigns}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Réponses collectées
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
              {isLoading ? "-" : totalResponses}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Taux de complétion
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
              -
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            Actions rapides
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={() => setIsStructureDialogOpen(true)}
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-white">
                  Nouvelle structure
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Créer une institution
                </p>
              </div>
            </button>

            <button
              onClick={() => setIsCampaignDialogOpen(true)}
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-white">
                  Nouvelle campagne
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Créer un questionnaire
                </p>
              </div>
            </button>

            <button
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              disabled
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
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
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-white">
                  Voir les résultats
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Analyser les réponses
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Structures List */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Structures
            </h2>
            <button
              onClick={() => setIsStructureDialogOpen(true)}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              + Ajouter
            </button>
          </div>

          {isLoading ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-500">Chargement...</p>
            </div>
          ) : structures.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-zinc-600 dark:text-zinc-400">
                Aucune structure créée.
              </p>
              <button
                onClick={() => setIsStructureDialogOpen(true)}
                className="mt-2 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Créer votre première structure
              </button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <table className="w-full">
                <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Email référent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Campagnes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Réponses
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {structures.map((structure) => (
                    <tr
                      key={structure.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white">
                        {structure.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                        {structure.referentEmail}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                        {structure._count.campaigns}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                        {structure._count.savedSurveys}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Campagnes récentes
              </h2>
              <button
                onClick={() => setIsCampaignDialogOpen(true)}
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                + Nouvelle
              </button>
            </div>
            {campaigns.length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                Aucune campagne créée.
              </p>
            ) : (
              <div className="space-y-3">
                {campaigns.slice(0, 5).map((campaign) => (
                  <div
                    key={campaign.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 dark:border-zinc-800"
                  >
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">
                        {campaign.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {campaign.structure.name} •{" "}
                        {campaign.surveyType === "AIRE_ET_MOTS"
                          ? "AIRE & MOTS"
                          : campaign.surveyType}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          campaign.status === "EN_COURS"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : campaign.status === "FERMEE"
                              ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {campaign.status === "EN_COURS"
                          ? "En cours"
                          : campaign.status === "FERMEE"
                            ? "Fermée"
                            : "Expirée"}
                      </span>
                      <p className="mt-1 text-xs text-zinc-500">
                        {campaign._count.savedSurveys}
                        {campaign.maxResponses
                          ? ` / ${campaign.maxResponses}`
                          : ""}{" "}
                        réponses
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Activité récente
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              L&apos;activité récente apparaîtra ici.
            </p>
          </div>
        </div>
      </div>

      <CreateStructureDialog
        open={isStructureDialogOpen}
        onClose={() => setIsStructureDialogOpen(false)}
        onSuccess={() => {
          fetchStructures();
          fetchCampaigns();
        }}
      />

      <CreateCampaignDialog
        open={isCampaignDialogOpen}
        onClose={() => setIsCampaignDialogOpen(false)}
        onSuccess={() => {
          fetchCampaigns();
          fetchStructures();
        }}
      />
    </div>
  );
}
