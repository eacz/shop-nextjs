import { useContext } from 'react'
import { Grid, Typography } from '@mui/material'

import { currency } from '@/utils'
import { CartContext } from '@/context/cart/CartContext'

const OrderSummary = () => {
  const { cartSummary } = useContext(CartContext)
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>N° Products</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>
          {cartSummary.numberOfItems} {cartSummary.numberOfItems > 1 ? 'Items' : 'Item'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(cartSummary.subtotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Taxes {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{currency.format(cartSummary.tax)}</Typography>
      </Grid>
      <Grid item sx={{ mt: 2 }} xs={6}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item sx={{ mt: 2 }} xs={6} display='flex' justifyContent='end'>
        <Typography variant='subtitle1'>{currency.format(cartSummary.total)}</Typography>
      </Grid>
    </Grid>
  )
}

export default OrderSummary
