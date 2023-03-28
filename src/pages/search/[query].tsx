import { Typography } from '@mui/material'
import { GetServerSideProps } from 'next'

import { ProductList } from '@/components/products'
import { ShopLayout } from '@/components/layouts'
import { dbProducts } from '@/database'
import { IProduct } from '../../interfaces/product'

interface Props {
  products: IProduct[]
}

export default function Search({ products }: Props) {
  return (
    <ShopLayout title='Teslo-Shop - Search' pageDescription='Find the best Teslo Products'>
      <Typography variant='h1' component='h1'>
        Search Products
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        query:
      </Typography>
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

  //TODO: if there is no match with the search, return other product that the user may find interesting

  return {
    props: { products },
  }
}
