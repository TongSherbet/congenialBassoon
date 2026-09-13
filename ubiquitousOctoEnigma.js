// custom popunder via smartlink
document.addEventListener('click', () => {
  const now = Date.now();
  const popts = localStorage.getItem('POPTS');
  
  if (popts && (now - popts < 120000)) return;

  const allowed = typeof isOpiumMenu === 'function' ? isOpiumMenu() : true;

  if (allowed) {
    localStorage.setItem('POPTS', now);
    
    const popWin = window.open('https://bony-teaching.com/wEV12y', '_blank');
    
    if (popWin) {
      popWin.blur();
      window.focus();
    }
  }
});

// register the banner placements
const appendScript = (id, src) => {
  delete window.fab238;
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  s.referrerPolicy = 'no-referrer-when-downgrade';
  document.getElementById(id)?.appendChild(s);
};

appendScript('acLeft', '//untimely-hello.com/b.XaVMs/d/GolN0UYTW/cz/peHmK9/u_ZhUYlPkpPFTucM0/MbDkMf2PNSTEcRtFNcz/QgwMM/zQYQ2xMaQe');
appendScript('acRight', '//untimely-hello.com/bBX.VGscdEG/lR0OYnW/cy/Pecm_9LuAZ/UylJk/PaTsc/0/M/DBMx5mNLjfUBt/N/zdQlw/Mdzskj2IO_QA');
