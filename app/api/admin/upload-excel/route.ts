import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, formatPhoneNumber } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { parseAgencyExcel } from '@/lib/excel';

export async function POST(request: NextRequest) {
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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const campaignId = formData.get('campaignId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'קובץ נדרש / File is required' },
        { status: 400 }
      );
    }

    if (!campaignId) {
      return NextResponse.json(
        { error: 'מזהה קמפיין נדרש / Campaign ID is required' },
        { status: 400 }
      );
    }

    // Verify campaign exists
    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: 'קמפיין לא נמצא / Campaign not found' },
        { status: 404 }
      );
    }

    // Parse Excel file
    const buffer = Buffer.from(await file.arrayBuffer());
    const agencies = parseAgencyExcel(buffer);

    if (agencies.length === 0) {
      return NextResponse.json(
        { error: 'לא נמצאו נתונים בקובץ / No data found in file' },
        { status: 400 }
      );
    }

    // Process each agency
    const results = {
      created: 0,
      updated: 0,
      errors: [] as string[],
    };

    for (const agency of agencies) {
      try {
        const formattedNumber = formatPhoneNumber(agency.mobileNumber);

        // Create or update user
        const user = await prisma.user.upsert({
          where: { mobileNumber: formattedNumber },
          update: {
            agencyName: agency.agencyName,
          },
          create: {
            mobileNumber: formattedNumber,
            role: 'AGENCY',
            agencyName: agency.agencyName,
          },
        });

        // Create or update campaign data
        const existingData = await prisma.agencyCampaignData.findUnique({
          where: {
            userId_campaignId: {
              userId: user.id,
              campaignId: campaignId,
            },
          },
        });

        if (existingData) {
          await prisma.agencyCampaignData.update({
            where: { id: existingData.id },
            data: {
              phase: agency.phase,
              targetAmount: agency.targetAmount,
              currentProgress: agency.currentProgress,
              compensationAmount: agency.compensationAmount,
              dreamVacation: agency.dreamVacation,
              notes: agency.notes,
            },
          });
          results.updated++;
        } else {
          await prisma.agencyCampaignData.create({
            data: {
              userId: user.id,
              campaignId: campaignId,
              phase: agency.phase,
              targetAmount: agency.targetAmount,
              currentProgress: agency.currentProgress,
              compensationAmount: agency.compensationAmount,
              dreamVacation: agency.dreamVacation,
              notes: agency.notes,
            },
          });
          results.created++;
        }
      } catch (error) {
        console.error(`Error processing agency ${agency.agencyName}:`, error);
        results.errors.push(`${agency.agencyName}: ${error}`);
      }
    }

    return NextResponse.json({
      message: 'העלאה הושלמה / Upload completed',
      results,
    });
  } catch (error) {
    console.error('Excel upload error:', error);
    return NextResponse.json(
      { error: 'שגיאה בעיבוד הקובץ / Error processing file' },
      { status: 500 }
    );
  }
}
