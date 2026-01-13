import { Patient } from "@/types";
import { Link } from "react-router-dom";
import { Calendar, Phone, Mail, AlertTriangle, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PatientCardProps {
  patient: Patient;
  incidentCount?: number;
  lastSession?: string;
}

const PatientCard = ({ patient, incidentCount = 0, lastSession }: PatientCardProps) => {
  const { personal_info } = patient;
  const fullName = `${personal_info.first_name} ${personal_info.last_name}`;
  const initials = `${personal_info.first_name[0]}${personal_info.last_name[0]}`;

  return (
    <Link to={`/patients/${patient.id}`}>
      <div className="patient-card group">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground truncate">{fullName}</h4>
              {incidentCount > 0 && (
                <Badge variant="outline" className="border-destructive/50 text-destructive bg-destructive/5 text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {incidentCount}
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-2 truncate">
              {personal_info.diagnosis || "Sin diagnóstico registrado"}
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              {personal_info.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {personal_info.phone}
                </span>
              )}
              {lastSession && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Última sesión: {lastSession}
                </span>
              )}
            </div>
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );
};

export default PatientCard;
