import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,
  Bell,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  Activity,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Pacientes", href: "/patients", icon: Users },
  { label: "Sesiones", href: "/sessions", icon: ClipboardList },
  { label: "Reportes", href: "/reports", icon: FileText },
];

const secondaryNavItems: NavItem[] = [
  { label: "Notificaciones", href: "/notifications", icon: Bell, badge: 3 },
  { label: "Soporte", href: "/support", icon: HelpCircle },
  { label: "Configuración", href: "/settings", icon: Settings },
];

const adminNavItems: NavItem[] = [
  { label: "Panel Admin", href: "/admin", icon: Shield },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock user for demo
  const mockUser = {
    name: "Dr. María García",
    email: "maria.garcia@clinica.com",
    specialty: "Kinesiología",
    avatar: "",
    role: "PROFESSIONAL" as const,
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        to={item.href}
        className={cn("nav-link group", isActive && "active")}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
        <span className="flex-1">{item.label}</span>
        {item.badge && item.badge > 0 && (
          <Badge className="bg-destructive text-destructive-foreground h-5 min-w-[20px] flex items-center justify-center text-xs">
            {item.badge}
          </Badge>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-72 bg-sidebar flex flex-col z-50 transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
          <div className="medical-gradient rounded-xl p-2">
            <Activity className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-sidebar-foreground">
              Bitácora Médica
            </h1>
            <p className="text-xs text-sidebar-foreground/60">v1.0.0</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-auto text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 mb-2">
              Principal
            </p>
            {mainNavItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>

          {/* Admin Navigation - Always visible for demo */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 mb-2">
              Administración
            </p>
            {adminNavItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>

          {/* Secondary Navigation */}
          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 mb-2">
              Otros
            </p>
            {secondaryNavItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-auto py-3 px-3 hover:bg-sidebar-accent"
              >
                <Avatar className="h-10 w-10 border-2 border-sidebar-primary">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
                    {mockUser.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {mockUser.name}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    {mockUser.specialty}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Editar Perfil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border h-16 flex items-center px-4 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1" />

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 animate-fade-in">
          {children}
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-4 px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
            <p>© 2026 Bitácora Médica. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <Link to="/support" className="hover:text-foreground transition-colors">
                Soporte
              </Link>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacidad
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default DashboardLayout;
