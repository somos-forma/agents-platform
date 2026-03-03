import { LoginForm } from "@/features/auth/components/LoginForm";
import { Bot, Sparkles, Zap } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header con branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-primary/10 p-4 rounded-full border border-primary/20">
                <Bot className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">Agents Platform</h1>
            <p className="text-muted-foreground text-balance">
              Orquesta y gestiona tus agentes de AI de forma inteligente
            </p>
          </div>
        </div>
        {/* Formulario de Login */}
        <LoginForm />
        {/* Features preview */}
        <div className="grid grid-cols-1 gap-4 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Agentes Inteligentes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Bot className="h-4 w-4 text-primary" />
              <span>Orquestación Avanzada</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Automatización</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
