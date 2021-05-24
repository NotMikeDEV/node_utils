/// <reference types="node" />
declare class IPAddress {
    private Addr;
    private _PrefixLength;
    constructor(Address: any, PrefixLength?: number);
    get ver(): number;
    get PrefixLength(): number;
    get CIDR(): string;
    get v4(): string;
    get v6(): string;
    toString(options?: any): string;
    toBuffer(): Buffer;
}
export { IPAddress as IPAddressClass };
declare function IPAddressBuilder(Address: any, PrefixLength?: number): IPAddress;
export { IPAddressBuilder as IPAddress };
export declare class MACAddress {
    private _MAC;
    constructor(MAC?: Buffer | undefined);
    toString(): string;
    toBuffer(): Buffer;
    get empty(): boolean;
}
