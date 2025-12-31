import { PrismaClient } from '@prisma/client';
import { formatPhoneNumber } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPhone = process.env.ADMIN_PHONE || '+972501234567';
  const formattedAdminPhone = formatPhoneNumber(adminPhone);

  const admin = await prisma.user.upsert({
    where: { mobileNumber: formattedAdminPhone },
    update: {},
    create: {
      mobileNumber: formattedAdminPhone,
      role: 'ADMIN',
      agencyName: 'Phoenix Admin',
    },
  });

  console.log('✅ Admin user created:', admin.mobileNumber);

  // Create a default campaign
  const campaign = await prisma.campaign.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'קמפיין שנתי 2024',
      description: 'קמפיין פיצויים לסוכנויות ביטוח - חופשת חלומות',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      isActive: true,
    },
  });

  console.log('✅ Campaign created:', campaign.name);

  // Create a sample agency user
  const agencyPhone = process.env.AGENCY_PHONE || '+972527654321';
  const formattedAgencyPhone = formatPhoneNumber(agencyPhone);

  const agency = await prisma.user.upsert({
    where: { mobileNumber: formattedAgencyPhone },
    update: {},
    create: {
      mobileNumber: formattedAgencyPhone,
      role: 'AGENCY',
      agencyName: 'סוכנות דוגמה',
    },
  });

  console.log('✅ Sample agency created:', agency.agencyName);

  // Create sample campaign data for the agency
  const agencyData = await prisma.agencyCampaignData.upsert({
    where: {
      userId_campaignId: {
        userId: agency.id,
        campaignId: campaign.id,
      },
    },
    update: {},
    create: {
      userId: agency.id,
      campaignId: campaign.id,
      phase: 'PHASE_1',
      targetAmount: 100000,
      currentProgress: 45000,
      compensationAmount: 5000,
      dreamVacation: 'דובאי',
      notes: 'סוכנות לדוגמה - ביצועים טובים',
    },
  });

  console.log('✅ Sample campaign data created');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📱 Login credentials:');
  console.log('Admin:', formattedAdminPhone);
  console.log('Sample Agency:', formattedAgencyPhone);
  console.log('\n💡 OTP codes will be sent to WhatsApp or logged to console in dev mode');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
