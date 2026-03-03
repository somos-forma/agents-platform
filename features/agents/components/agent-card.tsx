import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Bot } from "lucide-react";
import React from "react";

interface AgentCardProps {
  id: string;
  name: string;
  status: boolean;
  description: string;
  onClick?: () => void;
  // isLoading: boolean;
}

export const AgentCard = ({
  id,
  name,
  status,
  description,
  onClick,
}: // isLoading,
AgentCardProps) => {
  return (
    <Card className="border shadow-none rounded-lg ">
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-medium">{name}</h4>
            </div>
            {status ? (
              <Badge className="bg-green-100 text-green-800 dark:text-green-400 dark:bg-green-900/50 text-xs">
                Activo
              </Badge>
            ) : (
              <Badge className="bg-gray-100 text-gray-800 dark:text-gray-400 dark:bg-gray-900/50 text-xs">
                Inactivo
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="text-xs text-muted-foreground">ID:{id}</div>
          <div className="space-x-2">
            <Button
              variant="default"
              size="sm"
              className="w-full"
              onClick={onClick}
              // disabled={isLoading}
            >
              {/* {isLoading && <Spinner />} */}
              Iniciar agente
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
