'use client'

import { useParams } from 'next/navigation'

export default function DetailsPage() {
  const params = useParams()

  return <div className='container mx-auto p-6'>{`Detalhes ${params}`}</div>
}
