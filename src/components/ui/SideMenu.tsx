import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material'

import { AuthContext, UiContext } from '@/context'

const SideMenu = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { push, asPath } = useRouter()
  const { isMenuOpen, toggleMenu } = useContext(UiContext)

  const { user, isLoggedIn, logout } = useContext(AuthContext)
  const isAdmin = !!(user && user.role === 'admin')

  const navigateTo = (route: string) => {
    push(route)
    toggleMenu()
  }

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return

    navigateTo(`/search/${searchTerm}`)
  }

  return (
    <Drawer
      open={isMenuOpen}
      anchor='right'
      onClose={() => toggleMenu()}
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn ? (
            <>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItemButton>

              <ListItemButton onClick={() => navigateTo('/orders/history')}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'My Orders'} />
              </ListItemButton>

              <ListItemButton onClick={() => logout()}>
                <ListItemIcon>
                  <LoginOutlined />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton onClick={() => navigateTo(`/auth/login?page=${asPath}`)}>
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={'Login'} />
            </ListItemButton>
          )}

          <ListItemButton
            onClick={() => navigateTo('/category/men')}
            sx={{ display: { xs: '', sm: 'none' } }}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Men'} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigateTo('/category/women')}
            sx={{ display: { xs: '', sm: 'none' } }}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={'Women'} />
          </ListItemButton>

          <ListItemButton
            onClick={() => navigateTo('/category/kid')}
            sx={{ display: { xs: '', sm: 'none' } }}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={'Kid'} />
          </ListItemButton>

          {/* Admin */}
          {isAdmin && (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItemButton>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={'Products'} />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={'Orders'} />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={'Users'} />
              </ListItemButton>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  )
}

export default SideMenu
