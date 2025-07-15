// Mobil ve masaüstü menü açma/kapatma, alt menü açma, ESC ile kapama
function setupHeaderMenu() {
  var toggle = document.getElementById('mobile-menu-toggle');
  var menu = document.getElementById('main-menu');
  var overlay = document.getElementById('mobile-menu-overlay');
  var submenuToggles = document.querySelectorAll('.submenu-toggle');

  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('show');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('show');
    document.body.classList.add('menu-open');
    attachMenuLinkEvents();
  }

  if(toggle) {
    toggle.onclick = function() {
      if(menu.classList.contains('open')) closeMenu();
      else openMenu();
    };
  }
  if(overlay) overlay.onclick = closeMenu;

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });

  submenuToggles.forEach(function(btn){
    btn.addEventListener('click', function(e){
      if(window.innerWidth <= 800) {
        e.preventDefault();
        var submenu = btn.nextElementSibling;
        submenu.classList.toggle('submenu-open');
      }
    });
  });

  function attachMenuLinkEvents() {
    var menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(function(link) {
      if(!link.classList.contains('submenu-toggle')) {
        function handleMenuLink(e) {
          if(menu.classList.contains('open') && window.innerWidth <= 800) {
            e.preventDefault();
            var href = link.getAttribute('href');
            window.location.href = href;
            setTimeout(closeMenu, 200);
          }
        }
        link.onclick = handleMenuLink;
        link.ontouchend = handleMenuLink; // iOS için
      }
    });
  }
  attachMenuLinkEvents();
}

// SEO dostu hizmet linklerini dinamik parametreli URL'ye yönlendir
// Hem .main-nav hem .dropdown-content içindeki /hizmet/ ile başlayan linkler için

document.querySelectorAll('.main-nav a[href^="/hizmet/"], .dropdown-content a[href^="/hizmet/"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var href = link.getAttribute('href');
    // /hizmet/xyz.html veya hizmet/xyz.html formatını yakala
    var match = href.match(/\/?hizmet\/([^.\/]+)\.html$/);
    if (match) {
      e.preventDefault();
      var service = match[1]
        .replace(/-/g, ' ') // tireleri boşluğa çevir
        .replace(/\b\w/g, function(l) { return l.toUpperCase(); }); // baş harfleri büyüt
      window.location.href = 'hizmet.html?service=' + encodeURIComponent(service);
    }
  });
});

if (window.setupHeaderMenuLoaded !== true) {
  window.setupHeaderMenuLoaded = true;
  setTimeout(function() {
    if(document.getElementById('mobile-menu-toggle')) {
      setupHeaderMenu();
    }
  }, 100);
}