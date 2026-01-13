'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/dashboard');
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
          {/* Phoenix Logo - Matching the actual logo */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{
              width: '120px',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              {/* Phoenix Bird SVG - Orange with blue accent */}
              <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px' }}>
                {/* Main orange bird body */}
                <path
                  d="M75 25 Q85 35 80 50 Q75 65 55 75 Q40 82 30 75 Q20 68 25 55 Q28 45 40 40 Q50 36 60 40 Q55 30 60 22 Q65 15 75 25Z"
                  fill="#ff6b35"
                />
                {/* Wing detail */}
                <path
                  d="M45 45 Q55 40 65 45 Q70 50 65 60 Q58 70 45 72 Q35 73 32 65 Q30 55 45 45Z"
                  fill="#f7931e"
                />
                {/* Blue accent tail */}
                <path
                  d="M20 60 Q10 55 5 45 Q3 35 15 40 Q25 45 30 55 Q28 62 20 60Z"
                  fill="#1e3a8a"
                />
                {/* Head detail */}
                <path
                  d="M70 30 Q78 28 82 35 Q85 42 78 45 Q72 47 68 42 Q65 37 70 30Z"
                  fill="#ff8c5a"
                />
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
            style={{
              width: '100%',
              padding: '18px 24px',
              background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(255, 107, 53, 0.35)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            כניסה לדשבורד
            <span style={{ fontSize: '24px' }}>←</span>
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
    </div>
  );
}
