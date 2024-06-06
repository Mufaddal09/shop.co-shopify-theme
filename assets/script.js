$(document).ready(function () {
  // Global
  $(window).scroll(function () {
    if ($(window).scrollTop()) {
      $(".header-wrap").addClass("sticky-header");
    } else {
      $(".header-wrap").removeClass("sticky-header");
    }
  });

  //Brand Swiper
  let logoSwiper = new Swiper(".logoSwiper", {
    slidesPerView: "8",
    spaceBetween: 50,
    loop: true,
    centeredSlides: true,
    speed: 3000,
    autoplay: { delay: 1, disableOnInteraction: false },
    noSwiping: true,
    allowTouchMove: false,
    a11y: false,
    breakpoints: {
      1024: { slidesPerView: "6", spaceBetween: 40 },
      375: { slidesPerView: "4", spaceBetween: 40 },
      320: { slidesPerView: "4", spaceBetween: 40 },
    },
  });

  //Client Testimonial Swiper
  let clientsTestimonials = new Swiper(".client-testimonials-swiper-wrap", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".testimonial-button-next",
      prevEl: ".testimonial-button-prev",
    },
    breakpoints: {
      1024: { slidesPerView: "3", spaceBetween: 20 },
      425: { slidesPerView: "2", spaceBetween: 20 },
      320: { slidesPerView: "1", spaceBetween: 20 },
    },
  });

  // About Page Swiper
  let reviewSlider = new Swiper(".about-slider", {
    slidesPerView: 2,
    spaceBetween: 0,
    loop: false,
    navigation: {
      nextEl: ".about-slider-button-next",
      prevEl: ".about-slider-button-prev",
    },
    breakpoints: {
      1024: { slidesPerView: "2", spaceBetween: 20 },
      760: { slidesPerView: "2", spaceBetween: 20 },
      426: { slidesPerView: "1", spaceBetween: -60 },
      425: { slidesPerView: "1", spaceBetween: -60 },
      320: { slidesPerView: "1", spaceBetween: -40 },
    },
  });

  //Product Gallery Swiper
  const sliderThumbs = new Swiper(".slider__thumbs .swiper-container", {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 14,
    navigation: {
      nextEl: ".slider__next",
      prevEl: ".slider__prev",
    },
    freeMode: true,
    breakpoints: {
      0: {
        direction: "horizontal",
      },
      768: {
        direction: "vertical",
      },
    },
  });

  const sliderImages = new Swiper(".slider__images .swiper-container", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 14,
    navigation: {
      nextEl: ".slider__next",
      prevEl: ".slider__prev",
    },
    grabCursor: true,
    thumbs: {
      swiper: sliderThumbs,
    },
    breakpoints: {
      0: {
        direction: "horizontal",
      },
      768: {
        direction: "vertical",
      },
    },
  });

  AOS.init({
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    offset: 100, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 600, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
  });

  //Cart
  let cartRedirect = document.getElementById("cartDrawer");
  cartRedirect.addEventListener("click", function () {
    window.location.href = "cart.html";
  });
  let accountLogin = document.getElementById("accountLogin");
  accountLogin.addEventListener("click", function () {
    window.location.href = "login.html";
  });

  //input field label
  const formFields = document.querySelectorAll(".form-field");

  formFields.forEach((formField) => {
    const inputField = formField.querySelector("input, textarea");
    const inputLabel = formField.querySelector("label");

    inputField.addEventListener("input", () => {
      if (inputField.value !== "") {
        inputLabel.classList.add("label--float");
      } else {
        inputLabel.classList.remove("label--float");
      }
    });
  });
});
//Quantity Selector
document.addEventListener("DOMContentLoaded", function () {
  const decreaseBtns = document.querySelectorAll(".decrease-btn");
  const increaseBtns = document.querySelectorAll(".increase-btn");
  const quantityInputs = document.querySelectorAll(".quantity-input");

  decreaseBtns.forEach((decreaseBtn, index) => {
    decreaseBtn.addEventListener("click", () => {
      let value = parseInt(quantityInputs[index].value);
      if (value > 1) {
        value--;
        quantityInputs[index].value = value;
      }
    });
  });
  increaseBtns.forEach((increaseBtn, index) => {
    increaseBtn.addEventListener("click", () => {
      let value = parseInt(quantityInputs[index].value);
      value++;
      quantityInputs[index].value = value;
    });
  });
});
//Empty Cart
document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("productList");
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const li = button.closest("li");
      const productId = li.dataset.productId;
      li.classList.add("removing");

      const loader = createLoader();
      document.body.appendChild(loader);

      setTimeout(() => {
        li.remove();

        if (productList.children.length === 0) {
          const cartWrap = document.querySelector(".cart-wrap .container");
          cartWrap.innerHTML = `
            <div class="section-title continue-shopping flex flex-col align-center justify-center">
              <h3 class="uppercase">Your Cart is Empty</h3>
              <a class="animated-link" href="index.html">Continue Shopping</a>
            </div>`;
        }

        loader.remove();
        const removedProducts =
          JSON.parse(localStorage.getItem("removedProducts")) || [];
        removedProducts.push(productId);
        localStorage.setItem(
          "removedProducts",
          JSON.stringify(removedProducts)
        );
      }, 500);
    });
  });
  const removedProducts =
    JSON.parse(localStorage.getItem("removedProducts")) || [];
  removedProducts.forEach((productId) => {
    const liToRemove = productList.querySelector(
      `li[data-product-id="${productId}"]`
    );
    if (liToRemove) {
      liToRemove.remove();
    }
  });
  window.addEventListener("beforeunload", function () {
    localStorage.removeItem("removedProducts");
  });

  function createLoader() {
    const stack = document.createElement("div");
    stack.classList.add("stack");
    const blobs = document.createElement("div");
    blobs.classList.add("blobs");
    stack.appendChild(blobs);
    for (let i = 0; i < 4; i++) {
      const blob = document.createElement("span");
      blob.classList.add("blob");
      blobs.appendChild(blob);
    }
    return stack;
  }
});
//Forgot Password Switcher
document.addEventListener("DOMContentLoaded", function () {
  const forgotBtn = document.getElementById("forgotBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const loginWrap = document.querySelector(".login-wrap");
  const forgotPassWrap = document.querySelector(".forgot-pass-wrap");

  forgotBtn.addEventListener("click", () => {
    loginWrap.classList.add("hidden");
    forgotPassWrap.classList.remove("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    loginWrap.classList.remove("hidden");
    forgotPassWrap.classList.add("hidden");
  });
});

//Price Range Slider
const onInput = (parent, e) => {
  const slides = parent.querySelectorAll("input");
  const min = parseFloat(slides[0].min);
  const max = parseFloat(slides[0].max);

  let slide1 = parseFloat(slides[0].value);
  let slide2 = parseFloat(slides[1].value);

  const percentageMin = (slide1 / (max - min)) * 100;
  const percentageMax = (slide2 / (max - min)) * 100;

  parent.style.setProperty("--range-slider-value-low", percentageMin);
  parent.style.setProperty("--range-slider-value-high", percentageMax);

  if (slide1 > slide2) {
    const tmp = slide2;
    slide2 = slide1;
    slide1 = tmp;

    if (e?.currentTarget === slides[0]) {
      slides[0].insertAdjacentElement("beforebegin", slides[1]);
    } else {
      slides[1].insertAdjacentElement("afterend", slides[0]);
    }
  }

  parent
    .querySelector(".range-slider__display")
    .setAttribute("data-low", `$${slide1}`);
  parent
    .querySelector(".range-slider__display")
    .setAttribute("data-high", `$${slide2}`);
};

addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll(".range-slider").forEach((range) =>
    range.querySelectorAll("input").forEach((input) => {
      if (input.type === "range") {
        input.oninput = (e) => onInput(range, e);
        onInput(range);
      }
    })
  );
});

//Color,Size and Category Filter
document.addEventListener("DOMContentLoaded", function () {
  const filters = [
    {
      selector: ".color-filter-link",
      filterClass: ".color-filter",
      checkboxClass: ".color-checkbox",
    },
    {
      selector: ".size-filter-link",
      filterClass: ".size-filter",
      checkboxClass: ".size-checkbox",
    },
    {
      selector: ".category-filter-link",
      filterClass: ".category-filter",
      checkboxClass: ".category-checkbox",
    },
  ];

  filters.forEach((filter) => {
    const filterLinks = document.querySelectorAll(filter.selector);
    filterLinks.forEach((link) => {
      const span = link.querySelector(filter.filterClass);
      const checkbox = link.querySelector(filter.checkboxClass);

      span.addEventListener("click", (event) => {
        event.preventDefault();
        span.classList.toggle("current");
        checkbox.checked = !checkbox.checked;
        checkbox.checked
          ? checkbox.setAttribute("checked", "checked")
          : checkbox.removeAttribute("checked");
      });

      checkbox.addEventListener("change", () =>
        span.classList.toggle("current", checkbox.checked)
      );
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const products = [
    {
      selector: ".color-image-variant-link",
      productClass: ".color-image-variant",
      radioClass: ".color-image-radio",
    },
    {
      selector: ".size-variant-link",
      productClass: ".size-variant",
      radioClass: ".size-radio",
    },
    {
      selector: ".style-variant-link",
      productClass: ".style-variant",
      radioClass: ".style-radio",
    },
  ];

  products.forEach((product) => {
    const productLinks = document.querySelectorAll(product.selector);

    // Initialize the first radio button to be checked by default
    if (productLinks.length > 0) {
      const firstLink = productLinks[0];
      const firstRadio = firstLink.querySelector(product.radioClass);
      const firstSpan = firstLink.querySelector(product.productClass);

      firstRadio.checked = true; // Apply box-shadow to the default selected one
    }

    productLinks.forEach((link) => {
      const span = link.querySelector(product.productClass);
      const radio = link.querySelector(product.radioClass);

      span.addEventListener("click", (event) => {
        event.preventDefault();

        // Deselect all radio buttons in the same group
        const radioGroup = document.querySelectorAll(
          `${product.selector} ${product.radioClass}`
        );
        radioGroup.forEach((radioBtn) => {
          const radioSpan = radioBtn
            .closest(product.selector)
            .querySelector(product.productClass);
          radioBtn.checked = false; // Uncheck the radio button
        });

        // Select the clicked radio button
        radio.checked = true; // Apply box-shadow to the selected one
      });
    });
  });
});

$(".all-filters-body").show();
$(".all-filters-title").addClass("open");
$(document).on("click", ".all-filters-title", function () {
  $(this).next().slideToggle();
  $(this).toggleClass("open");
});

//Account Page
document.addEventListener("DOMContentLoaded", function () {
  const accountPageDiv = document.getElementById("header-wrap");

  // Add new address
  const addAddressBtn = document.getElementById("addAddressNewForm");
  const cancelBtn = document.getElementById("cancelAddressNewBtn");
  const addressForm = document.getElementById("AddressNewForm");

  addAddressBtn.addEventListener("click", () =>
    addressForm.classList.toggle("hidden")
  );
  cancelBtn.addEventListener("click", () => {
    addressForm.classList.add("hidden");
    accountPageDiv.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Edit existing address
  const editAddressBtns = document.querySelectorAll("[id^='editAddressBtn']");
  const cancelEditAddressBtns = document.querySelectorAll(
    "[id^='cancelEditAddressBtn']"
  );
  const editAddressForms = document.querySelectorAll("[id^='editAddressForm']");

  editAddressBtns.forEach((editAddressBtn, index) => {
    editAddressBtn.addEventListener("click", () =>
      editAddressForms[index].classList.toggle("hidden")
    );

    cancelEditAddressBtns[index].addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission
      editAddressForms[index].classList.add("hidden");
      accountPageDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});

// $(".account-sidebar-lists").hide();
$(".account-title").removeClass("open");
$(document).on("click", ".account-title", function () {
  $(this).next().slideToggle();
  $(this).toggleClass("open");
});
//Filter Drawer
$(document).ready(function () {
  $(".filter-button, .all-filters-header .icon").click(function () {
    $("#filter-drawer").slideToggle(); // Toggle visibility of the drawer on button click
    $("body").toggleClass("no-scroll"); // Toggle no-scroll class on body to prevent background scrolling
    $("#overlay").toggle(); // Toggle overlay to show shadow effect
  });
});

//Mega Menu
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item, index) => {
    item.addEventListener("mouseenter", function () {
      const contentItems = document.querySelectorAll(".header-dropdown");
      contentItems.forEach((contentItem, contentIndex) => {
        if (index === contentIndex) {
          contentItem.classList.add("is-visible");
        } else {
          contentItem.classList.remove("is-visible");
        }
      });
    });

    item.addEventListener("mouseleave", function () {
      const contentItems = document.querySelectorAll(".header-dropdown");
      contentItems.forEach((contentItem) => {
        contentItem.classList.remove("is-visible");
      });
    });
  });
});
