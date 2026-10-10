// primary, popunder
const aca = document.createElement('script');
aca.id = 'aclib';
aca.type = 'text/javascript';
aca.src = getBase() + '/aclib.js';

// when ad lib loads we run our zones
aca.onload = () => {
  // 2 banners per ref, remove for now (make no money, annoyying)
    /*["acLeft", "acRight"].forEach(id => aclib.runBanner({
        zoneId: "12196570",
        renderIn: "#" + id
    }))*/
  // gated popunder, like only open when on opium page not game or proxy yk
    aclib.runPop({
        zoneId: "12196614",
        popGate: () => isOpiumMenu(),
    });
};

document.head.appendChild(aca);

// secondary, banner
const pon = document.createElement('script');
pon.type = 'text/javascript';
pon.src = "//oc.trifledloto.com/tPqp9yZ3tG2FI1/152290";

// when ad lib loads we run our zones
pon.onload = () => {
    G_152290_API.show(Math.random() < 0.5 ? "#acLeft" : "#acRight");
};

document.head.appendChild(pon);
