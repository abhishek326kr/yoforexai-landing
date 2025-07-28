'use client';

import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  Box,
  InputAdornment,
  FormHelperText
} from '@mui/material';
import { parsePhoneNumber, getCountries, getCountryCallingCode } from 'libphonenumber-js';

interface Country {
  code: string;
  name: string;
  callingCode: string;
  flag: string;
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  label?: string;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', callingCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', callingCode: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', callingCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', callingCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', callingCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', callingCode: '+33', flag: '🇫🇷' },
  { code: 'IN', name: 'India', callingCode: '+91', flag: '🇮🇳' },
  { code: 'JP', name: 'Japan', callingCode: '+81', flag: '🇯🇵' },
  { code: 'CN', name: 'China', callingCode: '+86', flag: '🇨🇳' },
  { code: 'BR', name: 'Brazil', callingCode: '+55', flag: '🇧🇷' }
];

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  error = false,
  helperText,
  disabled = false,
  label = 'Phone Number'
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  React.useEffect(() => {
    if (value) {
      try {
        const parsed = parsePhoneNumber(value);
        if (parsed) {
          const country = countries.find(c => c.callingCode === `+${parsed.countryCallingCode}`);
          if (country) {
            setSelectedCountry(country);
            setPhoneNumber(parsed.nationalNumber);
          }
        }
      } catch {
        // If parsing fails, keep current state
      }
    }
  }, [value]);

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      const fullNumber = phoneNumber ? `${country.callingCode}${phoneNumber}` : '';
      onChange(fullNumber);
    }
  };

  const handlePhoneChange = (phone: string) => {
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    setPhoneNumber(cleanPhone);
    
    const fullNumber = cleanPhone ? `${selectedCountry.callingCode}${cleanPhone}` : '';
    onChange(fullNumber);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          select
          value={selectedCountry.code}
          onChange={(e) => handleCountryChange(e.target.value)}
          disabled={disabled}
          sx={{ 
            minWidth: 120,
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }
          }}
        >
          {countries.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{country.flag}</span>
                <span>{country.callingCode}</span>
              </Box>
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label={label}
          value={phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          error={error}
          disabled={disabled}
          placeholder="Enter phone number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {selectedCountry.callingCode}
              </InputAdornment>
            )
          }}
        />
      </Box>
      {helperText && (
        <FormHelperText error={error} sx={{ ml: 0, mt: 1 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};