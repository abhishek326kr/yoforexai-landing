'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Phone,
  TrendingUp
} from '@mui/icons-material';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, phoneLoginSchema } from '@/lib/auth-validation';
import { loginUser, requestPhoneOTP, LoginData, PhoneLoginData } from '@/lib/auth-api';
import { PhoneInput } from '@/components/auth/PhoneInput';

interface EmailLoginFormData {
  email: string;
  password: string;
}

interface PhoneLoginFormData {
  phone: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`login-tabpanel-${index}`}
      aria-labelledby={`login-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Email/Password form
  const emailForm = useForm<EmailLoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Phone form
  const phoneForm = useForm<PhoneLoginFormData>({
    resolver: yupResolver(phoneLoginSchema),
    defaultValues: {
      phone: ''
    }
  });

  useEffect(() => {
    // Check for verification success message
    if (searchParams.get('verified') === 'true') {
      setSuccess('Phone number verified successfully! You can now log in.');
    }
  }, [searchParams]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError(null);
    setSuccess(null);
  };

  const onEmailLogin = async (data: EmailLoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const loginData: LoginData = {
        email: data.email,
        password: data.password
      };

      const response = await loginUser(loginData);

      if (response.success) {
        // Store auth token (in real app, use secure storage)
        localStorage.setItem('authToken', response.data.token);
        router.push('/dashboard');
      } else {
        if (response.error === 'INVALID_CREDENTIALS') {
          emailForm.setError('email', { message: 'Invalid email or password' });
          emailForm.setError('password', { message: 'Invalid email or password' });
        } else {
          setError(response.message);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onPhoneLogin = async (data: PhoneLoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      const phoneData: PhoneLoginData = {
        phone: data.phone
      };

      const response = await requestPhoneOTP(phoneData);

      if (response.success) {
        // Store phone number for OTP verification
        sessionStorage.setItem('pendingVerification', JSON.stringify({
          phone: data.phone,
          type: 'login'
        }));
        
        router.push('/auth/verify-otp');
      } else {
        if (response.error === 'PHONE_NOT_FOUND') {
          phoneForm.setError('phone', { message: response.message });
        } else {
          setError(response.message);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TrendingUp sx={{ fontSize: 40 }} />
            </Box>
          </Box>
          
          <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
            YoForex AI
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Welcome back! Sign in to your account
          </Typography>
        </Box>

        {/* Success Alert */}
        {success && (
          <Alert severity="success" sx={{ mb: 3, bgcolor: 'rgba(76, 175, 80, 0.2)' }}>
            {success}
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(244, 67, 54, 0.2)' }}>
            {error}
          </Alert>
        )}

        {/* Login Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.2)', mb: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.7)',
                '&.Mui-selected': {
                  color: 'white'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'white'
              }
            }}
          >
            <Tab
              label="Email / Password"
              icon={<Email />}
              iconPosition="start"
              sx={{ textTransform: 'none' }}
            />
            <Tab
              label="Phone / OTP"
              icon={<Phone />}
              iconPosition="start"
              sx={{ textTransform: 'none' }}
            />
          </Tabs>
        </Box>

        {/* Email/Password Login */}
        <TabPanel value={tabValue} index={0}>
          <Box component="form" onSubmit={emailForm.handleSubmit(onEmailLogin)} noValidate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Email Field */}
              <Controller
                name="email"
                control={emailForm.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="email"
                    label="Email Address"
                    error={!!emailForm.formState.errors.email}
                    helperText={emailForm.formState.errors.email?.message}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: 'white' }} />
                        </InputAdornment>
                      ),
                      sx: { color: 'white' }
                    }}
                    InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' }
                      }
                    }}
                  />
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={emailForm.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    error={!!emailForm.formState.errors.password}
                    helperText={emailForm.formState.errors.password?.message}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: 'white' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: 'white' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { color: 'white' }
                    }}
                    InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                        '&.Mui-focused fieldset': { borderColor: 'white' }
                      }
                    }}
                  />
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)'
                  },
                  '&:disabled': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* Phone/OTP Login */}
        <TabPanel value={tabValue} index={1}>
          <Box component="form" onSubmit={phoneForm.handleSubmit(onPhoneLogin)} noValidate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Phone Field */}
              <Controller
                name="phone"
                control={phoneForm.control}
                render={({ field }) => (
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!phoneForm.formState.errors.phone}
                    helperText={phoneForm.formState.errors.phone?.message}
                    disabled={loading}
                    label="Phone Number"
                  />
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)'
                  },
                  '&:disabled': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Send OTP'
                )}
              </Button>

              <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.8, mt: 1 }}>
                We'll send a 4-digit code to verify your phone number
              </Typography>
            </Box>
          </Box>
        </TabPanel>

        {/* Footer */}
        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Don't have an account?{' '}
            <MuiLink
              component={Link}
              href="/auth/signup"
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Sign Up
            </MuiLink>
          </Typography>
          
          <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
            <MuiLink
              href="#"
              sx={{ 
                color: 'white', 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Forgot Password?
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}