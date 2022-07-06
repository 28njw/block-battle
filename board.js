class Board {
    constructor() {
        //create an empty board
        this.state = new Array(20).fill(0).map(() => new Array(10).fill(0));
        //holds the active tetris piece
        this.activePiece = { pos: { x: 0, y: 0 }, shape: null };
        //initialize user score to 0
        this.score = 0;
        this.canvas = document.getElementById('board');
        this.context = this.canvas.getContext('2d');
        this.context.scale(40, 40);
        this.colors = [
            null,
            '#F07167',
            '#92DCE5',
            '#DD72E2',
            '#FFAE03',
            '#B1CC74',
            '#FF4000',
            '#FF7E6B',
        ];
        this.pieces = {
            I: [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
            L: [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2],
            ],
            J: [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0],
            ],
            O: [
                [4, 4],
                [4, 4],
            ],
            Z: [
                [5, 5, 0],
                [0, 5, 5],
                [0, 0, 0],
            ],
            S: [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ],
            T: [
                [0, 7, 0],
                [7, 7, 7],
                [0, 0, 0],
            ]
        };
    }

    //redraw the board state within the given element
    render(element) {
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawNextTick(this.state, { x: 0, y: 0 });
        this.drawNextTick(this.activePiece.shape, this.activePiece.pos);
    }

    //update and redraw the board for the next "tick" of time
    drawNextTick(state, pos) {
        state.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = this.colors[value];
                    this.context.fillRect(x + pos.x, y + pos.y, 1, 1);
                }
            });
        });
    }

    //create a new active piece
    createNewPiece() {
        this.activePiece.shape = this.pieces['TJLOSZI'[Math.floor(Math.random() * Math.floor(7))]];
        this.activePiece.pos.y = 0;
        this.activePiece.pos.x = 3;
    }

    //trigger falling piece
    fall() {
        this.activePiece.pos.y++;
        if (this.collision()) {
            this.activePiece.pos.y--;
            this.mergeToBoard();
            this.createNewPiece();
            this.checkFilledRows();
            this.failGame();
        }
        this.render();
    }

    // check if current piece has collided with the placed pieces
    collision() {
        for (let y = 0; y < this.activePiece.shape.length; ++y) {
            for (let x = 0; x < this.activePiece.shape[y].length; ++x) {
                if (this.activePiece.shape[y][x] !== 0 && (this.state[y + this.activePiece.pos.y] && this.state[y + this.activePiece.pos.y][x + this.activePiece.pos.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    //merge current piece to board
    mergeToBoard() {
        this.activePiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.state[y + this.activePiece.pos.y][x + this.activePiece.pos.x] = value;
                }
            });
        });
    }

    //rotate active piece
    rotate() {
        let prevOrientation = this.activePiece.shape;
        let newshape = [];
        for (let j = 0; j < this.activePiece.shape.length; ++j) {
            newshape.push([]);
            for (let i = this.activePiece.shape.length - 1; i >= 0; --i) {
                newshape[j].push(this.activePiece.shape[i][j]);
            }
        }
        this.activePiece.shape = newshape;
        if (this.collision()) {
            this.activePiece.shape = prevOrientation;
        } else {
            this.render();
        }
    }

    //check if game is lost
    failGame() {
        //TODO: end game if piece is merged outside of bounds or into another
    }

    checkFilledRows() {
        let score = 0;
        check: for (let y = this.state.length - 1; y > 0; --y) {
            for (let x = 0; x < this.state[y].length; ++x) {
                if (this.state[y][x] === 0) {
                    continue check;
                }
            }
            this.state.splice(y, 1);
            this.state.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            score = (10 + (score * 2));
        }
        this.score += score;
        //update visual of score to user
        document.getElementById('score').innerHTML = this.score;
    }
}
export { Board };