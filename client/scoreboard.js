export class Scoreboard {
    constructor(){
        this.leaderboard = this.getLeaderboard();
        window.localStorage.getItem('username') == null ? this.username = 'AAA' : this.username = window.localStorage.getItem('username');
    }

    render(element){
        let html = '<table>';
        for(let i = 0; i < this.leaderboard.length; ++i){
            html += `<tr><td>${this.leaderboard[i].username}</td><td>${this.leaderboard[i].score}</td></tr>`;
        }
        element.innerHTML = html + '</table>';
        let score;
        window.localStorage.getItem('highscore') == null ? score = 0 : score = window.localStorage.getItem('highscore');
        html = this.username + ' : ' + String(score);
        document.getElementById('clientLeaderboardBody').innerHTML = html;
    }


    //get the top leaderboard entries from the database
    async getLeaderboard(){
        await fetch('/getLeaderboard', {method: 'GET'}).then((response) => response.json())
        .then((res) => {
            this.leaderboard = res;
            return res;
        });;
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

    //get username
    getUsername(){
        return this.username;
    }
}