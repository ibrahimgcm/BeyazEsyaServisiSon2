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

if (window.setupHeaderMenuLoaded !== true) {
  window.setupHeaderMenuLoaded = true;
  setTimeout(function() {
    if(document.getElementById('mobile-menu-toggle')) {
      setupHeaderMenu();
    }
  }, 100);
}