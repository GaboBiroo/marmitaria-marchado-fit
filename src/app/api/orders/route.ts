import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, totalAmount, customerName, customerPhone, whatsappMsg } = body;

    // Basic validation
    if (!items || !items.length) {
      return NextResponse.json({ error: 'Carrinho vazio' }, { status: 400 });
    }

    // Create the order and items in a transaction
    const order = await prisma.order.create({
      data: {
        customerName: customerName || "Cliente WhatsApp",
        customerPhone: customerPhone || "Não informado",
        totalAmount,
        whatsappMsg,
        status: "PENDING",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
    });

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error('Erro ao processar pedido:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
      }
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
