
(() => {
  
  const ensureJQuery = (callback) => {
    if (window.jQuery) return callback(window.jQuery);
    const script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    script.onload = () => callback(window.jQuery);
    document.head.appendChild(script);
  };

  ensureJQuery(($) => {
    
    const $productDetail = $(".product-detail");
    if (!$productDetail.length) return;

    
    const init = async () => {
      buildCSS();
      const products = await fetchProducts();
      const favorites = getFavorites();
      buildHTML(products, favorites);
      setEvents();
    };

   
    const buildHTML = (products, favorites) => {
      const $outer = $(`<div class="carousel-outer-wrapper"></div>`);
      const $container = $(`
        <div class="custom-carousel-container">
          <div style="position:relative;">
            <p class="custom-carousel-title">Benzer Ürünler</p>
            <button class="custom-carousel-arrow left" aria-label="Geri">
              <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="#29323b" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="custom-carousel-track"></div>
            <button class="custom-carousel-arrow right" aria-label="İleri">
              <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#29323b" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
      `);
      $outer.append($container);
      $(".carousel-outer-wrapper").remove();
      $productDetail.after($outer);

      const $track = $container.find(".custom-carousel-track");

      products.forEach((product) => {
        const isFav = favorites.includes(product.id);
        const $card = $(`
          <div class="custom-carousel-card" data-id="${product.id}">
            <div class="custom-carousel-fav${isFav ? " active" : ""}">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none">
                <path fill="${isFav ? "#193DB0" : "#fff"}" stroke="${isFav ? "none" : "#B6B7B9"}"
                  d="M19.97 6.449c-.277-3.041-2.429-5.247-5.123-5.247-1.794 0-3.437.965-4.362 2.513C9.57 2.147 7.993 1.2 6.228 1.2c-2.694 0-4.846 2.206-5.122 5.247-.022.135-.112.841.16 1.994.393 1.663 1.3 3.175 2.621 4.373l6.594 5.984 6.707-5.984c1.322-1.198 2.228-2.71 2.62-4.373.273-1.152.183-1.86.162-1.993z"
                ></path>
              </svg>
            </div>
            <img class="custom-carousel-img" src="${product.img}" alt="${product.name}" />
            <div class="custom-carousel-info">
              <a href="${product.url || "#"}" class="custom-carousel-name" style="text-decoration:none; color:inherit;">
                ${product.name}
              </a>
              <div class="custom-carousel-price">${product.price} TL</div>
            </div>
          </div>
        `);

        $track.append($card);
      });
    };

    
    const buildCSS = () => {
      const css = `
        <style id="custom-carousel-style">
          :root {
            --carousel-bg: #f4f5f7;
            --carousel-title-size: 32px;
            --carousel-title-color: #29323b;
            --carousel-card-width: 230px;
            --carousel-card-height: 370px;
            --carousel-img-height: 290px;
            --carousel-name-size: 14px;
            --carousel-name-color: #29323b;
            --carousel-price-size: 18px;
            --carousel-price-color: #193DB0;
            --carousel-arrow-size: 48px;
            --carousel-arrow-svg-size: 36px;
            --carousel-fav-size: 32px;
            --carousel-fav-active: #193DB0;
            --carousel-fav-passive: #fff;
            --carousel-fav-border: #afafafff;
          }
          *{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          .carousel-outer-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            background: var(--carousel-bg);
          }
          .custom-carousel-container {
            width: 80%;
            margin: 0 auto;
            background: var(--carousel-bg);
            padding: 40px 0;
            box-sizing: border-box;
          }
          .custom-carousel-title {
            font-size: var(--carousel-title-size);
            line-height: 43px;
            padding: 10px 0;
            font-weight: lighter;
            font-family: 'Open Sans', sans-serif !important;
            color: var(--carousel-title-color);
            text-align: left;
            padding-left: 30px;
          }
          .custom-carousel-track {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            scroll-behavior: smooth;
            padding: 0 30px;
            scrollbar-width: none;
          }
          .custom-carousel-track::-webkit-scrollbar {
            display: none;
          }
          .custom-carousel-card {
            min-width: var(--carousel-card-width);
            max-width: var(--carousel-card-width);
            height: var(--carousel-card-height);
            background: var(--carousel-bg);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
            transition: box-shadow 0.2s;
          }
          .custom-carousel-img {
            width: 100%;
            height: var(--carousel-img-height);
            object-fit: cover;
            background: var(--carousel-bg);
            display: block;
            cursor: pointer;
          }
          .custom-carousel-fav {
            position: absolute;
            top: 18px;
            right: 18px;
            width: var(--carousel-fav-size);
            height: var(--carousel-fav-size);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--carousel-fav-border);
            border-radius: 5%;
            background: #fff;
            z-index: 2;
            cursor: pointer;
            transition: color 0.2s;
          }
          .custom-carousel-fav.active svg path {
            fill: var(--carousel-fav-active) !important;
            stroke: none !important;
          }
          .custom-carousel-info {
            padding: 5px 10px;
            background: #fff;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .custom-carousel-name {
            font-family: 'Open Sans', sans-serif !important;
            font-size: var(--carousel-name-size) !important;
            color: var(--carousel-name-color);
            margin: 0 0 8px 0;
            line-height: 1.3;
            min-height: 44px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .custom-carousel-price {
            font-family: 'Open Sans', sans-serif !important;
            font-size: var(--carousel-price-size) !important;
            font-weight: 600;
            color: var(--carousel-price-color);
            margin: 0;
            letter-spacing: 0.5px;
          }
          .custom-carousel-arrow {
            color: var(--carousel-title-color);
            border: none;
            width: var(--carousel-arrow-size);
            height: var(--carousel-arrow-size);
            font-size: 0;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            z-index: 3;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .custom-carousel-arrow svg {
            width: var(--carousel-arrow-svg-size);
            height: var(--carousel-arrow-svg-size);
            display: block;
          }
          .custom-carousel-arrow.left { left: -50px; }
          .custom-carousel-arrow.right { right: -50px; }
          @media (max-width: 900px) {
            :root {
              --carousel-card-width: 180px;
              --carousel-card-height: 260px;
              --carousel-img-height: 120px;
              --carousel-name-size: 13px;
              --carousel-price-size: 16px;
            }
            .custom-carousel-info {
              padding: 8px 8px 10px 8px;
              min-height: unset;
            }
            .custom-carousel-name {
              min-height: 28px;
              margin-bottom: 4px;
            }
          }
          @media (max-width: 600px) {
            :root {
              --carousel-card-width: 120px;
              --carousel-card-height: 180px;
              --carousel-img-height: 80px;
              --carousel-name-size: 11px;
              --carousel-price-size: 13px;
            }
            .custom-carousel-track { gap: 10px; padding: 0 10px; }
            .custom-carousel-card {
              min-width: 120px;
              max-width: 120px;
              height: 180px;
            }
            .custom-carousel-img {
              height: 80px;
            }
            .custom-carousel-name {
              font-size: 11px !important;
              min-height: 24px;
            }
            .custom-carousel-price {
              font-size: 13px !important;
            }
          }
        </style>
      `;
      if (!$("#custom-carousel-style").length) $("head").append(css);
    };

    
    const setEvents = () => {
      
      $(".custom-carousel-fav").on("click", (e) => {
        e.stopPropagation();
        const $card = $(e.currentTarget).closest(".custom-carousel-card");
        const id = $card.data("id");
        let favs = getFavorites();
        const isFav = favs.includes(id);
        if (isFav) favs = favs.filter((f) => f !== id);
        else favs.push(id);
        setFavorites(favs);
        
        init();
      });

      
      $(".custom-carousel-card").on("click", (e) => {
        if ($(e.target).closest(".custom-carousel-fav").length) return;
        const id = $(e.currentTarget).data("id");
        const products = getProducts();
        const product = products.find((p) => p.id === id);
        if (product && product.url) window.location.href = product.url;
      });

      
      let scrollPos = 0;
      const scrollStep = 250;
      $(".custom-carousel-arrow.left").on("click", (e) => {
        const $track = $(e.currentTarget).siblings(".custom-carousel-track");
        scrollPos = Math.max(0, $track.scrollLeft() - scrollStep);
        $track.animate({ scrollLeft: scrollPos }, 300);
      });
      $(".custom-carousel-arrow.right").on("click", (e) => {
        const $track = $(e.currentTarget).siblings(".custom-carousel-track");
        scrollPos = Math.min(
          $track[0].scrollWidth,
          $track.scrollLeft() + scrollStep
        );
        $track.animate({ scrollLeft: scrollPos }, 300);
      });

      
      $(window).on("resize", () => {
        $(".custom-carousel-track").each(function () {
          scrollPos = $(this).scrollLeft();
        });
      });
    };

    const getFavorites = () => {
      try {
        return JSON.parse(localStorage.getItem("carouselFavorites") || "[]");
      } catch {
        return [];
      }
    };
    const setFavorites = (arr) => {
      localStorage.setItem("carouselFavorites", JSON.stringify(arr));
    };

    const getProducts = () => {
      try {
        return JSON.parse(localStorage.getItem("carouselProducts") || "[]");
      } catch {
        return [];
      }
    };
    const setProducts = (arr) => {
      localStorage.setItem("carouselProducts", JSON.stringify(arr));
    };

    const fetchProducts = async () => {
      let products = getProducts();
      if (products.length) return products;
      try {
        const res = await fetch(
          "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json"
        );
        products = await res.json();
        setProducts(products);
        return products;
      } catch {
        return [];
      }
    };

    
    init();
  });
})();
