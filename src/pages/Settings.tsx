import { useState } from "react";
import { Settings as SettingsIcon, User, Bell, Shield, Save } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const Settings = () => {
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock user data
  const [profile, setProfile] = useState({
    fullName: "Dr. María García",
    email: "maria.garcia@clinica.com",
    specialty: "Kinesiología",
    phone: "+56 9 1234 5678",
  });

  const [notifications, setNotifications] = useState({
    emailIncidents: true,
    emailReports: true,
    emailInvitations: true,
    pushNotifications: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Configuración guardada exitosamente");
    setIsSaving(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 medical-gradient rounded-xl">
            <SettingsIcon className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Configuración
            </h1>
            <p className="text-muted-foreground">
              Gestiona tu perfil y preferencias.
            </p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Perfil Profesional
          </h3>

          <div className="flex items-center gap-6 mb-6">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                MG
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                Cambiar Foto
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG. Máximo 2MB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad</Label>
              <Input
                id="specialty"
                value={profile.specialty}
                onChange={(e) =>
                  setProfile({ ...profile, specialty: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notificaciones
          </h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertas de Incidentes</p>
                <p className="text-sm text-muted-foreground">
                  Recibe un email cuando se reporte un incidente.
                </p>
              </div>
              <Switch
                checked={notifications.emailIncidents}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, emailIncidents: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reportes Generados</p>
                <p className="text-sm text-muted-foreground">
                  Notificación cuando un reporte esté listo.
                </p>
              </div>
              <Switch
                checked={notifications.emailReports}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, emailReports: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Invitaciones de Colaboración</p>
                <p className="text-sm text-muted-foreground">
                  Aviso cuando te inviten a un caso.
                </p>
              </div>
              <Switch
                checked={notifications.emailInvitations}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, emailInvitations: checked })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificaciones Push</p>
                <p className="text-sm text-muted-foreground">
                  Notificaciones en tiempo real en el navegador.
                </p>
              </div>
              <Switch
                checked={notifications.pushNotifications}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, pushNotifications: checked })
                }
              />
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Seguridad
          </h3>

          <div className="space-y-4">
            <Button variant="outline">
              Cambiar Contraseña
            </Button>
            <p className="text-sm text-muted-foreground">
              Última actualización: Hace 30 días
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
