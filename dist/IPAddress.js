"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MACAddress = exports.IPAddress = exports.IPAddressClass = void 0;
const ip6addr_1 = require("ip6addr");
class IPAddress {
    constructor(Address, PrefixLength = -1) {
        this.Addr = Address;
        if (PrefixLength == -1) {
            if (this.Addr.kind() == "ipv4")
                this._PrefixLength = 32;
            else
                this._PrefixLength = 128;
        }
        else {
            this._PrefixLength = PrefixLength;
        }
    }
    get ver() {
        if (this.Addr.kind() == "ipv4")
            return 4;
        return 6;
    }
    get PrefixLength() {
        return this._PrefixLength;
    }
    get CIDR() {
        if (this.Addr.kind() == "ipv4")
            return this.toString({ format: 'v4' }) + "/" + this._PrefixLength;
        return this.toString() + "/" + this._PrefixLength;
    }
    get v4() {
        return this.toString({ format: 'v4' });
    }
    get v6() {
        if (this.Addr.kind() == "ipv4")
            return this.Addr.toString({ format: 'v4-mapped' });
        return this.toString({ format: 'v6' });
    }
    toString(options = {}) {
        if (this.Addr.kind() == "ipv4")
            return this.Addr.toString(Object.assign({ format: 'v4-mapped' }, options));
        return this.Addr.toString(Object.assign({ format: 'v6' }, options));
    }
    toBuffer() {
        return this.Addr.toBuffer();
    }
}
exports.IPAddressClass = IPAddress;
function IPAddressBuilder(Address, PrefixLength = -1) {
    if (typeof (Address) == "string") {
        var Addr;
        if (Address.indexOf('/') > -1)
            return new IPAddress(ip6addr_1.parse(Address.substr(0, Address.indexOf('/'))), Number(Address.substr(Address.indexOf('/') + 1)));
        else
            return new IPAddress(ip6addr_1.parse(Address));
    }
    else if (Buffer.isBuffer(Address) && Address.length == 16) {
        var IPv6 = Address.slice(0, 2).toString('hex');
        for (var y = 2; y < 16; y += 2)
            IPv6 += ":" + Address.slice(y, y + 2).toString('hex');
        return new IPAddress(ip6addr_1.parse(IPv6), PrefixLength);
    }
    else if (Buffer.isBuffer(Address) && Address.length == 4) {
        var IPv4 = Address[0] + "." + Address[1] + "." + Address[2] + "." + Address[3];
        return new IPAddress(ip6addr_1.parse(IPv4), PrefixLength);
    }
    else if (Buffer.isBuffer(Address)) {
        throw Address.length + "+++++++";
        return new IPAddress(ip6addr_1.parse("0.0.0.0"));
    }
    console.log("Address:", Address);
    throw new Error("Invalid IP Address (Unknown Format)");
}
exports.IPAddress = IPAddressBuilder;
class MACAddress {
    constructor(MAC = Buffer.alloc(6)) {
        this._MAC = Buffer.alloc(6);
        this._MAC = MAC;
    }
    toString() {
        return this._MAC.toString('hex').replace(/(.{2})/g, "$1:").substr(0, 17);
    }
    toBuffer() {
        return this._MAC;
    }
    get empty() {
        if (!this._MAC[0] && !this._MAC[1] && !this._MAC[2] && !this._MAC[3] && !this._MAC[4] && !this._MAC[5])
            return true;
        return false;
    }
}
exports.MACAddress = MACAddress;
//# sourceMappingURL=IPAddress.js.map