<script setup>
// достаем данные из сервера который наксовский что бы вывести в корзину 
let {data: productData, refresh: productRefresh, error: productError, pending: productPending} =  await useFetch('/api/basket', {
  method: 'GET'
});
</script>

<template>
  <section>
    <!-- тут будет компонент header -->
     <h1>тут будет компонент header </h1>
  </section>

  <header>Ваша корзина</header>

  <!-- обработка ошибки -->
  <h2 v-if="productError">Не получилось достать данные</h2>

  <!-- в случаи если все окей выводим все необходимое из нашего сервера -->
  <section class="center" v-else>
    <div>
      <div class="product" v-for="product in productData">
        <div>
          <img :src="product.photo" :alt="product.name" width="100">
        </div>

        <div>
          <h3>{{ product.name }}</h3>
          <h4>{{ product.Specifications }}</h4>
          <h4>Ариткул: {{ product.Art }}</h4>
        </div>

        <div class="count">
          <!-- мей би тут не корректно -->
          <button>-</button>
          <h4>{{ product.count }}</h4>
          <button>+</button>
        </div>

        <div class="price">
          <h4>{{ product.price }} ₽</h4>
        </div>
      </div>
    </div>
  
    <div>
      <!-- тут будует компонент с итогом -->
       <h1>тут будут итоги</h1>
    </div>
  </section>

  <section>
    <!-- тут будет компонент просмотренные товары -->
     <h1>тут будет компонент просмотренные товары</h1>
  </section>
</template>

<style scoped>
.center{
  display: flex;
}

.product, .count{
  display: flex;
  align-items: center;
}
</style>