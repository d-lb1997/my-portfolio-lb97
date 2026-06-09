// Collaborative-style active cursor (arrow + label)
(function(){
  const cursor = document.getElementById('custom-cursor');
  if(!cursor) return;

  // Disable on touch devices
  if(('ontouchstart' in window) || navigator.maxTouchPoints > 0){
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  const arrow = cursor.querySelector('.cursor-arrow');
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
    // show label briefly when moving
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

    // Angle based on movement direction (use small delta)
    const dx = mouse.x - pos.x;
    const dy = mouse.y - pos.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90; // adjust to arrow orientation

    // Position arrow (centered) and rotate
    if(arrow){
      arrow.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%) rotate(${angle}deg)`;
    }
    // Label sits below the arrow
    if(label){
      label.style.transform = `translate(${pos.x}px, ${pos.y + 36}px)`;
    }

    requestAnimationFrame(animate);
  }

  // Initial run
  requestAnimationFrame(animate);

  // Respect reduced motion: simple show/hide
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(mq.matches){
    if(arrow) arrow.style.display='none';
    if(label) label.style.display='none';
    document.body.style.cursor='auto';
  }

})();
