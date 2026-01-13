import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PatientForm from "@/components/patients/PatientForm";
import { Button } from "@/components/ui/button";

const PatientNew = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/patients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Nuevo Paciente
            </h1>
            <p className="text-muted-foreground mt-1">
              Complete la información para registrar un nuevo paciente.
            </p>
          </div>
        </div>

        {/* Form */}
        <PatientForm />
      </div>
    </DashboardLayout>
  );
};

export default PatientNew;
