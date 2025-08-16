export type ProjectStatus = 'ongoing' | 'completed' | 'delayed' | 'pending';

export interface Company {
  id: string; // uuid
  name: string;
  created_at: string; // timestamptz
}

export interface User {
  id: string; // uuid, usually from Supabase's auth.users table
  supa_auth_id: string; // uuid, reference to auth.users
  name: string;
  email: string;
  manager_id?: string; // Optional foreign key for self-referencing hierarchy
  created_at: string; // timestamptz
}

export interface Role {
  id: number; // serial
  name: string;
}

export interface Project {
  id: number; // serial
  company_id: string; // Foreign key to Company
  manager_id: string; // Foreign key to User (the project manager)
  name: string;
  description?: string;
  status: ProjectStatus;
  start_date?: string; // date
  end_date?: string; // date
  created_at: string; // timestamptz
}

export interface Tool {
  id: number; // serial
  name: string;
  description?: string;
  is_shared: boolean;
  created_at: string; // timestamptz
}

export interface Item {
  id: number; // serial
  name: string;
  description?: string;
  is_shared: boolean;
  created_at: string; // timestamptz
}

export interface UserRole {
    user_id: string; // Foreign key to User
    role_id: number; // Foreign key to Role
  }
  
  export interface ProjectToolUsage {
    id: number; // serial
    project_id: number; // Foreign key to Project
    tool_id: number; // Foreign key to Tool
    used_by_user_id: string; // Foreign key to User
    start_at: string; // timestamptz
    end_at?: string; // Optional, timestamptz
    created_at: string; // timestamptz
  }
  
  export interface ProjectItemUsage {
    id: number; // serial
    project_id: number; // Foreign key to Project
    item_id: number; // Foreign key to Item
    used_by_user_id: string; // Foreign key to User
    quantity_used: number; // integer
    used_at: string; // timestamptz
    created_at: string; // timestamptz
  }