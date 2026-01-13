import { Users, ClipboardList, AlertTriangle, Calendar } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Bienvenido de vuelta. Aquí está el resumen de tu actividad.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Pacientes"
            value={24}
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
            description="4 nuevos este mes"
          />
          <StatsCard
            title="Sesiones del Mes"
            value={48}
            icon={<ClipboardList className="h-6 w-6" />}
            trend={{ value: 8, isPositive: true }}
            description="Promedio: 12 por semana"
          />
          <StatsCard
            title="Incidentes"
            value={3}
            icon={<AlertTriangle className="h-6 w-6" />}
            trend={{ value: 25, isPositive: false }}
            description="Este mes"
          />
          <StatsCard
            title="Próximas Citas"
            value={7}
            icon={<Calendar className="h-6 w-6" />}
            description="Para esta semana"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
