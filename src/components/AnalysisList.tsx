import * as React from 'react'
import { analyses40Plus, type AnalysisItem } from '@/data/analyses'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const CATEGORY_LABELS: Record<string, string> = {
	mandatory: 'Обязательные',
	oncology: 'Онкоскрининг',
	men: 'Для мужчин',
	recommended: 'Рекомендуемые',
	byIndication: 'По показаниям',
	care: 'Уход и качество жизни',
}

const CATEGORY_COLOR: Record<string, string> = {
	mandatory: 'bg-red-100 text-red-900 border-red-300',
	oncology: 'bg-orange-100 text-orange-900 border-orange-300',
	men: 'bg-blue-100 text-blue-900 border-blue-300',
	recommended: 'bg-yellow-100 text-yellow-900 border-yellow-300',
	byIndication: 'bg-muted text-muted-foreground border-muted',
	care: 'bg-green-100 text-green-900 border-green-300',
}

// группировка по категориям
const groupByCategory = (items: AnalysisItem[]) => {
	const map = new Map<string, AnalysisItem[]>()
	items.forEach(item => {
		if (!map.has(item.category)) map.set(item.category, [])
		map.get(item.category)!.push(item)
	})
	return Array.from(map.entries())
}

export const AnalysisList: React.FC = () => {
	const groups = React.useMemo(() => groupByCategory(analyses40Plus), [])

	return (
		<div className='max-w-[700px] m-auto h-full flex flex-col bg-background'>
			<header className='px-4 pt-4 pb-2 flex items-start justify-between gap-4'>
				{/* Левая часть — текст */}
				<div className='flex flex-col'>
					<h2 className='text-base font-semibold'>Аркаев Хамит</h2>
					<p className='text-base text-muted-foreground -mt-1'>
						Чек-ап здоровья 40+
					</p>

					<h1 className='text-base font-semibold mt-2'>
						Анализы и обследования
					</h1>
					<p className='text-base text-muted-foreground'>
						Ежегодные анализы
					</p>

					{/* Биометрия */}
					<div className='mt-2 text-base text-muted-foreground space-y-0.5'>
						{/* 1 строка: рост + вес */}
						<div className='flex gap-4'>
							<span>
								Рост: <b className='text-foreground'>180 см</b>
							</span>
							<span>
								Вес: <b className='text-foreground'>63 кг</b>
							</span>
						</div>

						{/* 2 строка: группа крови + резус */}
						<div className='flex gap-4'>
							<span>
								Группа крови: <b className='text-foreground'>II</b>
							</span>
							<span>
								Rh: <b className='text-foreground'>+</b>
							</span>
						</div>
					</div>
				</div>

				{/* Правая часть — аватар */}
				<div className='w-24 h-24 rounded-lg overflow-hidden border bg-muted shrink-0'>
					<img
						src='/avatar.jpg'
						alt='avatar'
						className='w-full h-full object-cover'
					/>
				</div>
			</header>

			<ScrollArea className='flex-1 px-2 pb-4'>
				<div className='space-y-4'>
					{groups.map(([category, items]) => (
						<CategoryBlock key={category} category={category} items={items} />
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

interface CategoryBlockProps {
	category: string
	items: AnalysisItem[]
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({ category, items }) => {
	return (
		<Card className='p-3 border-border/60'>
			<h3 className='text-lg font-bold mb-1'>
				{CATEGORY_LABELS[category]}
			</h3>

			<div className='grid grid-cols-1 gap-2'>
				{items.map(item => (
					<AnalysisRow key={item.id} item={item} />
				))}
			</div>
		</Card>
	)
}

interface AnalysisRowProps {
	item: AnalysisItem
}

const AnalysisRow: React.FC<AnalysisRowProps> = ({ item }) => {
	return (
		<button
			className={cn(
				'w-full grid grid-cols-[1fr_90px] items-center rounded-md border px-3 py-3 text-left transition',
				'active:scale-[0.99]'
			)}
		>
			{/* Левая часть */}
			<div className='flex flex-col gap-0.5'>
				<span className='text-base font-semibold'>{item.name}</span>

				{item.subItems && (
					<span className='text-base text-muted-foreground'>
						{item.subItems.join(', ')}
					</span>
				)}

				<span className='text-base text-muted-foreground'>{item.purpose}</span>

				{item.frequency && (
					<Badge
						variant='outline'
						className={cn(
							'mt-1 w-fit text-base px-2 py-0.5 border',
							CATEGORY_COLOR[item.category]
						)}
					>
						{item.frequency}
					</Badge>
				)}
			</div>

			{/* Правая часть */}
			<div className='flex flex-col items-end justify-between h-full'>
				<span className='text-base font-semibold'>
					{item.price > 0 ? `${item.price} T` : '—'}
				</span>

				<Badge
					variant='outline'
					className={cn(
						'text-base px-2 py-0.5 border',
						CATEGORY_COLOR[item.category]
					)}
				>
					{CATEGORY_LABELS[item.category]}
				</Badge>
			</div>
		</button>
	)
}
