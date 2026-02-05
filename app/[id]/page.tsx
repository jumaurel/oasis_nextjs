import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function QuestionnairePage({ params }: Props) {
  const { id } = await params;

  // Récupérer la campagne par son ID
  let campaign = null;
  try {
    campaign = await prisma.campaign.findUnique({
      where: { id },
      include: { structure: true },
    });
  } catch {
    // Si la DB n'est pas connectée, on montre un placeholder
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center">
          <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
              Questionnaire : {id}
            </h1>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              Le questionnaire sera affiché ici une fois la base de données
              configurée.
            </p>
            <div className="rounded-lg bg-amber-100 p-4 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
              Configuration de la base de données requise. Veuillez configurer
              votre URL Neon dans le fichier .env et exécuter{" "}
              <code className="rounded bg-amber-200 px-1 dark:bg-amber-800">
                npx prisma db push
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    notFound();
  }

  // Vérifier si la campagne est active
  const now = new Date();
  const isExpired = campaign.expirationDate < now;
  const notStarted = campaign.startDate > now;
  const isClosed =
    campaign.status === "FERMEE" || campaign.status === "EXPIREE";

  if (isClosed || isExpired) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center">
          <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
              Questionnaire terminé
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Ce questionnaire n&apos;est plus disponible. La campagne est{" "}
              {isExpired ? "expirée" : "fermée"}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (notStarted) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center">
          <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
              Questionnaire à venir
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Ce questionnaire n&apos;est pas encore ouvert. Il sera disponible
              le {campaign.startDate.toLocaleDateString("fr-FR")}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
            {campaign.name}
          </h1>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            {campaign.structure.name} - Type :{" "}
            {campaign.surveyType === "AIRE_ET_MOTS"
              ? "AIRE & MOTS"
              : campaign.surveyType}
          </p>
          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            Le contenu du questionnaire sera implémenté ultérieurement.
          </div>
        </div>

        {/* Placeholder pour le formulaire de questionnaire */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
            Informations du répondant
          </h2>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Âge
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                  placeholder="Votre âge"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Genre
                </label>
                <select className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800">
                  <option value="">Sélectionner</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                  <option value="non-specifie">Ne souhaite pas préciser</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Région
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                  placeholder="Votre région"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Spécialité
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800"
                  placeholder="Votre spécialité"
                />
              </div>
            </div>

            <div className="pt-4">
              <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
                Les questions du questionnaire seront affichées ici.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
