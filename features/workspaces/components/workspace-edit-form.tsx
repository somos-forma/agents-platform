"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DualListBox } from "@/components/dual-list-box";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWorkspaceById, updateWorkspace } from "../services/workspace";
import { getAgents } from "@/features/agents/services/agent";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre debe tener como máximo 50 caracteres" }),
  websiteUrl: z
    .string()
    .url()
    .min(5, { message: "La URL debe tener al menos 5 caracteres" })
    .max(500, { message: "La URL debe tener como máximo 500 caracteres" }),
  logoUrl: z
    .string()
    .url()
    .min(5, { message: "La URL debe tener al menos 5 caracteres" })
    .max(500, { message: "La URL debe tener como máximo 500 caracteres" })
    .optional(),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(500, {
      message: "La descripción debe tener como máximo 500 caracteres",
    })
    .optional(),
  agents: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
      { message: "Se requiere al menos un agente" }
    )
    .optional(),
});

export const WorkspaceEditForm = ({ id }: { id: string }) => {
  const {
    isLoading: isLoadingWorkspace,
    error: isErrorWorkspace,
    data: workspace,
  } = useQuery({
    queryKey: ["workspaceEditForm", id],
    queryFn: () => getWorkspaceById(id),
    enabled: !!id,
  });

  const {
    isLoading: isLoadingAgents,
    error: isErrorAgents,
    data: agents,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      websiteUrl: "",
      logoUrl: "",
      description: "",
      agents: [],
    },
  });

  useEffect(() => {
    if (workspace) {
      form.reset({
        name: workspace.name || "",
        websiteUrl: workspace.websiteUrl || "",
        logoUrl: workspace.logoUrl || "",
        description: workspace.description || "",
        agents:
          workspace.agents?.map((agent: any) => ({
            value: agent.id,
            label: agent.name,
          })) || [],
      });
    }
  }, [workspace, form]);

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      const payload = {
        name: data.name,
        description: data.description,
        agent_id: data.agents
          ? data.agents.map((agent: any) => ({ id: agent.value }))
          : [],
        url_logo: data.logoUrl,
        website_url: data.websiteUrl,
      };
      return updateWorkspace(id, payload);
    },
    onSuccess: () => {
      toast.success("Workspace actualizado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      router.push("/dashboard/workspaces");
    },
    onError: (error) => {
      toast.error(`Error al actualizar el workspace: ${error.message}`);
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  if (isLoadingWorkspace || isLoadingAgents) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-2">
          <Skeleton className="h-11 w-1/2 rounded-md" />
          <Skeleton className="h-11 w-1/2 rounded-md" />
        </div>
        <Skeleton className="h-11 w-full rounded-md" />
        <Skeleton className="h-[160px] w-full rounded-md" />
        <div className="flex gap-[100px]">
          <div className="flex-1">
            <Skeleton className="h-6 w-1/2 rounded-md mb-3" />
            <div className="h-48  border rounded-md p-2 space-y-1 ">
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-full rounded-md" />
            </div>
          </div>
          <div className="flex-1">
            <Skeleton className="h-6 w-1/2 rounded-md mb-3" />
            <div className="h-48  border rounded-md p-2 space-y-1 ">
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-6 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isErrorWorkspace) {
    return <div>Error al cargar el workspace.</div>;
  }

  const allAgents =
    agents?.map((agent: any) => ({
      value: agent.id,
      label: agent.name,
    })) || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corp" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  El nombre oficial de la empresa.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sitio web</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.acme.com" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  La URL del sitio web de la empresa.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="logoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL del logo</FormLabel>
              <FormControl>
                <Input placeholder="https://www.acme.com/logo.png" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                La URL del logo de la empresa (opcional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Acme Corp es una empresa líder en..."
                  {...field}
                />
              </FormControl>
              <FormDescription className="sr-only">
                Una breve descripción de la empresa (opcional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agents"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Agentes</FormLabel>
              <FormControl>
                {isLoadingAgents ? (
                  <div className="flex gap-[100px]">
                    <div className="flex-1">
                      <Skeleton className="h-6 w-1/2 rounded-md mb-3" />
                      <div className="h-48  border rounded-md p-2 space-y-1 ">
                        <Skeleton className="h-6 w-full rounded-md" />
                        <Skeleton className="h-6 w-full rounded-md" />
                        <Skeleton className="h-6 w-full rounded-md" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Skeleton className="h-6 w-1/2 rounded-md mb-3" />
                      <div className="h-48  border rounded-md p-2 space-y-1 ">
                        <Skeleton className="h-6 w-full rounded-md" />
                        <Skeleton className="h-6 w-full rounded-md" />
                        <Skeleton className="h-6 w-full rounded-md" />
                      </div>
                    </div>
                  </div>
                ) : isErrorAgents ? (
                  <div>Error al cargar los agentes.</div>
                ) : (
                  <DualListBox
                    label="Agentes"
                    options={allAgents}
                    values={field.value || []}
                    onChange={field.onChange}
                  />
                )}
              </FormControl>
              <FormDescription className="sr-only">
                Los agentes asociados a este workspace (opcional).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending && <Spinner />}
          Guardar
        </Button>
      </form>
    </Form>
  );
};
