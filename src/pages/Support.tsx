import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HelpCircle, Send, MessageSquare, Clock, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ticketSchema = z.object({
  subject: z.string().min(5, "El asunto debe tener al menos 5 caracteres"),
  message: z.string().min(20, "El mensaje debe tener al menos 20 caracteres"),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  adminResponse?: string;
  createdAt: string;
}

const mockTickets: Ticket[] = [
  {
    id: "1",
    subject: "Problema al subir PDF",
    message: "No puedo subir el consentimiento informado de un paciente...",
    status: "CLOSED",
    adminResponse: "El problema fue solucionado. Por favor, intente nuevamente.",
    createdAt: "2026-01-10",
  },
  {
    id: "2",
    subject: "Error al generar reporte",
    message: "Al intentar generar el reporte mensual aparece un error...",
    status: "IN_PROGRESS",
    createdAt: "2026-01-12",
  },
];

const statusConfig = {
  OPEN: { label: "Abierto", class: "bg-warning/10 text-warning border-warning/30" },
  IN_PROGRESS: { label: "En Proceso", class: "bg-primary/10 text-primary border-primary/30" },
  CLOSED: { label: "Cerrado", class: "bg-success/10 text-success border-success/30" },
};

const Support = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newTicket: Ticket = {
        id: String(tickets.length + 1),
        subject: data.subject,
        message: data.message,
        status: "OPEN",
        createdAt: new Date().toISOString().split("T")[0],
      };

      setTickets((prev) => [newTicket, ...prev]);
      form.reset();
      toast.success("Ticket creado exitosamente");
    } catch (error) {
      toast.error("Error al crear el ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 medical-gradient rounded-xl">
            <HelpCircle className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Centro de Soporte
            </h1>
            <p className="text-muted-foreground">
              ¿Necesitas ayuda? Envía un ticket y te responderemos pronto.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* New Ticket Form */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Nuevo Ticket
            </h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asunto</FormLabel>
                      <FormControl>
                        <Input placeholder="Describe brevemente el problema" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe el problema en detalle..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar Ticket"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Mis Tickets
            </h3>

            {tickets.length > 0 ? (
              tickets.map((ticket, index) => {
                const status = statusConfig[ticket.status];

                return (
                  <div
                    key={ticket.id}
                    className="bg-card border border-border rounded-xl p-5 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h4 className="font-medium text-foreground">{ticket.subject}</h4>
                      <Badge variant="outline" className={status.class}>
                        {status.label}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {ticket.message}
                    </p>

                    {ticket.adminResponse && (
                      <div className="bg-success/5 border border-success/20 rounded-lg p-3 mt-3">
                        <p className="text-sm text-success flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
                          <span>{ticket.adminResponse}</span>
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ticket.createdAt}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 bg-card border border-border rounded-xl">
                <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No tienes tickets aún.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
