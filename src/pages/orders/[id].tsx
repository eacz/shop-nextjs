import NextLink from 'next/link'
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts'
import { CartList, OrderSummary } from '@/components/cart'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = () => {
  return (
    <ShopLayout title='Order #1203912 Summary' pageDescription='Order  Summary'>
      <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
        Order: #1203912
      </Typography>
      <Chip
        sx={{ my: 2 }}
        label='Payment pending'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined />}
      />
      <Chip
        sx={{ my: 2 }}
        label='Payed Successfully'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Summary (3 products)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Shipping Address</Typography>

                <NextLink href='/checkout/address' passHref>
                  <Link underline='always' component='span'>
                    Edit
                  </Link>
                </NextLink>
              </Box>
              <Typography>Esteban Canteros</Typography>
              <Typography>1022 somewhere</Typography>
              <Typography>Taco Pozo, CH 125</Typography>
              <Typography>Argentina</Typography>
              <Typography>+54 12397846</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always' component='span'>
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                {/*  */}
                <h1>Pay</h1>
                <Chip
                  sx={{ my: 2 }}
                  label='Payed Successfully'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage
