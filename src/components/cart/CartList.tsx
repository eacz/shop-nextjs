import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'
import { initialData } from '../../database/products'
import { borderRadius } from '@mui/system'
import { ItemCounter } from '../ui'

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]]

const CartList = () => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/* TODO: redirect to product page */}
            <NextLink href={`/products/slug`} passHref>
              <Link component='span'>
                <CardActionArea>
                  <CardMedia
                    image={`products/${product.images[0]}`}
                    component='img'
                    sx={{ borderRadius: 5 }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Size: <strong>M</strong>
              </Typography>
              {/* Conditional */}
              <ItemCounter />
            </Box>
          </Grid>
          <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='subtitle1'>${product.price}</Typography>
            {/* Editable */}
            <Button variant='text' color='secondary'>
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
    </>
  )
}

export default CartList
