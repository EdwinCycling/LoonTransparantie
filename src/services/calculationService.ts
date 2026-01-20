import { Employee, AnalysisReport, Gender, QuartileData, CategoryGap } from '../types';

// Helper: Calculate Mean
const calculateMean = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
};

// Helper: Calculate Median
const calculateMedian = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

// Helper: Pay Gap Formula: (Men - Women) / Men * 100
const calculateGap = (valMen: number, valWomen: number): number => {
  if (valMen === 0) return 0;
  return parseFloat((((valMen - valWomen) / valMen) * 100).toFixed(2));
};

export const analyzeData = (employees: Employee[]): AnalysisReport => {
  const men = employees.filter(e => e.gender === Gender.Male);
  const women = employees.filter(e => e.gender === Gender.Female);

  // Arrays of values
  const menBase = men.map(e => e.baseHourlyWage);
  const womenBase = women.map(e => e.baseHourlyWage);
  
  const menTotal = men.map(e => e.totalHourlyWage);
  const womenTotal = women.map(e => e.totalHourlyWage);

  const menVariable = men.map(e => e.variableHourlyComponent);
  const womenVariable = women.map(e => e.variableHourlyComponent);

  // a) Mean Gap (Total & Base)
  const meanGapBase = calculateGap(calculateMean(menBase), calculateMean(womenBase));
  const meanGapTotal = calculateGap(calculateMean(menTotal), calculateMean(womenTotal));

  // b) Mean Gap Variable
  // Filter only those who receive variable pay for the average amount calculation (common interpretation), 
  // OR average across all (PDF implies average over the group). Let's use average over group as per standard algorithms.
  const meanGapVariable = calculateGap(calculateMean(menVariable), calculateMean(womenVariable));

  // c) Median Gap
  const medianGapBase = calculateGap(calculateMedian(menBase), calculateMedian(womenBase));
  const medianGapTotal = calculateGap(calculateMedian(menTotal), calculateMedian(womenTotal));

  // d) Median Gap Variable
  const medianGapVariable = calculateGap(calculateMedian(menVariable), calculateMedian(womenVariable));

  // e) Share receiving variable components
  const menReceivingVar = men.filter(e => e.variableHourlyComponent > 0).length;
  const womenReceivingVar = women.filter(e => e.variableHourlyComponent > 0).length;
  
  const percentReceivingVariableMale = men.length ? parseFloat(((menReceivingVar / men.length) * 100).toFixed(1)) : 0;
  const percentReceivingVariableFemale = women.length ? parseFloat(((womenReceivingVar / women.length) * 100).toFixed(1)) : 0;

  // f) Quartiles
  const sortedByTotal = [...employees].sort((a, b) => a.totalHourlyWage - b.totalHourlyWage);
  const quartileSize = Math.ceil(sortedByTotal.length / 4);
  const quartiles: QuartileData[] = [];

  for (let i = 0; i < 4; i++) {
    const start = i * quartileSize;
    const chunk = sortedByTotal.slice(start, start + quartileSize);
    
    const chunkMen = chunk.filter(e => e.gender === Gender.Male).length;
    const chunkWomen = chunk.filter(e => e.gender === Gender.Female).length;
    const totalChunk = chunk.length;

    quartiles.push({
      quartile: `Q${i + 1}`,
      maleCount: chunkMen,
      femaleCount: chunkWomen,
      malePercentage: parseFloat(((chunkMen / totalChunk) * 100).toFixed(1)),
      femalePercentage: parseFloat(((chunkWomen / totalChunk) * 100).toFixed(1))
    });
  }

  // g) Categories - now dynamic based on data
  const categoryGaps: CategoryGap[] = [];
  const uniqueCategories = [...new Set(employees.map(e => e.jobCategory))].sort();

  uniqueCategories.forEach(cat => {
    const catMen = men.filter(e => e.jobCategory === cat);
    const catWomen = women.filter(e => e.jobCategory === cat);

    if (catMen.length > 0 && catWomen.length > 0) {
        categoryGaps.push({
            category: cat,
            meanGapBase: calculateGap(calculateMean(catMen.map(e => e.baseHourlyWage)), calculateMean(catWomen.map(e => e.baseHourlyWage))),
            meanGapTotal: calculateGap(calculateMean(catMen.map(e => e.totalHourlyWage)), calculateMean(catWomen.map(e => e.totalHourlyWage))),
            meanGapVariable: calculateGap(calculateMean(catMen.map(e => e.variableHourlyComponent)), calculateMean(catWomen.map(e => e.variableHourlyComponent))),
        });
    } else if (catMen.length > 0 || catWomen.length > 0) {
        // No mix: return null instead of 0% to indicate "Not Applicable"
        categoryGaps.push({
            category: cat,
            meanGapBase: null,
            meanGapTotal: null,
            meanGapVariable: null
        });
    }
  });

  return {
    totalEmployees: employees.length,
    maleCount: men.length,
    femaleCount: women.length,
    meanGapBase,
    meanGapTotal,
    meanGapVariable,
    medianGapBase,
    medianGapTotal,
    medianGapVariable,
    percentReceivingVariableMale,
    percentReceivingVariableFemale,
    quartiles,
    categoryGaps
  };
};