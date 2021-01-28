"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _constant = require("../config/constant");

var _sequelize = require("sequelize");

var db = _interopRequireWildcard(require("../database/models"));

var cache = _interopRequireWildcard(require("../cache"));

var _stringHelpers = require("../utilities/stringHelpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cacheTime = 3600;

var createBook = function createBook(data) {
  return regeneratorRuntime.async(function createBook$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (data.loaibookId) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", {
            error: _constant.bookRequestCheck.loai_bookId
          });

        case 2:
          data.loaibookId = (0, _stringHelpers.removeTagHtml)(data.loaibookId);

          if (data.image) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", {
            error: _constant.bookRequestCheck.imageRequire
          });

        case 5:
          data.image = data.image;

          if (data.title) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", {
            error: _constant.bookRequestCheck.titleRequire
          });

        case 8:
          data.title = (0, _stringHelpers.removeTagHtml)(data.title);

          if (data.author) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", {
            error: _constant.bookRequestCheck.authorId
          });

        case 11:
          data.author = (0, _stringHelpers.removeTagHtml)(data.author);

          if (data.cost) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", {
            error: _constant.bookRequestCheck.costRequire
          });

        case 14:
          data.cost = (0, _stringHelpers.removeTagHtml)(data.cost);
          _context.next = 17;
          return regeneratorRuntime.awrap(db.books.create(data));

        case 17:
          return _context.abrupt("return", _context.sent);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getBook = function getBook() {
  var keySearch,
      pageBook,
      data,
      where,
      offsets,
      keyCache,
      cacheData,
      books,
      _args2 = arguments;
  return regeneratorRuntime.async(function getBook$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          keySearch = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
          pageBook = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 1;
          data = _args2.length > 2 ? _args2[2] : undefined;
          // const finbook = db.books.findOne({
          //     limit : BOOK_LIMIT
          // })
          // return finbook
          where = {
            title: data,
            status: 'publish'
          };

          if (keySearch) {
            keySearch = (0, _stringHelpers.removeTagHtml)(((0, _stringHelpers.xoaDau)(keySearch), ' '));
            where.title = _defineProperty({}, _sequelize.Op.substring, (0, _stringHelpers.removeTagHtml)(keySearch));
          }

          console.log('search', data);

          if (!pageBook) {
            pageBook = 1;
          }

          offsets = (pageBook - 1) * _constant.BOOK_LIMIT;
          keyCache = '__book_search_keysearch_' + keySearch + '_page_' + pageBook + '_offset_' + offsets;
          console.log('keycache', keyCache);
          _context2.next = 12;
          return regeneratorRuntime.awrap(cache.get(keyCache, true));

        case 12:
          cacheData = _context2.sent;
          console.log('cacheData', cacheData);

          if (!cacheData) {
            _context2.next = 16;
            break;
          }

          return _context2.abrupt("return", cacheData);

        case 16:
          _context2.next = 18;
          return regeneratorRuntime.awrap(db.books.findAndCountAll({
            // attributes: ['id','loaibookId','image', 'title', 'status', 'author','cost' ,'createdAt', 'updatedAt'],
            where: {
              // [Op.or]:{
              status: where.status // title: {
              //     [Op.startsWith]: '%'+where.title
              // }
              // }

            },
            include: {
              model: db.sales,
              requied: true
            },
            limit: _constant.BOOK_LIMIT,
            offset: offsets,
            order: [['id', 'desc']] // include: [
            //   {
            //     model: db.comment,
            //     where: {
            //       status: 'publish'
            //     },
            //     limit: COMMENT_SUB_LIMIT
            //   }
            // ]

          }));

        case 18:
          books = _context2.sent;
          books.pages = Math.ceil(books.count / _constant.BOOK_LIMIT);
          books.current = pageBook;
          cache.set(keyCache, books, cacheTime, true);
          console.log('page', pageBook); // const searchbook = await db.books.findAndCountAll({
          //     attributes: ['id','loaibookId','image', 'title', 'status', 'author','cost' ,'createdAt', 'updatedAt'],
          //     where : {
          //         title: {
          //             [Op.startsWith]: '%'+where.title
          //         }
          //     },
          //     limit : BOOK_LIMIT,
          //     offset: offsets,
          // })

          return _context2.abrupt("return", books);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //Search  


var searchbook = function searchbook(data) {
  var pageBook,
      search,
      _args3 = arguments;
  return regeneratorRuntime.async(function searchbook$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          pageBook = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 1;
          console.log('data', data); // const offsets = (pageBook - 1)*BOOK_LIMIT

          _context3.next = 4;
          return regeneratorRuntime.awrap(db.books.findAndCountAll({
            attributes: ['id', 'loaibookId', 'image', 'title', 'status', 'author', 'cost', 'createdAt', 'updatedAt'],
            where: _defineProperty({}, _sequelize.Op.and, {
              status: 'publish',
              title: _defineProperty({}, _sequelize.Op.startsWith, '%' + data.q)
            }) // limit: BOOK_LIMIT,
            // offset: offsets

          }));

        case 4:
          search = _context3.sent;
          return _context3.abrupt("return", search);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //Get gia tri de view ra man Home


var getbooks = function getbooks() {
  var joinbook;
  return regeneratorRuntime.async(function getbooks$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          joinbook = db.books.findAll({});
          return _context4.abrupt("return", joinbook);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var getinfobook = function getinfobook(bookid) {
  var infobook;
  return regeneratorRuntime.async(function getinfobook$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(db.books.findOne({
            where: {
              id: bookid
            }
          }));

        case 2:
          infobook = _context5.sent;
          return _context5.abrupt("return", infobook);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}; //Create Warehouse


var createWarehouse = function createWarehouse(objwarehouse) {
  return regeneratorRuntime.async(function createWarehouse$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          console.log('warehouse', objwarehouse);
          _context6.next = 3;
          return regeneratorRuntime.awrap(db.warehouses.create(objwarehouse));

        case 3:
          return _context6.abrupt("return", _context6.sent);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}; //Update Warehouse


var upsoluongton = function upsoluongton(obj) {
  return regeneratorRuntime.async(function upsoluongton$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          console.log('upsoluongton', obj);
          _context7.next = 3;
          return regeneratorRuntime.awrap(db.warehouses.update({
            soluongton: obj.soluongton
          }, {
            where: {
              bookId: obj.bookId
            }
          }));

        case 3:
          return _context7.abrupt("return", _context7.sent);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}; //Update BookCarts sop luong 


var upsoluongdat = function upsoluongdat(obj) {
  var a, upbookcart;
  return regeneratorRuntime.async(function upsoluongdat$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          console.log('obj', obj.soluongdat);
          a = obj.soluongdat + 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(db.bookcarts.update({
            soluongdat: a
          }, {
            where: _defineProperty({}, _sequelize.Op.and, [{
              bookId: obj.bookId,
              userId: obj.userId
            }])
          }));

        case 4:
          upbookcart = _context8.sent;

        case 5:
        case "end":
          return _context8.stop();
      }
    }
  });
}; //Create sale


var createSale = function createSale(sale) {
  return regeneratorRuntime.async(function createSale$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          console.log('createo day', sale);
          _context9.next = 3;
          return regeneratorRuntime.awrap(db.sales.create(sale));

        case 3:
          return _context9.abrupt("return", _context9.sent);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
}; // Update sale 


var Upsale = function Upsale(data) {
  return regeneratorRuntime.async(function Upsale$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          console.log(data);
          _context10.next = 3;
          return regeneratorRuntime.awrap(db.sales.update({
            namesale: data.namesale,
            sale: data.sale
          }, {
            where: {
              bookId: data.bookId
            }
          }));

        case 3:
          return _context10.abrupt("return", _context10.sent);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
}; //Create Magiamgia 


var createGiamgia = function createGiamgia(giamgia) {
  return regeneratorRuntime.async(function createGiamgia$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          console.log('create giamgia ', giamgia);
          _context11.next = 3;
          return regeneratorRuntime.awrap(db.magiamgia.create(giamgia));

        case 3:
          return _context11.abrupt("return", _context11.sent);

        case 4:
        case "end":
          return _context11.stop();
      }
    }
  });
}; //Create bookSale 
// const createbookSale = async(booksale) =>{
//     return await db.booksales.create(booksale)
// }


var getbookadmin = function getbookadmin() {
  var keySearch,
      pageBook,
      data,
      offsets,
      keyCache,
      cacheData,
      book,
      _args12 = arguments;
  return regeneratorRuntime.async(function getbookadmin$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          keySearch = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : false;
          pageBook = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : 1;
          data = _args12.length > 2 ? _args12[2] : undefined;
          offsets = (pageBook - 1) * _constant.BOOK_LIMIT;
          console.log("offsets", offsets);
          keyCache = '__book_search_keysearch_' + keySearch + '_page_' + pageBook + '_offset_' + offsets;
          console.log('keycache', keyCache);
          _context12.next = 9;
          return regeneratorRuntime.awrap(cache.get(keyCache, true));

        case 9:
          cacheData = _context12.sent;
          console.log('cacheData', cacheData);
          _context12.next = 13;
          return regeneratorRuntime.awrap(db.loaibooks.findAndCountAll({
            include: {
              model: db.books,
              requied: true
            },
            limit: _constant.BOOK_LIMIT,
            offset: offsets,
            order: [['id', 'desc']]
          }));

        case 13:
          book = _context12.sent;
          book.pages = Math.ceil(book.count / _constant.BOOK_LIMIT);
          book.current = pageBook;
          return _context12.abrupt("return", book);

        case 17:
        case "end":
          return _context12.stop();
      }
    }
  });
};

var _default = {
  createBook: createBook,
  getBook: getBook,
  getbooks: getbooks,
  getinfobook: getinfobook,
  searchbook: searchbook,
  createWarehouse: createWarehouse,
  upsoluongton: upsoluongton,
  upsoluongdat: upsoluongdat,
  createSale: createSale,
  createGiamgia: createGiamgia,
  // createbookSale,
  Upsale: Upsale,
  getbookadmin: getbookadmin
};
exports["default"] = _default;
//# sourceMappingURL=bookServices.dev.js.map
