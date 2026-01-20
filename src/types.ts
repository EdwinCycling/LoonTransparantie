export enum Gender {
  Male = 'Man',
  Female = 'Vrouw'
}

export interface Employee {
  id: string;
  fullName?: string; // Optioneel veld voor weergave
  gender: Gender;
  age: number;
  jobCategory: string;
  // All monetary values in Euro
  baseHourlyWage: number; 
  variableHourlyComponent: number; // Bonus, toeslagen, etc per uur
  totalHourlyWage: number;
  
  // Nieuwe velden
  fte: number; // Arbeidsjaareenheid (0.0 - 1.0)
  annualHours: number; // Aantal uren op jaarbasis (38-urige werkweek * FTE)
  grossAnnualWage: number; // Bruto jaarloon inclusief variabel
}

export interface QuartileData {
  quartile: string;
  maleCount: number;
  femaleCount: number;
  malePercentage: number;
  femalePercentage: number;
}

export interface CategoryGap {
  category: string;
  meanGapTotal: number | null;
  meanGapBase: number | null;
  meanGapVariable: number | null;
}

export interface AnalysisReport {
  totalEmployees: number;
  maleCount: number;
  femaleCount: number;
  
  // a) Loonkloof (Gemiddeld)
  meanGapBase: number;
  meanGapTotal: number;
  
  // b) Loonkloof Variabel (Gemiddeld)
  meanGapVariable: number;
  
  // c) Mediane Loonkloof
  medianGapBase: number;
  medianGapTotal: number;
  
  // d) Mediane Loonkloof Variabel
  medianGapVariable: number;
  
  // e) Aandeel ontvangende componenten
  percentReceivingVariableMale: number;
  percentReceivingVariableFemale: number;
  
  // f) Kwartielen
  quartiles: QuartileData[];
  
  // g) Categorie uitsplitsing
  categoryGaps: CategoryGap[];
}