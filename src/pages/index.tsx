import { ProductList } from '@/components/products'
import { useProducts } from '@/hooks'
import { Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'

export default function Home() {
  const {  isLoading, products } = useProducts('/products')

  return (
    <ShopLayout title='Teslo-Shop - Home' pageDescription='Find the best Teslo Products'>
      <Typography variant='h1' component='h1'>
        Teslo Shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All the products
      </Typography>
      { isLoading 
        ? <h1>Loading...</h1> 
        : <ProductList products={products} />
      }
    </ShopLayout>
  )
}
