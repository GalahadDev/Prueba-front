import { useState } from "react";
import { Bell, Check, Trash2, UserPlus, AlertTriangle, FileText } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  type: "invitation" | "incident" | "report" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "invitation",
    title: "Nueva invitación de colaboración",
    message: "Dr. Juan Pérez te ha invitado a colaborar en el caso de Ana González.",
    isRead: false,
    createdAt: "Hace 10 min",
  },
  {
    id: "2",
    type: "incident",
    title: "Incidente reportado",
    message: "Se ha registrado un incidente en la sesión de Carlos Morales.",
    isRead: false,
    createdAt: "Hace 1 hora",
  },
  {
    id: "3",
    type: "report",
    title: "Reporte disponible",
    message: "El reporte mensual de Roberto Sánchez está listo para revisión.",
    isRead: true,
    createdAt: "Hace 3 horas",
  },
  {
    id: "4",
    type: "system",
    title: "Actualización del sistema",
    message: "Se han agregado nuevas funcionalidades a la bitácora médica.",
    isRead: true,
    createdAt: "Ayer",
  },
];

const typeConfig = {
  invitation: {
    icon: UserPlus,
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  incident: {
    icon: AlertTriangle,
    bgColor: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  report: {
    icon: FileText,
    bgColor: "bg-success/10",
    iconColor: "text-success",
  },
  system: {
    icon: Bell,
    bgColor: "bg-muted",
    iconColor: "text-muted-foreground",
  },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Notificaciones
            </h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount > 0
                ? `Tienes ${unreadCount} notificaciones sin leer`
                : "Todas las notificaciones leídas"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Marcar todas como leídas
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;

              return (
                <div
                  key={notification.id}
                  className={cn(
                    "bg-card border rounded-xl p-5 transition-all animate-fade-in-up",
                    notification.isRead
                      ? "border-border"
                      : "border-primary/30 bg-primary/5"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn("p-2 rounded-lg shrink-0", config.bgColor)}>
                      <Icon className={cn("h-5 w-5", config.iconColor)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className={cn(
                            "font-medium",
                            notification.isRead
                              ? "text-foreground"
                              : "text-foreground font-semibold"
                          )}
                        >
                          {notification.title}
                        </h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.createdAt}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>

                      <div className="flex gap-2 mt-3">
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Marcar como leída
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No tienes notificaciones.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
