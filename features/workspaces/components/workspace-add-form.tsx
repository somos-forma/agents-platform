"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DualListBox } from "@/components/dual-list-box";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAgents } from "@/features/agents/services/agent";
import { Agent } from "@/features/agents/model";
import { createWorkspace } from "../services/workspace";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50),

  websiteUrl: z
    .string()
    .url({ message: "URL del sitio web inválida" })
    .min(5, { message: "El sitio web debe tener al menos 5 caracteres" })
    .max(100),
  logoUrl: z
    .string()
    .url({ message: "URL del logo inválida" })
    .min(5, { message: "La URL del logo debe tener al menos 5 caracteres" })
    .optional(),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(500)
    .optional(),
  agents: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    }),
    { message: "Se requiere al menos un agente" }
  ),
});

export const WorkspaceAddForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: agents,
  } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  const mutation = useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      form.reset();
      toast.success("Workspace creado con éxito");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      router.push("/dashboard/workspaces");
    },
    onError: (error: any) => {
      toast.error(`Error al crear el workspace: ${error.message}`);
    },
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  const allAgents =
    agents?.map((agent: Agent) => ({
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
                  <Input
                    className=" uppercase"
                    placeholder="Acme Corp"
                    {...field}
                  />
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
                {isLoading ? (
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
                ) : error ? (
                  <div>Error al cargar agentes</div>
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
        <Button type="submit" disabled={mutation.isPending} className="">
          {mutation.isPending && <Spinner />}
          Agregar
        </Button>
      </form>
    </Form>
  );
};
