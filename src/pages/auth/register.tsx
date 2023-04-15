import { useState } from 'react'
import NextLink from 'next/link'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Alert, Box, Button, Grid, Link, Snackbar, TextField, Typography } from '@mui/material'

import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'
import { tesloApi } from '@/api'

type formData = {
  password: string
  email: string
  name: string
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formData>()
  const [isRegisterError, setIsRegisterError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: '',
  })

  const onRegister = async ({ email, name, password }: formData) => {
    try {
      const { data } = await tesloApi.post('/user/signup', { email, name, password })
      console.log({ data })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Server error. Please contact support.'
        setIsRegisterError({ status: true, message: errorMessage })

        console.log(errorMessage)
      }
    }
  }
  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onRegister)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Register
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Name'
                variant='filled'
                fullWidth
                {...register('name', {
                  required: true,
                  minLength: { value: 2, message: 'Name should have at least 2 characters' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Email'
                variant='filled'
                fullWidth
                {...register('email', { required: 'This field is required.', validate: validations.isEmail })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Password'
                type='password'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'This field is required.',
                  minLength: { value: 6, message: 'Password should be at least 6 chracters' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
                Sign up
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/login' passHref>
                <Link component='span' underline='always'>
                  You already have an account?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Snackbar
        open={isRegisterError.status}
        onClose={() => setIsRegisterError({ status: false, message: '' })}
        autoHideDuration={3000}
      >
        <Alert severity='error'>{isRegisterError.message}</Alert>
      </Snackbar>
    </AuthLayout>
  )
}

export default RegisterPage
