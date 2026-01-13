// Medical Logbook Types - Based on API Schema

export type UserRole = 'ADMIN' | 'PROFESSIONAL';
export type UserStatus = 'ACTIVE' | 'INACTIVE';
export type CollabStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  profile_data: {
    full_name?: string;
    specialty?: string;
    phone?: string;
  };
  reject_reason?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PersonalInfo {
  first_name: string;
  last_name: string;
  rut: string;
  birth_date: string;
  email?: string;
  phone?: string;
  diagnosis?: string;
}

export interface Patient {
  id: string;
  creator_id: string;
  personal_info: PersonalInfo;
  disability_report?: string;
  care_notes?: string;
  consent_pdf_url: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Vitals {
  fc?: number;      // Frecuencia cardíaca
  pa?: string;      // Presión arterial
  pain?: number;    // Escala de dolor (0-10)
  temp?: number;    // Temperatura
  spo2?: number;    // Saturación de oxígeno
}

export interface Session {
  id: string;
  patient_id: string;
  professional_id: string;
  intervention_plan: string;
  vitals?: Vitals;
  description: string;
  achievements?: string;
  patient_performance?: string;
  photos?: string[];
  has_incident: boolean;
  incident_details?: string;
  incident_photo?: string;
  next_session_notes?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Collaboration {
  id: string;
  patient_id: string;
  professional_id: string;
  status: CollabStatus;
  invited_at: string;
  updated_at: string;
}

export interface ProfessionalReport {
  id: string;
  patient_id: string;
  author_id: string;
  date_range_start: string;
  date_range_end: string;
  content: string;
  objectives_achieved?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  message: string;
  is_read: boolean;
  related_id?: string;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  admin_response?: string;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface PatientDetail {
  patient: Patient;
  team: User[];
  recent_sessions: Session[];
  incident_count: number;
}

export interface DashboardStats {
  total_patients: number;
  total_sessions: number;
  pending_invitations: number;
  recent_incidents: number;
}
