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

    if (!payload || payload.role !== 'AGENCY') {
      return NextResponse.json(
        { error: 'אין הרשאה / Not authorized' },
        { status: 403 }
      );
    }

    // Get user's campaign data
    const campaignData = await prisma.agencyCampaignData.findMany({
      where: { userId: payload.userId },
      include: {
        campaign: true,
        user: {
          select: {
            agencyName: true,
          },
        },
      },
    });

    if (campaignData.length === 0) {
      return NextResponse.json({
        message: 'אין נתוני קמפיין / No campaign data available',
        data: [],
      });
    }

    // Calculate remaining days and format data
    const formattedData = campaignData.map((data) => {
      const now = new Date();
      const endDate = new Date(data.campaign.endDate);
      const remainingDays = Math.max(
        0,
        Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      );

      const progressPercentage = data.targetAmount > 0
        ? Math.min(100, (data.currentProgress / data.targetAmount) * 100)
        : 0;

      return {
        campaignId: data.campaign.id,
        campaignName: data.campaign.name,
        campaignDescription: data.campaign.description,
        agencyName: data.user.agencyName,
        phase: data.phase,
        targetAmount: data.targetAmount,
        currentProgress: data.currentProgress,
        progressPercentage: progressPercentage.toFixed(2),
        compensationAmount: data.compensationAmount,
        dreamVacation: data.dreamVacation,
        remainingDays,
        startDate: data.campaign.startDate,
        endDate: data.campaign.endDate,
        isActive: data.campaign.isActive,
        notes: data.notes,
      };
    });

    return NextResponse.json({ data: formattedData });
  } catch (error) {
    console.error('Agency dashboard error:', error);
    return NextResponse.json(
      { error: 'שגיאת שרת / Server error' },
      { status: 500 }
    );
  }
}
