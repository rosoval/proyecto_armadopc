const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

// Reemplaza esto con tus credenciales reales de PostgreSQL directamente:
const pool = new Pool({ 
  connectionString: "postgresql://postgres:1415@localhost:5432/pc_builder" 
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Limpiar base de datos anterior (opcional)
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log('🌱 Sembrando datos en la base de datos...');

  // 1. Procesadores (CPU)
  const cpuCategory = await prisma.category.create({
    data: {
      name: 'Procesadores (CPU)',
      products: {
        create: [
          { name: 'Intel Core i5-4460', description: 'Ideal para equipos de entrada.', price: 65, socket: 'LGA1150' },
          { name: 'AMD Ryzen 5 3600', description: 'Excelente rendimiento precio.', price: 95, socket: 'AM4' },
          { name: 'Intel Core i5-12400F', description: 'Gama media actual.', price: 150, socket: 'LGA1700' }
        ]
      }
    }
  });

  // 2. Placas Madre (Motherboard)
  const motherCategory = await prisma.category.create({
    data: {
      name: 'Placas Madre (Motherboard)',
      products: {
        create: [
          { name: 'ASUS H81M-A', description: 'Compatible con cuarta generación.', price: 50, socket: 'LGA1150', ramType: 'DDR3' },
          { name: 'Gigabyte B450M DS3H', description: 'Clásica para Ryzen AM4.', price: 80, socket: 'AM4', ramType: 'DDR4' },
          { name: 'MSI PRO B660M-A', description: 'Para procesadores Intel modernos.', price: 130, socket: 'LGA1700', ramType: 'DDR4' }
        ]
      }
    }
  });

  // 3. Memorias RAM
  const ramCategory = await prisma.category.create({
    data: {
      name: 'Memorias RAM',
      products: {
        create: [
          { name: 'Kingston HyperX Fury 8GB', description: 'Memoria RAM DDR3 económica.', price: 25, ramType: 'DDR3' },
          { name: 'Corsair Vengeance 16GB', description: 'Kit DDR4 de alto rendimiento.', price: 55, ramType: 'DDR4' },
          { name: 'Fury Beast 16GB', description: 'Alta velocidad DDR5.', price: 85, ramType: 'DDR5' }
        ]
      }
    }
  });

  // 4. Tarjetas Gráficas (GPU)
  const gpuCategory = await prisma.category.create({
    data: {
      name: 'Tarjetas Gráficas (GPU)',
      products: {
        create: [
          { name: 'NVIDIA GTX 750 Ti 2GB', description: 'Gráfica clásica de entrada.', price: 50 },
          { name: 'NVIDIA GTX 1650 4GB', description: 'Excelente para esports en 1080p.', price: 130 },
          { name: 'NVIDIA RTX 3050 8GB', description: 'Soporta Ray Tracing y DLSS.', price: 220 }
        ]
      }
    }
  });

  // 5. Almacenamiento
  const storageCategory = await prisma.category.create({
    data: {
      name: 'Almacenamiento',
      products: {
        create: [
          { name: 'HDD Western Digital 1TB', description: 'Disco duro mecánico tradicional.', price: 40 },
          { name: 'SSD Kingston 480GB', description: 'Más rápido que un HDD.', price: 35 },
          { name: 'NVMe M.2 Crucial P3 1TB', description: 'Ultra rápido tipo M.2 PCIe.', price: 65 }
        ]
      }
    }
  });

  // 6. Fuentes de Poder (PSU)
  const psuCategory = await prisma.category.create({
    data: {
      name: 'Fuentes de Poder (PSU)',
      products: {
        create: [
          { name: 'Fuente Genérica 500W', description: 'Sin certificación oficial.', price: 30, wattage: 500 },
          { name: 'Redragon RGPS 500W', description: 'Certificación 80 Plus Bronze.', price: 55, wattage: 500 },
          { name: 'Corsair CV650', description: '650W con certificación 80 Plus Bronze.', price: 75, wattage: 650 }
        ]
      }
    }
  });

  console.log('✅ ¡Base de datos sembrada con éxito!');
}

main()
  .catch((e) => {
    console.error('❌ Error al sembrar la base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });