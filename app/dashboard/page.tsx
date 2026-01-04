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
    { label: 'תקבולים אשתקד', value: '₪9.79B', change: '+8.2% מאשתקד', icon: '📊', color: '#f97316' },
    { label: 'שיחות', value: '79', change: '2.4% המרה', icon: '📞', color: '#eab308' },
    { label: 'סך הכנסות', value: '₪13.08B', change: 'סה״כ שנתי', icon: '💰', color: '#22c55e' },
    { label: 'תחזית רבעונית', value: '₪9.40B', change: 'צפי לרבעון הבא', icon: '📈', color: '#3b82f6' },
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
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '24px' }}>🏆</span>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>הדשבורד שלי</h1>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>פניקס ביטוח - מערכת ניהול קמפיינים</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          התנתק
        </button>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Campaign Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
          borderRadius: '16px',
          padding: '32px',
          color: 'white',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              marginBottom: '12px'
            }}>
              קמפיין פעיל
            </div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 'bold' }}>{campaign.name}</h2>
            <p style={{ margin: 0, opacity: 0.9 }}>{campaign.subtitle}</p>

            <div style={{ display: 'flex', gap: '32px', marginTop: '24px' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '16px 24px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{campaign.totalContacts.toLocaleString()}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>אנשי קשר</div>
              </div>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '16px 24px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{campaign.activeCampaigns}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>קמפיינים פעילים</div>
              </div>
            </div>
          </div>

          {/* Decorative circles */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            right: '-30px',
            width: '150px',
            height: '150px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#64748b' }}>{stat.label}</p>
                  <p style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>{stat.value}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#22c55e' }}>{stat.change}</p>
                </div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: `${stat.color}20`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
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
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span style={{ fontSize: '20px' }}>📊</span>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>ביצועים לפי מנהל יוניט</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {managers.map((manager, index) => (
              <div key={index} style={{
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center'
              }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                  {manager.name}
                </p>
                <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748b' }}>
                  ({manager.id})
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#14b8a6' }}>{manager.contacts}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>אנשי קשר</p>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#14b8a6' }}>{manager.revenue}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>הכנסות</p>
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
            backgroundColor: '#14b8a6',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span>📤</span> העלאת קובץ אקסל
          </button>
          <button style={{
            padding: '20px',
            backgroundColor: 'white',
            color: '#1e293b',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span>📊</span> צפייה בדוחות
          </button>
          <button style={{
            padding: '20px',
            backgroundColor: 'white',
            color: '#1e293b',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <span>⚙️</span> הגדרות
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px',
        color: '#64748b',
        fontSize: '14px'
      }}>
        © 2025 Phoenix Insurance. All rights reserved.
      </footer>
    </div>
  );
}
