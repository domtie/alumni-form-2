export type InvolvementType = 'uk' | 'basislehrjahr' | 'lehrling' | 'angestellter';

export type Apprenticeship = 'Software Engineer' | 'Graphic Design' | 'Platform Engineer';
export type Specialization = 'Cyber Security' | 'None';
export type Location = 'Zürich' | 'Zug';
export type UKCourse = 'üK 100' | 'üK 101' | 'üK 102' | 'üK 103';

export interface RegistrationStep {
  id: number;
  title: string;
  description: string;
}

export interface RegistrationData {
  // Step 1 - Basic Info
  name: string;
  email: string;
  password: string;

  // Step 2 - Involvement Type
  involvementType: InvolvementType | null;

  // Step 3 - Conditional Info
  location: Location | null;
  // For üK
  ukCourses?: UKCourse[];
  ukStartDate?: Date;
  ukEndDate?: Date;
  // For Basislehrjahr, Lehrling, and Angestellter
  startYear?: number;
  endYear?: number;
  // For Basislehrjahr and Lehrling
  apprenticeship?: Apprenticeship;
  specialization?: Specialization;
}