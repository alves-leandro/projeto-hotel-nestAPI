import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const kitchenDishesData = [
  {
    name: 'Bife Oswaldo Arranha',
    description:
      'Filé mignon alto ou um contra filé, temperado com alho frito, acompanhado de batatas portuguesas, arroz branco e farofa de ovos',
    price: 60.0,
  },
  {
    name: 'Risoto de Cogumelos',
    description:
      'Arroz arbóreo cozido lentamente com cogumelos frescos, cebola, vinho branco e queijo parmesão',
    price: 45.0,
  },
  {
    name: 'Salmão Grelhado',
    description:
      'Salmão fresco grelhado com molho de limão e ervas, servido com purê de batatas e legumes assados',
    price: 55.0,
  },
  {
    name: 'Penne à Puttanesca',
    description:
      'Massa penne cozida al dente com molho à base de tomates, azeitonas, alcaparras, alho e anchovas',
    price: 40.0,
  },
  {
    name: 'Frango Marsala',
    description:
      'Peitos de frango dourados em molho Marsala com cogumelos, servidos com espaguete',
    price: 50.0,
  },
  {
    name: 'Lasanha à Bolonhesa',
    description:
      'Camadas de massa de lasanha intercaladas com molho à bolonhesa, queijo e molho bechamel',
    price: 55.0,
  },
  {
    name: 'Tacos de Carnitas',
    description:
      'Tortillas de milho recheadas com carne de porco desfiada, cebola, coentro e molho de abacaxi',
    price: 35.0,
  },
  {
    name: 'Camarão ao Curry',
    description:
      'Camarões cozidos em molho de curry cremoso, servidos com arroz basmati',
    price: 65.0,
  },
  {
    name: 'Pizza Margherita',
    description:
      'Massa fina de pizza coberta com molho de tomate, mussarela fresca, tomates e manjericão',
    price: 25.0,
  },
  {
    name: 'Costelas de Porco BBQ',
    description:
      'Costelas de porco grelhadas lentamente e cobertas com molho barbecue, acompanhadas de batatas fritas',
    price: 70.0,
  },
  {
    name: 'Salada Caesar com Frango',
    description:
      'Alface romana, frango grelhado, croutons, queijo parmesão e molho Caesar',
    price: 30.0,
  },
  {
    name: 'Ravioli de Espinafre e Ricota',
    description:
      'Ravioli recheado com espinafre e ricota, coberto com molho de tomate e manjericão',
    price: 40.0,
  },
  {
    name: 'Sushi Misto',
    description: 'Seleção de sushi incluindo sashimi, nigiri e rolos variados',
    price: 50.0,
  },
  {
    name: 'Pad Thai',
    description:
      'Macarrão de arroz salteado com camarões, amendoim, broto de feijão e molho tamarindo',
    price: 45.0,
  },
  {
    name: 'Hambúrguer Clássico',
    description:
      'Hambúrguer de carne grelhado, queijo cheddar, alface, tomate e maionese, acompanhado de batatas fritas',
    price: 20.0,
  },
  {
    name: 'Tagliatelle ao Pesto',
    description:
      'Massa tagliatelle coberta com molho pesto de manjericão, alho e pinhões',
    price: 35.0,
  },
  {
    name: 'Peixe Assado com Ervas',
    description:
      'Peixe fresco assado com ervas mediterrâneas, servido com purê de batatas e vegetais',
    price: 55.0,
  },
  {
    name: 'Gnocchi à Bolonhesa',
    description:
      'Gnocchi de batata coberto com molho à bolonhesa e queijo parmesão',
    price: 40.0,
  },
  {
    name: 'Tiramisu',
    description:
      'Sobremesa italiana clássica feita com camadas de biscoitos embebidos em café, queijo mascarpone e cacau',
    price: 15.0,
  },
];

async function seed() {
  const prisma = new PrismaClient();

  try {
    for (let i = 0; i < kitchenDishesData.length; i++) {
      const supplyData = kitchenDishesData[i];
      await prisma.kitchenDishes.create({
        data: {
          id: randomUUID(),
          name: supplyData.name,
          description: supplyData.description,
          price: supplyData.price,
        },
      });
    }

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
