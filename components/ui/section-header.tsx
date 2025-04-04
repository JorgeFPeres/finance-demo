interface SectionHeaderProps {
  title: string
  subtitle?: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className='mb-8'>
      <div className='flex items-center gap-2 mb-1'>
        <h2 className='text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
          {title}
        </h2>
        <div className='h-[2px] flex-1 bg-gradient-to-r from-primary/20 to-transparent' />
      </div>
      {subtitle && <p className='text-muted-foreground text-sm'>{subtitle}</p>}
    </div>
  )
}
