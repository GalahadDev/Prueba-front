import { Link } from "react-router-dom";
import { UserPlus, ClipboardPlus, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuickActionProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  href: string;
  variant?: "primary" | "secondary";
}

const actions: QuickActionProps[] = [
  {
    icon: UserPlus,
    label: "Nuevo Paciente",
    description: "Registrar nuevo paciente",
    href: "/patients/new",
    variant: "primary",
  },
  {
    icon: ClipboardPlus,
    label: "Nueva Sesión",
    description: "Registrar sesión clínica",
    href: "/sessions/new",
    variant: "primary",
  },
  {
    icon: FileText,
    label: "Crear Reporte",
    description: "Generar informe mensual",
    href: "/reports/new",
  },
  {
    icon: Users,
    label: "Invitar Profesional",
    description: "Agregar colaborador",
    href: "/collaborations/invite",
  },
];

const QuickActions = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-display font-semibold text-lg mb-4">Acciones Rápidas</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const isPrimary = action.variant === "primary";
          
          return (
            <Link key={action.href} to={action.href}>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-auto flex flex-col items-center gap-2 p-4 transition-all hover:shadow-md",
                  isPrimary && "border-primary/50 hover:bg-primary/5",
                  "animate-scale-in"
                )}
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    isPrimary ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{action.label}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {action.description}
                  </p>
                </div>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
