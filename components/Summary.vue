<script setup>
import { useInfoProduct } from '~/stores/InfoProduct';
// Импортируем корзину, чтобы получить список товаров
import { useBasket } from '~/composables/basket';

const infoProduct = useInfoProduct();
const basket = useBasket(); // Получаем доступ к товарам

// функция добавление
let addOrder = async () => {
  // 1. Получаем доступ к массиву через .value, так как filtBacket это computed
  const itemsArray = basket.filtBacket ? basket.filtBacket.value : [];

  // Проверка: есть ли товары
  if (!itemsArray || itemsArray.length === 0) {
    alert("Корзина пуста! Нечего оформлять.");
    return;
  }

  // 2. Формируем заказ, используя itemsArray
  const orderData = {
    items: itemsArray.map(item => ({
      name: item.name,
      count: item.count,
      price: item.price
    })),
    totalCount: infoProduct.totalCount,
    totalSum: infoProduct.totalSum
  };

  // получаем весь список заказов
  let getData = async () => {
    try{
      let res = await $fetch('/api/order', {
        method:"get"
      })
      console.log("весь список заказов", res);
    }
    catch(error){
      console.log("не получилось достать список заказов");
    }
  }
  console.log('Отправляем на сервер:', orderData);

  // загружаем заказ на сервер
  try {
    await $fetch('/api/order', {
      method: 'POST',
      body: orderData
    });
    getData();
    alert("Заказ успешно оформлен!");
    
  } catch (error) {
    console.error(error);
    alert("Не удалось оформить заказ");
  }
};
</script>

<template>
  <div class="summary-block">
    <h2 class="summary-block__title">Итого</h2>
    
    <div class="summary-block__row">
      <span>Сумма заказа</span>
      <span>{{ infoProduct.totalSum }} ₽</span>
    </div>
    
    <div class="summary-block__row">
      <span>Количество</span>
      <span>{{ infoProduct.totalCount }} шт</span>
    </div>
    
    <div class="summary-block__row">
      <span>Установка</span>
      <span>{{ infoProduct.setupCheck }}</span>
    </div>

    <div class="summary-block__total">
      <span>Стоимость товаров</span>
      <span class="summary-block__total-price">{{ infoProduct.totalSum }} ₽</span>
    </div>

    <button @click="addOrder" class="summary-block__btn summary-block__btn--primary">
      Оформить заказ
    </button>
    
    <button class="summary-block__btn summary-block__btn--secondary">
      Купить в 1 клик
    </button>
  </div>
</template>

<style scoped>
/* Твои стили без изменений */
.summary-block {
  padding: 3vh;
  background: #f5f5f7;
  border-radius: 1vh;
  width: 50vh;
}
.summary-block__title {
  font-size: 4vh;
  margin: 2vh 0vh;
}
.summary-block__row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vh;
  font-size: 3vh;
  color: #665;
}
.summary-block__total {
  display: flex;
  justify-content: space-between;
  margin: 3vh 0;
  padding-top: 4vh;
  border-top: 0.1vh solid #e0e0e0;
  font-size: 3vh;
}
.summary-block__total-price {
  font-size: 3vh;
}
.summary-block__btn {
  width: 100%;
  padding: 2vh;
  border: none;
  border-radius: 1vh;
  font-size: 2vh;
  cursor: pointer;
  margin-bottom: 1vh;
  transition: opacity 0.2s;
}
.summary-block__btn:hover {
  opacity: 0.9;
}
.summary-block__btn--primary {
  background: #0066cc;
  color: white;
}
.summary-block__btn--secondary {
  background: white;
  color: #0066cc;
  border: 2px solid #0066cc;
}
</style>