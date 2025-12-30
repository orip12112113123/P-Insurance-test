import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'לא מחובר / Not authenticated' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'אין הרשאה / Not authorized' },
        { status: 403 }
      );
    }

    // Get all campaigns
    const campaigns = await prisma.campaign.findMany({
      where: { isActive: true },
      include: {
        agencyData: {
          include: {
            user: {
              select: {
                agencyName: true,
                mobileNumber: true,
              },
            },
          },
        },
      },
    });

    // Format data for admin dashboard
    const formattedCampaigns = campaigns.map((campaign) => {
      const now = new Date();
      const endDate = new Date(campaign.endDate);
      const remainingDays = Math.max(
        0,
        Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      );

      const agencies = campaign.agencyData.map((data) => {
        const progressPercentage = data.targetAmount > 0
          ? Math.min(100, (data.currentProgress / data.targetAmount) * 100)
          : 0;

        return {
          agencyName: data.user.agencyName,
          mobileNumber: data.user.mobileNumber,
          phase: data.phase,
          targetAmount: data.targetAmount,
          currentProgress: data.currentProgress,
          progressPercentage: progressPercentage.toFixed(2),
          compensationAmount: data.compensationAmount,
          dreamVacation: data.dreamVacation,
          notes: data.notes,
        };
      });

      // Calculate campaign statistics
      const totalTarget = campaign.agencyData.reduce((sum, d) => sum + d.targetAmount, 0);
      const totalProgress = campaign.agencyData.reduce((sum, d) => sum + d.currentProgress, 0);
      const totalCompensation = campaign.agencyData.reduce((sum, d) => sum + d.compensationAmount, 0);
      const overallProgress = totalTarget > 0 ? (totalProgress / totalTarget) * 100 : 0;

      return {
        campaignId: campaign.id,
        campaignName: campaign.name,
        campaignDescription: campaign.description,
        remainingDays,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        totalAgencies: agencies.length,
        totalTarget,
        totalProgress,
        overallProgress: overallProgress.toFixed(2),
        totalCompensation,
        agencies,
      };
    });

    // Get overall statistics
    const totalUsers = await prisma.user.count({ where: { role: 'AGENCY' } });
    const totalCampaigns = campaigns.length;

    return NextResponse.json({
      campaigns: formattedCampaigns,
      statistics: {
        totalUsers,
        totalCampaigns,
      },
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json(
      { error: 'שגיאת שרת / Server error' },
      { status: 500 }
    );
  }
}
