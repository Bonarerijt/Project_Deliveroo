import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  LocalShipping as TruckIcon,
  AccountCircle as AccountIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
    handleMenuClose();
  };

  const isActive = (path) => location.pathname === path;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'My Parcels', path: '/parcels', icon: <TruckIcon /> },
    { text: 'New Delivery', path: '/create', icon: <AddIcon /> },
    ...(user?.is_admin ? [{ text: 'Admin', path: '/admin', icon: <AdminIcon /> }] : []),
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <TruckIcon sx={{ fontSize: 24, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Deliveroo
          </Typography>
        </Box>
        {user && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {user.email}
          </Typography>
        )}
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => navigate(item.path)}
            sx={{
              bgcolor: isActive(item.path) ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
              color: isActive(item.path) ? 'primary.main' : 'text.primary',
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 102, 255, 0.1)',
        color: 'text.primary',
      }}
    >
      <Toolbar>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          <TruckIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #0066FF 0%, #00D4AA 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Deliveroo
          </Typography>
        </Box>

        {/* Navigation Links - Desktop Only */}
        {!isMobile && (
        <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
          <Button
            startIcon={<DashboardIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{
              color: isActive('/dashboard') ? 'primary.main' : 'text.secondary',
              fontWeight: isActive('/dashboard') ? 600 : 400,
              '&:hover': { bgcolor: 'rgba(0, 102, 255, 0.1)' },
            }}
          >
            Dashboard
          </Button>
          
          <Button
            startIcon={<TruckIcon />}
            onClick={() => navigate('/parcels')}
            sx={{
              color: isActive('/parcels') ? 'primary.main' : 'text.secondary',
              fontWeight: isActive('/parcels') ? 600 : 400,
              '&:hover': { bgcolor: 'rgba(0, 102, 255, 0.1)' },
            }}
          >
            My Parcels
          </Button>
          
          <Button
            startIcon={<AddIcon />}
            onClick={() => navigate('/create')}
            sx={{
              color: isActive('/create') ? 'primary.main' : 'text.secondary',
              fontWeight: isActive('/create') ? 600 : 400,
              '&:hover': { bgcolor: 'rgba(0, 102, 255, 0.1)' },
            }}
          >
            New Delivery
          </Button>

          {user?.is_admin && (
            <Button
              startIcon={<AdminIcon />}
              onClick={() => navigate('/admin')}
              sx={{
                color: isActive('/admin') ? 'primary.main' : 'text.secondary',
                fontWeight: isActive('/admin') ? 600 : 400,
                '&:hover': { bgcolor: 'rgba(0, 102, 255, 0.1)' },
              }}
            >
              Admin
            </Button>
          )}
        </Box>
        )}

        {/* User Menu - Desktop Only */}
        {!isMobile && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <Typography variant="body2" color="text.secondary">
              Welcome, {user.email.split('@')[0]}
            </Typography>
          )}
          
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              bgcolor: 'rgba(0, 102, 255, 0.1)',
              '&:hover': { bgcolor: 'rgba(0, 102, 255, 0.2)' },
            }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              <AccountIcon />
            </Avatar>
          </IconButton>
        </Box>
        )}

        {/* User Menu Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: 2,
              minWidth: 200,
              boxShadow: '0 8px 32px rgba(0, 102, 255, 0.15)',
            },
          }}
        >
          <MenuItem disabled>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {user?.email}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.is_admin ? 'Administrator' : 'User'}
              </Typography>
            </Box>
          </MenuItem>
          
          <Divider />
          
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
            Logout
          </MenuItem>
        </Menu>
        
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;