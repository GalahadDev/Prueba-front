import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, User, Phone, Mail, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const patientSchema = z.object({
  first_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  rut: z.string().min(8, "Ingrese un RUT válido"),
  birth_date: z.string().min(1, "Fecha de nacimiento requerida"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  phone: z.string().optional(),
  diagnosis: z.string().optional(),
  disability_report: z.string().optional(),
  care_notes: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

const PatientForm = () => {
  const navigate = useNavigate();
  const [consentFile, setConsentFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      rut: "",
      birth_date: "",
      email: "",
      phone: "",
      diagnosis: "",
      disability_report: "",
      care_notes: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Solo se permiten archivos PDF");
        return;
      }
      setConsentFile(file);
    }
  };

  const onSubmit = async (data: PatientFormData) => {
    if (!consentFile) {
      toast.error("Debe subir el consentimiento informado");
      return;
    }

    setIsUploading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Paciente registrado exitosamente");
      navigate("/patients");
    } catch (error) {
      toast.error("Error al registrar paciente");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Información Personal
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido *</FormLabel>
                  <FormControl>
                    <Input placeholder="Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUT *</FormLabel>
                  <FormControl>
                    <Input placeholder="12.345.678-9" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Nacimiento *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
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
                    <Input type="email" placeholder="paciente@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="+56 9 1234 5678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Clinical Information Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Información Clínica
          </h3>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnóstico Principal</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describa el diagnóstico del paciente..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disability_report"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informe de Discapacidad</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detalles del informe de discapacidad (si aplica)..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="care_notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas de Cuidado</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Indicaciones especiales de cuidado..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Consent Upload Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Consentimiento Informado
          </h3>

          <div className="space-y-4">
            <Label>PDF de Consentimiento *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="consent-upload"
              />
              <label
                htmlFor="consent-upload"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <div className="p-4 bg-primary/10 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                {consentFile ? (
                  <div className="text-center">
                    <p className="font-medium text-foreground">{consentFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(consentFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="font-medium text-foreground">
                      Haga clic para subir o arrastre el archivo
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Solo archivos PDF (máx. 10 MB)
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Guardando..." : "Registrar Paciente"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PatientForm;
