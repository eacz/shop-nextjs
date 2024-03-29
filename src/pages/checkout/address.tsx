import { useContext } from 'react'
import { Typography, Grid, TextField, FormControl, MenuItem, Box, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'

import { ShopLayout } from '@/components/layouts'
import { countries } from '@/utils'
import { Address } from '@/interfaces'
import { CartContext } from '@/context'

const getAddressFromCookies = (): Address => {
  return {
    firstname: Cookies.get('firstname') || '',
    lastname: Cookies.get('lastname') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zipcode: Cookies.get('zipcode') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || '',
  }
}

const AddressPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>({
    defaultValues: getAddressFromCookies(),
  })
  const { setAddress } = useContext(CartContext)

  const onSubmit = (address: Address) => {
    setAddress(address)
    router.push('/checkout/summary')
  }

  return (
    <ShopLayout title='Address' pageDescription='Address where the product will be shiping'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h1' component='h1'>
          Address
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Name'
              variant='filled'
              fullWidth
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
              {...register('firstname', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Lastname'
              variant='filled'
              fullWidth
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
              {...register('lastname', { required: true })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Address'
              variant='filled'
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
              {...register('address', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Address 2 (Optional)'
              variant='filled'
              fullWidth
              error={!!errors.address2}
              helperText={errors.address2?.message}
              {...register('address2')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='City'
              variant='filled'
              fullWidth
              error={!!errors.city}
              helperText={errors.city?.message}
              {...register('city', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Zip Code'
              variant='filled'
              fullWidth
              error={!!errors.zipcode}
              helperText={errors.zipcode?.message}
              {...register('zipcode', { required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                key={Cookies.get('country') || countries[0].code}
                defaultValue={Cookies.get('country') || countries[0].code}
                variant='filled'
                label='Country'
                error={!!errors.country}
                {...register('country', { required: true })}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Phone'
              variant='filled'
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
              {...register('phone', { required: true })}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
          <Button color='secondary' type='submit' className='circular-btn' size='large'>
            Check Order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

//export const getServerSideProps: GetServerSideProps = async ({req}) => {
//  const { token = '' } = req.cookies
//  let isValidToken = false

//  try {
//    await jwt.isValidToken(token)
//    isValidToken = true
//  } catch (error) {
//    isValidToken = false
//  }

//  if(!isValidToken){
//    return {
//      redirect: {
//        destination: '/auth/login?page=/checkout/address',
//        permanent: false
//      }
//    }
//  }

//  return {
//    props: {

//    }
//  }
//}

export default AddressPage
