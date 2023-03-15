import { ProductList } from '@/components/products'
import { Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'

import useSWR from 'swr'
const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json())

export default function Home() {
  const { data, error, isLoading } = useSWR('/api/products', fetcher, {})

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <ShopLayout title='Teslo-Shop - Home' pageDescription='Find the best Teslo Products'>
      <Typography variant='h1' component='h1'>
        Teslo Shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All the products
      </Typography>
      <ProductList products={data} />
    </ShopLayout>
  )
}
