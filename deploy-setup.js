// This script runs after deployment to set up the database
const { PrismaClient } = require('@prisma/client');

async function setupDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Checking database connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Check if data exists
    const categoryCount = await prisma.category.count();
    const adminCount = await prisma.admin.count();
    
    console.log(`📊 Found ${categoryCount} categories and ${adminCount} admins`);
    
    if (categoryCount === 0) {
      console.log('🌱 Database is empty, please run seed manually');
      console.log('Run: npm run db:seed');
    }
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log('🎉 Database setup completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Setup failed:', error);
      process.exit(1);
    });
}

module.exports = { setupDatabase };