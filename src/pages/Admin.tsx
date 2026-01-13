import { useState } from "react";
import { Shield, Users, CheckCircle, XCircle, Clock, Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { User, UserStatus } from "@/types";

// Mock pending users
const mockPendingUsers: User[] = [
  {
    id: "1",
    email: "dr.juan@clinica.com",
    role: "PROFESSIONAL",
    status: "INACTIVE",
    profile_data: {
      full_name: "Dr. Juan Pérez",
      specialty: "Kinesiología",
      phone: "+56 9 1111 2222",
    },
    avatar_url: "",
    created_at: "2026-01-12T10:00:00",
    updated_at: "2026-01-12T10:00:00",
  },
  {
    id: "2",
    email: "dra.carmen@hospital.cl",
    role: "PROFESSIONAL",
    status: "INACTIVE",
    profile_data: {
      full_name: "Dra. Carmen Silva",
      specialty: "Terapia Ocupacional",
      phone: "+56 9 3333 4444",
    },
    avatar_url: "",
    created_at: "2026-01-11T15:30:00",
    updated_at: "2026-01-11T15:30:00",
  },
  {
    id: "3",
    email: "fisio.pedro@rehab.com",
    role: "PROFESSIONAL",
    status: "INACTIVE",
    profile_data: {
      full_name: "Pedro Martínez",
      specialty: "Fisioterapia",
      phone: "+56 9 5555 6666",
    },
    avatar_url: "",
    created_at: "2026-01-10T09:15:00",
    updated_at: "2026-01-10T09:15:00",
  },
];

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(mockPendingUsers);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = (user: User) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: "ACTIVE" as UserStatus } : u
      )
    );
    toast.success(`${user.profile_data.full_name} ha sido aprobado`);
  };

  const openRejectDialog = (user: User) => {
    setSelectedUser(user);
    setRejectDialogOpen(true);
  };

  const handleReject = () => {
    if (!selectedUser || !rejectReason.trim()) {
      toast.error("Debe proporcionar un motivo de rechazo");
      return;
    }

    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    toast.success(`${selectedUser.profile_data.full_name} ha sido rechazado`);
    setRejectDialogOpen(false);
    setRejectReason("");
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    const name = user.profile_data.full_name?.toLowerCase() || "";
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || email.includes(query);
  });

  const pendingCount = users.filter((u) => u.status === "INACTIVE").length;
  const activeCount = users.filter((u) => u.status === "ACTIVE").length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 medical-gradient rounded-xl">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">
              Gestiona usuarios y solicitudes pendientes.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeCount}</p>
                <p className="text-sm text-muted-foreground">Aprobados Hoy</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Total Usuarios</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Users Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar_url} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {user.profile_data.full_name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.profile_data.full_name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.profile_data.specialty || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          user.status === "ACTIVE"
                            ? "badge-active"
                            : "badge-pending"
                        )}
                      >
                        {user.status === "ACTIVE" ? "Activo" : "Pendiente"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell className="text-right">
                      {user.status === "INACTIVE" && (
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-success hover:text-success hover:bg-success/10"
                            onClick={() => handleApprove(user)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Aprobar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => openRejectDialog(user)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Rechazar
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <p className="text-muted-foreground">
                      No se encontraron usuarios.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Reject Dialog */}
        <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rechazar Usuario</DialogTitle>
              <DialogDescription>
                Proporcione un motivo para rechazar a{" "}
                <strong>{selectedUser?.profile_data.full_name}</strong>.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Motivo del rechazo..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Confirmar Rechazo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
