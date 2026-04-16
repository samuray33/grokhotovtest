<script setup>
import { useBasket } from '~/composables/basket';

// Подключаем нашу корзину
const basket = useBasket();
</script>

<template>
    <!-- Header -->
    <header class="header">
        <!-- Хлебные крошки -->
        <nav class="header__breadcrumbs">
            Главная <span class="header__separator">/</span> Корзина
        </nav>

        <!-- Блок корзины -->
        <div class="header__basket">
            <div class="header__basket-icon-wrapper">
                <span class="header__basket-icon">🛒</span>
                <span v-if="basket.totalCount > 0" class="header__basket-badge">
                    {{ basket.totalCount }}
                </span>
            </div>
            
            <!-- Текст и суммы -->
            <div class="header__basket-info">
                <span class="header__basket-title">Ваша корзина</span>
                <div class="header__basket-details">
                    <span class="header__basket-count">{{ basket.totalCount }} товаров</span>
                    <span class="header__basket-divider">|</span>
                    <span class="header__basket-sum">{{ basket.totalSum }} ₽</span>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
*{
    font-size: 2.5vh;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2vh 4vh;
    background-color: #fff;
    border-bottom: 0.1vh solid #eaeaea;
    font-family: sans-serif;
}

/* Хлебные крошки */
.header__breadcrumbs {
    font-size: 2vh;
    color: #888;
}

.header__separator {
    margin: 0 1vh;
    color: #ccc;
}

/* Контейнер корзины */
.header__basket {
    display: flex;
    align-items: center;
    gap: 2vh;
    cursor: pointer;
    transition: opacity 0.2s;
}

.header__basket:hover {
    opacity: 0.8;
}

/* Иконка и бейджик */
.header__basket-icon-wrapper {
    position: relative;
    font-size: 3vh;
    line-height: 1;
}



/* Информация справа от иконки */
.header__basket-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.header__basket-title {
    font-size: 2vh;
    font-weight: 700;
    color: #333;
    margin-bottom: 1vh;
}

.header__basket-details {
    display: flex;
    align-items: center;
    gap: 1vh;
    font-size: 13px;
    color: #665;
}

.header__basket-count {
    font-weight: 500;
}

.header__basket-divider {
    color: #ddd;
}

.header__basket-sum {
    font-weight: 700;
    color: #333;
}
</style>