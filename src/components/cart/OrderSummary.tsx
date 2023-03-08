import { Divider, Grid, Typography } from '@mui/material'

const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>N° Products</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>3 items</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>$405</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Taxes</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>$65.75</Typography>
      </Grid>
      <Grid item sx={{ mt: 2 }} xs={6}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item sx={{ mt: 2 }}  xs={6} display='flex' justifyContent='end'>
        <Typography variant='subtitle1'>$470.75</Typography>
      </Grid>
    </Grid>
  )
}

export default OrderSummary
