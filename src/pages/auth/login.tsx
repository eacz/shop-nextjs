import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { getProviders, signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Alert, Box, Button, Divider, Grid, Link, Snackbar, TextField, Typography } from '@mui/material'

import { AuthLayout } from '@/components/layouts'
import { validations } from '@/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

interface formData {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>()
  const router = useRouter()
  const [isLoginError, setIsLoginError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: '',
  })
  const [providers, setProviders] = useState<any>({})

  const onLogin = async ({ email, password }: formData) => {
    await signIn('credentials', { email, password })
  }

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov)
    })
  }, [])

  const previousPage = router.query.page?.toString() ? `?page=${router.query.page?.toString()}` : ''

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
              <NextLink href={`/auth/register${previousPage}`} passHref>
                <Link component='span' underline='always'>
                  You don&apos;t have an account?
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
              <Divider sx={{ width: '100%', marginBottom: 2 }} />
              {Object.values(providers).map((prov: any) => {
                if (prov.id === 'credentials') return <div key={prov.id}></div>
                return (
                  <Button
                    key={prov.id}
                    variant='outlined'
                    fullWidth
                    color='primary'
                    sx={{ mb: 1 }}
                    onClick={() => signIn(prov.id)}
                  >
                    {prov.name}
                  </Button>
                )
              })}
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

export default LoginPage
