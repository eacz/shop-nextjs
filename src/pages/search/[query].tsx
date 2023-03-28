import { Box, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'

import { ProductList } from '@/components/products'
import { ShopLayout } from '@/components/layouts'
import { dbProducts } from '@/database'
import { IProduct } from '@/interfaces/product'

interface Props {
  products: IProduct[]
  wereProductsFounded: boolean
  query: string
}

export default function Search({ products, query, wereProductsFounded }: Props) {
  return (
    <ShopLayout title='Teslo-Shop - Search' pageDescription='Find the best Teslo Products'>
      <Typography variant='h1' component='h1'>
        Search Products
      </Typography>
      {wereProductsFounded ? (
        <Typography color='secondary' variant='h2' sx={{ mb: 1 }}>
          {query}
        </Typography>
      ) : (
        <Box display='flex'>
          <Typography variant='h2' sx={{ mb: 1 }}>
            There is no products that match your search
          </Typography>
          <Typography color='secondary' variant='h2' sx={{ mb: 1, ml:1 }}>
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }

  if (query.length === 0) {
    return { redirect: { destination: '/', permanent: false } }
  }
  let products = await dbProducts.getProductsByTerm(query)
  const wereProductsFounded = products.length > 0

  if(!wereProductsFounded){
    products = await dbProducts.getAllProducts()
  }

  return {
    props: { products, query, wereProductsFounded },
  }
}
