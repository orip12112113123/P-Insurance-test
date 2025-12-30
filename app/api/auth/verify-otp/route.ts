import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken, formatPhoneNumber } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { mobileNumber, otp } = await request.json();

    if (!mobileNumber || !otp) {
      return NextResponse.json(
        { error: 'מספר טלפון וקוד אימות נדרשים / Mobile number and OTP are required' },
        { status: 400 }
      );
    }

    // Format phone number
    const formattedNumber = formatPhoneNumber(mobileNumber);

    // Find valid OTP
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        mobileNumber: formattedNumber,
        code: otp,
        verified: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    if (!otpRecord || !otpRecord.user) {
      return NextResponse.json(
        { error: 'קוד אימות שגוי או פג תוקף / Invalid or expired OTP' },
        { status: 401 }
      );
    }

    // Mark OTP as verified
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    // Generate JWT token
    const token = generateToken({
      userId: otpRecord.user.id,
      mobileNumber: otpRecord.user.mobileNumber,
      role: otpRecord.user.role,
    });

    // Create response with token in HTTP-only cookie
    const response = NextResponse.json({
      message: 'התחברת בהצלחה / Login successful',
      user: {
        id: otpRecord.user.id,
        mobileNumber: otpRecord.user.mobileNumber,
        role: otpRecord.user.role,
        agencyName: otpRecord.user.agencyName,
      },
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'שגיאת שרת / Server error' },
      { status: 500 }
    );
  }
}
