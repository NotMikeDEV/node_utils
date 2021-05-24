export class Lock {
    private Queue = new Promise((resolve:any)=>resolve())
    constructor() {

    }
    async Next() {
        var Done:any = false
        const Prev = this.Queue
        this.Queue = new Promise((resolve:any)=>Done=resolve)
        await Prev
        return Done
    }
}