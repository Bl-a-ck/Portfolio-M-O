window.onload = function() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none'; // إخفاء شاشة التحميل فور تحميل الصفحة
};

// =================================================================================
// About
const aboutSection = document.querySelector('.about');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            aboutSection.classList.add('active');
            observer.disconnect(); // وقف المراقبة بعد التنفيذ
        }
    });
}, {
    threshold: 0.2, // تنفيذ عند ظهور 20% من العنصر
});

observer.observe(aboutSection);
// =====================================================================
// Expertise
document.addEventListener("DOMContentLoaded", () => {
    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach((card) => {
        const percentage = parseInt(card.getAttribute("data-percentage"));
        const circle = card.querySelector(".circle");
        const percentageText = card.querySelector(".percentage");
        let currentPercentage = 0;

        function updateProgress() {
            if (currentPercentage <= percentage) {
                percentageText.textContent = `${currentPercentage}%`;
                let color;
                if (currentPercentage <= 25) color = "#ff4d4d";
                else if (currentPercentage <= 50) color = "#ffa500";
                else if (currentPercentage <= 75) color = "#00bcd4";
                else color = "#00ffc6";

                circle.style.background = `conic-gradient(${color} ${currentPercentage}%, #ccc ${currentPercentage}%)`;
                currentPercentage++;
                requestAnimationFrame(updateProgress);
            }
        }

        updateProgress();
    });
});

function animateProgress() {
    const progressBars = document.querySelectorAll('.rang div');
    progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
  
        let counter = 0;
        const percentageText = bar.nextElementSibling;
        const interval = setInterval(() => {
            percentageText.textContent = `${counter}%`;
            if (counter >= percent) {
                clearInterval(interval);
            }
            counter++;
        }, 15);
    });
  }
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
  
  function handleScroll() {
    const rangs = document.querySelector('.rangs');
    if (isElementInViewport(rangs)) {
        animateProgress();
        window.removeEventListener('scroll', handleScroll);
    }
  }
  
  window.addEventListener('scroll', handleScroll);

// =================================================================================================
// تحسين التمرير لتفعيل الرسوم المتحركة عندما تكون العنصر في الـ Viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function handleScroll() {
  const rangs = document.querySelector('.rangs');
  if (isElementInViewport(rangs)) {
      animateProgress();
      window.removeEventListener('scroll', handleScroll);
  }
}

window.addEventListener('scroll', function() {
    requestAnimationFrame(handleScroll);
});

// =================================================================================================
// زيادة عدد الزوار للموقع
let visitorCount = localStorage.getItem('visitorCount');

if (!visitorCount) {
    visitorCount = 1; // تعيين العدد لأول مرة
} else {
    visitorCount = parseInt(visitorCount) + 1; // زيادة العدد
}

localStorage.setItem('visitorCount', visitorCount);

document.getElementById('visitor-counter').textContent = `${visitorCount}`;

// =================================================================================================
// التعامل مع الروابط في الهيدر
const links = document.querySelectorAll('.header_nav_links a');
const homeLink = document.getElementById('home-link');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        homeLink.classList.remove('active');
        link.classList.add('active');
    });

    link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('clicked')) {
            homeLink.classList.add('active');
            link.classList.remove('active');
        }
    });

    link.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('clicked'));
        link.classList.add('clicked');
    });
});

// =================================================================================================
// Toggle Read More
function toggleReadMore() {
    let content = document.getElementById("moreContent");
    let button = document.getElementById("readMoreBtn");
    if (content.style.display === "none") {
        content.style.display = "block";
        button.innerText = "Show less";
    } else {
        content.style.display = "none";
        button.innerText = "Show More";
    }
}

// =================================================================================================
// التعامل مع القائمة الجانبية (Menu)
let btnmenu = document.getElementById("btn-menu");
let NavLinks = document.querySelector(".header_nav_links");

btnmenu.onclick = function() {
    btnmenu.classList.toggle("fa-times");
    NavLinks.classList.toggle("active");
}

// =================================================================================================
// Previous Works: تحسين تنفيذ Swiper
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
    });
});

// =================================================================================================
// حفظ الرسائل في LocalStorage
function saveMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const timestamp = new Date().toLocaleString();

    if (name && email && message) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ name, email, message, timestamp, isNew: true });
        localStorage.setItem('messages', JSON.stringify(messages));
        alert('Message saved successfully!');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    } else {
        alert('Please fill out all fields.');
    }
}

// =================================================================================================
// إضافة نجوم بشكل ديناميكي
const starField = document.querySelector('.star-field');

for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    const size = Math.random() * 4 + 2; // حجم النجمة
    const duration = Math.random() * 5 + 3; // مدة الحركة
    const delay = Math.random() * 5; // تأخير البداية
    const left = Math.random() * 100; // موضع أفقي

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${left}%`;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    starField.appendChild(star);
}

// =================================================================================================
// عرض الزر عند التمرير لأسفل
window.onscroll = function() {
    let backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// الرجوع إلى أعلى الصفحة عند الضغط على الزر
document.getElementById("backToTop").addEventListener("click", function(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
