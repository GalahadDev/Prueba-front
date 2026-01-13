import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Check,
  ClipboardList,
  Activity,
  Camera,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const sessionSchema = z.object({
  patient_id: z.string().min(1, "Seleccione un paciente"),
  intervention_plan: z.string().min(10, "Describa el plan de intervención"),
  description: z.string().min(20, "La descripción debe tener al menos 20 caracteres"),
  achievements: z.string().optional(),
  patient_performance: z.string().optional(),
  next_session_notes: z.string().optional(),
  // Vitals
  fc: z.coerce.number().min(30).max(250).optional().or(z.literal("")),
  pa: z.string().optional(),
  pain: z.coerce.number().min(0).max(10).optional().or(z.literal("")),
  temp: z.coerce.number().min(30).max(45).optional().or(z.literal("")),
  spo2: z.coerce.number().min(0).max(100).optional().or(z.literal("")),
  // Incident
  has_incident: z.boolean().default(false),
  incident_details: z.string().optional(),
});

type SessionFormData = z.infer<typeof sessionSchema>;

const steps = [
  { id: 1, title: "Intervención", icon: ClipboardList },
  { id: 2, title: "Signos Vitales", icon: Activity },
  { id: 3, title: "Evidencia", icon: Camera },
  { id: 4, title: "Incidentes", icon: AlertTriangle },
];

// Mock patients for demo
const mockPatients = [
  { id: "1", name: "Ana González" },
  { id: "2", name: "Carlos Morales" },
  { id: "3", name: "Roberto Sánchez" },
  { id: "4", name: "María López" },
];

const SessionWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [incidentPhoto, setIncidentPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      patient_id: "",
      intervention_plan: "",
      description: "",
      achievements: "",
      patient_performance: "",
      next_session_notes: "",
      has_incident: false,
      incident_details: "",
    },
  });

  const hasIncident = form.watch("has_incident");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPhotos((prev) => [...prev, ...newPhotos].slice(0, 5));
    }
  };

  const handleIncidentPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIncidentPhoto(URL.createObjectURL(file));
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: SessionFormData) => {
    if (data.has_incident && !data.incident_details) {
      toast.error("Debe describir el incidente");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Sesión registrada exitosamente");
      navigate("/sessions");
    } catch (error) {
      toast.error("Error al registrar la sesión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-xl transition-all",
                    isActive && "bg-primary text-primary-foreground",
                    isCompleted && "bg-success/10 text-success",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                  <span className="hidden sm:inline font-medium text-sm">
                    {step.title}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-8 sm:w-16 mx-2",
                      isCompleted ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Intervention */}
          {currentStep === 1 && (
            <div className="bg-card border border-border rounded-xl p-6 animate-fade-in space-y-6">
              <h3 className="font-display font-semibold text-lg">
                Plan de Intervención
              </h3>

              <FormField
                control={form.control}
                name="patient_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paciente *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un paciente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockPatients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="intervention_plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan de Intervención *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describa el plan de tratamiento para esta sesión..."
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción de la Sesión *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detalle las actividades realizadas..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="achievements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logros Alcanzados</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa los logros..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patient_performance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desempeño del Paciente</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Evalúe el desempeño..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="next_session_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas para Próxima Sesión</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Indicaciones para la siguiente sesión..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 2: Vitals */}
          {currentStep === 2 && (
            <div className="bg-card border border-border rounded-xl p-6 animate-fade-in space-y-6">
              <h3 className="font-display font-semibold text-lg">
                Signos Vitales
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete los signos vitales que sean relevantes para esta sesión.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="fc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frecuencia Cardíaca</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="80"
                            {...field}
                            className="pr-12"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            bpm
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Presión Arterial</FormLabel>
                      <FormControl>
                        <Input placeholder="120/80" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escala de Dolor (0-10)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={10}
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="temp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperatura</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="36.5"
                            {...field}
                            className="pr-10"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            °C
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="spo2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SpO2</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            placeholder="98"
                            {...field}
                            className="pr-8"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            %
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 3: Evidence Photos */}
          {currentStep === 3 && (
            <div className="bg-card border border-border rounded-xl p-6 animate-fade-in space-y-6">
              <h3 className="font-display font-semibold text-lg">
                Evidencia Fotográfica
              </h3>
              <p className="text-sm text-muted-foreground">
                Suba hasta 5 fotos de evidencia de la sesión.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border">
                    <img
                      src={photo}
                      alt={`Evidencia ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {photos.length < 5 && (
                  <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      multiple
                    />
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Agregar foto</span>
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Incidents */}
          {currentStep === 4 && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                <h3 className="font-display font-semibold text-lg">
                  Reporte de Incidentes
                </h3>

                <FormField
                  control={form.control}
                  name="has_incident"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          ¿Hubo algún incidente?
                        </FormLabel>
                        <FormDescription>
                          Marque si ocurrió algún evento adverso durante la sesión
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {hasIncident && (
                <div className="incident-alert space-y-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    <h4 className="font-semibold">Detalles del Incidente</h4>
                  </div>

                  <FormField
                    control={form.control}
                    name="incident_details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción del Incidente *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describa detalladamente lo ocurrido..."
                            className="min-h-[120px] bg-card"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label>Foto del Incidente</Label>
                    <div className="mt-2">
                      {incidentPhoto ? (
                        <div className="relative w-48 aspect-video rounded-lg overflow-hidden border border-destructive/30">
                          <img
                            src={incidentPhoto}
                            alt="Incidente"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setIncidentPhoto(null)}
                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="w-48 aspect-video rounded-lg border-2 border-dashed border-destructive/30 hover:border-destructive/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleIncidentPhotoUpload}
                            className="hidden"
                          />
                          <Camera className="h-6 w-6 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Agregar foto
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>

            {currentStep < 4 ? (
              <Button type="button" onClick={nextStep}>
                Siguiente
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Registrar Sesión"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SessionWizard;
