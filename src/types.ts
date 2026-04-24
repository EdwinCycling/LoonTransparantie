export enum Gender {
  Male = 'Man',
  Female = 'Vrouw',
  Other = 'X'
}

export interface Employee {
  id: string;
  fullName?: string; // Optioneel veld voor weergave
  gender: Gender;
  age: number;
  jobCategory: string;
  department?: string;
  // All monetary values in Euro
  baseHourlyWage: number; 
  variableHourlyComponent: number; // Bonus, toeslagen, etc per uur
  totalHourlyWage: number;
  
  // Nieuwe velden
  fte: number; // Arbeidsjaareenheid (0.0 - 1.0)
  annualHours: number; // Aantal uren op jaarbasis (38-urige werkweek * AJE)
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

export interface DepartmentGenderBreakdown {
  department: string;
  totalEmployees: number;
  maleCount: number;
  femaleCount: number;
  otherCount: number;
  binaryCount: number;
  malePercentage: number;
  femalePercentage: number;
  otherPercentage: number;
  binaryPercentage: number;
}

export interface AnalysisReport {
  totalEmployees: number;
  maleCount: number;
  femaleCount: number;
  otherCount: number;
  binaryCount: number;
  
  // a) LOONVERSCHILLEN MAN/VROUW (Gemiddeld)
  meanGapBase: number;
  meanGapTotal: number; // Hourly
  meanGapAnnualTotal: number; // Annual
  meanHourlyWageMen: number;
  meanHourlyWageWomen: number;
  meanAnnualWageMen: number;
  meanAnnualWageWomen: number;
  
  // b) LOONVERSCHILLEN MAN/VROUW Variabel (Gemiddeld)
  meanGapVariable: number; // Hourly
  meanGapAnnualVariable: number; // Annual
  meanVariableMen: number;
  meanVariableWomen: number;
  meanAnnualVariableMen: number;
  meanAnnualVariableWomen: number;
  
  // c) Mediane LOONVERSCHILLEN MAN/VROUW
  medianGapBase: number;
  medianGapTotal: number; // Hourly
  medianGapAnnualTotal: number; // Annual
  medianHourlyWageMen: number;
  medianHourlyWageWomen: number;
  medianAnnualWageMen: number;
  medianAnnualWageWomen: number;
  
  // d) Mediane LOONVERSCHILLEN MAN/VROUW Variabel
  medianGapVariable: number; // Hourly
  medianGapAnnualVariable: number; // Annual
  
  // e) Aandeel ontvangende componenten
  percentReceivingVariableMale: number;
  percentReceivingVariableFemale: number;
  
  // f) Kwartielen
  quartiles: QuartileData[];
  
  // g) Categorie uitsplitsing
  categoryGaps: CategoryGap[];

  // h) Geslachtsverdeling per afdeling
  departmentGenderBreakdown: DepartmentGenderBreakdown[];
}
