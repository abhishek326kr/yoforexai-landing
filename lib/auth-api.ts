// Mock API functions for authentication
// In a real app, these would make actual API calls

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface PhoneLoginData {
  phone: string;
}

export interface OTPVerificationData {
  phone: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock signup API
export const signupUser = async (data: SignupData): Promise<AuthResponse> => {
  await delay(1500);
  
  // Simulate email already exists error
  if (data.email === 'test@example.com') {
    return {
      success: false,
      message: 'Email already exists',
      error: 'EMAIL_EXISTS'
    };
  }
  
  // Simulate phone already exists error
  if (data.phone === '+1234567890') {
    return {
      success: false,
      message: 'Phone number already exists',
      error: 'PHONE_EXISTS'
    };
  }
  
  return {
    success: true,
    message: 'Account created successfully. Please verify your phone number.',
    data: {
      userId: 'user_123',
      phone: data.phone
    }
  };
};

// Mock phone OTP request API
export const requestPhoneOTP = async (data: PhoneLoginData): Promise<AuthResponse> => {
  await delay(1000);
  
  // Simulate phone not found error for login
  if (data.phone === '+9999999999') {
    return {
      success: false,
      message: 'Phone number not found',
      error: 'PHONE_NOT_FOUND'
    };
  }
  
  return {
    success: true,
    message: 'OTP sent successfully',
    data: {
      phone: data.phone,
      otpSent: true
    }
  };
};

// Mock OTP verification API
export const verifyOTP = async (data: OTPVerificationData): Promise<AuthResponse> => {
  await delay(1000);
  
  // Simulate invalid OTP
  if (data.otp !== '1234') {
    return {
      success: false,
      message: 'Invalid OTP. Please try again.',
      error: 'INVALID_OTP'
    };
  }
  
  return {
    success: true,
    message: 'Phone number verified successfully',
    data: {
      token: 'jwt_token_here',
      user: {
        id: 'user_123',
        phone: data.phone,
        verified: true
      }
    }
  };
};

// Mock email/password login API
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  await delay(1000);
  
  // Simulate invalid credentials
  if (data.email !== 'user@example.com' || data.password !== 'Password123!') {
    return {
      success: false,
      message: 'Invalid email or password',
      error: 'INVALID_CREDENTIALS'
    };
  }
  
  return {
    success: true,
    message: 'Login successful',
    data: {
      token: 'jwt_token_here',
      user: {
        id: 'user_123',
        email: data.email,
        name: 'John Doe'
      }
    }
  };
};

// Mock resend OTP API
export const resendOTP = async (phone: string): Promise<AuthResponse> => {
  await delay(500);
  
  return {
    success: true,
    message: 'OTP resent successfully',
    data: {
      phone,
      otpSent: true
    }
  };
};