class Scoreboard {
    constructor(){
        this.leaderboard = this.getLeaderboard();
        this.username = 'AAA';
    }

    render(element){
        let html = '<table>';
        this.leaderboard.forEach((entry) => {
            html += `<tr><td>${entry.name}</td><td>${entry.score}</td></tr>`;
        });
        element.innerHTML = html + '</table>';
    }


    //get the top leaderboard entries from the database
    getLeaderboard(){

    }

    //get the highest score saved on this computer
    getUserHighScore(){
        let score = window.localStorage.getItem('highSCore');
        if (score == null) { score = 0 };
        return score;
    }

    //change user name for scores
    setUsername(name){
        this.username = name;
    }


}