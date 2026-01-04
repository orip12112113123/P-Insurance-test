'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mobileNumber.length < 9) {
      setError('נא להזין מספר טלפון תקין');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, '');
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const enteredCode = otp.join('');

    setTimeout(() => {
      if (enteredCode === '1111') {
        router.push('/dashboard');
      } else {
        setError('קוד שגוי. נסה שוב.');
        setLoading(false);
      }
    }, 500);
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp(['', '', '', '']);
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px'
      }}>
        {/* Card */}
        <div style={{
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 10px 40px rgba(20, 184, 166, 0.3)'
            }}>
              <span style={{ fontSize: '40px' }}>🏆</span>
            </div>
            <h1 style={{
              margin: '0 0 8px 0',
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              הדשבורד שלי
            </h1>
            <p style={{
              margin: 0,
              color: '#94a3b8',
              fontSize: '14px'
            }}>
              הכניסו את הקובץ הרצונים ובחרו את הקמפיין שלכם
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              color: '#fca5a5',
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/* Phone Step */}
          {step === 'phone' && (
            <form onSubmit={handleSendOTP}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#cbd5e1',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  🔵 מספר טלפון נייד
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="050-000-0000"
                  disabled={loading}
                  dir="ltr"
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '18px',
                    textAlign: 'center',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <p style={{
                color: '#64748b',
                fontSize: '12px',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                רשומים מראש לביצוע?
              </p>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  boxShadow: '0 10px 40px rgba(20, 184, 166, 0.3)'
                }}
              >
                {loading ? '⏳ שולח...' : '➡️ כניסה לדשבורד'}
              </button>
            </form>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '16px',
                  color: '#cbd5e1',
                  fontSize: '14px',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  הזן קוד אימות (4 ספרות)
                </label>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px'
                }} dir="ltr">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={loading}
                      style={{
                        width: '60px',
                        height: '70px',
                        textAlign: 'center',
                        fontSize: '28px',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(15, 23, 42, 0.6)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        color: 'white',
                        outline: 'none'
                      }}
                    />
                  ))}
                </div>
                <p style={{
                  color: '#64748b',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginTop: '12px'
                }}>
                  קוד נשלח ל-{mobileNumber}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.some(d => !d)}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: (loading || otp.some(d => !d)) ? 'not-allowed' : 'pointer',
                  opacity: (loading || otp.some(d => !d)) ? 0.7 : 1,
                  marginBottom: '12px',
                  boxShadow: '0 10px 40px rgba(20, 184, 166, 0.3)'
                }}
              >
                {loading ? '⏳ מאמת...' : '✓ כניסה למערכת'}
              </button>

              <button
                type="button"
                onClick={handleBackToPhone}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: 'transparent',
                  color: '#94a3b8',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                ← חזור
              </button>
            </form>
          )}

          {/* Footer */}
          <div style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#475569',
              fontSize: '12px',
              margin: 0
            }}>
              © השימוש באתר זה
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
