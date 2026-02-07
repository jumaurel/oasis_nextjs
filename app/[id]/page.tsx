import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Card, CardPanel } from "@/components/ui/card";
import { QuestionnaireClient } from "./questionnaire-client";

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
    <QuestionnaireClient
      survey={{
        id: survey.id,
        name: survey.name,
        surveyType: survey.surveyType,
        structureName: survey.structure.name,
      }}
    />
  );
}
