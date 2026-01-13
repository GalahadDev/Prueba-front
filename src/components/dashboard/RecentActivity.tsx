import { ClipboardList, AlertTriangle, UserPlus, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "session" | "incident" | "patient" | "report";
  title: string;
  description: string;
  time: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "session",
    title: "Sesión registrada",
    description: "Ana González - Rehabilitación rodilla",
    time: "Hace 15 min",
  },
  {
    id: "2",
    type: "incident",
    title: "Incidente reportado",
    description: "Carlos Morales - Mareo durante ejercicio",
    time: "Hace 1 hora",
  },
  {
    id: "3",
    type: "patient",
    title: "Nuevo paciente",
    description: "Roberto Sánchez agregado al sistema",
    time: "Hace 2 horas",
  },
  {
    id: "4",
    type: "report",
    title: "Reporte generado",
    description: "Informe mensual - Enero 2026",
    time: "Hace 3 horas",
  },
  {
    id: "5",
    type: "session",
    title: "Sesión completada",
    description: "María López - Terapia ocupacional",
    time: "Hace 5 horas",
  },
];

const typeConfig = {
  session: {
    icon: ClipboardList,
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  incident: {
    icon: AlertTriangle,
    bgColor: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  patient: {
    icon: UserPlus,
    bgColor: "bg-success/10",
    iconColor: "text-success",
  },
  report: {
    icon: FileCheck,
    bgColor: "bg-accent/10",
    iconColor: "text-accent",
  },
};

const RecentActivity = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg">Actividad Reciente</h3>
        <a
          href="#"
          className="text-sm text-primary hover:underline font-medium"
        >
          Ver todo
        </a>
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity, index) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className={cn(
                "flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-muted/50",
                "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn("p-2 rounded-lg shrink-0", config.bgColor)}>
                <Icon className={cn("h-4 w-4", config.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
