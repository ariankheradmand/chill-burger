import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';

// Create new item
export async function POST(request) {
  try {
    const data = await request.json();
    
    const item = await prisma.item.create({
      data: {
        name: data.name,
        price: data.price,
        taste: data.taste,
        ingredients: JSON.stringify(data.ingredients),
        allergyWarning: data.allergyWarning,
        disabled: data.disabled || false,
        categoryId: data.categoryId
      }
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: 'خطا در ایجاد آیتم' },
      { status: 500 }
    );
  }
}

// Update item
export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (updateData.ingredients) {
      updateData.ingredients = JSON.stringify(updateData.ingredients);
    }

    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { error: 'خطا در بروزرسانی آیتم' },
      { status: 500 }
    );
  }
}

// Delete item
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await prisma.item.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { error: 'خطا در حذف آیتم' },
      { status: 500 }
    );
  }
}
