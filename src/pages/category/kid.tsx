import { Typography } from '@mui/material'

import { useProducts } from '@/hooks'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui'
import { ShopLayout } from '@/components/layouts'

export default function Home() {
  const {  isLoading, products } = useProducts('/products?gender=kid')

  return (
    <ShopLayout title='Teslo-Shop - Kids' pageDescription='Find the best Teslo Products for Kids'>
      <Typography variant='h1' component='h1'>
        Kids
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
