import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

import { ShopLayout } from '@/components/layouts'
import { CartList, OrderSummary } from '@/components/cart'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { dbOrders } from '@/database'
import { IOrder } from '@/interfaces'
import { countries } from '@/utils'

interface Props {
  order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const {
    address,
    isPaid,
    numberOfItems,
    orderItems,
    subtotal,
    tax,
    total,
    _id,
    paidAt,
    paymentResult,
    user,
  } = order
  return (
    <ShopLayout title={`Order #${_id} Summary`} pageDescription={`Order ${_id} Summary`}>
      <Typography variant='h1' component='h1' sx={{ mb: 2 }}>
        Order: #{_id}
      </Typography>
      {isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label='Payed Successfully'
          variant='outlined'
          color='success'
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label='Payment pending'
          variant='outlined'
          color='error'
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList items={orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>
                Summary ({numberOfItems} {numberOfItems > 1 ? 'products' : 'product'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Shipping Address</Typography>
              </Box>
              <Typography>
                {address.firstname} {address.lastname}{' '}
              </Typography>
              <Typography>
                {address.address} {address.address2 && `, ${address.address2}`}
              </Typography>
              <Typography>
                {address.city}, {address.zipcode}
              </Typography>
              <Typography>{countries.find((country) => country.code === address.country)?.name}</Typography>
              <Typography>{address.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary orderSummary={{ numberOfItems, subtotal, tax, total }} />
              <Box sx={{ mt: 3 }} display='flex' flexDirection='column' >
                {isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label='Payed Successfully'
                    variant='outlined'
                    color='success'
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <h1>Pay</h1>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const { id = '' } = query

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?page=/orders/${id}`,
        permanent: false,
      },
    }
  }

  const order = await dbOrders.getOrderById(id.toString())

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    }
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      order,
    },
  }
}

export default OrderPage
