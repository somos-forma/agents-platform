import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { WorkspaceEditForm } from "@/features/workspaces/components/workspace-edit-form";
import { Separator } from "@radix-ui/react-separator";

interface EditWorkspacePageProps {
  params: Promise<{ id: string }>;
}
export default async function EditWorkspacePage({
  params,
}: EditWorkspacePageProps) {
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
                <BreadcrumbPage>Editar Workspace</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 ">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-bold">Editar Workspace</h1>
        </div>
        <p className="text-muted-foreground">Aquí puedes editar tu workspace</p>
        <div className="py-5 max-w-2xl">
          <WorkspaceEditForm id={id} />
        </div>
      </div>
    </section>
  );
}
