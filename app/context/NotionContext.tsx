"use client";
import React, { createContext, useContext, useState } from "react";

// Define context shape
interface Client {
  id: string;
  name: string;
  status: string;
  phase: string;
  contact: string;
  startDate: string;
  accountManager: string;
  industry: string;
  budget: string;
  priority: string;
}

interface Team {
  name: string;
  role: string;
  tasks: number;
  email: string;
}

interface Task {
  id: number;
  task: string;
  dueDate: string;
  priority: string;
  assigned: string;
  client?: string;
  status?: string;
}

// Database properties for clients view
interface PropertyConfig {
  name: string;
  type: string;
  options?: { name: string, color: string }[];
  visible: boolean;
}

interface NotionContextType {
  // Client state
  clients: Client[];
  selectedClient: string;
  setSelectedClient: (client: string) => void;
  
  // Database view properties
  clientProperties: PropertyConfig[];
  setClientProperties: (properties: PropertyConfig[]) => void;
  
  // Team state
  team: Team[];
  selectedTeamMember: string;
  setSelectedTeamMember: (member: string) => void;
  
  // Task state
  personalTasks: Task[];
  viewType: string;
  setViewType: (type: string) => void;
  
  // View state
  clientView: boolean;
  setClientView: (view: boolean) => void;
  
  // Client tasks
  clientTasks: Task[];
}

// Create the context
const NotionContext = createContext<NotionContextType | undefined>(undefined);

// Context provider component
export function NotionProvider({ children }: { children: React.ReactNode }) {
  // Client state
  const [clients, setClients] = useState<Client[]>([
    { 
      id: "cl1", 
      name: "Metaphase Global", 
      status: "In Production", 
      phase: "Phase 3: Production", 
      contact: "contact@metaphaseglobal.com",
      startDate: "2025-04-15",
      accountManager: "Customer Success",
      industry: "Technology",
      budget: "$25,000",
      priority: "High"
    },
    { 
      id: "cl2", 
      name: "Dubai Luxury Real Estate", 
      status: "Pre-Launch", 
      phase: "Phase 4: Campaign Setup & Launch", 
      contact: "contact@dubailuxuryrealestate.com",
      startDate: "2025-04-10",
      accountManager: "CMO",
      industry: "Real Estate",
      budget: "$45,000",
      priority: "High"
    },
    { 
      id: "cl3", 
      name: "Al Manzil Hotels", 
      status: "Onboarding", 
      phase: "Phase 1: Onboarding", 
      contact: "contact@almanzilhotels.com",
      startDate: "2025-05-01",
      accountManager: "Customer Success",
      industry: "Hospitality",
      budget: "$15,000",
      priority: "Medium"
    },
    { 
      id: "cl4", 
      name: "Sheikh Investment Group", 
      status: "In Production", 
      phase: "Phase 3: Production", 
      contact: "contact@sheikinvestmentgroup.com",
      startDate: "2025-04-20",
      accountManager: "CEO",
      industry: "Finance",
      budget: "$35,000",
      priority: "High"
    },
  ]);
  const [selectedClient, setSelectedClient] = useState("Metaphase Global");
  
  // Database properties configuration
  const [clientProperties, setClientProperties] = useState<PropertyConfig[]>([
    { name: "Name", type: "title", visible: true },
    { name: "Status", type: "select", options: [
      { name: "In Production", color: "#EF4444" },
      { name: "Pre-Launch", color: "#3B82F6" },
      { name: "Onboarding", color: "#10B981" },
      { name: "Complete", color: "#8B5CF6" }
    ], visible: true },
    { name: "Phase", type: "select", options: [
      { name: "Phase 1: Onboarding", color: "#10B981" },
      { name: "Phase 2: Pre-Production & Setup", color: "#F59E0B" },
      { name: "Phase 3: Production", color: "#EF4444" },
      { name: "Phase 4: Campaign Setup & Launch", color: "#3B82F6" }
    ], visible: true },
    { name: "Account Manager", type: "person", visible: true },
    { name: "Start Date", type: "date", visible: true },
    { name: "Industry", type: "select", options: [
      { name: "Technology", color: "#3B82F6" },
      { name: "Real Estate", color: "#10B981" },
      { name: "Hospitality", color: "#F59E0B" },
      { name: "Finance", color: "#8B5CF6" }
    ], visible: true },
    { name: "Budget", type: "text", visible: true },
    { name: "Priority", type: "select", options: [
      { name: "High", color: "#EF4444" },
      { name: "Medium", color: "#F59E0B" },
      { name: "Low", color: "#10B981" }
    ], visible: true },
    { name: "Contact", type: "email", visible: false }
  ]);
  
  // Team state
  const [team, setTeam] = useState<Team[]>([
    { name: "CEO", role: "Executive", tasks: 4, email: "ceo@xmaagency.com" },
    { name: "CMO", role: "Executive", tasks: 6, email: "cmo@xmaagency.com" },
    { name: "COO", role: "Executive", tasks: 8, email: "coo@xmaagency.com" },
    { name: "Developer", role: "Tech Team", tasks: 5, email: "dev@xmaagency.com" },
    { name: "Videographer 1", role: "Video Team", tasks: 9, email: "video1@xmaagency.com" },
    { name: "Videographer 2", role: "Video Team", tasks: 7, email: "video2@xmaagency.com" },
    { name: "Graphic Designer", role: "Graphics Team", tasks: 12, email: "design@xmaagency.com" },
    { name: "Customer Success", role: "Client Success Team", tasks: 10, email: "success@xmaagency.com" },
  ]);
  const [selectedTeamMember, setSelectedTeamMember] = useState("All");
  
  // Task state
  const [personalTasks, setPersonalTasks] = useState<Task[]>([
    { id: 1, task: "Review campaign metrics", dueDate: "2025-05-02", priority: "High", assigned: "CEO", client: "Metaphase Global" },
    { id: 2, task: "Create video brief for Metaphase", dueDate: "2025-05-03", priority: "Medium", assigned: "CMO", client: "Metaphase Global" },
    { id: 3, task: "Coordinate with vendors", dueDate: "2025-05-01", priority: "Medium", assigned: "COO", client: "Dubai Luxury Real Estate" },
    { id: 4, task: "Fix CRM integration issue", dueDate: "2025-05-02", priority: "High", assigned: "Developer", client: "Sheikh Investment Group" },
    { id: 5, task: "Shoot product videos", dueDate: "2025-05-12", priority: "High", assigned: "Videographer 1", client: "Metaphase Global" },
    { id: 6, task: "Edit client testimonials", dueDate: "2025-05-10", priority: "Medium", assigned: "Videographer 2", client: "Dubai Luxury Real Estate" },
    { id: 7, task: "Design social media templates", dueDate: "2025-05-05", priority: "High", assigned: "Graphic Designer", client: "Al Manzil Hotels" },
    { id: 8, task: "Schedule client onboarding calls", dueDate: "2025-05-01", priority: "Medium", assigned: "Customer Success", client: "Al Manzil Hotels" },
  ]);
  
  // Client tasks
  const [clientTasks, setClientTasks] = useState<Task[]>([
    { id: 123, task: "Onboarding Call", dueDate: "2025-05-02", priority: "High", assigned: "Customer Success", client: "Al Manzil Hotels", status: "To Do" },
    { id: 124, task: "Upload Business Assets", dueDate: "2025-05-03", priority: "Medium", assigned: "Customer Success", client: "Al Manzil Hotels", status: "To Do" },
    { id: 125, task: "Share access to platforms", dueDate: "2025-05-03", priority: "Medium", assigned: "Customer Success", client: "Al Manzil Hotels", status: "To Do" },
    { id: 126, task: "CRM Setup", dueDate: "2025-05-04", priority: "High", assigned: "Developer", client: "Al Manzil Hotels", status: "To Do" },
    { id: 127, task: "8 Video Scripts", dueDate: "2025-05-04", priority: "Medium", assigned: "Videographer 1", client: "Metaphase Global", status: "In Progress" },
    { id: 128, task: "Pre-Production Call", dueDate: "2025-05-06", priority: "Medium", assigned: "CMO", client: "Metaphase Global", status: "To Do" },
    { id: 129, task: "10 Graphics Creation", dueDate: "2025-05-15", priority: "High", assigned: "Graphic Designer", client: "Metaphase Global", status: "In Progress" },
    { id: 130, task: "Video Shoot", dueDate: "2025-05-14", priority: "High", assigned: "Videographer 1", client: "Metaphase Global", status: "To Do" },
    { id: 131, task: "Pre-Launch Call", dueDate: "2025-05-28", priority: "Medium", assigned: "Customer Success", client: "Dubai Luxury Real Estate", status: "To Do" },
    { id: 132, task: "Campaign Setup", dueDate: "2025-05-28", priority: "High", assigned: "CMO", client: "Dubai Luxury Real Estate", status: "To Do" },
    { id: 133, task: "Website Copy Review", dueDate: "2025-05-10", priority: "Medium", assigned: "CEO", client: "Sheikh Investment Group", status: "Done" },
    { id: 134, task: "Brand Guidelines Document", dueDate: "2025-05-08", priority: "High", assigned: "Graphic Designer", client: "Sheikh Investment Group", status: "Done" },
  ]);
  
  const [viewType, setViewType] = useState("table");
  
  // View state
  const [clientView, setClientView] = useState(false);
  
  // Context value
  const value = {
    clients,
    selectedClient,
    setSelectedClient,
    clientProperties,
    setClientProperties,
    team,
    selectedTeamMember,
    setSelectedTeamMember,
    personalTasks,
    viewType,
    setViewType,
    clientView,
    setClientView,
    clientTasks,
  };
  
  return <NotionContext.Provider value={value}>{children}</NotionContext.Provider>;
}

// Custom hook to use the context
export function useNotion() {
  const context = useContext(NotionContext);
  if (context === undefined) {
    throw new Error("useNotion must be used within a NotionProvider");
  }
  return context;
}