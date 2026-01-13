import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SessionWizard from "@/components/sessions/SessionWizard";
import { Button } from "@/components/ui/button";

const SessionNew = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/sessions">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Nueva Sesión
            </h1>
            <p className="text-muted-foreground mt-1">
              Registra una nueva sesión clínica para un paciente.
            </p>
          </div>
        </div>

        {/* Wizard */}
        <SessionWizard />
      </div>
    </DashboardLayout>
  );
};

export default SessionNew;
