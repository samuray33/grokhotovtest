// можно было и без этого обойтись прямиком из composables/basket.js данные достовать но такоевы требования

import { defineStore } from 'pinia';

export const useInfoProduct = defineStore('infoProduct', () => {
    let totalSum = ref();
    let totalCount = ref();
    let setupCheck = ref();

    return{
        totalSum,
        totalCount,
        setupCheck
    }
});