// src/data/decemberSchedule.ts

export type ShiftType = 'morning' | 'evening' | 'none'

export type DayShift = {
	date: string
	dayOfMonth: number
	weekday: string
	weekNumber: number
	monthName: string
	shiftType: ShiftType
	shiftName: string
	timeRange: string
	durationHours: number
}



// вспомогательно
const DECEMBER = 'Декабрь'

export const december2025Schedule: DayShift[] = [
	// ===== ДЕКАБРЬ 2025 (с 26 по 31) =====
	{
		date: '2025-12-26',
		dayOfMonth: 26,
		weekday: 'Пятница',
		weekNumber: 4,
		monthName: DECEMBER,
		shiftType: 'morning',
		shiftName: '8 утро',
		timeRange: '8:20 - 17:10',
		durationHours: 8,
	},
	{
		date: '2025-12-27',
		dayOfMonth: 27,
		weekday: 'Суббота',
		weekNumber: 4,
		monthName: DECEMBER,
		shiftType: 'none',
		shiftName: 'Выходной',
		timeRange: '',
		durationHours: 0,
	},
	{
		date: '2025-12-28',
		dayOfMonth: 28,
		weekday: 'Воскресенье',
		weekNumber: 4,
		monthName: DECEMBER,
		shiftType: 'morning',
		shiftName: '5 утро',
		timeRange: '9:30 - 15:00',
		durationHours: 5,
	},
	{
		date: '2025-12-29',
		dayOfMonth: 29,
		weekday: 'Понедельник',
		weekNumber: 5,
		monthName: DECEMBER,
		shiftType: 'morning',
		shiftName: '8 утро',
		timeRange: '11:40 - 20:30',
		durationHours: 8,
	},
	{
		date: '2025-12-30',
		dayOfMonth: 30,
		weekday: 'Вторник',
		weekNumber: 5,
		monthName: DECEMBER,
		shiftType: 'morning',
		shiftName: '8 утро',
		timeRange: '8:30 - 17:20',
		durationHours: 8,
	},
	{
		date: '2025-12-31',
		dayOfMonth: 31,
		weekday: 'Среда',
		weekNumber: 5,
		monthName: DECEMBER,
		shiftType: 'evening',
		shiftName: '5 вечер',
		timeRange: '14:00 - 19:30',
		durationHours: 5,
	},
]