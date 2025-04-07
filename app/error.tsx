'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function Error() {
  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center p-6'>
      <div className='text-center space-y-6 max-w-md'>
        <div className='flex justify-center'>
          <div className='relative'>
            <AlertCircle className='h-16 w-16 text-destructive' />
            <div className='absolute -bottom-2 -right-2 bg-background rounded-full p-1'>
              <RefreshCw className='h-6 w-6 text-destructive' />
            </div>
          </div>
        </div>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold'>Ops! Algo deu errado</h2>
          <p className='text-muted-foreground'>
            Não foi possível carregar os dados financeiros. Por favor, tente
            novamente.
          </p>
        </div>
        <div className='space-y-4'>
          <Button
            variant='secondary'
            className='w-full bg-indigo-400 hover:bg-indigo-500 text-white hover:text-white'
            asChild
          >
            <a href='/dashboard'>Voltar para o dashboard</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
