interface ImportResult {
  success: boolean;
  error?: string;
  recordCount?: number;
  data?: any[];
}

interface CollegeData {
  faculty?: any[];
  subjects?: any[];
  rooms?: any[];
  students?: any[];
  lastImported?: string;
}

export class DataImportService {
  private static STORAGE_KEY = 'college_data';

  static async importFile(file: File): Promise<ImportResult> {
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let data: any[] = [];

      if (fileExtension === 'csv') {
        data = await this.parseCSV(file);
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        data = await this.parseExcel(file);
      } else {
        return { success: false, error: 'Unsupported file format. Please use CSV or Excel files.' };
      }

      if (data.length === 0) {
        return { success: false, error: 'No data found in the file.' };
      }

      // Store the imported data
      await this.storeData(data, this.detectDataType(data[0]));

      return { 
        success: true, 
        recordCount: data.length,
        data 
      };
    } catch (error) {
      console.error('Import error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  private static async parseCSV(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split('\n');
          const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
          const data = [];

          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
              const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
              const row: any = {};
              headers.forEach((header, index) => {
                row[header] = values[index] || '';
              });
              data.push(row);
            }
          }
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read CSV file'));
      reader.readAsText(file);
    });
  }

  private static async parseExcel(file: File): Promise<any[]> {
    // For now, we'll simulate Excel parsing
    // In a real implementation, you'd use a library like xlsx
    return new Promise((resolve, reject) => {
      reject(new Error('Excel parsing not implemented yet. Please use CSV format.'));
    });
  }

  private static detectDataType(sample: any): 'faculty' | 'subjects' | 'rooms' | 'students' {
    const keys = Object.keys(sample).map(k => k.toLowerCase());
    
    if (keys.some(k => k.includes('teacher') || k.includes('faculty') || k.includes('instructor'))) {
      return 'faculty';
    } else if (keys.some(k => k.includes('subject') || k.includes('course'))) {
      return 'subjects';
    } else if (keys.some(k => k.includes('room') || k.includes('classroom'))) {
      return 'rooms';
    } else {
      return 'students';
    }
  }

  private static async storeData(data: any[], type: string): Promise<void> {
    const existingData = this.getStoredData();
    existingData[type] = data;
    existingData.lastImported = new Date().toISOString();
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingData));
  }

  public static getStoredData(): CollegeData {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  public static getFaculty(): any[] {
    return this.getStoredData().faculty || [];
  }

  public static getSubjects(): any[] {
    return this.getStoredData().subjects || [];
  }

  public static getRooms(): any[] {
    return this.getStoredData().rooms || [];
  }

  public static getStudents(): any[] {
    return this.getStoredData().students || [];
  }

  public static clearData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}