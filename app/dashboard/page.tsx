'use client';

import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  // Demo campaign data
  const campaign = {
    name: 'מבצע סוף שנה 2025',
    subtitle: 'באלי - איטליה - פריז על חשבוננו',
    totalContacts: 3481,
    activeCampaigns: 24,
  };

  const stats = [
    { label: 'תקבולים אשתקד', value: '₪9.79B', change: '+8.2% מאשתקד', icon: '📊', color: '#ff6b35' },
    { label: 'שיחות', value: '79', change: '2.4% המרה', icon: '📞', color: '#f7931e' },
    { label: 'סך הכנסות', value: '₪13.08B', change: 'סה״כ שנתי', icon: '💰', color: '#22c55e' },
    { label: 'תחזית רבעונית', value: '₪9.40B', change: 'צפי לרבעון הבא', icon: '📈', color: '#ff5722' },
  ];

  const managers = [
    { name: 'צמח גאור', id: '124', contacts: 805, revenue: '₪3.39B' },
    { name: 'קרן רוטנברלט', id: '1125', contacts: 526, revenue: '₪1.66B' },
    { name: 'חגי לוד', id: '1216', contacts: 292, revenue: '₪1.46B' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 100 100" style={{ width: '45px', height: '45px' }}>
              <path d="M75 25 Q85 35 80 50 Q75 65 55 75 Q40 82 30 75 Q20 68 25 55 Q28 45 40 40 Q50 36 60 40 Q55 30 60 22 Q65 15 75 25Z" fill="#ff6b35"/>
              <path d="M45 45 Q55 40 65 45 Q70 50 65 60 Q58 70 45 72 Q35 73 32 65 Q30 55 45 45Z" fill="#f7931e"/>
              <path d="M20 60 Q10 55 5 45 Q3 35 15 40 Q25 45 30 55 Q28 62 20 60Z" fill="#1e3a8a"/>
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: 'white' }}>פניקס ביטוח</h1>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>מערכת ניהול קמפיינים</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          ← יציאה
        </button>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Campaign Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff5722 100%)',
          borderRadius: '20px',
          padding: '32px',
          color: 'white',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(255, 107, 53, 0.3)'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255,255,255,0.25)',
              padding: '8px 20px',
              borderRadius: '25px',
              fontSize: '14px',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              🔥 קמפיין פעיל
            </div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: 'bold' }}>{campaign.name}</h2>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>{campaign.subtitle}</p>

            <div style={{ display: 'flex', gap: '24px', marginTop: '28px' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '20px 28px',
                borderRadius: '16px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{campaign.totalContacts.toLocaleString()}</div>
                <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>אנשי קשר</div>
              </div>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '20px 28px',
                borderRadius: '16px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{campaign.activeCampaigns}</div>
                <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>קמפיינים פעילים</div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            right: '-40px',
            width: '180px',
            height: '180px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #f1f5f9'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#64748b', fontWeight: '500' }}>{stat.label}</p>
                  <p style={{ margin: '0 0 6px 0', fontSize: '32px', fontWeight: 'bold', color: '#1e293b' }}>{stat.value}</p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#22c55e', fontWeight: '500' }}>{stat.change}</p>
                </div>
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: `${stat.color}15`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px'
                }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance by Manager */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>📊</div>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>ביצועים לפי מנהל יוניט</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {managers.map((manager, index) => (
              <div key={index} style={{
                background: 'linear-gradient(135deg, #fff7ed, #fff)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                border: '1px solid #fed7aa'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  {manager.name.charAt(0)}
                </div>
                <p style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: '700', color: '#1e293b' }}>
                  {manager.name}
                </p>
                <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94a3b8' }}>
                  מזהה: {manager.id}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#ff6b35' }}>{manager.contacts}</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>אנשי קשר</p>
                  </div>
                  <div style={{ width: '1px', backgroundColor: '#e2e8f0' }}></div>
                  <div>
                    <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#ff6b35' }}>{manager.revenue}</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>הכנסות</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          marginTop: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <button style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)'
          }}>
            <span style={{ fontSize: '20px' }}>📤</span> העלאת קובץ אקסל
          </button>
          <button style={{
            padding: '20px',
            backgroundColor: 'white',
            color: '#1e293b',
            border: '2px solid #e2e8f0',
            borderRadius: '16px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '20px' }}>📊</span> צפייה בדוחות
          </button>
          <button style={{
            padding: '20px',
            backgroundColor: 'white',
            color: '#1e293b',
            border: '2px solid #e2e8f0',
            borderRadius: '16px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '20px' }}>⚙️</span> הגדרות
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px',
        color: '#94a3b8',
        fontSize: '14px',
        borderTop: '1px solid #f1f5f9',
        marginTop: '40px'
      }}>
        © 2025 Phoenix Insurance. All rights reserved.
      </footer>
    </div>
  );
}
