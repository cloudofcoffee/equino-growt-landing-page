document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});

const desktopCards = document.querySelectorAll('.desktop-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const testimonios = [
  {
    texto: "Gracias a esta aplicacion pude organizar mis sesiones y seguir mi progreso. Me siento mucho más seguro y acompañado en cada paso.",
    nombre: "Martín Ruiz",
    rol: "Paciente",
    imagen: "img/Paciente.png", // Colocá aquí la ruta real
    estrellas: 5
  },
  {
    texto: "Una excelente herramienta para organizar terapias y dar seguimiento a cada paciente. Recomiendo su uso a todos los profesionales del área.",
    nombre: "Laura Lopez",
    rol: "Doctora",
    imagen: "img/Medica.png",
    estrellas: 4
  },
  {
    texto: "La app nos ayudó a mantenernos conectados con los profesionales. Es una herramienta invaluable para nuestra familia.",
    nombre: "Sofía Benítez",
    rol: "Familiar",
    imagen: "img/Familiar.png",
    estrellas: 5
  }
];

let activeIndex = 1; // medio para escritorio
let mobileIndex = 0; // primero para mobile

// --- Funciones para escritorio (3 tarjetas) ---
function updateDesktopCards() {
  desktopCards.forEach((card, index) => {
    card.classList.remove('scale-100', 'opacity-100', 'z-10');
    card.classList.add('scale-90', 'opacity-60', 'z-0');
    if (index === activeIndex) {
      card.classList.add('scale-100', 'opacity-100', 'z-10');
      card.classList.remove('scale-90', 'opacity-60', 'z-0');
    }
  });
}

function nextDesktop() {
  activeIndex = (activeIndex + 1) % desktopCards.length;
  updateDesktopCards();
}

function prevDesktop() {
  activeIndex = (activeIndex - 1 + desktopCards.length) % desktopCards.length;
  updateDesktopCards();
}

// --- Funciones para mobile (1 tarjeta) ---
const mobileCard = document.getElementById('mobileCard');
const mobileText = document.getElementById('mobileText');
const mobileName = document.getElementById('mobileName');
const mobileFoto = document.getElementById('mobileFoto');
const mobileRole = document.getElementById('mobileRole')
const mobilePrev = document.getElementById('mobilePrev');
const mobileNext = document.getElementById('mobileNext');

function updateMobileCard() {
  const current = testimonios[mobileIndex];
  mobileText.textContent = current.texto;
  mobileName.textContent = current.nombre;
  mobileRole.textContent = current.rol;
  mobileImage.src = current.imagen;

  // Generar estrellas
  mobileStars.innerHTML = ""; // limpiamos antes de agregar
  for (let i = 0; i < 5; i++) {
    const star = document.createElement("i");
    star.className = i < current.estrellas ? "fas fa-star text-xl" : "far fa-star text-xl";
    mobileStars.appendChild(star);
  }
}

function nextMobile() {
  mobileIndex = (mobileIndex + 1) % testimonios.length;
  updateMobileCard();
}

function prevMobile() {
  mobileIndex = (mobileIndex - 1 + testimonios.length) % testimonios.length;
  updateMobileCard();
}

// --- Inicialización ---
let desktopInterval = setInterval(() => {
  if (window.innerWidth >= 768) {
    nextDesktop();
  } else {
    nextMobile();
  }
}, 10000);

nextBtn.addEventListener('click', () => {
  clearInterval(desktopInterval);
  nextDesktop();
  desktopInterval = setInterval(() => {
    if (window.innerWidth >= 768) {
      nextDesktop();
    }
  }, 10000);
});

prevBtn.addEventListener('click', () => {
  clearInterval(desktopInterval);
  prevDesktop();
  desktopInterval = setInterval(() => {
    if (window.innerWidth >= 768) {
      prevDesktop();
    }
  }, 10000);
});

mobileNext.addEventListener('click', () => {
  clearInterval(desktopInterval);
  nextMobile();
  desktopInterval = setInterval(() => {
    if (window.innerWidth < 768) {
      nextMobile();
    }
  }, 10000);
});

mobilePrev.addEventListener('click', () => {
  clearInterval(desktopInterval);
  prevMobile();
  desktopInterval = setInterval(() => {
    if (window.innerWidth < 768) {
      prevMobile();
    }
  }, 10000);
});

window.addEventListener('load', () => {
  updateDesktopCards();
  updateMobileCard();
});

/* Galeria */
const galeriaTrack = document.getElementById("galeriaTrack");
const imagenes = galeriaTrack.children;
let current = 0;

function moverGaleria() {
  current++;
  if (current >= imagenes.length) {
    current = 0;
  }

  const offset = imagenes[current].offsetLeft;
  galeriaTrack.style.transform = `translateX(-${offset}px)`;
}

setInterval(moverGaleria, 3000); // cada 3 segundos