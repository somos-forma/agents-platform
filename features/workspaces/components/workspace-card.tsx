import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatUrlToDomain } from "@/utils/formatters";
import { Building2, Globe, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface WorkspaceCardProps {
  id: string;
  name: string;
  websiteUrl: string;
  logoUrl?: string;
  description?: string;
  onClick?: () => void;
  onDelete?: () => void;
}
export const WorkspaceCard = ({
  id,
  name,
  websiteUrl,
  logoUrl,
  description,
  onClick,
  onDelete,
}: WorkspaceCardProps) => {
  const clickable = Boolean(onClick);
  const deleteIsVisible = Boolean(onDelete);
  return (
    <Card className="shadow-none cursor-pointer  relative" onClick={onClick}>
      {deleteIsVisible && (
        <>
          <Button
            onClick={onDelete}
            variant="ghost"
            className="absolute top-2 right-2 hover:bg-destructive/10 cursor-pointer"
          >
            <Trash className="h-4 w-4 text-destructive" />
          </Button>
        </>
      )}
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <Image
              className="rounded-lg shrink-0 h-8 w-8 object-contain"
              src={logoUrl}
              width={32}
              height={32}
              alt={name}
            />
          ) : (
            <div className="p-2 rounded-lg bg-neutral-100">
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold">{name.toUpperCase()}</h3>
            {websiteUrl && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                  {formatUrlToDomain(websiteUrl)}
                </a>
              </div>
            )}
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed  line-clamp-3">
            {description}
          </p>
        )}
        {!clickable && (
          <Button size="sm" variant="outline" className="w-full" asChild>
            <Link href={`/dashboard/workspaces/${id}`}>Ver Detalles</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
