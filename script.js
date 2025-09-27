// Menu data
const menus = [
  { id: "page2", title: "Soups / Salads / Hot Bites", img: "menu2.jpg", desc: "Light starters and appetizers" },
  { id: "page3", title: "Egg & Chicken Corner", img: "menu3.jpg", desc: "Chicken, egg-based meals" },
  { id: "page4", title: "Fish & Pork", img: "menu4.jpg", desc: "Seafood & pork specials" },
  { id: "page5", title: "Beef & Mutton", img: "menu5.jpg", desc: "Tender beef and mutton dishes" },
  { id: "page6", title: "Prawns / Cuttlefish / Crab", img: "menu6.jpg", desc: "Seafood delicacies" },
  { id: "page7", title: "Chopsuey & Rice", img: "menu7.jpg", desc: "Chinese-inspired dishes" },
  { id: "page8", title: "Kottu / Noodles", img: "menu8.jpg", desc: "Sri Lankan kottu and noodles" },
  { id: "page9", title: "Chopsuey Rice / Noodles", img: "menu9.jpg", desc: "Fusion rice and noodles" },
  { id: "page10", title: "Desserts", img: "menu10.jpg", desc: "Sweet treats" },
  { id: "page11", title: "Beverages", img: "menu11.jpg", desc: "Drinks and refreshments" }
];

// DOM Elements
const gallery = document.getElementById("gallery");
const resultsCount = document.getElementById("resultsCount");
const showAllBtn = document.getElementById("showAll");
const filterBtns = document.querySelectorAll(".filter-btn");
const filterInput = document.getElementById("filterInput");

// Sidebar
const sideMenu = document.getElementById("sideMenu");
const hamburger = document.getElementById("hamburger");
const closeMenu = document.getElementById("closeMenu");

// Viewer
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");
const viewerTitle = document.getElementById("viewerTitle");
const viewerClose = document.getElementById("viewerClose");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentFilter = "all";
let filteredMenus = menus;
let currentIndex = 0;

/* ------------------------
   RENDER GALLERY
------------------------- */
function renderGallery() {
  gallery.innerHTML = "";
  filteredMenus.forEach((menu, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    card.innerHTML = `
      <img src="${menu.img}" alt="${menu.title}">
      <h4>${menu.title}</h4>
      <p>${menu.desc}</p>
    `;
    card.addEventListener("click", () => openViewer(index));
    gallery.appendChild(card);
  });

  resultsCount.textContent =
    currentFilter === "all"
      ? `Showing: All Menus`
      : `Showing: ${filteredMenus.length} item(s)`;
}

/* ------------------------
   FILTER HANDLING
------------------------- */
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;

    if (currentFilter === "all") {
      filteredMenus = menus;
    } else {
      filteredMenus = menus.filter(m => m.id === currentFilter);
    }
    renderGallery();
    closeSidebar();
  });
});

filterInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  filteredMenus = menus.filter(m => m.title.toLowerCase().includes(term));
  renderGallery();
});

showAllBtn.addEventListener("click", () => {
  currentFilter = "all";
  filteredMenus = menus;
  filterBtns.forEach(b => b.classList.remove("active"));
  document.querySelector("[data-filter='all']").classList.add("active");
  filterInput.value = "";
  renderGallery();
});

/* ------------------------
   SIDEBAR TOGGLE
------------------------- */
function openSidebar() {
  sideMenu.classList.add("open");
  sideMenu.setAttribute("aria-hidden", "false");
  hamburger.setAttribute("aria-expanded", "true");
}
function closeSidebar() {
  sideMenu.classList.remove("open");
  sideMenu.setAttribute("aria-hidden", "true");
  hamburger.setAttribute("aria-expanded", "false");
}
hamburger.addEventListener("click", openSidebar);
closeMenu.addEventListener("click", closeSidebar);

/* ------------------------
   VIEWER HANDLING
------------------------- */
function openViewer(index) {
  currentIndex = index;
  const menu = filteredMenus[index];
  viewerImg.src = menu.img;
  viewerTitle.textContent = menu.title;
  viewer.classList.add("open");
  viewer.setAttribute("aria-hidden", "false");
}

function closeViewer() {
  viewer.classList.remove("open");
  viewer.setAttribute("aria-hidden", "true");
}

viewerClose.addEventListener("click", closeViewer);

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + filteredMenus.length) % filteredMenus.length;
  openViewer(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % filteredMenus.length;
  openViewer(currentIndex);
});

// Close viewer when clicking background
viewer.addEventListener("click", e => {
  if (e.target === viewer) closeViewer();
});

/* ------------------------
   INIT
------------------------- */
renderGallery();


