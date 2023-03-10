import { ProductList } from '@/components/products'
import { initialData } from '@/database/products'
import { Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'

export default function Home() {
  return (
    <ShopLayout title='Teslo-Shop - Home' pageDescription='Find the best Teslo Products'>
      <Typography variant='h1' component='h1'>
        Teslo Shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All the products
      </Typography>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  )
}
