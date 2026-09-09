document.addEventListener('click', () => {
  const now = Date.now();
  const popts = localStorage.getItem('POPTS');
  
  if (popts && (now - popts < 90000)) return;

  const allowed = typeof isOpiumMenu === 'function' ? isOpiumMenu() : true;

  if (allowed) {
    localStorage.setItem('POPTS', now);
    
    const popWin = window.open('https://ke.ducatflapper.com/ihCNqMxCE4lHFrEfK/151100', '_blank');
    
    if (popWin) {
      popWin.blur();
      window.focus();
    }
  }
});

setTimeout(() => {
  const script = document.createElement('script');
  script.setAttribute('data-cfasync', 'false');
  script.async = true;
  script.type = 'text/javascript';
  script.src = '//cinchaslack.com/gxuFyX1L9mN7XB/150541';
  document.body.appendChild(script);
}, 120000);
