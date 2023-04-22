import { useContext, useMemo } from 'react'
import NextLink from 'next/link'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'

import { ShopLayout } from '@/components/layouts'
import { CartList, OrderSummary } from '@/components/cart'
import { CartContext } from '@/context'
import { countries } from '@/utils'

const SummaryPage = () => {
  const { address, cartSummary } = useContext(CartContext)

  const country = useMemo(
    () => countries.find((country) => country.code === address?.country)?.name,
    [address?.country]
  )

  if (!address) return <></>

  return (
    <ShopLayout title='Order Summary' pageDescription='Order Summary'>
      <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
        Order Summary
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Summary ({cartSummary.numberOfItems} {cartSummary.numberOfItems > 1 ? 'products' : 'product'}{' '}
                )
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Shipping Address</Typography>

                <NextLink href='/checkout/address' passHref>
                  <Link underline='always' component='span'>
                    Edit
                  </Link>
                </NextLink>
              </Box>
              <Typography>
                {address.firstname} {address.lastname}
              </Typography>
              <Typography>
                {address.address} {address.address2 ? `, ${address.address2}` : ''}
              </Typography>
              <Typography>
                {address.city}, {address.zipcode}
              </Typography>
              <Typography>{country}</Typography>
              <Typography>{address.phone}</Typography>

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
                <Button color='secondary' className='circular-btn' fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
