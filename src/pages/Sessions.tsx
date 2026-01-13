import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Filter, Calendar, AlertTriangle, User } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Session } from "@/types";

// Mock data
const mockSessions: (Session & { patientName: string })[] = [
  {
    id: "1",
    patient_id: "1",
    professional_id: "user1",
    intervention_plan: "Fortalecimiento de cuádriceps",
    description: "Paciente realizó 3 series de 10 repeticiones de ejercicios...",
    achievements: "Aumento de rango articular en 15 grados",
    patient_performance: "Excelente",
    has_incident: false,
    created_at: "2026-01-13T10:30:00",
    updated_at: "2026-01-13T10:30:00",
    patientName: "Ana González",
  },
  {
    id: "2",
    patient_id: "2",
    professional_id: "user1",
    intervention_plan: "Terapia manual lumbar",
    description: "Se realizó movilización articular y liberación miofascial...",
    achievements: "Disminución del dolor de 7 a 4 en escala EVA",
    patient_performance: "Buena",
    has_incident: true,
    incident_details: "Paciente presentó mareo leve durante ejercicio de flexión",
    created_at: "2026-01-12T14:00:00",
    updated_at: "2026-01-12T14:00:00",
    patientName: "Carlos Morales",
  },
  {
    id: "3",
    patient_id: "3",
    professional_id: "user1",
    intervention_plan: "Estimulación eléctrica y ejercicios faciales",
    description: "Aplicación de TENS y ejercicios de mímica facial...",
    achievements: "Mejora en simetría facial",
    patient_performance: "Regular",
    has_incident: false,
    created_at: "2026-01-11T09:00:00",
    updated_at: "2026-01-11T09:00:00",
    patientName: "Roberto Sánchez",
  },
  {
    id: "4",
    patient_id: "4",
    professional_id: "user1",
    intervention_plan: "Terapia ocupacional - manos",
    description: "Ejercicios de destreza manual y fortalecimiento...",
    achievements: "Mejora en fuerza de prensión",
    patient_performance: "Excelente",
    has_incident: false,
    created_at: "2026-01-10T16:30:00",
    updated_at: "2026-01-10T16:30:00",
    patientName: "María López",
  },
];

const Sessions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterIncidents, setFilterIncidents] = useState(false);

  const filteredSessions = mockSessions.filter((session) => {
    const matchesSearch = session.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.intervention_plan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterIncidents ? session.has_incident : true;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CL", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Sesiones
            </h1>
            <p className="text-muted-foreground mt-1">
              Registro de todas las sesiones clínicas.
            </p>
          </div>
          <Link to="/sessions/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Sesión
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por paciente o intervención..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={filterIncidents ? "default" : "outline"}
            className="gap-2"
            onClick={() => setFilterIncidents(!filterIncidents)}
          >
            <AlertTriangle className="h-4 w-4" />
            Solo Incidentes
          </Button>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session, index) => (
              <div
                key={session.id}
                className={cn(
                  "bg-card border rounded-xl p-5 transition-all hover:shadow-md animate-fade-in-up",
                  session.has_incident ? "border-destructive/30" : "border-border"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {session.patientName}
                          </h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(session.created_at)}
                          </p>
                        </div>
                      </div>
                      {session.has_incident && (
                        <Badge variant="outline" className="border-destructive/50 text-destructive bg-destructive/5">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Incidente
                        </Badge>
                      )}
                    </div>

                    <div>
                      <p className="font-medium text-sm text-foreground mb-1">
                        {session.intervention_plan}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {session.description}
                      </p>
                    </div>

                    {session.achievements && (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Logros: {session.achievements}
                        </Badge>
                      </div>
                    )}

                    {session.has_incident && session.incident_details && (
                      <div className="incident-alert mt-3">
                        <p className="text-sm text-destructive">
                          <strong>Incidente:</strong> {session.incident_details}
                        </p>
                      </div>
                    )}
                  </div>

                  <Link to={`/sessions/${session.id}`}>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <p className="text-muted-foreground">
                No se encontraron sesiones con ese criterio.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sessions;
