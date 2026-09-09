// custom popunder via smartlink
document.addEventListener('click', () => {
  return; //later
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

// register the banner placements
// later
