const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando la carga de datos de prueba...');

  // Limpiar datos previos (opcional)
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 1. Crear Categorías
  const cpuCategory = await prisma.category.create({
    data: { name: 'Procesadores (CPU)' },
  });

  const motherboardCategory = await prisma.category.create({
    data: { name: 'Placas Madre (Motherboard)' },
  });

  const ramCategory = await prisma.category.create({
    data: { name: 'Memorias RAM' },
  });

  // 2. Crear Productos de ejemplo con datos de compatibilidad
  await prisma.product.createMany({
    data: [
      {
        name: 'AMD Ryzen 5 5600X',
        description: 'Procesador de 6 núcleos y 12 hilos, ideal para gaming de gama media.',
        price: 180.00,
        categoryId: cpuCategory.id,
        socket: 'AM4',
        ramType: 'DDR4',
        wattage: 65,
      },
      {
        name: 'ASUS Prime B450M-A II',
        description: 'Placa madre micro-ATX compatible con procesadores AMD Ryzen de primera a cuarta generación.',
        price: 95.00,
        categoryId: motherboardCategory.id,
        socket: 'AM4',
        ramType: 'DDR4',
        wattage: 30,
      },
      {
        name: 'Corsair Vengeance LPX DDR4 16GB (2x8GB) 3200MHz',
        description: 'Memoria RAM de alto rendimiento con disipador de calor de aluminio.',
        price: 55.00,
        categoryId: ramCategory.id,
        socket: null,
        ramType: 'DDR4',
        wattage: 10,
      }
    ],
  });

  console.log('✅ ¡Datos de prueba insertados correctamente!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });