import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // Мобильное меню
  const openMenuButton = document.querySelector('.page-header__toggle');
  const closeMenuButton = document.querySelector('.mobile-nav__toggle');
  const menuOpen = document.querySelector('.mobile-nav');
  const body = document.querySelector('body');
  const mobileMenu = document.querySelector('.mobile-nav');
  const mobileMenuBackdrop = document.querySelector('.mobile-nav__backdrop');
  const mobileMenuLink = document.querySelectorAll('.mobile-nav__link');

  // Открывает мобильное меню

  if (openMenuButton) {
    openMenuButton.addEventListener('click', function () {
      if (menuOpen) {
        menuOpen.classList.add('mobile-nav--opened');
      }
    });
  }

  // Закрывает мобильное меню на кнопку

  if (closeMenuButton) {
    closeMenuButton.addEventListener('click', function () {
      if (menuOpen) {
        menuOpen.classList.remove('mobile-nav--opened');
        body.classList.remove('body-lock');
        window.scrollTo(0, body.dataset.scrollY);
      }
    });
  }

  // Закрывает мобильное меню на оверлей

  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener('click', function () {
      if (menuOpen) {
        menuOpen.classList.remove('mobile-nav--opened');
        body.classList.remove('body-lock');
        window.scrollTo(0, body.dataset.scrollY);
      }
    });
  }

  // Реализация ссылок в мобильном меню

  if (mobileMenuLink.length > 0 && menuOpen) {
    mobileMenuLink.forEach(function (element) {
      element.addEventListener('click', function () {
        menuOpen.classList.remove('mobile-nav--opened');
        body.classList.remove('body-lock');
        window.scrollTo(0, body.dataset.scrollY);
      });
    });
  }

  // Лок скролла страницы при открытом мобильном меню

  openMenuButton.addEventListener('click', (e) => {
    e.preventDefault();
    body.dataset.scrollY = getBodyScrollTop();
    body.style.top = `-${body.dataset.scrollY}px`;
    mobileMenu.classList.add('mobile-nav--opened');
    body.classList.add('body-lock');
  });

  function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
  }

  // Валидация формы

  const form = document.querySelector('.form');
  const fields = form.querySelectorAll('.field');

  const generateError = function (text) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.style.fontSize = '10px';
    error.innerHTML = text;
    return error;
  };

  const removeValidation = function () {
    const errors = form.querySelectorAll('.error');

    for (let i = 0; i < errors.length; i++) {
      errors[i].remove();
    }
  };

  const checkFieldsPresence = function () {
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].value) {
        const error = generateError('Заполните поле ввода');
        form[i].parentElement.insertBefore(error, fields[i]);
      }
    }
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    removeValidation();
    checkFieldsPresence();
  });

  // Если работает скрипт удаляем класс

  const htmlElement = document.getElementsByTagName('html');
  htmlElement[0].classList.remove('no-script');

  iosVhFix();

  // Modules
  // ---------------------------------


  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {

    initModals();
  });
});


// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
