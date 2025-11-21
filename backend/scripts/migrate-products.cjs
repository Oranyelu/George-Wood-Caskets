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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
// Initialize Firebase Admin SDK
var serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
var productsData = [
    {
        name: "Emperor",
        slug: "emperor",
        label: "Xclusive",
        description: "A luxurious casket designed for the discerning individual.",
        price: 130000000,
        currency: "NGN",
        dimensions: { length: 198, width: 66, height: 58 },
        colors: ["Metallic Brown"],
        sizes: ["6.2ft"],
        status: "in_stock",
        availability: { leadTimeDays: 7 },
        stockQuantity: 10,
        images: ["products/emperor/image1.jpg", "products/emperor/image2.jpg"],
        thumbnail: "products/emperor/thumbnail.jpg",
        createdBy: "migration_script",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {
            tags: ["xclusive"],
            rating: 4.7,
            brand: "George Wood Caskets",
            estimatedDelivery: "3-7 business days",
            originalId: 1
        }
    },
    // ... more products ...
];
function migrateProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var productsCollection, _i, productsData_1, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productsCollection = db.collection('products');
                    _i = 0, productsData_1 = productsData;
                    _a.label = 1;
                case 1:
                    if (!(_i < productsData_1.length)) return [3 /*break*/, 4];
                    product = productsData_1[_i];
                    return [4 /*yield*/, productsCollection.doc(product.slug).set(product)];
                case 2:
                    _a.sent();
                    console.log("Migrated product: ".concat(product.name));
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('Product migration completed.');
                    return [2 /*return*/];
            }
        });
    });
}
migrateProducts().catch(console.error);
