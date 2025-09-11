import { teachers, timeSlots, days, rooms, type TimetableSlot, type DaySchedule } from '@/data/timetableData';

export function generateTimetable(branch: string, division: string): DaySchedule[] {
  const schedule: DaySchedule[] = [];
  const classSlots = timeSlots.filter(slot => slot.type === 'class');
  const totalSlotsPerWeek = classSlots.length * 5; // 8 slots per day * 5 days = 40 slots
  
  // Get theory and lab subjects
  const theorySubjects = teachers.filter(t => t.type === 'TH');
  const labSubjects = teachers.filter(t => t.type === 'LAB');
  
  // Calculate sessions needed (theory: 1 slot, lab: 2 slots)
  const theorySessions = Math.min(theorySubjects.length, 15); // 3 sessions per subject
  const labSessions = Math.min(labSubjects.length, 10); // 2 sessions per subject (each taking 2 slots)
  const librarySessions = 2;
  const projectSessions = 2;
  
  // Create session pool
  const sessionPool: TimetableSlot[] = [];
  
  // Add theory sessions
  theorySubjects.slice(0, 5).forEach((teacher, index) => {
    for (let i = 0; i < 3; i++) {
      sessionPool.push({
        slotId: `theory-${index}-${i}`,
        teacher: teacher.shortForm,
        course: teacher.courseShort,
        type: 'TH',
        room: rooms.theory[index % rooms.theory.length]
      });
    }
  });
  
  // Add lab sessions (2 slots each)
  labSubjects.slice(0, 5).forEach((teacher, index) => {
    for (let i = 0; i < 2; i++) {
      sessionPool.push({
        slotId: `lab-${index}-${i}`,
        teacher: teacher.shortForm,
        course: teacher.courseShort,
        type: 'LAB',
        room: rooms.lab[index % rooms.lab.length],
        batches: ['D1', 'D2', 'D3', 'D4'],
        isDoubleSlot: true
      });
    }
  });
  
  // Add library and project sessions
  for (let i = 0; i < librarySessions; i++) {
    sessionPool.push({
      slotId: `library-${i}`,
      teacher: 'LIB',
      course: 'LIBRARY',
      type: 'LIBRARY',
      room: 'Library'
    });
  }
  
  for (let i = 0; i < projectSessions; i++) {
    sessionPool.push({
      slotId: `project-${i}`,
      teacher: 'PROJ',
      course: 'PROJECT',
      type: 'PROJECT',
      room: 'Project Room'
    });
  }
  
  // Shuffle sessions for randomization
  const shuffledSessions = [...sessionPool].sort(() => Math.random() - 0.5);
  
  // Generate schedule for each day
  days.forEach(day => {
    const daySchedule: DaySchedule = {
      day,
      slots: new Array(classSlots.length).fill(null)
    };
    
    let sessionIndex = 0;
    let slotIndex = 0;
    
    while (slotIndex < classSlots.length && sessionIndex < shuffledSessions.length) {
      const session = shuffledSessions[sessionIndex];
      
      if (session.isDoubleSlot) {
        // Lab session needs 2 consecutive slots
        if (slotIndex < classSlots.length - 1) {
          daySchedule.slots[slotIndex] = {
            ...session,
            slotId: `${day.toLowerCase()}-${slotIndex}`
          };
          daySchedule.slots[slotIndex + 1] = {
            ...session,
            slotId: `${day.toLowerCase()}-${slotIndex + 1}`,
            course: `${session.course} (Cont.)`
          };
          slotIndex += 2;
        } else {
          slotIndex++;
        }
      } else {
        // Theory session needs 1 slot
        daySchedule.slots[slotIndex] = {
          ...session,
          slotId: `${day.toLowerCase()}-${slotIndex}`
        };
        slotIndex++;
      }
      
      sessionIndex++;
    }
    
    schedule.push(daySchedule);
  });
  
  return schedule;
}

export function formatTimeSlot(slotIndex: number): string {
  const classSlots = timeSlots.filter(slot => slot.type === 'class');
  if (slotIndex < classSlots.length) {
    const slot = classSlots[slotIndex];
    return `${slot.startTime} - ${slot.endTime}`;
  }
  return '';
}

export function getSlotColor(type: string): string {
  switch (type) {
    case 'TH': return 'bg-blue-50 border-l-4 border-l-blue-500 hover:bg-blue-100';
    case 'LAB': return 'bg-green-50 border-l-4 border-l-green-500 hover:bg-green-100';
    case 'LIBRARY': return 'bg-purple-50 border-l-4 border-l-purple-500 hover:bg-purple-100';
    case 'PROJECT': return 'bg-orange-50 border-l-4 border-l-orange-500 hover:bg-orange-100';
    default: return 'bg-gray-50 border-l-4 border-l-gray-300 hover:bg-gray-100';
  }
}

export function getTypeColor(type: string): string {
  switch (type) {
    case 'TH': return 'bg-blue-100 text-blue-800';
    case 'LAB': return 'bg-green-100 text-green-800';
    case 'LIBRARY': return 'bg-purple-100 text-purple-800';
    case 'PROJECT': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}