import { useContext, useState } from 'react'
import { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Alert, Box, Button, Grid, Link, Snackbar, TextField, Typography } from '@mui/material'

import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'
import { AuthContext } from '@/context'
import { authOptions } from '../api/auth/[...nextauth]'

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
  const router = useRouter()
  const { signup } = useContext(AuthContext)

  const onRegister = async ({ email, name, password }: formData) => {
    const res = await signup(name, email, password)
    if (axios.isAxiosError(res)) {
      const errorMessage = res.response?.data?.message || 'Server error. Please contact support.'
      setIsRegisterError({ status: true, message: errorMessage })
      return
    }
    await signIn('credentials', { email, password })
  }

  const previousPage = router.query.page?.toString() ? `?page=${router.query.page?.toString()}` : ''

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
              <NextLink href={`/auth/login${previousPage}`} passHref>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  const { page = '/' } = ctx.query

  if (session) {
    return {
      redirect: {
        destination: page.toString(),
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default RegisterPage
