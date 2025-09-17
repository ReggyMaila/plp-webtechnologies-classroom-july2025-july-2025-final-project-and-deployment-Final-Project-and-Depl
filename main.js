


(function(){
  // Common UI behaviors
  function el(q){return document.querySelector(q)}
  document.addEventListener('DOMContentLoaded',function(){
    var yearEls = document.querySelectorAll('[id^="year"]')
    yearEls.forEach(e=>e.textContent=(new Date()).getFullYear())

    var toggle = document.querySelector('.nav-toggle')
    var nav = document.getElementById('primary-nav')
    if(toggle && nav){
      toggle.addEventListener('click',function(){
        var expanded = this.getAttribute('aria-expanded') === 'true'
        this.setAttribute('aria-expanded', String(!expanded))
        nav.classList.toggle('show')
      })
    }

    // Register form (client-side only)
    var reg = document.getElementById('register-form')
    if(reg){
      reg.addEventListener('submit',function(e){
        e.preventDefault()
        var data = new FormData(reg)
        var result = document.getElementById('register-result')
        result.innerHTML = '<div class="card">Thanks, ' + (data.get('fullname') || 'attendee') + '! Your registration is noted (demo).</div>'
        reg.reset()
      })
    }

    // Feedback form (client-side demo)
    var fb = document.getElementById('feedback-form')
    if(fb){
      fb.addEventListener('submit',function(e){
        e.preventDefault()
        var data = new FormData(fb)
        var out = document.getElementById('feedback-result')
        out.innerHTML = '<div class="card">Thanks for your feedback. Rating: ' + data.get('rating') + '</div>'
        fb.reset()
      })
    }

    // Badge generator
    var badgeForm = document.getElementById('badge-form')
    var badgeOut = document.getElementById('badge-output')
    if(badgeForm && badgeOut){
      badgeForm.addEventListener('submit',function(e){
        e.preventDefault()
        var f = new FormData(badgeForm)
        var name = f.get('name') || 'Speaker'
        var title = f.get('title') || ''
        var company = f.get('company') || ''
        var photo = f.get('photo') || ''
        var html = '<div class="badge">'
                 + (photo? '<div style="text-align:center;margin-bottom:.4rem"><img src="'+photo+'" alt="photo" style="width:80px;height:80px;object-fit:cover;border-radius:50%"></div>':'')
                 + '<h3>'+escapeHtml(name)+'</h3>'
                 + (title? '<div>'+escapeHtml(title)+'</div>':'')
                 + (company? '<div class="muted">'+escapeHtml(company)+'</div>':'')
                 + '</div>'
        badgeOut.innerHTML = html
      })
      var printBtn = document.getElementById('print-btn')
      if(printBtn){
        printBtn.addEventListener('click',function(){ window.print() })
      }
    }

  })

  // small helper
  function escapeHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
  }

})();

