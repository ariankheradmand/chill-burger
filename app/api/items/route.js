import { prisma } from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { order: 'asc' },
            include: {
                items: {
                    orderBy: { id: 'asc' }
                }
            }
        });

        // Transform data to match the original format
        const formattedData = categories.map(category => {
            const items = category.items.map(item => ({
                items: {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    taste: item.taste,
                    ingredients: JSON.parse(item.ingredients),
                    allergyWarning: item.allergyWarning,
                    disabled: item.disabled
                }
            }));

            return [
                { header: category.header },
                { imgsrc: category.imgsrc },
                { colorScheme: category.colorScheme },
                ...items
            ];
        });

        return NextResponse.json(formattedData);
    } catch (error) {
        console.error('Error fetching items:', error);
        return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    }
}
