export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  templateCount: number;
}

export interface EvidenceItem {
  id: string;
  content: string;
  isRequired: boolean;
  description?: string;
}

export interface RiskNote {
  id: string;
  level: 'low' | 'medium' | 'high';
  content: string;
  lawyerName: string;
  createdAt: string;
}

export interface UpdateLog {
  id: string;
  version: string;
  description: string;
  lawyerName: string;
  createdAt: string;
}

export interface Template {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  content: string;
  applicableScenarios: string[];
  evidenceList: string[];
  downloadUrl: string;
  downloadCount: number;
  riskLevel: 'low' | 'medium' | 'high';
  riskNotes: RiskNote[];
  updateLogs: UpdateLog[];
  createdAt: string;
  updatedAt: string;
}

export interface Lawyer {
  id: string;
  name: string;
  licenseNumber: string;
  avatar?: string;
}
