<script setup>
// логику можно было полностью писать в composables/basket.js но я оставил это тут для удобства проверки :)
// а так я продулировал что бы показать что и так и так можно

import { ref, computed, watch } from 'vue'; 
import Header from '~/components/Header.vue';
import Summary from '~/components/Summary.vue';
import ProductsSlider from '~/components/ProductsSlider.vue'; 
import { useBasket } from '~/composables/basket';
import { useInfoProduct } from '~/stores/InfoProduct';

// достаем нашу корзину из composables
let basket = useBasket();

// достаем наш store
const infoStore = useInfoProduct(); 

// первоначальная проверка что бы получить только те эелменты у которых count >= 1
let filtBacket = computed(() => {
  return basket.backet.filter(item => item.count >= 1);
});

// удаление 
let del = (id) => {
  basket.deleteProduct(id);
}

// минус с проверкой если 0 то тоже удалить
let minus = (id) => {
  let product = basket.backet.find(p => p.id == id);
  if (product) {
    product.count --;
    if(product.count <= 0){
      basket.deleteProduct(id);
    }
  }
}

// подсчет итогов
let totalSum = computed(() => {
  return filtBacket.value.reduce((sum, item) => sum + (item.count * item.price), 0);
});

let totalCount = computed(() => {
  return filtBacket.value.reduce((sum, item) => sum + item.count, 0);
});

// Логика чекбокса
const isSetupNeeded = ref(false); // Инициализируем false

const setupCheck = computed(() => {
  return isSetupNeeded.value ? "Да" : "Нет";
});

// обновляем что бы в pinia были всегда актуальные данные
watch(totalSum, (newVal) => {
  infoStore.totalSum = newVal;
}, { immediate: true });

watch(totalCount, (newVal) => {
  infoStore.totalCount = newVal;
}, { immediate: true });

watch(setupCheck, (newVal) => {
  infoStore.setupCheck = newVal; 
}, { immediate: true });

// очистка корзины
let clearBasket = () => {
  filtBacket.value.forEach(item => {
    basket.deleteProduct(item.id);
  });
}

</script>

<template>
  <section class="page">
    <!-- header -->
     <Header></Header>
  </section>

  <!-- Блок заголовка корзины -->
  <header class="cart-header">
    <h1 class="cart-header__title">Ваша корзина</h1>
    <h1 class="cart-header__clear-btn" @click="clearBasket">Очистить корзину</h1>
  </header>

  <!-- Основной контейнер корзины -->
  <section class="cart">
    <!-- Левая колонка -->
    <div class="cart__content">
      
      <!-- Список товаров -->
      <div v-if="filtBacket && filtBacket.length > 0" class="cart-list">
        <div class="cart-list__item" v-for="product in filtBacket" :key="product.id">
          <div class="cart-list__item-image">
            <img :src="product.photo" :alt="product.name" width="100">
          </div>

          <div class="cart-list__item-info">
            <h3>{{ product.name }}</h3>
            <h4>{{ product.Specifications }}</h4>
            <h4>Ариткул: {{ product.Art }}</h4>
          </div>

          <div class="cart-list__item-count">
            <button @click="minus(product.id)">-</button>
            <h4>{{ product.count }}</h4>
            <button @click="product.count++">+</button>
          </div>

          <div class="cart-list__item-price">
            <h4>{{ product.count * product.price }} ₽</h4>
          </div>

          <div class="cart-list__item-del">
            <button @click="del(product.id)">Х</button>
          </div>
        </div>
      </div>

      <!-- пустая корзина -->
      <div v-else class="cart-empty-state">
        <h1>Пока корзина пустая</h1>
      </div>

      <!-- нужна ли установка -->
      <label v-if="filtBacket && filtBacket.length > 0" class="installation-block">

        <input class="installation-block__check" type="checkbox" name="setup" v-model="isSetupNeeded">

        <h1 class="installation-block__icon">🔧</h1>

        <div class="installation-block__text">
          <h3>Установка</h3>
          <h5>Отметьте, если Вам необходима консультация профессионала по монтажу выбранных товаров.</h5>
        </div>

      </label>
    </div>
  
    <!-- Правая часть: Итоги -->
    <aside class="cart__summary">
      <Summary></Summary>
    </aside>
  </section>

  <section class="page__section">
    <!-- тут компонент просмотренные товары -->
     <ProductsSlider />
  </section>
</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
  font-size: 3vh;
}

img {
  width: 20vh;
}


.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5vh;
  padding: 4vh;
}

.cart-header__title {
  font-size: 5vh;
}

.cart-header__clear-btn {
  cursor: pointer;
  border-bottom: 0.1vh solid silver;
  color: #888;
  font-size: 2.5vh;
}


.cart {
  display: flex;
}


.cart__content {
  width: 140vh;
  margin-bottom: 10vh;
}

.cart-list__item {
  display: flex;
  justify-content: space-between;
  border-bottom: 0.1vh solid silver;
  padding: 1vh;
}

.cart-list__item-info {
  width: 50vh;
}

.cart-list__item-info h4 {
  color: rgb(156, 155, 155);
  font-size: 2.5vh;
}

.cart-list__item-count, 
.cart-list__item-price {
  display: flex;
  align-items: center;
}

.cart-list__item-count button {
  background-color: rgb(238, 238, 238);
  padding: 1vh 2vh;
  border: 0.1vh solid #f5f5f7;
  border-radius: 0.5vh;
  margin: 0vh 1vh;
}

.cart-list__item-del button {
  background-color: #fff;
  border: none;
  cursor: pointer;
}


.cart-empty-state {
  text-align: center;
  background-color: #F6F8FA;
  padding: 20vh;
}


.installation-block {
  display: flex;
  align-items: center;
  padding: 5vh;
  background-color: #f5f5f7;
  margin-top: 5vh;
  margin-left: 5vh;
  width: 120vh;
  cursor: pointer;
  border-radius: 1vh;
}

.installation-block__icon {
  margin-right: 2vh;
}

.installation-block__text h3,
.installation-block__text h5 {
  margin: 0;
  font-size: 3vh; 
  line-height: 1.4;
}

.installation-block__text h5 {
  font-size: 2vh; 
  color: #888;
  font-weight: normal;
}

.installation-block__check {
  width: 2vh;       
  height: 2vh;     
  transform: scale(1.5); 
  margin-right: 4vh;
  cursor: pointer;
  vertical-align: middle; 
}


.cart__summary {
  margin-left: 10vh;
}
</style>