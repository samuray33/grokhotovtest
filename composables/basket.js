// composible было использовано что бы при обновлении все данные вернулись как было 
// я хотел использовать сервер nuxt но там при удалении или изменении они сохроняются в файле и при обновлении они не возврашаюся в исходном виде
// был бы проект настояшим то да нужно использовать через api через сервер но так как это тестовое задание тут только так
// можно было реализовать через pinia но я хотел показать что и с composible я тоже умею рабоатать

import { reactive, computed, ref } from "vue";

// ВЫНОСИМ состояние за пределы функции, чтобы оно было ОДНО на всё приложение
const state = reactive({
  backet: [
    {
      id: 0,
      name: "Вытяжное устройство G2H",
      Specifications: "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
      description: "Вытяжное устройство с датчиком присутствия",
      Art: "G2H1065",
      price: 12644,
      photo: '/photo/1.png',
      count: 1
    },
    {
      id: 1,
      name: "Вытяжное устройство BXC",
      Specifications: "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
      description: "Вытяжное устройство с датчиком присутствия",
      Art: "G2H1065",
      price: 12644,
      photo: '/photo/2.png',
      count: 1
    },
    {
      id: 2,
      name: "Вытяжное устройство GHN",
      Specifications: "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
      description: "Вытяжное устройство с датчиком присутствия",
      Art: "G2H1065",
      price: 12644,
      photo: '/photo/3.png',
      count: 1
    },
    {
      id: 3,
      name: "Вытяжное устройство TDA",
      Specifications: "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
      description: "Вытяжное устройство с датчиком присутствия",
      Art: "G2H1065",
      price: 12644,
      photo: '/photo/3.png',
      count: 0
    },
    {
      id: 4,
      name: "Вытяжное устройство TDA",
      Specifications: "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
      description: "Вытяжное устройство с датчиком присутствия",
      Art: "G2H1065",
      price: 12644,
      photo: '/photo/3.png',
      count: 0
    },
    {
      id: 5,
      name: "Вытяжное устройство TDA",
      Specifications: "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
      description: "Вытяжное устройство с датчиком присутствия",
      Art: "G2H1065",
      price: 12644,
      photo: '/photo/3.png',
      count: 0
    }
  ],
  // Статус установки храним тут же, чтобы он был глобальным
  isSetupNeeded: false 
});

export const useBasket = () => {
  // Фильтрованный список (только товары с count >= 1)
  const filtBacket = computed(() => {
    return state.backet.filter(item => item.count >= 1);
  });

  // Подсчет суммы (автоматически реактивный)
  const totalSum = computed(() => {
    return filtBacket.value.reduce((sum, item) => sum + (item.count * item.price), 0);
  });

  // Подсчет количества товаров
  const totalCount = computed(() => {
    return filtBacket.value.reduce((sum, item) => sum + item.count, 0);
  });

  // Статус установки (через ref для реактивности)
  const setupCheckStatus = ref(state.isSetupNeeded);
  
  // Компьютед для красивого текста "Да"/"Нет"
  const setupCheckText = computed(() => {
    return setupCheckStatus.value ? "Да" : "Нет";
  });

  // Функция удаления
  const deleteProduct = (id) => {
    const index = state.backet.findIndex(item => item.id === id);
    if (index !== -1) {
      state.backet.splice(index, 1);
    }
  };

  // Функция изменения количества (универсальная)
  const changeCount = (id, delta) => {
    const product = state.backet.find(p => p.id === id);
    if (product) {
      product.count += delta;
      // Если стало меньше 1, можно удалять автоматически (опционально)
      if (product.count <= 0 && delta < 0) {
        deleteProduct(id);
      }
    }
  };

  // Функция для переключения чекбокса извне (если нужно)
  const toggleSetup = (value) => {
    setupCheckStatus.value = value;
    state.isSetupNeeded = value;
  };

  return {
    // Данные
    backet: state.backet,
    filtBacket,
    
    // Вычисления
    totalSum,
    totalCount,
    setupCheckText,
    setupCheckStatus, 
    
    // Методы
    deleteProduct,
    changeCount,
    toggleSetup
  };
};