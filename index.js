import { Board } from './board.js';
const board = new Board();
let playing = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('keydown', event => {
    if (playing) {
        if (event.keyCode === 37) {
            board.activePiece.pos.x--;
            if (board.collision()) {
                board.activePiece.pos.x++;
            }
        } else if (event.keyCode === 39) {
            board.activePiece.pos.x++;
            if (board.collision()) {
                board.activePiece.pos.x -= 1;
            }
        } else if (event.keyCode === 40) {
            board.activePiece.pos.y++;
            if (board.collision()) {
                board.activePiece.pos.y--;
            }
        } else if (event.keyCode === 38) {
            board.rotate();
        }
    }
});

document.getElementById('play-game').addEventListener('click', event => {
    playing = true;
    glitch(document.getElementById("interactiveButtons"), 7);
    fadeOut(document.getElementById("interactiveButtons"));
    glitch(document.getElementById("mainHeader"), 13);
    fadeOut(document.getElementById("mainHeader"));
    window.setTimeout(() => {
        document.getElementById("mainHeader").remove();
        document.getElementById("interactiveButtons").remove();
        document.getElementById('game').hidden = false;
        document.getElementById('game').classList.add("fadeIn");
        board.createNewPiece();
        window.setInterval(() => {
            board.render();
        }, 50);
        window.setInterval(() => {
            board.fall();
        }, 500);
    }, 1000)

});

function buildBackground() {
    let rate = Math.round(Math.max((screen.width / 66) / 2 + 2, (screen.height / 66) / 2 + 2));
    rate < 14 ? rate = 14 : rate = rate;
    function buildRight() {
        let c = 4;
        let html = '';
        let tops = 2 * -66;
        let left = -66;
        for (let i = 1; i < rate; ++i) {
            for (let p = 1; p < c; ++p) {
                (p > c / 2) ? (left -= (40), tops += (66)) : (p != 1 ? (left += 40, tops += 66) : (left += i * 40));
                p == c / 2 ? tops = (-66) : tops = tops;
                if (Math.abs(tops) * 2 < screen.height + 66 && Math.abs(left) * 2 < screen.width + 66) {
                    html += '<hex style="' + 'left:calc(50% + (' + String(left) + 'px));top:calc(50% + (' + String(tops) + 'px)); -webkit-animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite; animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite;"></hex>'
                }
                else if (screen.width < 600) {
                    html += '<hex style="' + 'left:calc(50% + (' + String(left) + 'px));top:calc(50% + (' + String(tops) + 'px)); -webkit-animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite; animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite;"></hex>'
                }
            }
            tops = (i + 2) * -66;
            left = (-66);
            c += 2;
            html += '<div></div>';

        }
        return html;
    }
    function buildLeft() {
        let html = '';
        let c = 4;
        let tops = 2 * -66;
        let left = -66;
        for (let i = 1; i < rate; ++i) {
            for (let p = 1; p < c; ++p) {
                (p > c / 2) ? (left += (40), tops += (66)) : (p != 1 ? (left -= 40, tops += 66) : (left -= i * 40));
                p == c / 2 ? tops = (-66) : tops = tops;
                if (Math.abs(tops) * 2 < screen.height + 66 && Math.abs(left) * 2 < screen.width + 66) {
                    html += '<hex style="' + 'left:calc(50% + (' + String(left) + 'px));top:calc(50% + (' + String(tops) + 'px)); -webkit-animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite; animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite;"></hex>'
                }
                else if (screen.width < 600) {
                    html += '<hex style="' + 'left:calc(50% + (' + String(left) + 'px));top:calc(50% + (' + String(tops) + 'px)); -webkit-animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite; animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite;"></hex>'
                }
            }
            tops = (i + 2) * -66;
            left = (-66);
            c += 2;
            html += '<div></div>';
        }
        return html;
    }

    function buildTopBot() {
        let html = '';
        let c = 2;
        let tops = 66;
        let left = -66;
        for (let i = 1; i < rate; ++i) {
            for (let p = 1; p < c; ++p) {
                if (Math.abs(tops) * 2 < screen.height + 66 && Math.abs(left) * 2 < screen.width + 66) {
                    html += '<hex style="' + 'left:calc(50% + (' + String(left) + 'px));top:calc(50% + (' + String(tops) + 'px)); -webkit-animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite; animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite;"></hex>';
                    left += 80
                }
                else if (screen.width < 600) {
                    html += '<hex style="' + 'left:calc(50% + (' + String(left) + 'px));top:calc(50% + (' + String(tops) + 'px)); -webkit-animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite; animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite;"></hex>';
                    left += 80
                }
            }
            left = -27 + ((i + 1) * -40);
            tops += 66;
            c += 1;
            html += '<div></div>';
        }
        c = 2;
        tops = -66;
        left = -66;
        for (let i = 1; i < rate; ++i) {
            for (let p = 1; p < c; ++p) {
                if (Math.abs(tops) * 2 < screen.height + 66 && Math.abs(left) * 2 < screen.width + 66) {
                    html += '<hex style="' + 'left:calc(50% + (' + String(left) + 'px));top:calc(50% + (' + String(tops) + 'px)); -webkit-animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite; animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite;"></hex>';
                    left += 80
                }
                else if (screen.width < 600) {
                    html += '<hex style="' + 'left:calc(50% + (' + String(left) + 'px));top:calc(50% + (' + String(tops) + 'px)); -webkit-animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite; animation:opacity 2s ' + i * 0.25 + 's ease-in-out infinite;"></hex>';
                    left += 80
                }
            }
            left = -27 + ((i + 1) * -40);
            tops -= 66;
            c += 1;
            html += '<div></div>';
        }
        return html;
    }
    document.getElementById('hex').innerHTML = '<hex></hex>' + buildRight() + buildLeft() + buildTopBot();
}

buildBackground();

async function glitch(el, len) {
    for (let i = 0; i < len; ++i) {
        el.style.fontFamily = "heading" + String((i % 2));
        await sleep(Math.random() * (100 - 25) + 25);
    }
}
function fadeOut(element) {
    element.classList.add("fadeOut");
}

