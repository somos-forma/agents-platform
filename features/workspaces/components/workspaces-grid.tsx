import React from "react";
import { Workspace } from "../models";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkspaceCardInteractive } from "./workspace.card-interactive";

interface WorkspacesListProps {
  isLoading: boolean;
  error: Error | null;
  data: Workspace[];
}

export const WorkspacesGrid = ({
  isLoading,
  error,
  data,
}: WorkspacesListProps) => {
  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="space-y-3 border rounded-xl p-6">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 mb-2 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  if (data.length === 0) {
    return <div>No hay workspaces disponibles.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((workspace) => (
        <WorkspaceCardInteractive
          key={workspace.id}
          id={workspace.id}
          name={workspace.name}
          websiteUrl={workspace.websiteUrl}
          logoUrl={workspace.logoUrl}
          description={workspace.description}
        />
      ))}
    </div>
  );
};
