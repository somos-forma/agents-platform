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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  url: z.string().url().min(5).max(100),
  status: z.enum(["active", "inactive"]).optional(),
  description: z.string().min(5).max(200).optional(),
});

interface AgentAddFormProps {
  onSuccess: (open: boolean) => void;
}

export const AgentAddForm = ({ onSuccess }: AgentAddFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      status: "active",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSuccess(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Agente de SEO" {...field} />
              </FormControl>
              <FormDescription>
                El nombre de tu agente, por ejemplo: "Agente de SEO"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://mi-agente.com" {...field} />
              </FormControl>
              <FormDescription>
                La URL de tu agente, por ejemplo: "https://mi-agente.com"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={field.value === "active"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "active" : "inactive")
                    }
                    aria-readonly
                    id="status"
                  />
                  <Label htmlFor="status">Activo</Label>
                </div>
              </FormControl>
              <FormDescription className="sr-only">
                El estado de tu agente, por defecto está activo
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
                <Textarea placeholder="Descripción del agente" {...field} />
              </FormControl>
              <FormDescription>
                La descripción de tu agente, por ejemplo: "Agente de SEO"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Agregar
        </Button>
      </form>
    </Form>
  );
};
