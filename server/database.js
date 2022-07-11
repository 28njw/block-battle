import pg from 'pg';

const { Pool } = pg;


class Database {
    constructor(){
        this.url = 'postgres://cuegmbdolvultw:f3a643ef3a23cff218f4f7ae7fcf7d7edf8246d5c152b51228c84f687ea8474d@ec2-54-159-22-90.compute-1.amazonaws.com:5432/dfja7ah0kkcic0';
        this.leaderboard = null;
    }

    async connect(){
        this.pool = new Pool({
            connectionString: this.url,
            ssl: { rejectUnauthorized: false },
        });
        this.client = await this.pool.connect();
    }

    async close(){
        this.client.release();
        await this.pool.end();
    }

    //get top 10 score from database
    async getTopTen(){
        const queryText = 'select * from scores order by score desc limit 10';
        const res = await this.client.query(queryText);
        console.log(res);
        this.leaderboard = res.rows;
        return res.rows;
    }

    //write a score entry to database
    async submitScore(entry){
        let min = Infinity;
        if(this.leaderboard != null && this.leaderboard.length > 9){
            for(let i = 0; i < this.leaderboard.length; ++i){
                if(this.leaderboard[i].score < min){
                    min = this.leaderboard[i].score;
                }
            }
        } else {
            min = 0;
        }
        if(entry.score > min){
            const queryText = `INSERT INTO scores(username, score) VALUES ('${entry.username}', ${entry.score})`;
            const res = await this.client.query(queryText);
            return res.rows;
        }
    }
}

const database = new Database();
await database.connect();
export { database };