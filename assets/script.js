// GTRTeK HR Knowledge Base — shared behaviour
(function(){
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Mark active nav link (top nav + side nav) based on current file name
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .side-nav a').forEach(function(a){
    var href = a.getAttribute('href');
    if(href === here){ a.classList.add('active'); }
  });

  // Simple client-side search across data-searchable blocks on the current page
  var searchBox = document.getElementById('site-search');
  if(searchBox){
    searchBox.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){
        var q = searchBox.value.trim();
        if(q){ window.location.href = 'search.html?q=' + encodeURIComponent(q); }
      }
    });
  }

  // In-page filter for elements marked [data-searchable] (used on index & search pages)
  var filterInput = document.getElementById('page-filter');
  if(filterInput){
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-searchable]'));
    var noResults = document.querySelector('.no-results');
    function applyFilter(){
      var q = filterInput.value.toLowerCase().trim();
      var visible = 0;
      items.forEach(function(el){
        var text = el.textContent.toLowerCase();
        var match = !q || text.indexOf(q) !== -1;
        el.classList.toggle('is-hidden', !match);
        if(match) visible++;
      });
      if(noResults) noResults.classList.toggle('show', visible === 0);
    }
    filterInput.addEventListener('input', applyFilter);

    // If arrived via ?q= from the header search box, pre-fill and filter
    var params = new URLSearchParams(location.search);
    if(params.get('q')){
      filterInput.value = params.get('q');
      applyFilter();
    }
  }

  // Location tabs (holiday calendar page)
  var tabs = document.querySelectorAll('.loc-tab');
  if(tabs.length){
    tabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        var target = tab.getAttribute('data-target');
        document.querySelectorAll('.loc-tab').forEach(function(t){ t.classList.remove('active'); });
        document.querySelectorAll('.loc-panel').forEach(function(p){ p.classList.remove('active'); });
        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
        history.replaceState(null, '', '#' + target);
      });
    });
    // Deep link support: #bengaluru etc.
    var hash = location.hash.replace('#','');
    if(hash){
      var match = document.querySelector('.loc-tab[data-target="'+hash+'"]');
      if(match) match.click();
    }
  }
})();
