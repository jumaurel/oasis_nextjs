import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function QuestionnairePage({ params }: Props) {
  const { id } = await params;

  // Récupérer l'enquête par son ID
  let survey = null;
  try {
    survey = await prisma.survey.findUnique({
      where: { id },
      include: { structure: true },
    });
  } catch {
    // Si la DB n'est pas connectée, on montre un placeholder
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h1 className="mb-4 text-2xl font-bold text-primary">
              Questionnaire : {id}
            </h1>
            <p className="mb-6 text-text-muted">
              Le questionnaire sera affiché ici une fois la base de données
              configurée.
            </p>
            <div className="rounded-lg bg-accent-orange-light p-4 text-sm text-amber-800">
              Configuration de la base de données requise. Veuillez configurer
              votre URL Neon dans le fichier .env et exécuter{" "}
              <code className="rounded bg-amber-200 px-1">
                npx prisma db push
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!survey) {
    notFound();
  }

  // Vérifier si l'enquête est active
  const now = new Date();
  const isExpired = survey.expirationDate < now;
  const notStarted = survey.startDate > now;
  const isClosed = survey.status === "FERMEE" || survey.status === "EXPIREE";

  if (isClosed || isExpired) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h1 className="mb-4 text-2xl font-bold text-primary">
              Questionnaire terminé
            </h1>
            <p className="text-text-muted">
              Ce questionnaire n&apos;est plus disponible. L&apos;enquête est{" "}
              <span
                className={
                  isExpired
                    ? "font-semibold text-accent-red"
                    : "font-semibold text-text-muted"
                }
              >
                {isExpired ? "expirée" : "fermée"}
              </span>
              .
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
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h1 className="mb-4 text-2xl font-bold text-primary">
              Questionnaire à venir
            </h1>
            <p className="text-text-muted">
              Ce questionnaire n&apos;est pas encore ouvert. Il sera disponible
              le {survey.startDate.toLocaleDateString("fr-FR")}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-primary">
            {survey.name}
          </h1>
          <p className="mb-4 text-text-muted">
            {survey.structure.name} — Type :{" "}
            {survey.surveyType === "AIRE_ET_MOTS"
              ? "AIRE & MOTS"
              : survey.surveyType}
          </p>
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
            Le contenu du questionnaire sera implémenté ultérieurement.
          </div>
        </div>

        {/* Placeholder pour le formulaire de questionnaire */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-primary">
            Informations du répondant
          </h2>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Âge
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
                  placeholder="Votre âge"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Genre
                </label>
                <select className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20">
                  <option value="">Sélectionner</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                  <option value="non-specifie">Ne souhaite pas préciser</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Région
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
                  placeholder="Votre région"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Spécialité
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-white px-4 py-2 text-foreground focus:border-accent-teal focus:outline-none focus:ring-2 focus:ring-accent-teal/20"
                  placeholder="Votre spécialité"
                />
              </div>
            </div>

            <div className="pt-4">
              <p className="text-center text-sm text-text-muted">
                Les questions du questionnaire seront affichées ici.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
