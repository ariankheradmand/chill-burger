import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';

// Get all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت دسته‌بندی‌ها' },
      { status: 500 }
    );
  }
}
