import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Alert, Box, Button, Grid, Link, Snackbar, TextField, Typography } from '@mui/material'

import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'
import { AuthContext } from '@/context'

interface formData {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formData>()
  const router = useRouter()
  const [isLoginError, setIsLoginError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: '',
  })
  const { login } = useContext(AuthContext)

  const onLogin = async ({ email, password }: formData) => {
    setIsLoginError({ status: false, message: '' })
    const res = await login(email, password)
    if (axios.isAxiosError(res)) {
      const errorMessage = res.response?.data?.message || 'Server error. Please contact support.'
      setIsLoginError({ status: true, message: errorMessage })
      return
    }
    router.replace('/')
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={handleSubmit(onLogin)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='email'
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
                Sign in
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/register' passHref>
                <Link component='span' underline='always'>
                  You don&apos;t have an account?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Snackbar
        open={isLoginError.status}
        onClose={() => setIsLoginError({ status: false, message: '' })}
        autoHideDuration={3000}
      >
        <Alert severity='error'>{isLoginError.message}</Alert>
      </Snackbar>
    </AuthLayout>
  )
}

export default LoginPage
