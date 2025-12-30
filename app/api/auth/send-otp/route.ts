import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOTP, formatPhoneNumber } from '@/lib/auth';
import { sendWhatsAppOTP } from '@/lib/twilio';

export async function POST(request: NextRequest) {
  try {
    const { mobileNumber } = await request.json();

    if (!mobileNumber) {
      return NextResponse.json(
        { error: 'מספר טלפון נדרש / Mobile number is required' },
        { status: 400 }
      );
    }

    // Format phone number
    const formattedNumber = formatPhoneNumber(mobileNumber);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { mobileNumber: formattedNumber },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'מספר טלפון לא רשום במערכת / Mobile number not registered' },
        { status: 404 }
      );
    }

    // Generate OTP
    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Delete old OTPs for this number
    await prisma.oTP.deleteMany({
      where: {
        mobileNumber: formattedNumber,
        verified: false,
      },
    });

    // Create new OTP
    await prisma.oTP.create({
      data: {
        mobileNumber: formattedNumber,
        code: otpCode,
        expiresAt,
        userId: user.id,
      },
    });

    // Send OTP via WhatsApp
    const sent = await sendWhatsAppOTP(formattedNumber, otpCode);

    if (!sent) {
      return NextResponse.json(
        { error: 'שגיאה בשליחת קוד אימות / Error sending OTP' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'קוד אימות נשלח בהצלחה / OTP sent successfully',
      expiresIn: 300, // 5 minutes in seconds
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'שגיאת שרת / Server error' },
      { status: 500 }
    );
  }
}
