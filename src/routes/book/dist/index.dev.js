"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var db = _interopRequireWildcard(require("../../database/models"));

var _catchHandle = _interopRequireDefault(require("./../../middlewares/catchHandle"));

var eResponse = _interopRequireWildcard(require("./../../config/eResponse"));

var _bookServices = _interopRequireDefault(require("../../webServices/bookServices"));

var _userServices = _interopRequireDefault(require("../../webServices/userServices"));

var _constant = require("../../config/constant");

var _checklogin = _interopRequireDefault(require("../../middlewares/checklogin"));

var _loaibookServices = _interopRequireDefault(require("./../../webServices/loaibookServices"));

var _sequelize = require("sequelize");

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import flash from 'express-flash'
var router = _express["default"].Router();

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + _path["default"].extname(file.originalname)); // console.log('asdasf',cb)
  }
});

var upload = (0, _multer["default"])({
  storage: storage
}); // console.log('upload', upload)
// const storage = multer.diskStorage({
//     destination: function (req,file, cb){
//         cb(null,'./public/uploads/')
//     },
//     filename: function (req,file, cb){
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
// const upload = multer({storage:storage})

router.get('/admin', (0, _catchHandle["default"])(function _callee(req, res) {
  var resAdd;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_bookServices["default"].getBook());

        case 2:
          resAdd = _context.sent;
          console.log('abc', resAdd); // res.send(eResponse._success(resAdd))

          res.render('index');

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}));
router.get('/sign-up', (0, _catchHandle["default"])(function _callee2(req, res) {
  var getuser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(db.users.findAll({}));

        case 2:
          getuser = _context2.sent;
          console.log('abc', getuser);
          res.render('sign-up', {
            users: getuser
          });
          return _context2.abrupt("return", getuser);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}));
router.post('/sign-up', (0, _catchHandle["default"])(function _callee3(req, res) {
  var getuser, resAdd;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.body);
          _context3.next = 3;
          return regeneratorRuntime.awrap(db.users.findOne({
            where: {
              phonenumber: req.body.phonenumber
            }
          }));

        case 3:
          getuser = _context3.sent;
          console.log('o day', getuser);

          if (!getuser) {
            _context3.next = 11;
            break;
          }

          console.log('vao if'); // var data = {
          //     nameinvalid: 'ten da ton tai'
          // }

          req.flash('loi', "có lỗi xảy ra");
          return _context3.abrupt("return", res.redirect('/sign-up'));

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap(_userServices["default"].createUser(req.body));

        case 13:
          resAdd = _context3.sent;

          if (!(!resAdd || resAdd.error)) {
            _context3.next = 16;
            break;
          }

          return _context3.abrupt("return", res.send(eResponse._errorByHand(!resAdd ? ' System Error' : res.error)));

        case 16:
          console.log('vao else');
          return _context3.abrupt("return", res.redirect('/login').send(eResponse._success(resAdd)));

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  });
}));
router.get('/table', (0, _catchHandle["default"])(function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.render('table');

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
})); //CREATE BOOK

router.get('/create-book', (0, _catchHandle["default"])(function _callee5(req, res) {
  var getSale, getbook;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(db.sales.findAll({}));

        case 2:
          getSale = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(_bookServices["default"].getbookadmin(req.query.keySearch, req.query.page));

        case 5:
          getbook = _context5.sent;
          // console.log('loai', getbook)
          // res.send({listbook:getbook.current})
          res.render('book', {
            listbook: getbook.rows,
            sale: getSale,
            pages: getbook.pages,
            a: getbook.current
          });
          return _context5.abrupt("return", getbook);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
}));
router.post('/create-book', upload.single('image'), (0, _catchHandle["default"])(function _callee6(req, res) {
  var resAdd, listbookId, objwarehouse, resAddwarehouse;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          // console.log('abc', req.file)
          console.log(req.body);
          console.log('hahah', req.body.loaibookId);
          req.body.image = req.file.filename;
          _context6.next = 5;
          return regeneratorRuntime.awrap(_bookServices["default"].createBook(req.body, req.body.image));

        case 5:
          resAdd = _context6.sent;
          _context6.next = 8;
          return regeneratorRuntime.awrap(db.books.findOne({
            order: [['id', 'desc']]
          }));

        case 8:
          listbookId = _context6.sent;
          console.log('reswarehouse', listbookId.id);
          objwarehouse = {
            bookId: String(listbookId.id),
            soluongton: req.body.soluongton
          }; //Insert warehouse

          _context6.next = 13;
          return regeneratorRuntime.awrap(_bookServices["default"].createWarehouse(objwarehouse));

        case 13:
          resAddwarehouse = _context6.sent;

          if (!(!resAdd || resAdd.error)) {
            _context6.next = 16;
            break;
          }

          return _context6.abrupt("return", res.send(eResponse._errorByHand(!resAdd ? ' System Error ' : resAdd.error)));

        case 16:
          // var booksale = {
          //     bookId : listbookId.id,
          //     saleId : req.body.saleId
          // }
          // //Insert booksale
          // const resAddbooksale = await bookServices.createbookSale(booksale)
          res.redirect('/create-book').send(eResponse._success(resAdd));

        case 17:
        case "end":
          return _context6.stop();
      }
    }
  });
})); //Delete Book

router.get('/deletebook', (0, _catchHandle["default"])(function _callee7(req, res) {
  var remove;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(db.books.destroy({
            where: {
              id: req.query.bookid
            }
          }));

        case 2:
          remove = _context7.sent;
          res.send(eResponse._success(remove));

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
})); //Create Category

router.get('/create-category', (0, _catchHandle["default"])(function _callee8(req, res) {
  var getcategory;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(db.loaibooks.findAll({}));

        case 2:
          getcategory = _context8.sent;
          // res.send({infobook:getcategory})
          res.render('categorycreate', {
            infobook: getcategory
          });

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
}));
router.post('/create-category', (0, _catchHandle["default"])(function _callee9(req, res) {
  var resAddCategory;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          console.log(req.body);
          _context9.next = 3;
          return regeneratorRuntime.awrap(_loaibookServices["default"].createloaiBook(req.body));

        case 3:
          resAddCategory = _context9.sent;
          res.redirect('/create-book');

        case 5:
        case "end":
          return _context9.stop();
      }
    }
  });
})); //DELETE Category

router.get('/deletecategory', (0, _catchHandle["default"])(function _callee10(req, res) {
  var remove, removetl;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(db.loaibooks.destroy({
            where: {
              id: req.query.id
            }
          }));

        case 2:
          remove = _context10.sent;
          _context10.next = 5;
          return regeneratorRuntime.awrap(db.books.destroy({
            where: {
              loaibookId: req.query.id
            }
          }));

        case 5:
          removetl = _context10.sent;
          res.send(eResponse._success(remove, removetl));

        case 7:
        case "end":
          return _context10.stop();
      }
    }
  });
})); //VIEW

router.get('/', _checklogin["default"], (0, _catchHandle["default"])(function _callee11(req, res) {
  var home, a;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          console.log('checklogin', req.session.phone);
          console.log(req.body);
          console.log(req.params);
          console.log(req.query);
          _context11.next = 6;
          return regeneratorRuntime.awrap(_bookServices["default"].getBook(req.query.keySearch, req.query.page));

        case 6:
          home = _context11.sent;
          // const abc = await bookServices.searchbook(req.query.search)
          // console.log('ahasd', {abc:home})
          //Search products 
          a = Number(home.current);
          console.log('a', a); // res.send(home)
          // var arr = []
          // for(var i =0; i <home.rows.length; i++){
          //     arr.push(home.rows[i].id)
          // }
          // console.log("aarr", arr)
          // res.send({book:home.rows,page: home.pages,a})

          res.render('view', {
            book: home.rows,
            page: home.pages,
            a: a
          });

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  });
}));
router.get('/thong-tin-book/:bookid', (0, _catchHandle["default"])(function _callee12(req, res) {
  var getsale, getinfo, getsluong;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          req.session.bookid = req.params.bookid;
          console.log(req.session);
          _context12.next = 4;
          return regeneratorRuntime.awrap(db.sales.findOne({
            where: {
              bookId: req.params.bookid
            }
          }));

        case 4:
          getsale = _context12.sent;
          _context12.next = 7;
          return regeneratorRuntime.awrap(_bookServices["default"].getinfobook(req.params.bookid));

        case 7:
          getinfo = _context12.sent;
          _context12.next = 10;
          return regeneratorRuntime.awrap(db.bookcarts.findAll({}));

        case 10:
          getsluong = _context12.sent;
          // var tongsoluong = 0
          // if(getsluong){
          //     for( var i = 0; i < getsluong.length; i++){
          //         tongsoluong = tongsoluong + getsluong[i].soluongdat
          //     }
          // }
          // console.log('vao tong soluong', tongsoluong)
          // console.log('vao day nha', req.session)
          res.render('infobook', {
            infobook: getinfo,
            sale: getsale
          }); // res.send({sale:getsale.sale})

        case 12:
        case "end":
          return _context12.stop();
      }
    }
  });
})); //Search 

router.get('/search', (0, _catchHandle["default"])(function _callee13(req, res) {
  var home, a, b;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          console.log(req.query);
          _context13.next = 3;
          return regeneratorRuntime.awrap(_bookServices["default"].searchbook(req.query));

        case 3:
          home = _context13.sent;
          a = Number(home.current);
          b = req.query.q; // console.log('a',a)
          // res.send({home})

          res.render('viewsearch', {
            book: home.rows,
            page: home.pages,
            a: a,
            b: b
          });

        case 7:
        case "end":
          return _context13.stop();
      }
    }
  });
})); //test OK

router.get('/test', (0, _catchHandle["default"])(function _callee14(req, res) {
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
        case "end":
          return _context14.stop();
      }
    }
  });
}));
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=index.dev.js.map
