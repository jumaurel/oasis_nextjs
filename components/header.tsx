"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";

export function Header() {
  const { data: session, isPending } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo_MOTSeval.png"
              alt="MOTS OASIS"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
          {session && (
            <div className="hidden sm:block border-l border-border pl-4">
              <p className="text-xs text-accent-teal font-medium">Compte</p>
              <p className="text-sm font-semibold text-primary">
                Administrateur
              </p>
            </div>
          )}
        </div>

        <nav className="flex items-center gap-4">
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
          ) : session ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-gray-100 hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Quitter
            </button>
          ) : (
            <Link
              href="/auth/sign-in"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
            >
              Connexion Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
