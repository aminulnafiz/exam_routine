
import React, { useEffect, useRef } from 'react';
import { STORAGE_KEYS } from '../constants';
import { ExamEntry, UIConfig } from '../types';

interface Reminder {
  examId: string;
  type: '1day' | '1hour';
  notified: boolean;
}

interface NotificationSystemProps {
  routine: ExamEntry[];
  config: UIConfig;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ routine, config }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Permission request logic
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Alarm sound initialization (using a common public sound URL for demo)
    if (config.notificationSound && !audioRef.current) {
      audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    }

    const checkReminders = () => {
      if (!config.showReminders) return;

      const savedReminders = localStorage.getItem(STORAGE_KEYS.REMINDERS);
      if (!savedReminders) return;

      let reminders: Reminder[] = JSON.parse(savedReminders);
      const now = Date.now();
      let changed = false;

      reminders = reminders.map(reminder => {
        if (reminder.notified) return reminder;

        const exam = routine.find(e => e.id === reminder.examId);
        if (!exam) return reminder;

        // Use stored timestamp or fallback to calculated one
        const examTime = exam.timestamp || new Date(exam.date.replace(/([\d]+)\s+([^\s,]+),\s+([\d]+)/, '$3-$2-$1') + " 10:00:00").getTime();
        if (isNaN(examTime)) return reminder;

        let triggerTime = 0;
        let message = '';

        if (reminder.type === '1day') {
          triggerTime = examTime - (24 * 60 * 60 * 1000);
          message = `আপনার ${exam.subject} পরীক্ষা আগামীকাল সকাল ১০টায়। প্রস্তুতি ভালো করে নিন।`;
        } else if (reminder.type === '1hour') {
          triggerTime = examTime - (60 * 60 * 1000);
          message = `আপনার ${exam.subject} পরীক্ষা ১ ঘণ্টা পর শুরু হবে। দ্রুত কেন্দ্রে পৌঁছান।`;
        }

        // Trigger if we are within 5 minutes of the trigger window
        if (now >= triggerTime && now < examTime) {
          if ('Notification' in window && Notification.permission === 'granted') {
            // Fix: Cast NotificationOptions to any to avoid "vibrate does not exist" error in some TypeScript environments
            new Notification(`${config.examName} Alarm`, {
              body: message,
              icon: '/favicon.ico',
              vibrate: [200, 100, 200]
            } as any);

            if (config.notificationSound && audioRef.current) {
              audioRef.current.play().catch(e => console.log("Sound blocked by browser policy"));
            }

            changed = true;
            return { ...reminder, notified: true };
          }
        }
        return reminder;
      });

      if (changed) {
        localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
      }
    };

    const interval = setInterval(checkReminders, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, [routine, config]);

  return null;
};

export default NotificationSystem;
