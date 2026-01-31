
import { ExamEntry, UIConfig } from './types';

export const STORAGE_KEYS = {
  ROUTINE: 'arns_routine_data',
  TARGET_DATE: 'arns_target_date',
  UI_CONFIG: 'arns_ui_config',
  REMINDERS: 'arns_exam_reminders'
};

export const DEFAULT_EXAM_ROUTINE: ExamEntry[] = [
  { id: '1', date: '২১ এপ্রিল, ২০২৬', day: 'মঙ্গলবার', subject: 'Quran Mazid', subjectCode: '101', time: '10:00 AM', timestamp: new Date("2026-04-21T10:00:00+06:00").getTime() },
  { id: '2', date: '২৩ এপ্রিল, ২০২৬', day: 'বৃহস্পতিবার', subject: 'Arabic 1st Paper', subjectCode: '103', time: '10:00 AM', timestamp: new Date("2026-04-23T10:00:00+06:00").getTime() },
  { id: '3', date: '২৬ এপ্রিল, ২০২৬', day: 'রবিবার', subject: 'Math', subjectCode: '108', time: '10:00 AM', timestamp: new Date("2026-04-26T10:00:00+06:00").getTime() },
  { id: '4', date: '২৮ এপ্রিল, ২০২৬', day: 'মঙ্গলবার', subject: 'Arabic 2nd Paper', subjectCode: '104', time: '10:00 AM', timestamp: new Date("2026-04-28T10:00:00+06:00").getTime() },
  { id: '5', date: '৩০ এপ্রিল, ২০২৬', day: 'বৃহস্পতিবার', subject: 'Bangla 1st Paper', subjectCode: '134', time: '10:00 AM', timestamp: new Date("2026-04-30T10:00:00+06:00").getTime() },
  { id: '6', date: '৩ মে, ২০২৬', day: 'রবিবার', subject: 'Bangla 2nd Paper', subjectCode: '135', time: '10:00 AM', timestamp: new Date("2026-05-03T10:00:00+06:00").getTime() },
  { id: '7', date: '৫ মে, ২০২৬', day: 'মঙ্গলবার', subject: 'English 1st Paper', subjectCode: '136', time: '10:00 AM', timestamp: new Date("2026-05-05T10:00:00+06:00").getTime() },
  { id: '8', date: '৭ মে, ২০২৬', day: 'বৃহস্পতিবার', subject: 'English 2nd Paper', subjectCode: '137', time: '10:00 AM', timestamp: new Date("2026-05-07T10:00:00+06:00").getTime() },
  { id: '10', date: '১০ মে, ২০২৬', day: 'রবিবার', subject: 'Hadith', subjectCode: '102', time: '10:00 AM', timestamp: new Date("2026-05-10T10:00:00+06:00").getTime() },
  { id: '11', date: '১১ মে, ২০২৬', day: 'সোমবার', subject: 'Akayed & Fiqh', subjectCode: '133', time: '10:00 AM', timestamp: new Date("2026-05-11T10:00:00+06:00").getTime() },
  { id: '12', date: '১২ মে, ২০২৬', day: 'মঙ্গলবার', subject: 'Mantik', subjectCode: '112', time: '10:00 AM', timestamp: new Date("2026-05-12T10:00:00+06:00").getTime() },
  { id: '13', date: '১৩ মে, ২০২৬', day: 'বুধবার', subject: 'Islamic History', subjectCode: '109', time: '10:00 AM', timestamp: new Date("2026-05-13T10:00:00+06:00").getTime() },
  { id: '14', date: '১৪ মে, ২০২৬', day: 'বৃহস্পতিবার', subject: 'ICT', subjectCode: '140', time: '10:00 AM', timestamp: new Date("2026-05-14T10:00:00+06:00").getTime() },
];

export const DEFAULT_TARGET_DATE_BST = "2026-04-21T10:00:00+06:00";

export const DEFAULT_UI_CONFIG: UIConfig = {
  showCountdown: true,
  showRoutine: true,
  showProgress: true,
  showPrint: true,
  showDownload: true,
  showAdminIcon: true,
  showReminders: true,
  notificationSound: true,
  examName: "Dakhil Exam",
  examYear: "2026",
  appTitle: "ARNS STUDY ZONE",
  appSubtitle: "DAKHIL EXAM DASHBOARD",
  telegramEnabled: true
};

export const LABELS = {
  countdown: {
    days: 'দিন',
    hours: 'ঘণ্টা',
    minutes: 'মিনিট',
    seconds: 'সেকেন্ড'
  },
  routine: {
    title: 'পরীক্ষার সময়সূচী',
    columns: ['তারিখ', 'বার', 'বিষয়', 'বিষয় কোড', 'সময়', 'Reminders']
  },
  progress: {
    title: 'Study Progress',
    notDone: 'শেষ হয়নি',
    done: 'শেষ'
  },
  brand: {
    title: 'ARNS STUDY ZONE',
    tagline: 'Empowering Dakhil Students with focused education.',
    url: 'https://arns-study-zone.vercel.app/',
    telegram: 'https://t.me/arns_study_zone'
  }
};
