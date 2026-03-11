import Link from "next/link";
import Image from "next/image";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo_MOTSeval.png"
              alt="MOTS OASIS"
              width={140}
              height={40}
              className="h-8 w-auto sm:h-10"
              priority
            />
          </Link>
        </div>
      </header>
      <main className="pt-16">{children}</main>
    </>
  );
}
