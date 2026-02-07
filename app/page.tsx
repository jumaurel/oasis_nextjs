import Image from "next/image";
import { Card, CardPanel } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <main className="mx-auto max-w-4xl text-center">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo_MOTSeval.png"
            alt="MOTS OASIS"
            width={200}
            height={60}
            priority
          />
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Bienvenue sur <span className="text-accent-teal">OASIS</span>
        </h1>

        <p className="mb-8 text-lg text-muted-foreground">
          Plateforme de questionnaires pour les professionnels de santé.
          <br />
          Évaluez et analysez avec les outils AIRE et MOTS.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Card>
            <CardPanel>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                Vous avez un code questionnaire ?
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Accédez directement à votre questionnaire en utilisant le lien
                fourni par votre établissement.
              </p>
              <div className="rounded-lg bg-background p-3 text-sm text-muted-foreground">
                Exemple : oasis.fr/
                <strong className="text-primary">votre-code</strong>
              </div>
            </CardPanel>
          </Card>

          <Card>
            <CardPanel>
              <h2 className="mb-2 text-lg font-semibold text-primary">
                Administrateur ?
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Connectez-vous pour gérer vos enquêtes et visualiser les
                résultats.
              </p>
              <Button render={<a href="/auth/sign-in" />}>
                Accéder à l&apos;espace admin
              </Button>
            </CardPanel>
          </Card>
        </div>
      </main>
    </div>
  );
}
