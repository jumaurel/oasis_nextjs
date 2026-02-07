import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardPanel } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          <Card>
            <CardPanel>
              <h1 className="mb-4 text-2xl font-bold text-primary">
                Questionnaire : {id}
              </h1>
              <p className="mb-6 text-muted-foreground">
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
            </CardPanel>
          </Card>
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
          <Card>
            <CardPanel>
              <h1 className="mb-4 text-2xl font-bold text-primary">
                Questionnaire terminé
              </h1>
              <p className="text-muted-foreground">
                Ce questionnaire n&apos;est plus disponible. L&apos;enquête est{" "}
                <span
                  className={
                    isExpired
                      ? "font-semibold text-destructive"
                      : "font-semibold text-muted-foreground"
                  }
                >
                  {isExpired ? "expirée" : "fermée"}
                </span>
                .
              </p>
            </CardPanel>
          </Card>
        </div>
      </div>
    );
  }

  if (notStarted) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center">
          <Card>
            <CardPanel>
              <h1 className="mb-4 text-2xl font-bold text-primary">
                Questionnaire à venir
              </h1>
              <p className="text-muted-foreground">
                Ce questionnaire n&apos;est pas encore ouvert. Il sera disponible
                le {survey.startDate.toLocaleDateString("fr-FR")}.
              </p>
            </CardPanel>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{survey.name}</CardTitle>
          </CardHeader>
          <CardPanel>
            <p className="mb-4 text-muted-foreground">
              {survey.structure.name} — Type :{" "}
              {survey.surveyType === "AIRE_ET_MOTS"
                ? "AIRE & MOTS"
                : survey.surveyType}
            </p>
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
              Le contenu du questionnaire sera implémenté ultérieurement.
            </div>
          </CardPanel>
        </Card>

        {/* Placeholder pour le formulaire de questionnaire */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations du répondant</CardTitle>
          </CardHeader>
          <CardPanel>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Âge</Label>
                  <Input type="number" placeholder="Votre âge" />
                </div>
                <div className="space-y-1.5">
                  <Label>Genre</Label>
                  <select className="flex h-9 w-full rounded-lg border border-input bg-background px-3 text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow focus-visible:border-ring focus-visible:ring-[3px] disabled:opacity-64 sm:h-8 sm:text-sm">
                    <option value="">Sélectionner</option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                    <option value="autre">Autre</option>
                    <option value="non-specifie">Ne souhaite pas préciser</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Région</Label>
                  <Input type="text" placeholder="Votre région" />
                </div>
                <div className="space-y-1.5">
                  <Label>Spécialité</Label>
                  <Input type="text" placeholder="Votre spécialité" />
                </div>
              </div>

              <div className="pt-4">
                <p className="text-center text-sm text-muted-foreground">
                  Les questions du questionnaire seront affichées ici.
                </p>
              </div>
            </form>
          </CardPanel>
        </Card>
      </div>
    </div>
  );
}
