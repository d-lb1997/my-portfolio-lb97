// Simple modern cursor: single arrow that follows pointer with light smoothing
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

  let mx = window.innerWidth/2, my = window.innerHeight/2;
  let x = mx, y = my;
  const ease = 0.22;

  window.addEventListener('mousemove', (e)=>{
    mx = e.clientX;
    my = e.clientY;
    cursor.classList.add('visible');
  });

  window.addEventListener('mousedown', ()=> cursor.classList.add('cursor-active'));
  window.addEventListener('mouseup', ()=> cursor.classList.remove('cursor-active'));

  const interactive = 'a,button,input,textarea,label,[role="button"]';
  document.querySelectorAll(interactive).forEach(el=>{
    el.addEventListener('mouseenter', ()=> cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', ()=> cursor.classList.remove('cursor-hover'));
  });

  function animate(){
    x += (mx - x) * ease;
    y += (my - y) * ease;

    const dx = mx - x;
    const dy = my - y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;

    if(arrow){
      arrow.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%) rotate(${angle}deg)`;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // Respect reduced motion
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(mq.matches){
    if(arrow) arrow.style.display='none';
    document.body.style.cursor='auto';
  }

})();
