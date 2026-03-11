import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-foreground">
          Questionnaire introuvable
        </h2>
        <p className="mb-8 text-text-muted">
          Le questionnaire que vous recherchez n&apos;existe pas ou a été
          supprimé.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-light"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
