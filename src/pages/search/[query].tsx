import { Typography } from '@mui/material'

import { useProducts } from '@/hooks'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui'
import { ShopLayout } from '@/components/layouts'

export default function Search() {
  const { isLoading, products } = useProducts('/products')

  return (
    <ShopLayout title='Teslo-Shop - Search' pageDescription='Find the best Teslo Products'>
      <Typography variant='h1' component='h1'>
        Search Products
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        query:
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}
