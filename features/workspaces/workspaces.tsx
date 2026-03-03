"use client";
import { Button } from "@/components/ui/button";
import { WorkspacesGrid } from "./components/workspaces-grid";
import { Workspace } from "./models";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "./services/workspace";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const Workspaces = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });
  const [term, setTerm] = useState<string>("");

  const workspaces: Workspace[] = data || [];

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(term.toLowerCase())
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center py-5">
        <div>
          <h1 className="text-3xl font-bold">Workspaces</h1>
          <p className="text-muted-foreground">Administra tus workspaces</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/workspaces/create">
            <Plus />
            Agregar Workspace
          </Link>
        </Button>
      </div>
      <Input
        placeholder="Buscar workspace..."
        onChange={onSearchChange}
        className="max-w-md"
      />
      <WorkspacesGrid
        isLoading={isLoading}
        error={error}
        data={filteredWorkspaces}
      />
    </div>
  );
};
