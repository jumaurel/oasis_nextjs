import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { StructureDetailClient } from "./structure-detail-client";

export default async function StructureDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const { id } = await params;

  return <StructureDetailClient id={id} />;
}
