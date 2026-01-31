
export interface ExamEntry {
  id: string;
  date: string;
  day: string;
  subject: string;
  subjectCode: string;
  time: string;
  timestamp: number;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export interface UIConfig {
  showCountdown: boolean;
  showRoutine: boolean;
  showProgress: boolean;
  showPrint: boolean;
  showDownload: boolean;
  showAdminIcon: boolean;
  showReminders: boolean;
  notificationSound: boolean;
  examName: string;
  examYear: string;
  appTitle: string;
  appSubtitle: string;
  telegramEnabled: boolean;
}
