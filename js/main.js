document.addEventListener('DOMContentLoaded', () => {
  // --- モバイルメニューのトグル処理 ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (mobileMenu.classList.contains('hidden')) {
        mobileMenuIcon.classList.remove('fa-times');
        mobileMenuIcon.classList.add('fa-bars');
      } else {
        mobileMenuIcon.classList.remove('fa-bars');
        mobileMenuIcon.classList.add('fa-times');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (mobileMenuIcon) {
          mobileMenuIcon.classList.remove('fa-times');
          mobileMenuIcon.classList.add('fa-bars');
        }
      });
    });
  }

  // --- スクロールフェードインアニメーションの設定 ---
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // --- Chart.js の設定（予算実績管理ダッシュボード） ---
  const ctx = document.getElementById('budgetChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['4月', '5月', '6月', '7月', '8月', '9月'],
        datasets: [
          {
            label: '予算',
            data: [1200, 1500, 1300, 1800, 1600, 2000],
            backgroundColor: '#cbd5e1', // Slate-300
            borderRadius: 4,
          },
          {
            label: '実績',
            data: [1150, 1420, 1350, 1680, 1580, 1900],
            backgroundColor: '#0ea5e9', // Sky-500
            borderRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: { family: "'Noto Sans JP', sans-serif" }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value + '万';
              }
            }
          }
        }
      }
    });
  }
});
