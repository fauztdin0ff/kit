/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "burgerMenu": () => (/* binding */ burgerMenu),
/* harmony export */   "isWebp": () => (/* binding */ isWebp),
/* harmony export */   "phoneMask": () => (/* binding */ phoneMask),
/* harmony export */   "popups": () => (/* binding */ popups)
/* harmony export */ });
/*---------------------------------------------------------------------------
Проверка WebP
---------------------------------------------------------------------------*/
function isWebp() {
   function testWebP(callback) {
      const webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height === 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {
      document.body.classList.add(support ? "webp" : "no-webp");
   });
}


/*---------------------------------------------------------------------------
Маска телефона
---------------------------------------------------------------------------*/
function phoneMask() {
   document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("input.tel-mask").forEach((input) => {
         let keyCode;
         function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ __ __",
               i = 0,
               val = this.value.replace(/\D/g, ""),
               new_value = matrix.replace(/[_\d]/g, (a) =>
                  i < val.length ? val.charAt(i++) : a
               );
            i = new_value.indexOf("_");
            if (i !== -1) {
               i < 5 && (i = 3);
               new_value = new_value.slice(0, i);
            }
            let reg = matrix
               .substr(0, this.value.length)
               .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
               .replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
               this.value = new_value;
            }
            if (event.type === "blur" && this.value.length < 5) this.value = "";
         }

         input.addEventListener("input", mask);
         input.addEventListener("focus", mask);
         input.addEventListener("blur", mask);
         input.addEventListener("keydown", mask);
      });
   });
}


/*---------------------------------------------------------------------------
Бургер меню
---------------------------------------------------------------------------*/
function burgerMenu() {
   document.addEventListener("DOMContentLoaded", () => {
      const menuIcon = document.querySelector(".menu__icon");
      const menuBody = document.querySelector(".menu__body");
      const body = document.body;
      const menuBodyClose = document.querySelector(".menu__body-close");
      const animationDuration = 500;

      if (!menuIcon || !menuBody) return;

      const closeMenu = () => {
         menuIcon.classList.remove("active");
         menuBody.classList.remove("active");
         body.classList.remove("no-scroll");
      };

      menuIcon.addEventListener("click", () => {
         menuIcon.classList.toggle("active");
         menuBody.classList.toggle("active");
         body.classList.toggle("no-scroll");
      });

      menuBody.addEventListener("click", (e) => {
         const link = e.target.closest("a");
         if (link) {
            e.preventDefault();
            closeMenu();
            setTimeout(() => {
               window.location.href = link.href;
            }, animationDuration);
         }
      });

      if (menuBodyClose) menuBodyClose.addEventListener("click", closeMenu);

      document.addEventListener("click", (e) => {
         if (!menuBody.contains(e.target) && !menuIcon.contains(e.target)) closeMenu();
      });
   });
}



/*---------------------------------------------------------------------------
Попапы
---------------------------------------------------------------------------*/
function popups() {
   if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initPopups);
   } else {
      initPopups();
   }
}

function initPopups() {
   const POPUP_SELECTOR = ".popup";
   const OPEN_BTN_SELECTOR = ".open-popup";
   const ACTIVE_CLASS = "show";
   const BODY_ACTIVE_CLASS = "popup-opened";

   let activeButton = null;

   // =========================
   // OPEN / SWITCH POPUPS
   // =========================
   document.addEventListener("click", (e) => {
      const button = e.target.closest(OPEN_BTN_SELECTOR);
      if (!button) return;

      e.preventDefault();
      e.stopPropagation();

      const popupId = button.dataset.popup;
      if (!popupId) return;

      const popup = document.getElementById(popupId);
      if (!popup) return;

      const currentPopup = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );

      if (activeButton === button && currentPopup) {
         closePopup(currentPopup);
         return;
      }

      if (currentPopup) {
         closePopup(currentPopup);
      }

      openPopup(popup, button);
   });

   // =========================
   // CLOSE POPUPS (overlay / close btn / outside)
   // =========================
   document.addEventListener("click", (e) => {
      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      const isCloseBtn = e.target.closest(".popup__close");
      const isInsideBody = e.target.closest(".popup__body");

      if (isCloseBtn || !isInsideBody) {
         closePopup(openPopupEl);
      }
   });

   // =========================
   // ESC KEY
   // =========================
   document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      const openPopupEl = document.querySelector(
         `${POPUP_SELECTOR}.${ACTIVE_CLASS}`
      );
      if (!openPopupEl) return;

      closePopup(openPopupEl);
   });

   // =========================
   // HELPERS
   // =========================
   function openPopup(popup, button) {
      popup.classList.add(ACTIVE_CLASS);
      document.body.classList.add(BODY_ACTIVE_CLASS);

      if (button) {
         button.classList.add("active");
         activeButton = button;
      }
   }

   function closePopup(popup) {
      popup.classList.remove(ACTIVE_CLASS);
      document.body.classList.remove(BODY_ACTIVE_CLASS);

      if (activeButton) {
         activeButton.classList.remove("active");
         activeButton = null;
      }
   }
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
//import { space } from "postcss/lib/list";


//flsFunctions.isWebp();
//flsFunctions.burgerMenu();
//flsFunctions.popups();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.phoneMask();

/*==========================================================================
Header catalog
============================================================================*/
function initCatalogToggle() {
   const button = document.querySelector('.catalog-button');
   const catalog = document.querySelector('.header__catalog');

   if (!button || !catalog) return;

   const ACTIVE_CLASS = 'active';

   const openCatalog = () => {
      button.classList.add(ACTIVE_CLASS);
      catalog.classList.add(ACTIVE_CLASS);
   };

   const closeCatalog = () => {
      button.classList.remove(ACTIVE_CLASS);
      catalog.classList.remove(ACTIVE_CLASS);
   };

   const toggleCatalog = () => {
      const isOpen = catalog.classList.contains(ACTIVE_CLASS);
      isOpen ? closeCatalog() : openCatalog();
   };

   button.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCatalog();
   });

   catalog.addEventListener('click', (e) => {
      e.stopPropagation();
   });

   document.addEventListener('click', () => {
      closeCatalog();
   });
}


/*==========================================================================
Header catalog inner
============================================================================*/
function initHeaderCatalog() {
   const catalog = document.querySelector('.header__catalog');
   if (!catalog) return;

   const items = catalog.querySelectorAll('.header__catalog-item');
   const categories = catalog.querySelectorAll('.header__catalog-category');

   const MOBILE_BREAKPOINT = 767;

   const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

   const setActiveById = (id) => {
      items.forEach(item => {
         item.classList.toggle(
            'active',
            item.dataset.categoryTab === id
         );
      });

      categories.forEach(category => {
         category.classList.toggle(
            'active',
            category.dataset.categoryLinks === id
         );
      });
   };

   const clearActive = () => {
      items.forEach(item => item.classList.remove('active'));
      categories.forEach(category => category.classList.remove('active'));
   };

   const ensureActive = () => {
      if (isMobile()) return;

      const activeItem = catalog.querySelector('.header__catalog-item.active');
      if (!activeItem && items.length) {
         setActiveById(items[0].dataset.categoryTab);
      }
   };

   items.forEach(item => {
      const id = item.dataset.categoryTab;

      item.addEventListener('mouseenter', () => {
         if (isMobile()) return;
         setActiveById(id);
      });

      item.addEventListener('click', () => {
         if (isMobile()) {
            const isActive = item.classList.contains('active');
            clearActive();
            if (!isActive) {
               setActiveById(id);
            }
         } else {
            setActiveById(id);
         }
      });
   });

   categories.forEach(category => {
      const subname = category.querySelector('.header__catalog-subname');
      if (!subname) return;

      subname.addEventListener('click', () => {
         clearActive();
         ensureActive();
      });
   });

   if (isMobile()) {
      clearActive();
   } else {
      setActiveById(items[0].dataset.categoryTab);
   }
}


/*==========================================================================
Move elements
============================================================================*/
function initHeaderAdaptiveMove() {
   const BREAKPOINT = 1100;

   const catalog = document.querySelector('.header__catalog');

   const topWrapper = document.querySelector('.header__top-wrapper');
   const topParent = document.querySelector('.header__top');

   const menuBody = document.querySelector('.header__menu-body');
   const menuParent = document.querySelector('.header__menu');

   if (!catalog || !topWrapper || !topParent || !menuBody || !menuParent) {
      return;
   }

   const moveElements = () => {
      const isMobile = window.innerWidth <= BREAKPOINT;

      if (isMobile) {
         if (!catalog.contains(topWrapper)) {
            catalog.append(topWrapper);
         }

         if (!catalog.contains(menuBody)) {
            catalog.append(menuBody);
         }
      } else {
         if (!topParent.contains(topWrapper)) {
            topParent.append(topWrapper);
         }

         if (!menuParent.contains(menuBody)) {
            menuParent.append(menuBody);
         }
      }
   };
   moveElements();
   window.addEventListener('resize', moveElements);
}

/*==========================================================================
Search
============================================================================*/
function initHeaderSearch() {
   const search = document.querySelector('.header__search');
   if (!search) return;

   const toggle = search.querySelector('.header__search-toggle');
   const form = search.querySelector('.header__search-form');
   const input = form?.querySelector('input');

   if (!toggle || !form || !input) return;

   const ACTIVE_CLASS = 'active';

   const openSearch = () => {
      search.classList.add(ACTIVE_CLASS);
      form.classList.add(ACTIVE_CLASS);

      setTimeout(() => {
         input.focus();
      }, 0);
   };

   const closeSearch = () => {
      search.classList.remove(ACTIVE_CLASS);
      form.classList.remove(ACTIVE_CLASS);
   };

   const toggleSearch = () => {
      search.classList.contains(ACTIVE_CLASS)
         ? closeSearch()
         : openSearch();
   };

   toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSearch();
   });

   form.addEventListener('click', (e) => {
      e.stopPropagation();
   });

   document.addEventListener('click', () => {
      closeSearch();
   });
}



/*==========================================================================
Hero slider
============================================================================*/
function initHeroSlider() {
   const heroSlider = document.querySelector('.hero__slider');
   const heroLinks = document.querySelectorAll('.hero__link');

   if (!heroSlider || !heroLinks.length) return null;

   const heroSwiper = new Swiper(heroSlider, {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 10,
      effect: 'fade',
      speed: 600,
      pagination: {
         el: '.hero__slider-pagination',
         clickable: true,
      },
      breakpoints: {
         768: {
            effect: 'fade',
         }
      }
   });

   heroLinks[0].classList.add('active');

   heroLinks.forEach((link, index) => {
      link.addEventListener('mouseenter', () => {
         heroSwiper.slideToLoop(index, 600);

         heroLinks.forEach(l => l.classList.remove('active'));
         link.classList.add('active');
      });
   });

   return heroSwiper;
}


/*==========================================================================
Upload file
============================================================================*/
function initFileUploadLabels(selector = '.upload-file') {
   const labels = document.querySelectorAll(selector);

   labels.forEach(label => {
      const input = label.querySelector('input[type="file"]');
      const text = label.querySelector('.upload-file__text');

      if (!input || !text) return;

      const defaultText = text.textContent;

      input.addEventListener('change', () => {
         if (input.files && input.files.length > 0) {
            text.textContent = input.files[0].name;
            label.classList.add('is-file-selected');
         } else {
            text.textContent = defaultText;
            label.classList.remove('is-file-selected');
         }
      });
   });
}


/*==========================================================================
Products slider
============================================================================*/
function initProductsCarousel() {
   const sliders = document.querySelectorAll('.carousel');

   if (!sliders.length) return;

   sliders.forEach((carousel) => {
      const sliderEl = carousel.querySelector('.carousel__slider');
      const paginationEl = carousel.querySelector('.carousel__slider-pagination');
      const prevEl = carousel.querySelector('.carousel__slider-prev');
      const nextEl = carousel.querySelector('.carousel__slider-next');

      if (!sliderEl) return;

      new Swiper(sliderEl, {
         slidesPerView: 4,
         loop: false,
         spaceBetween: 8,
         pagination: {
            el: paginationEl,
            clickable: true,
         },
         navigation: {
            prevEl,
            nextEl,
         },
         breakpoints: {
            320: {
               slidesPerView: 1.1,
            },
            480: {
               slidesPerView: 2,
            },
            768: {
               slidesPerView: 3,
            },
            1100: {
               slidesPerView: 4,
            }
         }
      });
   });
}


/*==========================================================================
Review
============================================================================*/
function initReviewsLogic(swiper = null) {
   const reviews = document.querySelectorAll('.review');

   reviews.forEach(review => {
      const textWrapper = review.querySelector('.review__text-wrapper');
      const toggleBtn = review.querySelector('.review__text-toggle');

      if (textWrapper && toggleBtn && !toggleBtn.dataset.inited) {
         const MAX_HEIGHT = 162;
         const fullHeight = textWrapper.scrollHeight;

         if (fullHeight > MAX_HEIGHT) {
            textWrapper.style.setProperty('--max-height', MAX_HEIGHT + 'px');
            textWrapper.style.setProperty('--full-height', fullHeight + 'px');
            textWrapper.classList.add('is-collapsed');
            toggleBtn.style.display = 'block';

            toggleBtn.addEventListener('click', () => {
               const isOpen = textWrapper.classList.toggle('is-open');

               toggleBtn.textContent = isOpen
                  ? 'Скрыть'
                  : 'Читать полностью';
            });

            toggleBtn.dataset.inited = 'true';
         } else {
            toggleBtn.style.display = 'none';
         }
      }

      const photo = review.querySelector('.review__author-photo');
      const name = review.querySelector('.review__author-name');

      if (photo && name && !photo.dataset.inited) {
         const hasImage = photo.querySelector('img');

         if (!hasImage) {
            const firstLetter = name.textContent.trim().charAt(0).toUpperCase();
            photo.textContent = firstLetter;
            photo.classList.add('review__author-photo--letter');
         }

         photo.dataset.inited = 'true';
      }
   });
}



/*==========================================================================
Reviews slider
============================================================================*/
function initReviewsSlider() {
   const reviewsSlider = document.querySelector('.reviews__slider');
   if (!reviewsSlider) return null;

   const reviewsSwiper = new Swiper(reviewsSlider, {
      slidesPerView: 'auto',
      loop: false,
      spaceBetween: 8,
      autoHeight: false,
      pagination: {
         el: '.reviews__slider-pagination',
         clickable: true,
      },

      navigation: {
         prevEl: '.reviews__slider-prev',
         nextEl: '.reviews__slider-next',
      },

      on: {
         init(swiper) {
            initReviewsLogic(swiper);
         },
         slideChange(swiper) {
            initReviewsLogic(swiper);
         }
      }
   });

   return reviewsSwiper;
}

/*==========================================================================
faq
============================================================================*/
function initFaqAccordion() {
   const faqItems = document.querySelectorAll('.faq__item');
   if (!faqItems.length) return;

   faqItems.forEach(item => {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');

      if (!question || !answer || item.dataset.inited) return;

      question.addEventListener('click', () => {
         const isActive = item.classList.contains('active');

         faqItems.forEach(el => {
            const elAnswer = el.querySelector('.faq__answer');
            if (!elAnswer) return;

            el.classList.remove('active');
            elAnswer.style.maxHeight = null;
         });

         if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
         }
      });

      item.dataset.inited = 'true';
   });
}

/*==========================================================================
Partners slider
============================================================================*/
function initPartnersCarousel() {
   const partnersSlider = document.querySelector(".partners__slider");

   if (!partnersSlider) return null;

   const partnersSwiper = new Swiper(partnersSlider, {
      slidesPerView: 'auto',
      loop: true,
      speed: 800,
      spaceBetween: 8,
      pagination: {
         el: ".partners__slider-pagination",
         clickable: true,
      },
      navigation: {
         prevEl: '.partners__slider-prev',
         nextEl: '.partners__slider-next',
      },
      autoplay: {
         delay: 1000,
         disableOnInteraction: false,
         pauseOnMouseEnter: false,
      },
   });

   return partnersSwiper;
}


/*==========================================================================
Range slider
============================================================================*/
function formatPrice(value) {
   return `${Number(value).toLocaleString('ru-RU')} ₽`;
}

function parsePrice(value) {
   return Number(value.replace(/[^\d]/g, ''));
}

function clamp(value, min, max) {
   return Math.min(Math.max(value, min), max);
}

function allowOnlyNumbers(input) {
   input.addEventListener('input', () => {
      input.value = input.value.replace(/[^\d]/g, '');
   });
}

function initRangeSliders() {
   const ranges = document.querySelectorAll('.filter__range');

   ranges.forEach(range => {
      const track = range.querySelector('.filter__range-track');
      const inputMin = range.querySelector('.filter__range-input.-min input');
      const inputMax = range.querySelector('.filter__range-input.-max input');

      const min = Number(range.dataset.min);
      const max = Number(range.dataset.max);
      const startMin = Number(range.dataset.startMin);
      const startMax = Number(range.dataset.startMax);

      noUiSlider.create(track, {
         start: [startMin, startMax],
         connect: true,
         range: { min, max },
         step: 1,
         format: {
            to: value => Math.round(value),
            from: value => Number(value)
         }
      });

      /* slider → inputs */
      track.noUiSlider.on('update', values => {
         inputMin.value = formatPrice(values[0]);
         inputMax.value = formatPrice(values[1]);
      });

      /* запрет букв */
      allowOnlyNumbers(inputMin);
      allowOnlyNumbers(inputMax);

      /* UX: убираем ₽ при фокусе */
      [inputMin, inputMax].forEach(input => {
         input.addEventListener('focus', () => {
            input.value = parsePrice(input.value);
         });

         input.addEventListener('blur', () => {
            let value = parsePrice(input.value);
            value = clamp(value, min, max);
            input.value = formatPrice(value);
         });
      });

      /* inputs → slider */
      inputMin.addEventListener('change', () => {
         track.noUiSlider.set([parsePrice(inputMin.value), null]);
      });

      inputMax.addEventListener('change', () => {
         track.noUiSlider.set([null, parsePrice(inputMax.value)]);
      });
   });
}


/*========================================================================== 
Accordion
============================================================================*/
function initFilterAccordions() {
   const accordions = document.querySelectorAll('.filter__accordion');
   if (!accordions.length) return;

   const isMobile = window.matchMedia('(max-width: 1200px)').matches;

   accordions.forEach(accordion => {
      const head = accordion.querySelector('.filter__accordion-name');
      const body = accordion.querySelector('.filter__accordion-body');

      if (!head || !body) return;

      const openAccordion = () => {
         accordion.classList.add('is-open');
         body.style.maxHeight = `${body.scrollHeight}px`;
      };

      const closeAccordion = () => {
         accordion.classList.remove('is-open');
         body.style.maxHeight = '0px';
      };

      if (isMobile) {
         closeAccordion();
      } else {
         openAccordion();
      }

      head.addEventListener('click', () => {
         accordion.classList.contains('is-open')
            ? closeAccordion()
            : openAccordion();
      });
   });
}


/*========================================================================== 
Reset filter
============================================================================*/
function initFilterReset() {
   const filterForm = document.querySelector('.filter__form');
   if (!filterForm) return;

   const resetBtn = filterForm.querySelector('.-reset');
   if (!resetBtn) return;

   resetBtn.addEventListener('click', (e) => {
      e.preventDefault();

      filterForm.querySelectorAll('input, select, textarea').forEach(el => {
         if (el.type === 'checkbox' || el.type === 'radio') {
            el.checked = false;
         } else if (el.tagName === 'SELECT') {
            el.selectedIndex = 0;
         } else {
            el.value = '';
         }
      });

      filterForm
         .querySelectorAll('.filter__accordion-reset')
         .forEach(btn => btn.style.display = 'none');
   });
}


/*========================================================================== 
Reset group
============================================================================*/
function initAccordionGroupReset() {
   const accordions = document.querySelectorAll('.filter__accordion');
   if (!accordions.length) return;

   accordions.forEach(accordion => {
      const resetBtn = accordion.querySelector('.filter__accordion-reset');
      const body = accordion.querySelector('.filter__accordion-body');

      if (!resetBtn || !body) return;

      const inputs = body.querySelectorAll('input, select, textarea');
      if (!inputs.length) return;

      const hasActiveValues = () => {
         return [...inputs].some(el => {
            if (el.type === 'checkbox' || el.type === 'radio') {
               return el.checked;
            }
            return el.value && el.value.trim() !== '';
         });
      };

      const toggleResetButton = () => {
         resetBtn.style.display = hasActiveValues() ? 'block' : 'none';
      };

      toggleResetButton();

      inputs.forEach(el => {
         el.addEventListener('change', toggleResetButton);
         el.addEventListener('input', toggleResetButton);
      });

      resetBtn.addEventListener('click', (e) => {
         e.preventDefault();

         inputs.forEach(el => {
            if (el.type === 'checkbox' || el.type === 'radio') {
               el.checked = false;
            } else if (el.tagName === 'SELECT') {
               el.selectedIndex = 0;
            } else {
               el.value = '';
            }
         });

         toggleResetButton();
      });
   });
}

/*==========================================================================
Sorting dropdown
============================================================================*/
function initSortingDropdowns() {
   const sortings = document.querySelectorAll('.sorting');

   if (!sortings.length) return;

   sortings.forEach(sorting => {
      const button = sorting.querySelector('.sorting__button');
      const menu = sorting.querySelector('.sorting__menu');

      if (!button || !menu) return;

      button.addEventListener('click', e => {
         e.stopPropagation();

         const isOpen = button.classList.contains('active');

         closeAllSortings();

         if (!isOpen) {
            button.classList.add('active');
            menu.classList.add('show');
         }
      });
   });

   document.addEventListener('click', () => {
      closeAllSortings();
   });

   function closeAllSortings() {
      sortings.forEach(sorting => {
         sorting.querySelector('.sorting__button')?.classList.remove('active');
         sorting.querySelector('.sorting__menu')?.classList.remove('show');
      });
   }
}

/*==========================================================================
Filter aside
============================================================================*/
function initCatalogAside() {
   const toggle = document.querySelector('.filter-toggle');
   const aside = document.querySelector('.catalog__aside');
   const closeBtn = aside?.querySelector('.aside__close');

   if (!toggle || !aside) return;

   let scrollPosition = 0;

   toggle.addEventListener('click', e => {
      e.stopPropagation();
      openAside();
   });

   closeBtn?.addEventListener('click', e => {
      e.stopPropagation();
      closeAside();
   });

   document.addEventListener('click', e => {
      if (aside.classList.contains('show') && !aside.contains(e.target)) {
         closeAside();
      }
   });

   function openAside() {
      aside.classList.add('show');
      document.body.style.overflow = 'hidden';
   }

   function closeAside() {
      aside.classList.remove('show');
      document.body.style.overflow = 'unset';
   }
}


/*==========================================================================
Product sliders
============================================================================*/
const productGallerySliderthumbs = document.querySelector('.product__gallery-slider-thumbs');
const productGallerySliderBig = document.querySelector('.product__gallery-slider-big');

if (productGallerySliderthumbs && productGallerySliderBig) {

   const productSwiperThumbs = new Swiper(productGallerySliderthumbs, {
      direction: 'horizontal',
      spaceBetween: 10,
      slidesPerView: 'auto',
   });

   const productSwiperBig = new Swiper(productGallerySliderBig, {
      direction: 'horizontal',
      spaceBetween: 0,
      slidesPerView: 1,
      pagination: {
         el: '.product__gallery-pagination',
         clickable: true,
      },
      thumbs: {
         swiper: productSwiperThumbs,
      }
   });
}

/*==========================================================================
Zoom product photo
============================================================================*/
function initProductZoom() {
   const gallery = document.querySelector('.product__gallery-slider-big');
   if (!gallery) return;

   gallery.addEventListener('mousemove', (e) => {
      const activeSlide = gallery.querySelector('.swiper-slide-active');
      if (!activeSlide) return;

      const lens = activeSlide.querySelector('.zoom-lens');
      const result = activeSlide.querySelector('.zoom-result');
      const resultImg = result?.querySelector('img');

      if (!lens || !result || !resultImg) return;

      const rect = activeSlide.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      lens.style.display = 'block';
      result.style.display = 'block';

      let lensX = x - lens.offsetWidth / 2;
      let lensY = y - lens.offsetHeight / 2;

      lensX = Math.max(0, Math.min(lensX, rect.width - lens.offsetWidth));
      lensY = Math.max(0, Math.min(lensY, rect.height - lens.offsetHeight));

      lens.style.left = lensX + 'px';
      lens.style.top = lensY + 'px';

      const scale = 2;
      let imgX = -lensX * scale;
      let imgY = -lensY * scale;

      const imgWidth = resultImg.offsetWidth;
      const imgHeight = resultImg.offsetHeight;

      const maxX = 0;
      const minX = result.offsetWidth - imgWidth;
      imgX = Math.max(minX, Math.min(imgX, maxX));

      const maxY = 0;
      const minY = result.offsetHeight - imgHeight;
      imgY = Math.max(minY, Math.min(imgY, maxY));

      resultImg.style.left = imgX + 'px';
      resultImg.style.top = imgY + 'px';
   });

   gallery.addEventListener('mouseleave', () => {
      const activeSlide = gallery.querySelector('.swiper-slide-active');
      if (!activeSlide) return;

      const lens = activeSlide.querySelector('.zoom-lens');
      const result = activeSlide.querySelector('.zoom-result');

      if (!lens || !result) return;

      lens.style.display = 'none';
      result.style.display = 'none';
   });
}

/*==========================================================================
Quantity
============================================================================*/
function initQuantityCounters() {
   const quantities = document.querySelectorAll('.quantity');
   if (!quantities.length) return;

   quantities.forEach(quantity => {
      const minusBtn = quantity.querySelector('.quantity__minus');
      const plusBtn = quantity.querySelector('.quantity__plus');
      const input = quantity.querySelector('.quantity__input');

      if (!minusBtn || !plusBtn || !input) return;

      const min = parseInt(quantity.dataset.min ?? 1, 10);
      const max = parseInt(quantity.dataset.max ?? Infinity, 10);
      const step = parseInt(quantity.dataset.step ?? 1, 10);

      minusBtn.addEventListener('click', () => {
         let value = parseInt(input.value, 10) || min;
         value = Math.max(value - step, min);
         input.value = value;
         input.dispatchEvent(new Event('change'));
      });

      plusBtn.addEventListener('click', () => {
         let value = parseInt(input.value, 10) || min;
         value = Math.min(value + step, max);
         input.value = value;
         input.dispatchEvent(new Event('change'));
      });
   });
}



/*==========================================================================
init
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   initHeaderCatalog();
   initCatalogToggle();
   initHeaderAdaptiveMove();
   initHeaderSearch();
   initHeroSlider();
   initFileUploadLabels();
   initProductsCarousel();
   initReviewsSlider();
   initFaqAccordion();
   initPartnersCarousel();
   initFilterAccordions();
   initRangeSliders();
   initFilterReset();
   initAccordionGroupReset();
   initSortingDropdowns();
   initCatalogAside();
   initProductZoom();
   initQuantityCounters();
});


})();

/******/ })()
;