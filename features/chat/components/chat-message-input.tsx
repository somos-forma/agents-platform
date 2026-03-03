"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FileSpreadsheet,
  FileText,
  Loader2,
  Paperclip,
  Send,
  X,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChatMessage } from "../hooks/useChatMessage";
import { useCreateChat } from "../hooks/useCreateChat";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const formSchema = z.object({
  message: z.string(),
  attachments: z.instanceof(File).array().optional(),
});

export const ChatMessageInput = () => {
  const { sendMessage, isPending, agent, workspace, user, chatId, setChatId } =
    useChatMessage();

  const createNewChat = useCreateChat();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      attachments: [],
    },
  });

  const attachments = form.watch("attachments") || [];
  const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5MB
  // ---- DROPZONE ----
  const { getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: { "image/*": [], "application/pdf": [], "text/csv": [] }, // solo imágenes
    onDrop: (acceptedFiles) => {
      const current = form.getValues("attachments") || [];
      form.setValue("attachments", [...current, ...acceptedFiles], {
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    validator: (file) => {
      if (file.size > MAX_TOTAL_SIZE) {
        toast.error("Tu archivo excede los 5MB permitidos", {
          position: "bottom-center",
        });

        return {
          code: "file-too-large",
          message: "Un archivo excede los 5MB permitidos",
        };
      }
      return null;
    },
  });

  function removeAttachment(index: number) {
    const current = form.getValues("attachments") || [];
    const updated = current.filter((_, i) => i !== index);
    form.setValue("attachments", updated, { shouldDirty: true });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
    if (!chatId) {
      createNewChat.mutate(
        {
          userId: user?.id!,
          agentId: agent?.id!,
          workspaceId: workspace?.id!,
        },
        {
          onSuccess: (data) => {
            setChatId(data.chatId);
            sendMessage(values);
          },
        }
      );
    } else {
      sendMessage(values);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  function handlePasteClean(
    e: React.ClipboardEvent<HTMLTextAreaElement>,
    onChange: (value: string) => void
  ) {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const cleaned = text.trim();

    const start = e.currentTarget.selectionStart;
    const end = e.currentTarget.selectionEnd;
    const value =
      e.currentTarget.value.substring(0, start) +
      cleaned +
      e.currentTarget.value.substring(end);

    onChange(value);
  }

  function renderFileIcon(file: File) {
    if (file.type === "application/pdf") {
      return <FileText className="text-red-500 w-5 h-5" />;
    }
    if (file.type === "text/csv") {
      return <FileSpreadsheet className="text-green-500 w-5 h-5" />;
    }
    return <Paperclip className="text-muted-foreground w-4 h-4" />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* ---- DROPZONE INPUT INVISIBLE ---- */}
        <input {...getInputProps()} className="hidden" />

        {/* ---- PREVIEW FILES ---- */}
        {attachments.length > 0 && (
          <div className="gap-2 flex flex-wrap">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="bg-[#9c9d8a1a] rounded-md inline-flex items-center p-2 gap-2"
              >
                {/* Vista previa solo si es imagen */}
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-8 h-8 object-cover rounded-md"
                  />
                ) : (
                  renderFileIcon(file)
                )}

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <button type="button" onClick={() => removeAttachment(index)}>
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        {/* input */}
        <div className="relative">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[60px] max-h-[200px] bg-input/40 border-0"
                    placeholder="En qué puedo ayudarte hoy?"
                    disabled={isPending}
                    onKeyDown={handleKeyDown}
                    onPaste={(e) => handlePasteClean(e, field.onChange)}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  Escribe tu consulta detalladamente para mejores resultados
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {agent?.supportsFiles && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
              aria-label="Subir archivo"
              onClick={open}
            >
              <Paperclip className="w-4 h-4" />
            </Button>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Estás interactuando con un agente en fase Beta. Por favor verifica
            la información crítica y reporta cualquier error a tu representante
            de Moov Media Group.
          </p>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
};
