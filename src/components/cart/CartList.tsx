import NextLink from 'next/link'
import { useContext } from 'react'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'

import { CartContext } from '@/context'
import { ItemCounter } from '@/components/ui'
import { ICartProduct } from '@/interfaces'

interface Props {
  editable?: boolean
}

const CartList = ({ editable = false }: Props) => {
  const { cart, updateCartQuantity } = useContext(CartContext)

  const handleProductQuantityChange = (product: ICartProduct, newQuantity: number) => {
    updateCartQuantity({ ...product, quantity: newQuantity })
  }

  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/* TODO: redirect to product page */}
            <NextLink href={`/products/${product.slug}`} passHref>
              <Link component='span'>
                <CardActionArea>
                  <CardMedia image={`/products/${product.image}`} component='img' sx={{ borderRadius: 5 }} />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Size: <strong>{product.size}</strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={product.inStock}
                  onQuantityChange={(quantity) => handleProductQuantityChange(product, quantity)}
                />
              ) : (
                <Typography sx={{ mt: 1 }} variant='h5'>
                  {product.quantity} {product.quantity > 1 ? 'products' : 'product'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
            <Typography variant='subtitle1'>${product.price}</Typography>
            {editable && (
              <Button variant='text' color='secondary'>
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  )
}

export default CartList
