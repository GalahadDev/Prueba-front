import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogOut, LineChart, Plus, TrendingUp, Calendar, Settings } from "lucide-react";
import { toast } from "sonner";
import AnimatedBackground from "@/components/AnimatedBackground";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          navigate("/");
        } else {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error al cerrar sesión");
    } else {
      toast.success("Sesión cerrada exitosamente");
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const menuItems = [
    { icon: Plus, label: "Nuevo Trade", color: "text-profit" },
    { icon: LineChart, label: "Estadísticas", color: "text-chart-line" },
    { icon: Calendar, label: "Calendario", color: "text-gold" },
    { icon: TrendingUp, label: "Rendimiento", color: "text-primary" },
    { icon: Settings, label: "Configuración", color: "text-muted-foreground" },
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="border-b border-border/50 backdrop-blur-xl bg-card/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-profit to-profit/70 flex items-center justify-center"
                whileHover={{ rotate: 5 }}
              >
                <LineChart className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="text-xl font-bold font-display">TradeLog</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {user?.user_metadata?.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border-2 border-primary/50"
                  />
                )}
                <span className="text-sm text-muted-foreground hidden sm:block">
                  {user?.user_metadata?.full_name || user?.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold font-display mb-2">
              ¡Hola, {user?.user_metadata?.full_name?.split(" ")[0] || "Trader"}!
            </h1>
            <p className="text-muted-foreground">
              Bienvenido a tu trading journal. Comienza a registrar tus operaciones.
            </p>
          </motion.div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.label}
                className="group relative p-6 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm overflow-hidden text-left transition-all hover:border-primary/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                <span className="font-medium">{item.label}</span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.button>
            ))}
          </div>

          {/* Empty State */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/50 mb-6">
              <TrendingUp className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold font-display mb-2">
              Comienza tu Journey
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Registra tu primer trade para comenzar a construir tu historial y obtener insights valiosos.
            </p>
            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-profit to-profit/80 text-primary-foreground font-medium glow-profit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              Registrar Primer Trade
            </motion.button>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
