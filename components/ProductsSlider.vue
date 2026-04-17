<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useBasket } from '~/composables/basket';

let basket = useBasket();
const products = basket.backet;

const swiperOptions = {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 15,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  },
};
</script>

<template>
  <div class="slider-section">
    <!-- Заголовок и пагинация в одной строке -->
    <div class="slider-header">
      <h2 class="slider-section__title">Просмотренные товары</h2>
      
      <div class="slider-controls">
        <!-- Стрелки -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <!-- Цифры -->
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div class="slider-wrapper">
      <Swiper v-bind="swiperOptions" class="my-swiper">
        <SwiperSlide v-for="product in products" :key="product.id">
          <div class="product-card">
            <div class="product-card__image">
              <img :src="product.photo" :alt="product.name" />
            </div>
            <div class="product-card__content">
              <h3 class="product-card__name">{{ product.name }}</h3>
              <p class="product-card__desc">{{ product.description }}</p>
              <div class="product-card__price">
                <span class="price-range">{{ product.price }}</span>
                <span class="price-old">77.60 ₽ – 643.86 ₽</span>
              </div>
              <button class="product-card__btn">Подробнее</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
.slider-section {
  padding: 4vh 2vh;
  max-width: 200vh;
  margin: 0 auto;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3vh;
}

.slider-section__title {
  font-size: 4vh;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.slider-controls {
  display: flex;
  align-items: center;
  gap: 2vh;
}

/* Контейнер слайдера */
.slider-wrapper {
  position: relative;
  width: 100%;
}

.my-swiper {
  width: 100%;
  padding-bottom: 1vh !important;
}


.product-card {
  background: #f5f5f7; 
  border-radius: 1vh;
  padding: 2vh 4vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  border: none; 
}

.product-card__image {
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3vh;
  width: 100%;
  background: #fff; 
  border-radius: 1vh;
  padding: 1vh;
}

.product-card__image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-card__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-card__name {
  font-size: 2vh;
  font-weight: 700;
  margin: 0 0 2vh;
  color: #333;
}

.product-card__desc {
  font-size: 2vh;
  color: #888;
  line-height: 1.4;
  margin: 0 0 2vh;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 4vh;
}

.product-card__price {
  margin-bottom: 2vh;
  display: flex;
  flex-direction: column;
  gap: 2vh;
}

.price-range {
  font-size: 2vh;
  font-weight: 700;
  color: #333;
}

.price-old {
  font-size: 2vh;
  color: #aaa;
  text-decoration: line-through;
}

.product-card__btn {
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 2vh;
  border-radius: 1vh;
  font-size: 2vh;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
}

.swiper-button-next,
.swiper-button-prev {
  position: static; 
  color: #fff;
  background: #cbd2d9;
  width: 6vh;
  height: 6vh;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  transition: all 0.2s;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: #0066cc;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 2vh;
  font-weight: bold;
}

/* Пагинация "1 / 6" */
.swiper-pagination {
  position: static;
  font-size: 4vh;
  color: #888;
  font-weight: 500;
  width: auto !important;
}
</style>