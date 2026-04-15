// пока в виде теста, тут совсем другие данные должны храниться

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePorducts = defineStore('products', () => {
    const products = reactive[
        {
            name: "Вытяжное устройство G2H",
            Specifications: "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
            Art: "G2H1065",
            price: 12644,
            photo: '/photo/1.png'
        },
        {
            name: "Вытяжное устройство BXC",
            Specifications: "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
            Art: "G2H1065",
            price: 12644,
            photo: '/photo/2.png'
        },
        {
            name: "Вытяжное устройство GHN",
            Specifications: "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
            Art: "G2H1065",
            price: 12644,
            photo: '/photo/3.png'
        }
    ];
    return {products}
})