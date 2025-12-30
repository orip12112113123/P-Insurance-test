'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CampaignData {
  campaignId: string;
  campaignName: string;
  campaignDescription?: string;
  agencyName?: string;
  phase: string;
  targetAmount: number;
  currentProgress: number;
  progressPercentage: string;
  compensationAmount: number;
  dreamVacation?: string;
  remainingDays: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  notes?: string;
}

export default function AgencyDashboard() {
  const router = useRouter();
  const [data, setData] = useState<CampaignData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/agency/dashboard');

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result.data || []);
    } catch (err) {
      setError('שגיאה בטעינת הנתונים');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const getPhaseLabel = (phase: string) => {
    const phaseMap: Record<string, string> = {
      PHASE_1: 'שלב 1',
      PHASE_2: 'שלב 2',
      PHASE_3: 'שלב 3',
      COMPLETED: 'הושלם',
    };
    return phaseMap[phase] || phase;
  };

  const getPhaseColor = (phase: string) => {
    const colorMap: Record<string, string> = {
      PHASE_1: 'bg-blue-100 text-blue-800',
      PHASE_2: 'bg-yellow-100 text-yellow-800',
      PHASE_3: 'bg-orange-100 text-orange-800',
      COMPLETED: 'bg-green-100 text-green-800',
    };
    return colorMap[phase] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">פניקס ביטוח</h1>
                <p className="text-sm text-gray-600">לוח בקרה - סוכנות</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              התנתק
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {data.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">אין נתוני קמפיין זמינים</p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((campaign) => (
              <div key={campaign.campaignId} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Campaign Header */}
                <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{campaign.campaignName}</h2>
                      {campaign.agencyName && (
                        <p className="text-blue-100">{campaign.agencyName}</p>
                      )}
                      {campaign.campaignDescription && (
                        <p className="text-blue-100 text-sm mt-1">{campaign.campaignDescription}</p>
                      )}
                    </div>
                    <div className="text-left">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPhaseColor(campaign.phase)}`}>
                        {getPhaseLabel(campaign.phase)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="p-6">
                  {/* Remaining Days Card */}
                  <div className="bg-gradient-to-br from-secondary to-secondary-dark text-white rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90 mb-1">ימים נותרים</p>
                        <p className="text-4xl font-bold">{campaign.remainingDays}</p>
                      </div>
                      <div className="text-left">
                        <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs opacity-75 mt-2">
                      תאריך סיום: {new Date(campaign.endDate).toLocaleDateString('he-IL')}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">התקדמות</span>
                      <span className="text-sm font-bold text-primary">{campaign.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-primary-dark h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(parseFloat(campaign.progressPercentage), 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>₪{campaign.currentProgress.toLocaleString('he-IL')}</span>
                      <span>מתוך ₪{campaign.targetAmount.toLocaleString('he-IL')}</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-600 mb-1">יעד קמפיין</p>
                      <p className="text-2xl font-bold text-blue-900">
                        ₪{campaign.targetAmount.toLocaleString('he-IL')}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-green-600 mb-1">פיצוי צבור</p>
                      <p className="text-2xl font-bold text-green-900">
                        ₪{campaign.compensationAmount.toLocaleString('he-IL')}
                      </p>
                    </div>

                    {campaign.dreamVacation && (
                      <div className="bg-purple-50 rounded-lg p-4 md:col-span-2">
                        <p className="text-sm text-purple-600 mb-1">חופשת החלומות שלך</p>
                        <p className="text-xl font-bold text-purple-900 flex items-center gap-2">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {campaign.dreamVacation}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  {campaign.notes && (
                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm font-medium text-yellow-800 mb-1">הערות</p>
                      <p className="text-yellow-900">{campaign.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
