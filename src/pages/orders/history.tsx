import NextLink from 'next/link'
import { Grid, Chip, Typography, Link } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { ShopLayout } from '@/components/layouts'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'FullName', width: 300, sortable: false },
  {
    field: 'paid',
    headerName: 'Payed',
    description: 'Show Information based on the pay status',
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return params.row.paid ? (
        <Chip color='success' variant='outlined' label='Payed' />
      ) : (
        <Chip color='error' variant='outlined' label='Pending' />
      )
    },
  },
  {
    field: 'orderno',
    headerName: 'Order #',
    width: 300,
    renderCell: (params) => {
      return (
        <NextLink href={`/orders/${params.row.id}`}>
          {' '}
          <Link component='span'> {params.row.orderno}</Link>
        </NextLink>
      )
    },
  },
]

const rows = [
  { id: 1, paid: true, fullName: 'Esteban Canteros', orderno: '#123012' },
  { id: 2, paid: false, fullName: 'Tina Lotero', orderno: '#123013' },
  { id: 3, paid: true, fullName: 'Mimi', orderno: '#123014' },
  { id: 4, paid: true, fullName: 'Miserable', orderno: '#123015' },
  { id: 5, paid: true, fullName: 'Ratón', orderno: '#123016' },
  { id: 6, paid: false, fullName: 'Poli', orderno: '#123017' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Orders history' pageDescription='Orders history of the client'>
      <Typography variant='h1' component='h1'>
        Orders History
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[10]} />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage
