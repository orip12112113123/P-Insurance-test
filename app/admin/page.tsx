'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Agency {
  agencyName?: string;
  mobileNumber: string;
  phase: string;
  targetAmount: number;
  currentProgress: number;
  progressPercentage: string;
  compensationAmount: number;
  dreamVacation?: string;
  notes?: string;
}

interface Campaign {
  campaignId: string;
  campaignName: string;
  campaignDescription?: string;
  remainingDays: number;
  startDate: string;
  endDate: string;
  totalAgencies: number;
  totalTarget: number;
  totalProgress: number;
  overallProgress: string;
  totalCompensation: number;
  agencies: Agency[];
}

interface Statistics {
  totalUsers: number;
  totalCampaigns: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadCampaignId, setUploadCampaignId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState('');
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setCampaigns(result.campaigns || []);
      setStatistics(result.statistics || null);
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

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadResult('');
    setUploading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/admin/upload-excel', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setUploadResult(`שגיאה: ${result.error}`);
        return;
      }

      setUploadResult(
        `העלאה הושלמה בהצלחה!\nנוצרו: ${result.results.created}\nעודכנו: ${result.results.updated}\n${
          result.results.errors.length > 0 ? `שגיאות: ${result.results.errors.length}` : ''
        }`
      );

      // Refresh dashboard data
      fetchDashboardData();
    } catch (err) {
      setUploadResult('שגיאה בהעלאת הקובץ');
    } finally {
      setUploading(false);
    }
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
                <p className="text-sm text-gray-600">לוח בקרה - מנהל מערכת</p>
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

        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg shadow-lg p-6">
              <p className="text-sm opacity-90 mb-1">סך סוכנויות במערכת</p>
              <p className="text-4xl font-bold">{statistics.totalUsers}</p>
            </div>
            <div className="bg-gradient-to-br from-secondary to-secondary-dark text-white rounded-lg shadow-lg p-6">
              <p className="text-sm opacity-90 mb-1">סך קמפיינים פעילים</p>
              <p className="text-4xl font-bold">{statistics.totalCampaigns}</p>
            </div>
          </div>
        )}

        {/* Excel Upload Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">העלאת נתוני סוכנויות מאקסל</h2>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  בחר קמפיין
                </label>
                <select
                  name="campaignId"
                  value={uploadCampaignId}
                  onChange={(e) => setUploadCampaignId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                >
                  <option value="">בחר קמפיין...</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.campaignId} value={campaign.campaignId}>
                      {campaign.campaignName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  העלה קובץ Excel
                </label>
                <input
                  type="file"
                  name="file"
                  accept=".xlsx,.xls"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
            >
              {uploading ? 'מעלה...' : 'העלה קובץ'}
            </button>
          </form>

          {uploadResult && (
            <div className={`mt-4 p-4 rounded-lg ${uploadResult.includes('שגיאה') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              <pre className="whitespace-pre-wrap text-sm">{uploadResult}</pre>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
            <p className="font-medium mb-2">פורמט הקובץ צריך לכלול את העמודות הבאות:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>מספר טלפון (Mobile / מספר טלפון)</li>
              <li>שם סוכנות (Agency Name / שם סוכנות)</li>
              <li>שלב (Phase / שלב) - שלב 1, שלב 2, שלב 3, הושלם</li>
              <li>יעד (Target / יעד) - מספר</li>
              <li>התקדמות נוכחית (Progress / התקדמות נוכחית) - מספר</li>
              <li>פיצוי (Compensation / פיצוי) - מספר</li>
              <li>חופשת חלומות (Dream Vacation / חופשת חלומות) - אופציונלי</li>
              <li>הערות (Notes / הערות) - אופציונלי</li>
            </ul>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">קמפיינים פעילים</h2>

          {campaigns.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 text-lg">אין קמפיינים פעילים</p>
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.campaignId} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Campaign Header */}
                <div
                  className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 cursor-pointer"
                  onClick={() => setExpandedCampaign(expandedCampaign === campaign.campaignId ? null : campaign.campaignId)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{campaign.campaignName}</h3>
                      {campaign.campaignDescription && (
                        <p className="text-blue-100 text-sm mb-3">{campaign.campaignDescription}</p>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                        <div>
                          <p className="text-xs opacity-75">ימים נותרים</p>
                          <p className="text-2xl font-bold">{campaign.remainingDays}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-75">סוכנויות</p>
                          <p className="text-2xl font-bold">{campaign.totalAgencies}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-75">התקדמות כללית</p>
                          <p className="text-2xl font-bold">{campaign.overallProgress}%</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-75">יעד כולל</p>
                          <p className="text-lg font-bold">₪{(campaign.totalTarget / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-75">פיצוי כולל</p>
                          <p className="text-lg font-bold">₪{(campaign.totalCompensation / 1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    </div>
                    <svg
                      className={`w-6 h-6 transition-transform ${expandedCampaign === campaign.campaignId ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Agencies Table */}
                {expandedCampaign === campaign.campaignId && (
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-right font-semibold text-gray-700">סוכנות</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-700">טלפון</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700">שלב</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-700">יעד</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-700">התקדמות</th>
                            <th className="px-4 py-3 text-center font-semibold text-gray-700">%</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-700">פיצוי</th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-700">חופשה</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {campaign.agencies.map((agency, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium">{agency.agencyName || 'לא צוין'}</td>
                              <td className="px-4 py-3 text-gray-600" dir="ltr">{agency.mobileNumber}</td>
                              <td className="px-4 py-3 text-center">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getPhaseColor(agency.phase)}`}>
                                  {getPhaseLabel(agency.phase)}
                                </span>
                              </td>
                              <td className="px-4 py-3">₪{agency.targetAmount.toLocaleString('he-IL')}</td>
                              <td className="px-4 py-3">₪{agency.currentProgress.toLocaleString('he-IL')}</td>
                              <td className="px-4 py-3 text-center font-semibold text-primary">
                                {agency.progressPercentage}%
                              </td>
                              <td className="px-4 py-3 font-semibold text-green-600">
                                ₪{agency.compensationAmount.toLocaleString('he-IL')}
                              </td>
                              <td className="px-4 py-3 text-purple-600">{agency.dreamVacation || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
