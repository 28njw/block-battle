import pg from 'pg';

const { Pool } = pg;


export class Database {
    constructor(){
        this.url = 'postgres://cuegmbdolvultw:f3a643ef3a23cff218f4f7ae7fcf7d7edf8246d5c152b51228c84f687ea8474d@ec2-54-159-22-90.compute-1.amazonaws.com:5432/dfja7ah0kkcic0';
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
    getTopTen(){
        const queryText = 'SELECT TOP 10 score FROM scores ORDER BY score DESC;';
        const res = await this.client.query(queryText, [username]);
        console.log(res);
        return res.rows;
    }

    //write a score entry to database
    submitScore(entry){
        const queryText = `INSERT INTO scores (username, score) VALUES (${entry.username}, ${entry.score})`;
        const res = await this.client.query(queryText, [username]);
        return res.rows;
    }
}