import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Activity, Stethoscope, Pill, Cross, Syringe, HeartPulse, Shield } from "lucide-react";

// Animated floating medical icons
const FloatingIcon = ({ 
  icon: Icon, 
  className, 
  delay = 0, 
  duration = 6 
}: { 
  icon: React.ElementType; 
  className?: string; 
  delay?: number;
  duration?: number;
}) => (
  <div 
    className={`absolute text-primary/20 animate-float ${className}`}
    style={{ 
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  >
    <Icon className="w-8 h-8 md:w-12 md:h-12" />
  </div>
);

// Animated pulse circles for heartbeat effect
const PulseCircle = ({ delay = 0, size = "w-32 h-32" }: { delay?: number; size?: string }) => (
  <div 
    className={`absolute rounded-full border-2 border-primary/30 animate-pulse-ring ${size}`}
    style={{ animationDelay: `${delay}s` }}
  />
);

// ECG Line animation component
const ECGLine = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg 
      className="absolute bottom-20 left-0 w-full h-24 opacity-10"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
    >
      <path
        className="animate-ecg-line"
        d="M0,50 L100,50 L120,50 L140,20 L160,80 L180,50 L200,50 L220,50 L240,50 L260,10 L280,90 L300,50 L320,50 L400,50 L500,50 L520,50 L540,20 L560,80 L580,50 L600,50 L620,50 L640,50 L660,10 L680,90 L700,50 L720,50 L800,50 L900,50 L920,50 L940,20 L960,80 L980,50 L1000,50 L1020,50 L1040,50 L1060,10 L1080,90 L1100,50 L1120,50 L1200,50"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// DNA Helix animation
const DNAHelix = () => (
  <div className="absolute right-10 top-1/4 opacity-10 animate-dna-rotate">
    <svg width="60" height="200" viewBox="0 0 60 200">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <g key={i} style={{ transform: `translateY(${i * 20}px)` }}>
          <ellipse
            cx="30"
            cy="10"
            rx="25"
            ry="8"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            style={{
              transform: `rotateX(${i * 36}deg)`,
              transformOrigin: "center",
            }}
          />
        </g>
      ))}
    </svg>
  </div>
);

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulación de login - no funcional
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Medical Icons */}
        <FloatingIcon icon={Heart} className="top-[10%] left-[5%]" delay={0} duration={8} />
        <FloatingIcon icon={Activity} className="top-[20%] right-[10%]" delay={1} duration={7} />
        <FloatingIcon icon={Stethoscope} className="bottom-[30%] left-[8%]" delay={2} duration={9} />
        <FloatingIcon icon={Pill} className="top-[60%] right-[5%]" delay={0.5} duration={6} />
        <FloatingIcon icon={Cross} className="top-[40%] left-[15%]" delay={1.5} duration={8} />
        <FloatingIcon icon={Syringe} className="bottom-[15%] right-[15%]" delay={2.5} duration={7} />
        <FloatingIcon icon={HeartPulse} className="top-[5%] right-[30%]" delay={3} duration={9} />
        <FloatingIcon icon={Shield} className="bottom-[40%] right-[25%]" delay={1} duration={6} />
        
        {/* Pulse Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <PulseCircle delay={0} size="w-[300px] h-[300px]" />
          <PulseCircle delay={0.5} size="w-[400px] h-[400px]" />
          <PulseCircle delay={1} size="w-[500px] h-[500px]" />
        </div>

        {/* ECG Line */}
        <ECGLine />

        {/* Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md glass-card animate-scale-in border-primary/10 shadow-medical">
          <CardContent className="pt-8 pb-8 px-8">
            {/* Logo & Header */}
            <div className="text-center mb-8">
              {/* Animated Heart Logo */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="absolute inset-0 animate-ping-slow">
                  <Heart className="w-16 h-16 text-primary/30" />
                </div>
                <div className="relative p-4 rounded-2xl medical-gradient shadow-lg animate-heartbeat">
                  <HeartPulse className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Bitácora Médica
              </h1>
              <p className="text-muted-foreground">
                Sistema de gestión clínica profesional
              </p>
            </div>

            {/* Decorative line with heartbeat */}
            <div className="relative h-px mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
            </div>

            {/* Login Info */}
            <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-border/50">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Acceso seguro</p>
                  <p className="text-xs text-muted-foreground">
                    Tus datos están protegidos con encriptación de nivel hospitalario
                  </p>
                </div>
              </div>
            </div>

            {/* Google Login Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 bg-card hover:bg-secondary text-foreground border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 group"
              variant="outline"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <span>Conectando...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Google Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-medium">Continuar con Google</span>
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">o</span>
              </div>
            </div>

            {/* Demo Access */}
            <Button
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              onClick={() => window.location.href = '/'}
            >
              Acceder en modo demo
            </Button>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                Al continuar, aceptas nuestros{" "}
                <a href="#" className="text-primary hover:underline">Términos de Servicio</a>
                {" "}y{" "}
                <a href="#" className="text-primary hover:underline">Política de Privacidad</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            className="animate-wave"
            fill="hsl(var(--primary) / 0.05)"
            d="M0,64 C480,128 960,0 1440,64 L1440,120 L0,120 Z"
          />
          <path
            className="animate-wave-slow"
            fill="hsl(var(--primary) / 0.03)"
            d="M0,96 C480,32 960,128 1440,64 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Login;
