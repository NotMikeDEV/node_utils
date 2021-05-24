"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lock = void 0;
class Lock {
    constructor() {
        this.Queue = new Promise((resolve) => resolve());
    }
    Next() {
        return __awaiter(this, void 0, void 0, function* () {
            var Done = false;
            const Prev = this.Queue;
            this.Queue = new Promise((resolve) => Done = resolve);
            yield Prev;
            return Done;
        });
    }
}
exports.Lock = Lock;
//# sourceMappingURL=Lock.js.map