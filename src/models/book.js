export class book {
    constructor({ id, tittle, author, finished = false, createdAt = new Date() }) {
        this.id = id;
        this.tittle = tittle;
        this.author = author;
        this.finished = finished;
        this.createdAt = createdAt;
    }
}