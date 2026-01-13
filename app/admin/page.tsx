'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  // Demo operation data
  const operation = {
    name: 'מבצע סוף שנה 2025',
    description: 'באלי - איטליה - פריז על חשבוננו',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    daysRemaining: 45,
    totalTarget: 50000000, // 50M
    totalAchieved: 34500000, // 34.5M
  };

  const overallStats = {
    totalUnitManagers: 24,
    activeManagers: 22,
    totalContacts: 8450,
    totalDeals: 892,
    conversionRate: 10.6,
    avgDealSize: 38700,
  };

  const phaseDistribution = [
    { phase: 'שלב ראשון', count: 8, percentage: 33, color: '#22c55e' },
    { phase: 'שלב שני', count: 12, percentage: 50, color: '#f59e0b' },
    { phase: 'שלב שלישי', count: 4, percentage: 17, color: '#ff6b35' },
  ];

  const unitManagers = [
    { name: 'צמח גאור', id: '124', phase: 2, target: 5000000, achieved: 3390000, contacts: 805, deals: 87 },
    { name: 'קרן רוטנברלט', id: '1125', phase: 2, target: 4000000, achieved: 2850000, contacts: 526, deals: 74 },
    { name: 'חגי לוד', id: '1216', phase: 1, target: 3500000, achieved: 1460000, contacts: 292, deals: 38 },
    { name: 'מיכל אברהם', id: '1089', phase: 3, target: 6000000, achieved: 5200000, contacts: 945, deals: 134 },
    { name: 'יוסי כהן', id: '1302', phase: 2, target: 4500000, achieved: 3100000, contacts: 612, deals: 80 },
    { name: 'רונית שמעון', id: '1445', phase: 1, target: 3000000, achieved: 980000, contacts: 234, deals: 25 },
  ];

  const recentDeals = [
    { manager: 'מיכל אברהם', client: 'חברת טכנולוגיות בע"מ', amount: 450000, date: '2025-01-04' },
    { manager: 'צמח גאור', client: 'חברת אלפא בע"מ', amount: 125000, date: '2025-01-03' },
    { manager: 'קרן רוטנברלט', client: 'משה ישראלי', amount: 85000, date: '2025-01-03' },
    { manager: 'יוסי כהן', client: 'דוד לוי ובניו', amount: 210000, date: '2025-01-02' },
  ];

  const progressPercent = (operation.totalAchieved / operation.totalTarget) * 100;

  const getPhaseColor = (phase: number) => {
    const colors: Record<number, string> = { 1: '#3b82f6', 2: '#f59e0b', 3: '#22c55e' };
    return colors[phase] || '#94a3b8';
  };

  const getPhaseLabel = (phase: number) => {
    const labels: Record<number, string> = { 1: 'שלב 1', 2: 'שלב 2', 3: 'שלב 3' };
    return labels[phase] || `שלב ${phase}`;
  };

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
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: 'white' }}>פניקס ביטוח - ניהול</h1>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>לוח בקרה למנהלי פניקס</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              padding: '10px 20px',
              background: 'rgba(255,107,53,0.2)',
              color: '#ff6b35',
              border: '1px solid rgba(255,107,53,0.3)',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px'
            }}
          >
            תצוגת מנהל יוניט →
          </button>
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
        </div>
      </header>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Operation Overview Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)',
          borderRadius: '20px',
          padding: '32px',
          color: 'white',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(30, 58, 138, 0.3)'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  marginBottom: '12px',
                  fontWeight: '600'
                }}>
                  👑 תצוגת מנהל פניקס
                </div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: 'bold' }}>{operation.name}</h2>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>{operation.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  padding: '16px 24px',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{operation.daysRemaining}</div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>ימים נותרים</div>
                </div>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  padding: '16px 24px',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{overallStats.totalUnitManagers}</div>
                  <div style={{ fontSize: '13px', opacity: 0.9 }}>מנהלי יוניט</div>
                </div>
              </div>
            </div>

            {/* Overall Progress */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span>התקדמות כללית של המבצע</span>
                <span style={{ fontWeight: 'bold' }}>{progressPercent.toFixed(1)}%</span>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '10px', height: '16px', overflow: 'hidden' }}>
                <div style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                  borderRadius: '10px'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '14px', opacity: 0.9 }}>
                <span>₪{(operation.totalAchieved / 1000000).toFixed(1)}M הושג</span>
                <span>יעד: ₪{(operation.totalTarget / 1000000).toFixed(0)}M</span>
              </div>
            </div>
          </div>

          {/* Decorative */}
          <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '180px', height: '180px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '150px', height: '150px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'מנהלים פעילים', value: overallStats.activeManagers, total: overallStats.totalUnitManagers, icon: '👥', color: '#3b82f6' },
            { label: 'סה"כ אנשי קשר', value: overallStats.totalContacts.toLocaleString(), icon: '📋', color: '#8b5cf6' },
            { label: 'עסקאות שנסגרו', value: overallStats.totalDeals, icon: '✅', color: '#22c55e' },
            { label: 'אחוז המרה', value: `${overallStats.conversionRate}%`, icon: '📈', color: '#f59e0b' },
            { label: 'ממוצע עסקה', value: `₪${overallStats.avgDealSize.toLocaleString()}`, icon: '💰', color: '#ff6b35' },
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
                  <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b' }}>
                    {stat.value}
                    {stat.total && <span style={{ fontSize: '14px', color: '#94a3b8' }}>/{stat.total}</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phase Distribution & Recent Deals */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          {/* Phase Distribution */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #f1f5f9'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>📊</span> התפלגות לפי שלבים
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {phaseDistribution.map((phase, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '500', color: '#1e293b' }}>{phase.phase}</span>
                    <span style={{ fontWeight: 'bold', color: phase.color }}>{phase.count} מנהלים ({phase.percentage}%)</span>
                  </div>
                  <div style={{ backgroundColor: '#f1f5f9', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${phase.percentage}%`,
                      height: '100%',
                      backgroundColor: phase.color,
                      borderRadius: '6px'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Deals */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid #f1f5f9'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>💰</span> עסקאות אחרונות
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentDeals.map((deal, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '10px'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>{deal.client}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{deal.manager} • {deal.date}</div>
                  </div>
                  <div style={{ fontWeight: 'bold', color: '#22c55e', fontSize: '15px' }}>
                    +₪{deal.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unit Managers Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9'
        }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>👥</span> ביצועי מנהלי יוניט
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'right', fontWeight: '600', color: '#475569', borderBottom: '2px solid #e2e8f0' }}>מנהל יוניט</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: '600', color: '#475569', borderBottom: '2px solid #e2e8f0' }}>שלב</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', fontWeight: '600', color: '#475569', borderBottom: '2px solid #e2e8f0' }}>יעד</th>
                  <th style={{ padding: '14px 16px', textAlign: 'right', fontWeight: '600', color: '#475569', borderBottom: '2px solid #e2e8f0' }}>הושג</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: '600', color: '#475569', borderBottom: '2px solid #e2e8f0' }}>התקדמות</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: '600', color: '#475569', borderBottom: '2px solid #e2e8f0' }}>אנשי קשר</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', fontWeight: '600', color: '#475569', borderBottom: '2px solid #e2e8f0' }}>עסקאות</th>
                </tr>
              </thead>
              <tbody>
                {unitManagers.map((manager, index) => {
                  const managerProgress = (manager.achieved / manager.target) * 100;
                  return (
                    <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '16px'
                          }}>
                            {manager.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#1e293b' }}>{manager.name}</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>מזהה: {manager.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: `${getPhaseColor(manager.phase)}20`,
                          color: getPhaseColor(manager.phase)
                        }}>
                          {getPhaseLabel(manager.phase)}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontWeight: '500', color: '#475569' }}>₪{(manager.target / 1000000).toFixed(1)}M</td>
                      <td style={{ padding: '16px', fontWeight: '600', color: '#1e293b' }}>₪{(manager.achieved / 1000000).toFixed(2)}M</td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, backgroundColor: '#f1f5f9', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                            <div style={{
                              width: `${Math.min(managerProgress, 100)}%`,
                              height: '100%',
                              backgroundColor: getPhaseColor(manager.phase),
                              borderRadius: '4px'
                            }}></div>
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: getPhaseColor(manager.phase), minWidth: '45px' }}>
                            {managerProgress.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center', color: '#475569' }}>{manager.contacts}</td>
                      <td style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#22c55e' }}>{manager.deals}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
        © 2025 Phoenix Insurance. Admin Dashboard.
      </footer>
    </div>
  );
}
