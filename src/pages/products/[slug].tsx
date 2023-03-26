import { Grid, Box, Typography, Button, Chip } from '@mui/material'

import { ProductSlideshow, SizeSelector } from '@/components/products'
import { ShopLayout } from '@/components/layouts'
import ItemCounter from '@/components/ui/ItemCounter'
import { initialData } from '../../database/products';

const product = initialData.products[0]

const ProductPage = () => {
  //const router = useRouter()
  //const {products: product, isLoading} = useProducts(`/products/${router.query.slug}`)





  return (
    <ShopLayout pageDescription={product.description} title={product.title}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              ${product.price}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Amount: </Typography>
              <ItemCounter />
              <SizeSelector selectedSize={product.sizes[0]} sizes={product.sizes} />
            </Box>

            {/* Add to cart */}
            <Button color='secondary' className='circular-btn'>
              Add to cart
            </Button>
            <Chip label='Out of stock' color='error' variant='outlined' />

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default ProductPage
