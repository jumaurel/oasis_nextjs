export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gradient-to-b from-white to-zinc-50 px-4 dark:from-zinc-950 dark:to-zinc-900">
      <main className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Bienvenue sur <span className="text-blue-600">OASIS</span>
        </h1>

        <p className="mb-8 text-xl text-zinc-600 dark:text-zinc-400">
          Plateforme de questionnaires pour les institutions de santé.
          <br />
          Évaluez et analysez avec les outils AIRE et MOTS.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
              Vous avez un code questionnaire ?
            </h2>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              Accédez directement à votre questionnaire en utilisant le lien
              fourni par votre établissement.
            </p>
            <div className="rounded-lg bg-zinc-100 p-3 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              Exemple : oasis.fr/<strong>votre-code</strong>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
              Administrateur ?
            </h2>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              Connectez-vous pour gérer vos campagnes de questionnaires et
              visualiser les résultats.
            </p>
            <a
              href="/auth/sign-in"
              className="inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Accéder à l&apos;espace admin
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
