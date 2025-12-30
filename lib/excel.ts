import * as XLSX from 'xlsx';
import { CampaignPhase } from '@prisma/client';

export interface AgencyExcelRow {
  mobileNumber: string;
  agencyName: string;
  phase: CampaignPhase;
  targetAmount: number;
  currentProgress: number;
  compensationAmount: number;
  dreamVacation?: string;
  notes?: string;
}

export function parseAgencyExcel(buffer: Buffer): AgencyExcelRow[] {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    return data.map((row: any) => {
      // Parse phase
      let phase: CampaignPhase = CampaignPhase.PHASE_1;
      const phaseStr = String(row['שלב'] || row['Phase'] || row['phase'] || '1').toLowerCase();

      if (phaseStr.includes('1') || phaseStr.includes('phase_1') || phaseStr.includes('שלב 1')) {
        phase = CampaignPhase.PHASE_1;
      } else if (phaseStr.includes('2') || phaseStr.includes('phase_2') || phaseStr.includes('שלב 2')) {
        phase = CampaignPhase.PHASE_2;
      } else if (phaseStr.includes('3') || phaseStr.includes('phase_3') || phaseStr.includes('שלב 3')) {
        phase = CampaignPhase.PHASE_3;
      } else if (phaseStr.includes('completed') || phaseStr.includes('הושלם')) {
        phase = CampaignPhase.COMPLETED;
      }

      return {
        mobileNumber: String(row['מספר טלפון'] || row['Mobile'] || row['mobile_number'] || row['Phone'] || '').trim(),
        agencyName: String(row['שם סוכנות'] || row['Agency Name'] || row['agency_name'] || row['Name'] || '').trim(),
        phase,
        targetAmount: parseFloat(row['יעד'] || row['Target'] || row['target_amount'] || '0'),
        currentProgress: parseFloat(row['התקדמות נוכחית'] || row['Progress'] || row['current_progress'] || '0'),
        compensationAmount: parseFloat(row['פיצוי'] || row['Compensation'] || row['compensation_amount'] || '0'),
        dreamVacation: String(row['חופשת חלומות'] || row['Dream Vacation'] || row['dream_vacation'] || '').trim() || undefined,
        notes: String(row['הערות'] || row['Notes'] || row['notes'] || '').trim() || undefined,
      };
    }).filter(row => row.mobileNumber && row.agencyName);
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    throw new Error('שגיאה בקריאת קובץ Excel / Error parsing Excel file');
  }
}

export function generateExampleExcel(): Buffer {
  const exampleData = [
    {
      'מספר טלפון': '0501234567',
      'שם סוכנות': 'סוכנות ישראל',
      'שלב': 'שלב 1',
      'יעד': 100000,
      'התקדמות נוכחית': 45000,
      'פיצוי': 5000,
      'חופשת חלומות': 'דובאי',
      'הערות': 'ביצועים מצוינים'
    },
    {
      'מספר טלפון': '0527654321',
      'שם סוכנות': 'סוכנות תל אביב',
      'שלב': 'שלב 2',
      'יעד': 150000,
      'התקדמות נוכחית': 120000,
      'פיצוי': 12000,
      'חופשת חלומות': 'איטליה',
      'הערות': ''
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(exampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'סוכנויות');

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}
