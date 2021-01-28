"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookcartRequestCheck = exports.warehouseRequestCheck = exports.billsRequestCheck = exports.userRequestCheck = exports.shipRequestCheck = exports.providerRequestCheck = exports.cartRequestCheck = exports.loaibookRequestCheck = exports.bookRequestCheck = exports.timezone = exports.COMMENT_SUB_LIMIT = exports.COMMENT_LIMIT = exports.LOAIBOOK_LIMIT = exports.BOOK_LIMIT = exports.ENABLE_TEMPLATE_FULL = exports.ENABLE_CACHE = void 0;

var _express = _interopRequireDefault(require("express"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ENABLE_CACHE = true;
exports.ENABLE_CACHE = ENABLE_CACHE;
var ENABLE_TEMPLATE_FULL = true;
exports.ENABLE_TEMPLATE_FULL = ENABLE_TEMPLATE_FULL;
var BOOK_LIMIT = 6;
exports.BOOK_LIMIT = BOOK_LIMIT;
var LOAIBOOK_LIMIT = 5;
exports.LOAIBOOK_LIMIT = LOAIBOOK_LIMIT;
var COMMENT_LIMIT = 8;
exports.COMMENT_LIMIT = COMMENT_LIMIT;
var COMMENT_SUB_LIMIT = 5;
exports.COMMENT_SUB_LIMIT = COMMENT_SUB_LIMIT;
var timezone = '+07:00'; // export const articleRequestCheck = {
//   titleRequire: 'title is required',
//   contentRequire: 'content is required',
//   authorRequire: 'author is required',
//   authorInvalid: "author can only contain alphabetic characters, spaces (0 - any ), hyphens (0 - any), apostrophes ' (0 - any ) and number of symbols 1 - 40. First and Last name can not start with ' or whitespace"
// }
// export const commentRequestCheck = {
//   articleIdRequire: 'articleId is required',
//   contentMessageRequire: 'contentMessage is required',
//   guestNameRequire: 'guestName is required',
//   parentGuestNameRequire: 'parentGuestName is required',
//   guestNameInvalid: "guestName can only contain alphabetic characters, spaces (0 - any ), hyphens (0 - any), apostrophes ' (0 - any ) and number of symbols 1 - 40. First and Last name can not start with ' or whitespace",
//   parentGuestNameInvalid: "parentGuestName can only contain alphabetic characters, spaces (0 - any ), hyphens (0 - any), apostrophes ' (0 - any ) and number of symbols 1 - 40. First and Last name can not start with ' or whitespace",
// }

exports.timezone = timezone;
var bookRequestCheck = {
  imageRequire: 'Image is requied',
  titleRequire: 'Title is requied',
  author: 'Author is requied',
  costRequire: 'ProviderId is requied',
  loai_bookId: 'loaibookid is requied'
};
exports.bookRequestCheck = bookRequestCheck;
var loaibookRequestCheck = {
  nameCategory: 'nameCategory is requied' // bookId : 'bookid is requied',

};
exports.loaibookRequestCheck = loaibookRequestCheck;
var cartRequestCheck = {
  // bookid : 'bookid is requied',
  // shipid : ' shipid is requied',
  nameRequest: 'Name is requied'
};
exports.cartRequestCheck = cartRequestCheck;
var providerRequestCheck = {
  nameproviders: 'nameproviders is requied'
};
exports.providerRequestCheck = providerRequestCheck;
var shipRequestCheck = {
  userId: 'userId is requied',
  shipId: 'shipId is requied',
  bookId: 'bookId is requied',
  nameships: 'nameships is requied',
  costship: 'costship is requied'
};
exports.shipRequestCheck = shipRequestCheck;
var userRequestCheck = {
  phonenumber: 'phonenumber is requied',
  password: 'password is requied',
  confirmpassword: 'Confirmpassword is requied'
};
exports.userRequestCheck = userRequestCheck;
var billsRequestCheck = {
  name: 'name is requied',
  address: 'address is requied',
  phonenumber: 'phonenumber is requied',
  giohang_id: 'giohang_id is requied'
};
exports.billsRequestCheck = billsRequestCheck;
var warehouseRequestCheck = {
  book_id: 'bookid is requied',
  soluongton: 'Soluongton is requied'
};
exports.warehouseRequestCheck = warehouseRequestCheck;
var bookcartRequestCheck = {
  book_id: 'bookId is requied',
  cart_id: 'cartId is requied',
  soluongdatRequired: 'Soluongdat is required'
};
exports.bookcartRequestCheck = bookcartRequestCheck;
//# sourceMappingURL=constant.dev.js.map
