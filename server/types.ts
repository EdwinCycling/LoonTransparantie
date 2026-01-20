export interface ExactToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  expires_at?: number; // Calculated timestamp
}

export interface ExactEmployee {
  ID: string;
  Code: string;
  FirstName: string;
  LastName: string;
  BirthDate: string;
  Gender: string;
}

export interface ExactSalary {
  Employee: string;
  FulltimeAmount: number;
  ParttimeAmount: number;
  AverageHoursPerWeek: number;
  HourlyWage: number;
  ParttimeFactor: number;
  StartDate: string;
  EndDate: string | null;
}

export interface ExactContract {
  Employee: string;
  Type: number;
  TypeDescription: string;
  StartDate: string;
  EndDate: string | null;
}

export interface ExactJobGroup {
  ID: string;
  Code: string;
  Description: string;
}

export interface ExactEmploymentOrganization {
  Employee: string;
  JobTitle: string;
  JobTitleCode: string;
  JobTitleDescription: string;
}
