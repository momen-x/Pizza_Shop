import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { tokenName } from "@/utils/tokenName";
import { verifyTokenForPage } from "@/utils/verifyTokenForPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get(tokenName);

  const payload = verifyTokenForPage(token?.value || "");
  if (!payload || !payload.isAdmin) {
    redirect("/");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
