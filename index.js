import { Board } from './board.js';
const board = new Board();
let playing = false;

document.addEventListener('keydown', event => {
    if(playing){
        if (event.keyCode === 37) {
            board.activePiece.pos.x -= 1;
            if (board.collision()) {
              board.activePiece.pos.x += 1;
            }
          } else if (event.keyCode === 39) {
            board.activePiece.pos.x += 1;
            if (board.collision()) {
              board.activePiece.pos.x -= 1;
            }
          } else if (event.keyCode === 40) {
            board.activePiece.pos.y += 1;
            if (board.collision()) {
              board.activePiece.pos.y -= 1;
            }
          } else if (event.keyCode === 38) {
              board.rotate();
          }
    }
});

document.getElementById('play-game').addEventListener('click', event => {
    playing = true;
    board.createNewPiece();
    window.setInterval(() => {
        board.render();
    }, 50);
    window.setInterval(() => {
        board.fall();
    }, 500);
});