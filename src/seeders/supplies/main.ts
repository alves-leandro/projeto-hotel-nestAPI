import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const suppliesData = [
  {
    name: 'Coca Cola',
    description: 'Refrigerante de 2 litros',
    price: 5.9,
    stock: 10,
  },
  {
    name: 'Água Mineral',
    description: 'Garrafa de 500ml',
    price: 2.5,
    stock: 15,
  },
  {
    name: 'Lanches Variados',
    description: 'Pacote com batatas, salgadinhos, e biscoitos',
    price: 12.99,
    stock: 20,
  },
  {
    name: 'Chocolate',
    description: 'Barra de chocolate ao leite',
    price: 4.0,
    stock: 18,
  },
  {
    name: 'Iogurte',
    description: 'Pote individual de iogurte',
    price: 3.75,
    stock: 12,
  },
  {
    name: 'Frutas Frescas',
    description: 'Seleção de frutas da estação',
    price: 8.5,
    stock: 10,
  },
  {
    name: 'Sanduíches Prontos',
    description: 'Opções variadas de sanduíches',
    price: 9.99,
    stock: 15,
  },
  {
    name: 'Sopas Instantâneas',
    description: 'Cup noodles de diferentes sabores',
    price: 5.49,
    stock: 25,
  },
  {
    name: 'Queijo e Presunto',
    description: 'Mini bandeja com queijo e presunto',
    price: 11.25,
    stock: 10,
  },
  {
    name: 'Bebidas Energéticas',
    description: 'Latas de bebidas energéticas',
    price: 6.75,
    stock: 8,
  },
  {
    name: 'Chá Variado',
    description: 'Seleção de chás para preparo',
    price: 4.29,
    stock: 20,
  },
  {
    name: 'Café em Cápsulas',
    description: 'Cápsulas de café para máquina',
    price: 10.0,
    stock: 15,
  },
  {
    name: 'Barras de Cereal',
    description: 'Pacote com barras de cereal',
    price: 7.99,
    stock: 18,
  },
  {
    name: 'Vinho Tinto',
    description: 'Garrafa de vinho tinto',
    price: 20.0,
    stock: 5,
  },
  {
    name: 'Cerveja Artesanal',
    description: 'Garrafa de cerveja artesanal local',
    price: 15.0,
    stock: 8,
  },
  {
    name: 'Pacote de Amendoins',
    description: 'Pacote de amendoins torrados e salgados',
    price: 6.49,
    stock: 12,
  },
  {
    name: 'Bolachas Finas',
    description: 'Caixa de bolachas finas',
    price: 8.99,
    stock: 10,
  },
  {
    name: 'Garrafa de Vinho Branco',
    description: 'Garrafa de vinho branco',
    price: 18.0,
    stock: 7,
  },
  {
    name: 'Sorvete Individual',
    description: 'Pote individual de sorvete',
    price: 7.0,
    stock: 15,
  },
  {
    name: 'Taças Descartáveis',
    description: 'Pacote com taças descartáveis',
    price: 3.49,
    stock: 25,
  },
];

async function seed() {
  const prisma = new PrismaClient();

  try {
    for (let i = 0; i < suppliesData.length; i++) {
      const supplyData = suppliesData[i];
      await prisma.supply.create({
        data: {
          id: randomUUID(),
          name: supplyData.name,
          description: supplyData.description,
          price: supplyData.price,
          stock: supplyData.stock,
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
