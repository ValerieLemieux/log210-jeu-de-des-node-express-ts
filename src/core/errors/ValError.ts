export class ValError extends Error {
    private _code:number = NaN ;
    constructor (message:string) {
        super (message);
        this ._code = 400; // req pas bien faite
    }
    
    get code():number {
        return this ._code;
    }

    toJSON():object {
        return { "code" : this ._code, "message" : this .message};
    }
}