// src/components/DecemberSchedule.tsx

import * as React from 'react'
import type { DayShift } from '@/data/decemberScheduleData'
import { december2025Schedule } from '@/data/decemberScheduleData'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const today = new Date()

// хелпер: дата в формате YYYY-MM-DD -> Date
const toDate = (iso: string) => new Date(iso + 'T00:00:00')

// проверка: день в прошлом?
const isPastDay = (d: DayShift) => {
	const dayDate = toDate(d.date)
	return (
		dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())
	)
}

// группировка по неделям
const groupByWeek = (days: DayShift[]) => {
	const weeks = new Map<number, DayShift[]>()
	days.forEach(d => {
		if (!weeks.has(d.weekNumber)) weeks.set(d.weekNumber, [])
		weeks.get(d.weekNumber)!.push(d)
	})
	return Array.from(weeks.entries()).sort((a, b) => a[0] - b[0])
}

export const DecemberSchedule: React.FC = () => {
	const weeks = React.useMemo(() => groupByWeek(december2025Schedule), [])

	return (
		<div className='w-full h-full flex flex-col items-stretch bg-background'>
			<header className='px-4 pt-4 pb-2 flex items-center justify-between'>
				<div>
					<h1 className='text-xl font-semibold'>График работы</h1>
					<p className='text-sm text-muted-foreground'>
						{december2025Schedule[0]?.monthName} 2025 &middot; 5 недель
					</p>
				</div>
			</header>

			<ScrollArea className='flex-1 px-4 pb-4'>
				<div className='space-y-4'>
					{weeks.map(([weekNumber, days]) => (
						<WeekBlock key={weekNumber} weekNumber={weekNumber} days={days} />
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

interface WeekBlockProps {
	weekNumber: number
	days: DayShift[]
}

const WeekBlock: React.FC<WeekBlockProps> = ({ weekNumber, days }) => {
	return (
		<Card className='p-3 border-border/60'>
			<div className='flex items-center justify-between mb-2'>
				<span className='text-xs font-medium text-muted-foreground'>
					Неделя {weekNumber}
				</span>
				<span className='text-[10px] uppercase tracking-wide text-muted-foreground'>
					{days[0]?.monthName} 2025
				</span>
			</div>

			<div className='grid grid-cols-1 gap-2'>
				{days.map(day => (
					<DayRow key={day.date} day={day} />
				))}
			</div>
		</Card>
	)
}

interface DayRowProps {
	day: DayShift
}

const DayRow: React.FC<DayRowProps> = ({ day }) => {
	const past = isPastDay(day)
	const isWeekend = day.weekday === 'Сб' || day.weekday === 'Вс'

	const shiftColor =
		day.shiftType === 'morning'
			? 'bg-pink-100 text-pink-900 border-pink-300'
			: day.shiftType === 'evening'
			? 'bg-blue-100 text-blue-900 border-blue-300'
			: 'bg-muted text-muted-foreground border-muted'

	return (
		<button
			className={cn(
				'w-full flex items-center justify-between rounded-md border px-3 py-2 text-left transition',
				'focus:outline-none focus:ring-1 focus:ring-ring',
				past && 'opacity-40 pointer-events-none', // блокируем прошлые
				!past && 'active:scale-[0.99]',
				isWeekend && 'bg-muted/30'
			)}
		>
			{/* Левая часть: дата + день недели + неделя */}
			<div className='flex flex-col'>
				<span className='text-sm font-semibold'>
					{day.dayOfMonth} {day.monthName.slice(0, 3)} {/* 1 Дек */}
				</span>
				<span className='text-xs text-muted-foreground'>
					{day.weekday} · неделя {day.weekNumber}
				</span>
			</div>

			{/* Центр: смена и время */}
			<div className='flex flex-col items-start'>
				<Badge
					variant='outline'
					className={cn('text-[11px] px-2 py-0.5 border', shiftColor)}
				>
					{day.shiftType === 'none' ? 'Выходной' : day.shiftName}
				</Badge>
				{day.timeRange && (
					<span className='text-xs text-muted-foreground mt-0.5'>
						{day.timeRange}
					</span>
				)}
			</div>

			{/* Правая часть: часы */}
			<div className='flex flex-col items-end'>
				{day.durationHours > 0 ? (
					<span className='text-sm font-medium'>{day.durationHours} ч</span>
				) : (
					<span className='text-xs text-muted-foreground'>0 ч</span>
				)}
				<span className='text-[10px] text-muted-foreground mt-0.5'>
					{day.shiftType === 'morning'
						? 'Утро'
						: day.shiftType === 'evening'
						? 'Вечер'
						: 'Нет смены'}
				</span>
			</div>
		</button>
	)
}
