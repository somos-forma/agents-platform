"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string({ message: "El correo electrónico es obligatorio" })
    .email({ message: "El correo electrónico no es válido" }),
  password: z
    .string({ message: "La contraseña es obligatoria" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return login(data.email, data.password);
    },
    onSuccess: (user) => {
      toast.success("Inicio de sesión exitoso");
      if (user.rol === "admin") {
        router.push("/dashboard/users");
      } else if (user.rol === "user") {
        router.push("/chat");
      }
    },
    onError: (error) => {
      toast.error(`Error al iniciar sesión:  ${error.message}`);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para acceder a la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@empresa.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    El correo electrónico asociado a tu cuenta
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
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    La contraseña asociada a tu cuenta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending && <Spinner />}
              Iniciar sesión
            </Button>
          </form>
        </Form>
        <CardFooter className="justify-center">
          <p className="text-center text-sm text-muted-foreground mt-4">
            ¿No tienes cuenta?{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Contacta al administrador
            </span>
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
