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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DualListBox } from "@/components/dual-list-box";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWorkspaces } from "@/features/workspaces/services/workspace";
import { Skeleton } from "@/components/ui/skeleton";
import { createUser } from "../services/user";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "../store";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50),
  email: z
    .string()
    .email({ message: "El correo electrónico no es válido" })
    .min(5, {
      message: "El correo electrónico debe tener al menos 5 caracteres",
    })
    .max(100),
  role: z.enum(["admin", "user"]),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(100),
  workspaces: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
      { message: "Se requiere al menos un workspace" }
    )
    .optional(),
});

export const UserAddForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      password: "",
      workspaces: [],
    },
  });
  const { closeAddModal } = useUserStore();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      closeAddModal();
      toast.success("Usuario creado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(`Error al crear el usuario: ${error.message}`);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  const allworkspaces =
    data?.map((workspace: any) => ({
      value: workspace.id,
      label: workspace.name,
    })) || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Jose alcántara" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  El nombre completo del usuario, por ejemplo: "Jose Alcántara"
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jose@ejemplo.com" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  El correo electrónico del usuario, debe ser único
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol del usuario</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="user">Usuario</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="sr-only">
                  El rol del usuario, puede ser "administrador" o "usuario"
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Escribe una contraseña segura"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  La contraseña del usuario, debe tener al menos 6 caracteres
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="workspaces"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Workspaces</FormLabel>
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
                ) : (
                  <DualListBox
                    label="Workspaces"
                    options={allworkspaces}
                    values={field.value || []}
                    onChange={field.onChange}
                  />
                )}
              </FormControl>
              <FormDescription className="sr-only">
                El ID del workspace al que pertenece el usuario
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending} className="w-full">
          {mutation.isPending && <Spinner />}
          Agregar
        </Button>
      </form>
    </Form>
  );
};
