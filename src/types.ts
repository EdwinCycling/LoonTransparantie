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
  
  // New fields for Annual
  meanGapAnnualTotal: number | null;
  meanGapAnnualVariable: number | null;
}

export interface AnalysisReport {
  totalEmployees: number;
  maleCount: number;
  femaleCount: number;
  
  // a) Loonkloof (Gemiddeld)
  meanGapBase: number;
  meanGapTotal: number; // Hourly
  meanGapAnnualTotal: number; // Annual
  meanHourlyWageMen: number;
  meanHourlyWageWomen: number;
  meanAnnualWageMen: number;
  meanAnnualWageWomen: number;
  
  // b) Loonkloof Variabel (Gemiddeld)
  meanGapVariable: number; // Hourly
  meanGapAnnualVariable: number; // Annual
  meanVariableMen: number;
  meanVariableWomen: number;
  meanAnnualVariableMen: number;
  meanAnnualVariableWomen: number;
  
  // c) Mediane Loonkloof
  medianGapBase: number;
  medianGapTotal: number; // Hourly
  medianGapAnnualTotal: number; // Annual
  medianHourlyWageMen: number;
  medianHourlyWageWomen: number;
  medianAnnualWageMen: number;
  medianAnnualWageWomen: number;
  
  // d) Mediane Loonkloof Variabel
  medianGapVariable: number; // Hourly
  medianGapAnnualVariable: number; // Annual
  
  // e) Aandeel ontvangende componenten
  percentReceivingVariableMale: number;
  percentReceivingVariableFemale: number;
  
  // f) Kwartielen
  quartiles: QuartileData[];
  
  // g) Categorie uitsplitsing
  categoryGaps: CategoryGap[];
}