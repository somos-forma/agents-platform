import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Building2, Globe, Workflow } from "lucide-react";
import { formatUrlToDomain } from "@/utils/formatters";
interface WorkspaceDetailsCardProps {
  name: string;
  website: string;
  logoUrl?: string;
  description?: string;
}
export const WorkspaceDetailsCard = ({
  name,
  website,
  logoUrl,
  description,
}: WorkspaceDetailsCardProps) => {
  return (
    <Card className="shadow-none">
      <CardContent>
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <Image
              className="rounded-lg shrink-0 h-10 w-10"
              src={logoUrl}
              width={40}
              height={40}
              alt="forma"
            />
          ) : (
            <div className="p-2 rounded-lg bg-neutral-100">
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold uppercase">{name}</h3>
            <div className="flex gap-4">
              {website && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {formatUrlToDomain(website)}
                  </a>
                </div>
              )}

              {/* <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Workflow strokeWidth={1.5} size={16} /> 3 de 3 agentes activos
              </p> */}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
