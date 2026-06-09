// Collaborative-style active cursor (dot + ring + label)
(function(){
  const cursor = document.getElementById('custom-cursor');
  if(!cursor) return;

  // Disable on touch devices
  if(('ontouchstart' in window) || navigator.maxTouchPoints > 0){
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');
  const label = cursor.querySelector('.cursor-label');

  let mouse = {x: window.innerWidth/2, y: window.innerHeight/2};
  let pos = {x: mouse.x, y: mouse.y};
  const ease = 0.18;

  function lerp(a,b,n){return (1-n)*a + n*b}

  // Update on mouse move
  window.addEventListener('mousemove', (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    cursor.classList.add('cursor-following');
    // show label while moving slowly
    cursor.classList.add('cursor-show-label');
    clearTimeout(window._cursor_label_timeout);
    window._cursor_label_timeout = setTimeout(()=>{
      cursor.classList.remove('cursor-show-label');
    }, 900);
  });

  window.addEventListener('mousedown', ()=>{
    cursor.classList.add('cursor-active');
  });
  window.addEventListener('mouseup', ()=>{
    cursor.classList.remove('cursor-active');
  });

  // Enlarge cursor on interactive elements
  const interactive = 'a,button,input,textarea,label,[role="button"]';
  document.querySelectorAll(interactive).forEach(el=>{
    el.addEventListener('mouseenter', ()=> cursor.classList.add('cursor-large'));
    el.addEventListener('mouseleave', ()=> cursor.classList.remove('cursor-large'));
  });

  function animate(){
    pos.x = lerp(pos.x, mouse.x, ease);
    pos.y = lerp(pos.y, mouse.y, ease);

    // Dot is tight to pointer
    dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
    // Ring lags a bit
    ring.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    // Label sits below the ring
    label.style.transform = `translate(${pos.x}px, ${pos.y + 36}px)`;

    requestAnimationFrame(animate);
  }

  // Initial run
  requestAnimationFrame(animate);

  // Respect reduced motion: simple show/hide
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(mq.matches){
    dot.style.display='none';
    ring.style.display='none';
    label.style.display='none';
    document.body.style.cursor='auto';
  }

})();
