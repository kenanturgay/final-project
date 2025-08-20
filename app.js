((self) => {
  "use strict";

  const CONFIG = {
    API: {
      URL: "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json",
      TIMEOUT: 5000,
    },

    CURRENCY: {
      UNIT: "TL",
      POSITION: "suffix",
    },
    PRODUCTS: {
      SHOW_PRODUCT_DESKTOP: 10,
      SHOW_PRODUCT_MOBILE: 8,
    },
    SELECTORS: {
      APPEND_LOCATION: ".product-detail",
    },
    TEXTS: {
      TITLE: "İlgini Çekebilecek Diğer Ürünler",
      CART_BUTTON: "Sepete Ekle",
      MODAL_TEXT:
        "Bu sayfada satın alma verilerine göre ürün detayına gidilen ürün ile birlikte beden bulunurluğu yüksek olan seçili kategori ve ürün tipinde en sık satın alınan LCW markalı ürünler öncelikli olarak gösterilir.",
      MODAL_BUTTON: "TAMAM",
      ALREADY_IN_CART: "Ürün zaten sepetinizde bulunmaktadır.",
      ADDED_TO_CART: "Ürün sepetinize eklendi.",
    },
    ERRORS: {
      WRONG_DOMAIN: "Bu kod sadece https://www.lcw.com sitesinde çalışır.",
      WRONG_PAGE:
        "Bu kod sadece ürün sayfalarında çalışır. Sayfada .product-detail elementi bulunamadı.",
      NETWORK_ERROR: "Network response was not ok",
      FETCH_ERROR: "Error fetching data:",
      LOCALSTORAGE_ERROR: "localStorage parse error:",
    },
    STORAGE_KEYS: {
      PRODUCTS: "insProducts",
      FAVORITES: "insFavorites",
      CART: "insCart",
    },
    OFF_EVENTS: [
      ".favoritesEvent",
      ".prevEvent",
      ".nextEvent",
      ".cartEvent",
      ".productCardEvent",
      ".modalEvent",
      ".dragEvent",
    ],
  };

  const classes = {
    style: "ins-carousel-style",
    productRecom: "ins-product-recommendations",
    carouselContainer: "ins-carousel-container",
    titleContainer: "ins-title-container",
    title: "ins-title",
    info: "ins-title-info",
    carousel: "ins-carousel",
    previousBtn: "ins-prev-btn",
    carouselSlider: "ins-carousel-slider",
    nextBtn: "ins-next-btn",
    productCardWrapper: "ins-product-card-wrapper",
    productCard: "ins-product-card",
    imgWrapper: "ins-img-wrapper",
    productImg: "ins-product-img",
    favorite: "ins-favorite",
    favoriteOn: "ins-fav-on",
    favoriteOff: "ins-fav-off",
    productInfo: "ins-product-info",
    productName: "ins-product-name",
    productPrice: "ins-product-price",
    productLink: "ins-product-link",
    oldPrice: "ins-old-price",
    currentPrice: "ins-current-price",
    carouselWrapper: "ins-carousel-wrapper",
    dragging: "ins-dragging",
    cartBtnWrapper: "ins-cart-btn-wrapper",
    cartBtn: "ins-cart-btn",
    modal: "ins-modal",
    modalOverlay: "ins-modal-overlay",
    modalContent: "ins-modal-content",
    modalIcon: "ins-modal-icon",
    modalText: "ins-modal-text",
    modalButton: "ins-modal-button",
    hidden: "ins-hidden",
    visible: "ins-visible",
    show: "ins-show",
  };

  self.init = () => {
    self.reset();

    if (window.location.hostname !== "www.lcw.com") {
      console.error(CONFIG.ERRORS.WRONG_DOMAIN);
      return;
    }

    if (!document.querySelector(".product-detail")) {
      console.error(CONFIG.ERRORS.WRONG_PAGE);
      return;
    }

    if (typeof window.jQuery === "undefined") {
      self.loadJQuery();
    } else {
      self.hasMoved = false;
      self.buildCSS();
      self.buildHTML();
      self.checkAndLoadData();
      self.setEvents();
      self.enableMouseDragScroll($(selectors.carouselWrapper));
    }
  };

  self.reset = () => {
    $(selectors.style).remove();
    $(selectors.productRecom).remove();
    CONFIG.OFF_EVENTS.forEach((event) => {
      $(event).off();
    });
  };

  self.buildCSS = () => {};

  self.buildHTML = () => {};

  self.saveToLocalStorage = (key, value) => {};

  self.getFromLocalStorage = () => {};

  self.fetchData = () => {};

  self.renderProducts = () => {};

  self.setEvents = () => {};

  self.enableMouseDragScroll = () => {};

  $(document).ready(self.init);
})({});
