'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255,87,34,0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>

      <div style={{
        width: '100%',
        maxWidth: '440px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Card */}
        <div style={{
          backgroundColor: 'rgba(26, 26, 46, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '48px 40px',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 107, 53, 0.1)',
          border: '1px solid rgba(255, 107, 53, 0.2)'
        }}>
          {/* Phoenix Logo */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff5722 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 15px 50px rgba(255, 107, 53, 0.4)',
              position: 'relative'
            }}>
              {/* Phoenix Bird SVG */}
              <svg viewBox="0 0 100 100" style={{ width: '60px', height: '60px' }} fill="white">
                <path d="M50 20 C45 25 40 35 42 45 C35 40 25 42 20 50 C25 48 35 48 40 52 C38 58 40 68 50 80 C60 68 62 58 60 52 C65 48 75 48 80 50 C75 42 65 40 58 45 C60 35 55 25 50 20Z"/>
                <circle cx="50" cy="45" r="5" fill="rgba(255,255,255,0.8)"/>
              </svg>
            </div>

            <h1 style={{
              margin: '0 0 12px 0',
              fontSize: '32px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              פניקס ביטוח
            </h1>
            <p style={{
              margin: 0,
              color: '#8892a6',
              fontSize: '16px'
            }}>
              מערכת ניהול קמפיינים
            </p>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,107,53,0.3), transparent)' }}></div>
            <span style={{ color: '#ff6b35', fontSize: '20px' }}>🔥</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,107,53,0.3), transparent)' }}></div>
          </div>

          {/* Welcome Text */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px',
            padding: '20px',
            backgroundColor: 'rgba(255, 107, 53, 0.08)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 107, 53, 0.15)'
          }}>
            <p style={{
              margin: 0,
              color: '#c9d1d9',
              fontSize: '15px',
              lineHeight: '1.6'
            }}>
              ברוכים הבאים למערכת ניהול הקמפיינים של פניקס
              <br />
              <span style={{ color: '#ff6b35' }}>לחץ להמשך</span>
            </p>
          </div>

          {/* Enter Button */}
          <button
            onClick={handleEnter}
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px 24px',
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.8 : 1,
              boxShadow: '0 10px 40px rgba(255, 107, 53, 0.35)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></span>
                נכנס למערכת...
              </>
            ) : (
              <>
                כניסה לדשבורד
                <span style={{ fontSize: '24px' }}>→</span>
              </>
            )}
          </button>

          {/* Footer */}
          <div style={{
            marginTop: '32px',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#4a5568',
              fontSize: '12px',
              margin: 0
            }}>
              © 2025 Phoenix Insurance. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '24px',
          gap: '8px'
        }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#ff6b35', borderRadius: '50%', opacity: 0.6 }}></div>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#f7931e', borderRadius: '50%', opacity: 0.8 }}></div>
          <div style={{ width: '8px', height: '8px', backgroundColor: '#ff5722', borderRadius: '50%', opacity: 0.6 }}></div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
