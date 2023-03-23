import { Typography } from '@mui/material'

import { useProducts } from '@/hooks'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui'
import { ShopLayout } from '@/components/layouts'


export default function Home() {
  const {  isLoading, products } = useProducts('/products?gender=women')

  return (
    <ShopLayout title='Teslo-Shop - Women' pageDescription='Find the best Teslo Products for Women'>
      <Typography variant='h1' component='h1'>
        Women
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All the products
      </Typography>
      { isLoading 
        ? <FullScreenLoading />
        : <ProductList products={products} />
      }
    </ShopLayout>
  )
}
