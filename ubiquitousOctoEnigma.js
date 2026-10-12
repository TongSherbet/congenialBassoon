(function () {
    if (window.__ads) return;
    window.__ads = true;

    const repo = window._repoUrl('%54ongSherbet/congenialBassoon');
    const tokens = [];
    const LIVE = 2500, RETRY = 8000, POLL = 120, WAIT = 1500;

    let done = false, deadline = 0, timer = null, tagged = false, origin = '', fired = false;

    // primary, popunder - runs only if engine didn't survive
    const adcash = () => {
        if (fired) return;
        fired = true;
        if (timer) { clearInterval(timer); timer = null; }
        let base = '';
        try { base = typeof getBase === 'function' ? getBase() : (window.getBase ? window.getBase() : ''); } catch (e) {}
        loadScript(base + '/aclib.js', () => {
            try { aclib.runPop({ zoneId: '12196614', popGate: isOpiumMenu }); } catch (e) {}
        }, null, 'aclib');
    };

    // polled: engine still alive? timeout -> adcash
    function alive() {
        if (done) return;
        const entries = window.performance && performance.getEntriesByType ? performance.getEntriesByType('resource') : [];
        let live = entries.some(e => e.initiatorType !== 'script' && (
            (origin && e.name.indexOf(origin) === 0) ||
            tokens.some(t => e.name.indexOf(t) !== -1)
        ));
        if (!live) {
            let st = null;
            try { st = window.PON_Gate ? window.PON_Gate() : null; } catch (e) {}
            live = !!(st && (st.armed || st.passed || st.gated || st.seamPassed || st.seamGated));
        }
        if (live) {
            done = true;
            if (timer) { clearInterval(timer); timer = null; }
        } else if (deadline && Date.now() > deadline) {
            done = true;
            adcash();
        }
    }

    // catch engine scripts as they get injected
    function watchForEngine() {
        if (!window.MutationObserver) return;
        new MutationObserver(muts => {
            for (const m of muts) {
                for (const node of (m.addedNodes || [])) {
                    if (!node || node.tagName !== 'SCRIPT' || !node.src) continue;
                    if (!tokens.some(t => node.src.indexOf(t) !== -1)) continue;
                    try { origin = new URL(node.src).origin; } catch (e) { origin = ''; }
                    const seg = node.src.split('?')[0].split('/').pop();
                    if (seg && seg.length > 2) window.PON_Gate(seg);
                    deadline = Date.now() + LIVE;
                    timer = timer || setInterval(alive, POLL);
                    node.addEventListener('load', () => { deadline = Date.now() + LIVE; });
                    node.addEventListener('error', () => { deadline = Date.now() + RETRY; });
                }
            }
        }).observe(document.documentElement, { childList: true, subtree: true });
    }

    // fetch and scan PON anti adblock for the tokens
    fetch(repo + 'PON.AAB.js', { credentials: 'omit' })
        .then(r => r.text())
        .then(src => {
            const text = String(src || '');
            const alphabets = text.match(/'([a-z0-9]{40,})'/g) || [];
            const configs = text.match(/'(\{[^']{20,600}?\})'/g) || [];
            const found = [];
            for (const a of alphabets) {
                const alpha = a.slice(1, -1);
                if (alpha.length % 2) continue;
                const half = alpha.length / 2;
                const plain = alpha.substr(0, half), cipher = alpha.substr(half);
                for (const c of configs) {
                    const decoded = c.slice(1, -1).split('').map(ch => {
                        const idx = cipher.indexOf(ch);
                        return idx < 0 ? ch : plain.charAt(idx);
                    }).join('').replace(/\\"/g, '"').replace(/\\\//g, '/');
                    let cfg;
                    try { cfg = JSON.parse(decoded); } catch (e) { continue; }
                    (function walk(v) {
                        if (typeof v === 'string') {
                            const m = v.match(/\/([A-Za-z0-9]{3,10})$/);
                            if (m && v.indexOf('{') >= 0) found.push(m[1]);
                            if (/^\.[a-z]{2,12}$/.test(v)) found.push(v);
                        } else if (v && typeof v === 'object') {
                            for (const k in v) walk(v[k]);
                        }
                    })(cfg);
                }
            }
            found.forEach(t => { if (!tokens.includes(t)) tokens.push(t); });
        })
        .catch(() => {})
        .finally(() => {
            loadScript(repo + 'PON.gate.js', () => {
                window.PON_Gate(tokens, isOpiumMenu);
                watchForEngine();

                // load PON after gate, aclib fallback
                setTimeout(() => {
                    if (tagged) return;
                    tagged = true;
                    loadScript(repo + 'PON.AAB.js', () => {
                        deadline = Date.now() + LIVE;
                        timer = timer || setInterval(alive, POLL);
                    }, adcash);
                }, WAIT);
            }, adcash);
        });

    // secondary banner, always runs
    loadScript('//oc.trifledloto.com/tPqp9yZ3tG2FI1/152290', () => {
        G_152290_API.show(Math.random() < 0.5 ? '#acLeft' : '#acRight');
    });
})();
