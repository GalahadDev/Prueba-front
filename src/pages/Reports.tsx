import { useState } from "react";
import { FileText, Download, Calendar, Filter, Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Report {
  id: string;
  patientName: string;
  type: "individual" | "master";
  dateRange: string;
  content: string;
  createdAt: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    patientName: "Ana González",
    type: "individual",
    dateRange: "Enero 2026",
    content: "Resumen mensual de rehabilitación post-operatoria...",
    createdAt: "2026-01-10",
  },
  {
    id: "2",
    patientName: "Carlos Morales",
    type: "master",
    dateRange: "Diciembre 2025",
    content: "Reporte consolidado de todos los profesionales...",
    createdAt: "2026-01-05",
  },
  {
    id: "3",
    patientName: "Roberto Sánchez",
    type: "individual",
    dateRange: "Enero 2026",
    content: "Evolución del tratamiento de parálisis facial...",
    createdAt: "2026-01-08",
  },
];

const Reports = () => {
  const [filter, setFilter] = useState<string>("all");

  const filteredReports = mockReports.filter((report) => {
    if (filter === "all") return true;
    return report.type === filter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Reportes
            </h1>
            <p className="text-muted-foreground mt-1">
              Genera y gestiona informes clínicos de tus pacientes.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Reporte
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockReports.length}</p>
                <p className="text-sm text-muted-foreground">Total Reportes</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockReports.filter((r) => r.type === "individual").length}
                </p>
                <p className="text-sm text-muted-foreground">Individuales</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <FileText className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockReports.filter((r) => r.type === "master").length}
                </p>
                <p className="text-sm text-muted-foreground">Maestros</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="individual">Individuales</SelectItem>
              <SelectItem value="master">Maestros</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report, index) => (
            <div
              key={report.id}
              className="bg-card border border-border rounded-xl p-5 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "p-3 rounded-xl",
                      report.type === "master"
                        ? "bg-success/10 text-success"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">
                        {report.patientName}
                      </h4>
                      <Badge
                        variant="outline"
                        className={cn(
                          report.type === "master"
                            ? "border-success/50 text-success bg-success/5"
                            : "border-primary/50 text-primary bg-primary/5"
                        )}
                      >
                        {report.type === "master" ? "Maestro" : "Individual"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <Calendar className="h-3 w-3" />
                      {report.dateRange}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {report.content}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 sm:flex-col">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Descargar
                  </Button>
                  <Button variant="ghost" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
