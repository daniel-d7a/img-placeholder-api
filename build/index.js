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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
// importing resize image, full and thumb images path
var helpers_1 = require("./helpers");
//initializing the express app
var app = (0, express_1.default)();
var port = 8080;
// the single route in the app
app.get("/images", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, imgName, imgWidth, imgHeight, images, fullName, thumbs, thumbName, ext, err_1, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, imgName = _a.name, imgWidth = _a.width, imgHeight = _a.height;
                // console.log({ imgName, imgWidth, imgHeight });
                // if any of the parameters is not found return
                if (!imgName)
                    return [2 /*return*/];
                if (!imgWidth)
                    return [2 /*return*/];
                if (!imgHeight)
                    return [2 /*return*/];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                return [4 /*yield*/, fs_1.promises.readdir(helpers_1.FULL_IMG_PATH)];
            case 2:
                images = _b.sent();
                fullName = images.find(function (fileName) {
                    return fileName.startsWith(imgName);
                });
                if (!fullName) return [3 /*break*/, 8];
                return [4 /*yield*/, fs_1.promises.readdir(helpers_1.THUMB_IMG_PATH)];
            case 3:
                thumbs = _b.sent();
                thumbName = thumbs.find(function (fileName) {
                    return fileName.startsWith(imgName);
                });
                ext = fullName.slice(-3);
                if (!!thumbName) return [3 /*break*/, 7];
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, (0, helpers_1.resizeImg)(imgName, imgWidth, imgHeight, ext)];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6:
                err_1 = _b.sent();
                res.status(500).send(err_1);
                return [3 /*break*/, 7];
            case 7:
                //return the thumb
                res.status(200).sendFile(path_1.default.join(helpers_1.THUMB_IMG_PATH, "".concat(imgName, "_thumb.").concat(ext)));
                return [3 /*break*/, 9];
            case 8:
                //tell the user
                res.status(404).send("file not found!");
                _b.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                err_2 = _b.sent();
                res.status(500).send(err_2);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
