import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, UserPlus, Filter } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PatientCard from "@/components/patients/PatientCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Patient } from "@/types";

// Mock data for demonstration
const mockPatients: (Patient & { incidentCount?: number; lastSession?: string })[] = [
  {
    id: "1",
    creator_id: "user1",
    personal_info: {
      first_name: "Ana",
      last_name: "González",
      rut: "12.345.678-9",
      birth_date: "1990-05-15",
      email: "ana@email.com",
      phone: "+56 9 1234 5678",
      diagnosis: "Rehabilitación post-operatoria de rodilla izquierda",
    },
    consent_pdf_url: "https://example.com/consent.pdf",
    created_at: "2026-01-01",
    updated_at: "2026-01-10",
    incidentCount: 0,
    lastSession: "Hace 2 días",
  },
  {
    id: "2",
    creator_id: "user1",
    personal_info: {
      first_name: "Carlos",
      last_name: "Morales",
      rut: "14.567.890-1",
      birth_date: "1985-08-22",
      email: "carlos@email.com",
      phone: "+56 9 8765 4321",
      diagnosis: "Lumbalgia crónica",
    },
    consent_pdf_url: "https://example.com/consent2.pdf",
    created_at: "2025-12-15",
    updated_at: "2026-01-12",
    incidentCount: 2,
    lastSession: "Hoy",
  },
  {
    id: "3",
    creator_id: "user1",
    personal_info: {
      first_name: "Roberto",
      last_name: "Sánchez",
      rut: "16.789.012-3",
      birth_date: "1978-03-10",
      email: "roberto@email.com",
      phone: "+56 9 5555 1234",
      diagnosis: "Parálisis facial periférica",
    },
    consent_pdf_url: "https://example.com/consent3.pdf",
    created_at: "2026-01-05",
    updated_at: "2026-01-11",
    incidentCount: 1,
    lastSession: "Hace 1 semana",
  },
  {
    id: "4",
    creator_id: "user1",
    personal_info: {
      first_name: "María",
      last_name: "López",
      rut: "18.901.234-5",
      birth_date: "1992-11-28",
      diagnosis: "Síndrome del túnel carpiano bilateral",
    },
    consent_pdf_url: "https://example.com/consent4.pdf",
    created_at: "2026-01-08",
    updated_at: "2026-01-13",
    incidentCount: 0,
    lastSession: "Hace 3 días",
  },
];

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = mockPatients.filter((patient) => {
    const fullName = `${patient.personal_info.first_name} ${patient.personal_info.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Pacientes
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestiona tu lista de pacientes y sus fichas clínicas.
            </p>
          </div>
          <Link to="/patients/new">
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Nuevo Paciente
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar paciente por nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Patient List */}
        <div className="space-y-3">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
              <div
                key={patient.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PatientCard
                  patient={patient}
                  incidentCount={patient.incidentCount}
                  lastSession={patient.lastSession}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <p className="text-muted-foreground">
                No se encontraron pacientes con ese criterio.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
