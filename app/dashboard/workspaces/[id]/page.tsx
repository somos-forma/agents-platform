import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { WorkspaceDetails } from "@/features/workspaces/components/workspace-details";
import { Separator } from "@radix-ui/react-separator";
import { Edit } from "lucide-react";
import Link from "next/link";

interface WorkspaceByIdProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function WorkspaceById({ params }: WorkspaceByIdProps) {
  const { id } = await params;

  return (
    <section>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard/workspaces">
                  Workspaces
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Detalles</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-bold">Detalles del Workspace</h1>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/workspaces/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Editar Workspace
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground">
          Aquí puedes ver y editar los detalles del workspace
        </p>
        <div className="py-5">
          <WorkspaceDetails id={id} />
        </div>
      </div>
    </section>
  );
}
