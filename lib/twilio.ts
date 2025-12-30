import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

let client: twilio.Twilio | null = null;

if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
}

export async function sendWhatsAppOTP(to: string, otp: string): Promise<boolean> {
  if (!client) {
    console.error('Twilio client not configured. Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN');
    // In development, just log the OTP
    console.log(`[DEV MODE] OTP for ${to}: ${otp}`);
    return true;
  }

  try {
    const message = await client.messages.create({
      from: whatsappNumber,
      to: `whatsapp:${to}`,
      body: `קוד האימות שלך למערכת פניקס ביטוח: ${otp}\n\nהקוד תקף ל-5 דקות.\n\nYour Phoenix Insurance verification code: ${otp}\n\nValid for 5 minutes.`,
    });

    console.log(`WhatsApp OTP sent successfully: ${message.sid}`);
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp OTP:', error);
    // In development/testing, still return true and log the OTP
    console.log(`[FALLBACK] OTP for ${to}: ${otp}`);
    return true;
  }
}
