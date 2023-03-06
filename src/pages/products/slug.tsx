import { Grid, Box, Typography, Button, Chip } from '@mui/material'

import { ProductSlideshow, SizeSelector } from '@/components/products'
import { ShopLayout } from '@/components/layouts'
import { initialData } from '@/database/products'
import ItemCounter from '../../components/ui/ItemCounter'

const productTest = initialData.products[0]

const ProductPage = () => {
  return (
    <ShopLayout pageDescription={productTest.description} title={productTest.title}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={productTest.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {productTest.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              ${productTest.price}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Amount: </Typography>
              <ItemCounter />
              <SizeSelector selectedSize={productTest.sizes[0]} sizes={productTest.sizes} />
            </Box>

            {/* Add to cart */}
            <Button color='secondary' className='circular-btn'>
              Add to cart
            </Button>
            <Chip label='Out of stock' color='error' variant='outlined' />

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{productTest.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default ProductPage
