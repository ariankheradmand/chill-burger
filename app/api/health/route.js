import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Get basic stats
    const categoryCount = await prisma.category.count();
    const itemCount = await prisma.item.count();
    const adminCount = await prisma.admin.count();
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      stats: {
        categories: categoryCount,
        items: itemCount,
        admins: adminCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}