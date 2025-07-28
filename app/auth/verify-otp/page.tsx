'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Link as MuiLink,
  IconButton
} from '@mui/material';
import { ArrowBack, Phone } from '@mui/icons-material';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { otpVerificationSchema } from '@/lib/auth-validation';
import { verifyOTP, resendOTP } from '@/lib/auth-api';
import { OTPInput } from '@/components/auth/OTPInput';
import { getPhoneDisplayFormat } from '@/lib/auth-validation';

interface OTPFormData {
  otp: string;
}

interface PendingVerification {
  phone: string;
  type: 'signup' | 'login';
}

export default function VerifyOTPPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pendingVerification, setPendingVerification] = useState<PendingVerification | null>(null);
  const [countdown, setCountdown] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError: setFieldError,
    setValue
  } = useForm<OTPFormData>({
    resolver: yupResolver(otpVerificationSchema),
    defaultValues: {
      otp: ''
    }
  });

  useEffect(() => {
    // Get pending verification data from session storage
    const stored = sessionStorage.getItem('pendingVerification');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setPendingVerification(data);
      } catch {
        router.push('/auth/login');
      }
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = async (data: OTPFormData) => {
    if (!pendingVerification) return;

    setLoading(true);
    setError(null);

    try {
      const response = await verifyOTP({
        phone: pendingVerification.phone,
        otp: data.otp
      });

      if (response.success) {
        setSuccess('Phone number verified successfully!');
        
        // Clear pending verification
        sessionStorage.removeItem('pendingVerification');
        
        // Redirect based on verification type
        setTimeout(() => {
          if (pendingVerification.type === 'signup') {
            router.push('/auth/login?verified=true');
          } else {
            router.push('/dashboard');
          }
        }, 1500);
      } else {
        if (response.error === 'INVALID_OTP') {
          setFieldError('otp', { message: response.message });
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

  const handleResendOTP = async () => {
    if (!pendingVerification || countdown > 0) return;

    setResending(true);
    setError(null);

    try {
      const response = await resendOTP(pendingVerification.phone);

      if (response.success) {
        setSuccess('OTP resent successfully!');
        setCountdown(60); // 60 second countdown
        setValue('otp', ''); // Clear current OTP
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  if (!pendingVerification) {
    return null; // Will redirect
  }

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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton
              component={Link}
              href="/auth/signup"
              sx={{ color: 'white', mr: 1 }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
              Verify Phone
            </Typography>
          </Box>
          
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
              <Phone sx={{ fontSize: 40 }} />
            </Box>
          </Box>

          <Typography variant="body1" sx={{ opacity: 0.9, mb: 1 }}>
            We've sent a 4-digit code to
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {getPhoneDisplayFormat(pendingVerification.phone)}
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

        {/* OTP Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* OTP Input */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                Enter the 4-digit code
              </Typography>
              
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <OTPInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.otp}
                    disabled={loading}
                  />
                )}
              />
              
              {errors.otp && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#ff6b6b', 
                    display: 'block', 
                    mt: 1,
                    textAlign: 'center'
                  }}
                >
                  {errors.otp.message}
                </Typography>
              )}
            </Box>

            {/* Verify Button */}
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
                'Verify Phone Number'
              )}
            </Button>

            {/* Resend OTP */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                Didn't receive the code?
              </Typography>
              
              <Button
                onClick={handleResendOTP}
                disabled={countdown > 0 || resending}
                sx={{
                  color: 'white',
                  textDecoration: 'underline',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)'
                  },
                  '&:disabled': {
                    color: 'rgba(255,255,255,0.5)'
                  }
                }}
              >
                {resending ? (
                  <CircularProgress size={16} sx={{ color: 'white', mr: 1 }} />
                ) : null}
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Having trouble?{' '}
            <MuiLink
              component={Link}
              href="/auth/login"
              sx={{ 
                color: 'white', 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Back to Login
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}