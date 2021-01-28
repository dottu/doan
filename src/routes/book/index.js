import express from 'express'

import * as db from '../../database/models'
import catchHandle from './../../middlewares/catchHandle'
import * as eResponse from './../../config/eResponse'
import bookServices from '../../webServices/bookServices'
import userServices from '../../webServices/userServices'
import { BOOK_LIMIT } from '../../config/constant'
import checklogin from '../../middlewares/checklogin'
import loaibookServices from './../../webServices/loaibookServices'
import { Op } from 'sequelize'
import multer from 'multer'
import path from 'path'
// import flash from 'express-flash'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        // console.log('asdasf',cb)
    },
    
})

const upload = multer({storage:storage})
// console.log('upload', upload)

// const storage = multer.diskStorage({
//     destination: function (req,file, cb){
//         cb(null,'./public/uploads/')
//     },
//     filename: function (req,file, cb){
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
// const upload = multer({storage:storage})

router.get('/admin', catchHandle(async (req,res)=>{
    // const resAdd = await bookServices.getjoinloaibook()
    // console.log('abc', resAdd)
    // res.send(eResponse._success(resAdd))
    // res.render('index',resAdd)
    const resAdd = await bookServices.getBook()
    console.log('abc', resAdd)
    // res.send(eResponse._success(resAdd))
    res.render('index')
}))

router.get('/sign-up', catchHandle(async (req,res)=>{
    const getuser = await db.users.findAll({

    })
    console.log('abc', getuser)
    res.render('sign-up',{users:getuser})
    return getuser;
}))

router.post('/sign-up', catchHandle(async (req,res)=>{
    console.log(req.body)

    const getuser = await db.users.findOne({
        where : {
            phonenumber : req.body.phonenumber
        }
    })
    console.log('o day', getuser)
    if(getuser){
        console.log('vao if')
        // var data = {
        //     nameinvalid: 'ten da ton tai'
        // }
        req.flash('loi', "có lỗi xảy ra")
        return res.redirect('/sign-up')
    }else{
        const resAdd = await userServices.createUser(req.body)
        if(!resAdd || resAdd.error){
            return res.send(eResponse._errorByHand(!resAdd ? ' System Error' : res.error))
        }
        console.log('vao else')
        return res.redirect('/login').send(eResponse._success(resAdd)) 
    }
}))

router.get('/table',catchHandle( async (req,res) =>{
    res.render('table')
}))



//CREATE BOOK
router.get('/create-book', catchHandle( async (req,res)=>{
    // const getbook = await db.loaibooks.findAndCountAll({
    //     include : {
    //         model : db.books,
    //         requied: true
    //     },
    //     limit : BOOK_LIMIT,
    //     of
    // })
    const getSale = await db.sales.findAll({
    })
    const getbook = await bookServices.getbookadmin(req.query.keySearch,req.query.page)
    // console.log('loai', getbook)
    // res.send({listbook:getbook.current})
    res.render('book',{listbook:getbook.rows, sale:getSale, pages : getbook.pages, a: getbook.current})
    return getbook;
}))
router.post('/create-book',upload.single('image'),catchHandle( async (req, res)=>{

    // console.log('abc', req.file)
    console.log(req.body)
    console.log('hahah', req.body.loaibookId)
    req.body.image = req.file.filename
    const resAdd = await bookServices.createBook(req.body,req.body.image)
    const listbookId = await db.books.findOne({
        order :
            [['id', 'desc']]
        
    })
    console.log('reswarehouse', listbookId.id)
    var objwarehouse = {
        bookId : String(listbookId.id),
        soluongton : req.body.soluongton
    }
    //Insert warehouse
    const resAddwarehouse = await bookServices.createWarehouse(objwarehouse)
    // console.log('abcbac', resAdd)
    if(!resAdd || resAdd.error){
        return res.send(eResponse._errorByHand(!resAdd ? ' System Error ' : resAdd.error))
    }

    // var booksale = {
    //     bookId : listbookId.id,
    //     saleId : req.body.saleId
    // }
    // //Insert booksale
    // const resAddbooksale = await bookServices.createbookSale(booksale)
    res.redirect('/create-book').send(eResponse._success(resAdd))

}))

//Delete Book
router.get('/deletebook', catchHandle(async(req,res)=>{
    const remove = await db.books.destroy({
        where :{
            id : req.query.bookid
        }
    })
    res.send(eResponse._success(remove))
}))


//Create Category
router.get('/create-category', catchHandle( async (req,res)=>{
    const getcategory = await db.loaibooks.findAll({
        
    })
    // res.send({infobook:getcategory})
    res.render('categorycreate',{infobook:getcategory})
}))
router.post('/create-category', catchHandle( async (req,res)=>{
    console.log(req.body)
    const resAddCategory = await loaibookServices.createloaiBook(req.body)
    res.redirect('/create-book')
}))

//DELETE Category
router.get('/deletecategory',catchHandle(async (req,res)=>{
    const remove = await db.loaibooks.destroy({
        where :{
            id : req.query.id
        }
    })
    const removetl = await db.books.destroy({
        where : {
            loaibookId : req.query.id
        }
    })
    res.send(eResponse._success(remove,removetl))
}))

//VIEW
router.get('/',checklogin,catchHandle(async(req,res)=>{
    console.log('checklogin', req.session.phone)
    console.log(req.body)
    console.log(req.params)
    console.log(req.query)
    const home = await bookServices.getBook(req.query.keySearch,req.query.page)
    // const abc = await bookServices.searchbook(req.query.search)
    // console.log('ahasd', {abc:home})
        //Search products 

    var a = Number(home.current)
    console.log('a',a)
    // res.send(home)
    // var arr = []
    // for(var i =0; i <home.rows.length; i++){
    //     arr.push(home.rows[i].id)
    // }
    // console.log("aarr", arr)
    // res.send({book:home.rows,page: home.pages,a})

    res.render('view',{book:home.rows,page: home.pages,a})
}))

router.get('/thong-tin-book/:bookid', catchHandle( async (req,res)=>{
    req.session.bookid = req.params.bookid
    console.log(req.session) 
    const getsale = await db.sales.findOne({
        where :{
            bookId : req.params.bookid
        }
    })

    const getinfo = await bookServices.getinfobook(req.params.bookid)
    const getsluong = await db.bookcarts.findAll({
    })
    // var tongsoluong = 0
    // if(getsluong){
    //     for( var i = 0; i < getsluong.length; i++){
    //         tongsoluong = tongsoluong + getsluong[i].soluongdat
    //     }
    // }
    // console.log('vao tong soluong', tongsoluong)
    // console.log('vao day nha', req.session)
    res.render('infobook',{infobook:getinfo,sale : getsale})
    // res.send({sale:getsale.sale})
}))


//Search 
router.get('/search', catchHandle (async (req,res)=>{
    console.log(req.query)
    const home = await bookServices.searchbook(req.query)
    var a = Number(home.current)
    var b = req.query.q
    // console.log('a',a)
    // res.send({home})
    res.render('viewsearch',{book:home.rows,page : home.pages,a,b})
}))



//test OK

router.get('/test', catchHandle(async(req,res)=>{
    // function primeArray(arr){
    //     var arr = [1,3,5,7]
    //     for(var i =0; i <arr.length; i++){
    //         if(arr[i] == 1){
    //             return primeArray = false
    //         }
    //         else{
    //             return primeArray = true
    //         }
    //     }
    // }
    // console.log(primeArray())
}))



export default router