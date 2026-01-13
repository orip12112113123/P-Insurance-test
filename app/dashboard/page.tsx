'use client';

import { useRouter } from 'next/navigation';

export default function UnitManagerDashboard() {
  const router = useRouter();

  // Demo unit manager data
  const manager = {
    name: 'צמח גאור',
    id: '124',
    phone: '054-1234567',
    region: 'מרכז',
  };

  const campaign = {
    name: 'מבצע סוף שנה 2025',
    totalTarget: 5000000, // 5M target
    currentAmount: 3390000, // 3.39M achieved
    phase: 2,
    totalPhases: 3,
    daysRemaining: 45,
    endDate: '2025-03-31',
  };

  const phases = [
    { number: 1, name: 'שלב ראשון', target: 1500000, achieved: 1500000, reward: 'בונוס ₪5,000', completed: true },
    { number: 2, name: 'שלב שני', target: 3500000, achieved: 3390000, reward: 'טיסה לאיטליה', completed: false, current: true },
    { number: 3, name: 'שלב שלישי', target: 5000000, achieved: 0, reward: 'חופשה בבאלי', completed: false },
  ];

  const stats = {
    totalContacts: 805,
    successfulCalls: 342,
    pendingFollowups: 89,
    conversionRate: 42.5,
  };

  const recentActivity = [
    { date: '2025-01-03', action: 'סגירת עסקה', amount: 125000, client: 'חברת אלפא בע"מ' },
    { date: '2025-01-02', action: 'פגישה', amount: 0, client: 'משה כהן' },
    { date: '2025-01-01', action: 'סגירת עסקה', amount: 85000, client: 'דוד לוי' },
  ];

  const progressPercent = (campaign.currentAmount / campaign.totalTarget) * 100;
  const phase2Progress = ((campaign.currentAmount - 1500000) / (3500000 - 1500000)) * 100;

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
          <div style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 100" style={{ width: '45px', height: '45px' }}>
              <path d="M75 25 Q85 35 80 50 Q75 65 55 75 Q40 82 30 75 Q20 68 25 55 Q28 45 40 40 Q50 36 60 40 Q55 30 60 22 Q65 15 75 25Z" fill="#ff6b35"/>
              <path d="M45 45 Q55 40 65 45 Q70 50 65 60 Q58 70 45 72 Q35 73 32 65 Q30 55 45 45Z" fill="#f7931e"/>
              <path d="M20 60 Q10 55 5 45 Q3 35 15 40 Q25 45 30 55 Q28 62 20 60Z" fill="#1e3a8a"/>
            </svg>
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: 'white' }}>שלום, {manager.name}</h1>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>מנהל יוניט | מזהה: {manager.id}</p>
          </div>
        </div>
        <button
          onClick={() => router.push('/login')}
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

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Campaign Banner with Phase Progress */}
        <div style={{
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff5722 100%)',
          borderRadius: '20px',
          padding: '28px',
          color: 'white',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(255, 107, 53, 0.3)'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  marginBottom: '12px',
                  fontWeight: '600'
                }}>
                  🔥 {campaign.name}
                </div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 'bold' }}>המעמד שלי בקמפיין</h2>
              </div>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '16px 24px',
                borderRadius: '16px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{campaign.daysRemaining}</div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>ימים נותרים</div>
              </div>
            </div>

            {/* Overall Progress */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span>התקדמות כללית</span>
                <span style={{ fontWeight: 'bold' }}>{progressPercent.toFixed(1)}%</span>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
                <div style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '13px', opacity: 0.9 }}>
                <span>₪{campaign.currentAmount.toLocaleString()}</span>
                <span>יעד: ₪{campaign.totalTarget.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Decorative */}
          <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '150px', height: '150px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '120px', height: '120px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
        </div>

        {/* Phase Progress Cards */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9'
        }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '20px', fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🎯</span> שלבי הקמפיין
          </h3>

          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
            {phases.map((phase) => (
              <div key={phase.number} style={{
                flex: '1',
                minWidth: '280px',
                padding: '24px',
                borderRadius: '16px',
                border: phase.current ? '2px solid #ff6b35' : '1px solid #e2e8f0',
                backgroundColor: phase.completed ? '#f0fdf4' : phase.current ? '#fff7ed' : '#f8fafc',
                position: 'relative'
              }}>
                {phase.current && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '16px',
                    backgroundColor: '#ff6b35',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    נוכחי
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: phase.completed ? '#22c55e' : phase.current ? '#ff6b35' : '#94a3b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {phase.completed ? '✓' : phase.number}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{phase.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>יעד: ₪{phase.target.toLocaleString()}</div>
                  </div>
                </div>

                {phase.current && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                      <span style={{ color: '#64748b' }}>התקדמות בשלב</span>
                      <span style={{ fontWeight: '600', color: '#ff6b35' }}>{phase2Progress.toFixed(0)}%</span>
                    </div>
                    <div style={{ backgroundColor: '#fed7aa', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${Math.min(phase2Progress, 100)}%`,
                        height: '100%',
                        backgroundColor: '#ff6b35',
                        borderRadius: '6px'
                      }}></div>
                    </div>
                  </div>
                )}

                <div style={{
                  backgroundColor: phase.completed ? '#dcfce7' : '#fef3c7',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '20px' }}>{phase.completed ? '🎉' : '🎁'}</span>
                  <span style={{ fontSize: '14px', color: phase.completed ? '#166534' : '#92400e', fontWeight: '500' }}>
                    {phase.reward}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'סה"כ אנשי קשר', value: stats.totalContacts, icon: '👥', color: '#3b82f6' },
            { label: 'שיחות מוצלחות', value: stats.successfulCalls, icon: '✅', color: '#22c55e' },
            { label: 'ממתינים למעקב', value: stats.pendingFollowups, icon: '📋', color: '#f59e0b' },
            { label: 'אחוז המרה', value: `${stats.conversionRate}%`, icon: '📈', color: '#8b5cf6' },
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #f1f5f9'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: `${stat.color}15`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>{stat.value}</div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>📝</span> פעילות אחרונה
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentActivity.map((activity, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: activity.amount > 0 ? '#dcfce7' : '#e0f2fe',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    {activity.amount > 0 ? '💰' : '📞'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{activity.action}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{activity.client}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'left' }}>
                  {activity.amount > 0 && (
                    <div style={{ fontWeight: 'bold', color: '#22c55e' }}>+₪{activity.amount.toLocaleString()}</div>
                  )}
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{activity.date}</div>
                </div>
              </div>
            ))}
          </div>
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
