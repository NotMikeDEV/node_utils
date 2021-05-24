import {parse as ParseIP6Addr} from "ip6addr";

class IPAddress {
    private Addr
    private _PrefixLength
    constructor(Address:any, PrefixLength:number=-1) {
        this.Addr = Address
        if (PrefixLength == -1) {
            if (this.Addr.kind() == "ipv4")
                this._PrefixLength = 32
            else
                this._PrefixLength = 128
        } else {
            this._PrefixLength = PrefixLength
        }
    }
    get ver():number {
        if (this.Addr.kind() == "ipv4")
            return 4
        return 6
    }
    get PrefixLength():number {
        return this._PrefixLength
    }
    get CIDR():string {
        if (this.Addr.kind() == "ipv4")
            return this.toString({format:'v4'}) + "/" + this._PrefixLength
        return this.toString() + "/" + this._PrefixLength
    }
    get v4():string {
        return this.toString({format:'v4'})
    }
    get v6():string {
        if (this.Addr.kind() == "ipv4")
            return this.Addr.toString({format:'v4-mapped'})
        return this.toString({format:'v6'})
    }
    public toString(options:any={}):string {
        if (this.Addr.kind() == "ipv4")
            return this.Addr.toString({format:'v4-mapped', ...options})
        return this.Addr.toString({format:'v6', ...options})
    }
    public toBuffer():Buffer {
        return this.Addr.toBuffer()
    }
}
export {IPAddress as IPAddressClass}

function IPAddressBuilder(Address:any, PrefixLength:number=-1):IPAddress {
    if (typeof(Address) == "string") {
        var Addr:any
        if (Address.indexOf('/') > -1)
            return new IPAddress(ParseIP6Addr(Address.substr(0, Address.indexOf('/'))), Number(Address.substr(Address.indexOf('/') + 1)))
        else
            return new IPAddress(ParseIP6Addr(Address))
    } else if (Buffer.isBuffer(Address) && Address.length == 16) {
        var IPv6 = Address.slice(0, 2).toString('hex');
        for (var y=2; y<16; y+=2)
            IPv6 += ":" + Address.slice(y, y+2).toString('hex')
        return new IPAddress(ParseIP6Addr(IPv6), PrefixLength)
    } else if (Buffer.isBuffer(Address) && Address.length == 4) {
        var IPv4 = Address[0] + "." + Address[1] + "." + Address[2] + "." + Address[3]
        return new IPAddress(ParseIP6Addr(IPv4), PrefixLength)
    } else if (Buffer.isBuffer(Address)) {
        throw Address.length + "+++++++"
        return new IPAddress(ParseIP6Addr("0.0.0.0"))
    }
    console.log("Address:", Address)
    throw new Error("Invalid IP Address (Unknown Format)")
}
export {IPAddressBuilder as IPAddress}

export class MACAddress {
    private _MAC = Buffer.alloc(6)
    constructor(MAC:Buffer|undefined=Buffer.alloc(6)) {
        this._MAC = MAC
    }
    toString() {
        return this._MAC.toString('hex').replace(/(.{2})/g, "$1:").substr(0,17)
    }
    toBuffer() {
        return this._MAC
    }
    get empty() {
        if (!this._MAC[0] && !this._MAC[1] && !this._MAC[2] && !this._MAC[3] && !this._MAC[4] && !this._MAC[5])
            return true
        return false
    }
}

