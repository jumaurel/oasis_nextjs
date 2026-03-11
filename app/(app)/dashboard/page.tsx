import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <DashboardClient userName={session.user.name} />;
}
