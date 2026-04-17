
import { readBody } from 'h3';
import fs from 'fs';
import path from 'path';

// Путь к файлу базы данных
const dbPath = path.resolve(process.cwd(), 'orders.json');

// Функция для чтения базы
const getOrders = () => {
  if (!fs.existsSync(dbPath)) {
    // Если файла нет, создаем начальный массив
    const initialData = [
      {
        // тестовые данные для структуры что бы было на что опиратся
        id: 0,
        items: [
          { name: 'Вытяжное устройство G2H', count: 1 },
          { name: 'Вытяжное устройство BXC', count: 1 },
          { name: 'Вытяжное устройство GHN', count: 1 },
        ],
        totalCount: 3,
        price: 37932 
      }
    ];
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  const fileContent = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(fileContent);
};

// Функция для записи базы
const saveOrders = (orders) => {
  fs.writeFileSync(dbPath, JSON.stringify(orders, null, 2));
};

export default defineEventHandler(async (event) => {
  if (event.method === 'POST') {
    const body = await readBody(event);
    
    const orders = getOrders();
    
    const newOrder = {
      id: orders.length,
      items: body.items || [],
      totalCount: body.totalCount || 0,
      price: body.totalSum || 0
    };

    orders.push(newOrder);
    saveOrders(orders);

    console.log('Заказ сохранен в файл orders.json:', newOrder);

    return { 
      success: true, 
      message: 'Заказ оформлен!', 
      orderId: newOrder.id 
    };
  }

  // GET запрос
  return getOrders();
});