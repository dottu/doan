import express from 'express'

import * as db from '../../database/models'

import catchHandle from './../../middlewares/catchHandle'
import * as eResponse from './../../config/eResponse'
import billServices from './../../webServices/billService'
import cartServices from './../../webServices/cartService'
import bookServices from './../../webServices/bookServices'
import { Op, Sequelize } from 'sequelize'
import { forEach } from 'lodash'
const nodemailer = require("nodemailer")

const router = express.Router()

//Create Bill
router.post('/bill', catchHandle(async(req,res)=>{
    console.log(req.body)
    const resAdd = await billServices.createBill(req.body)
    console.log('abcbac', resAdd)
    if(!resAdd || resAdd.error){
        return res.send(eResponse._errorByHand(!resAdd ? ' System Error ' : resAdd.error))
    }
    res.send(eResponse._success(resAdd))
}))

//Create Cart
router.post('/cart', catchHandle(async(req,res)=>{
    console.log(req.body)
    const resAdd = await billServices.createCart(req.body)
    console.log('abcbac', resAdd)
    if(!resAdd || resAdd.error){
        return res.send(eResponse._errorByHand(!resAdd ? ' System Error ' : resAdd.error))
    }
    res.send(eResponse._success(resAdd))
}))

//Create Ship
router.post('/ship', catchHandle(async(req,res)=>{
    console.log(req.body)
    const resAdd = await billServices.createShip(req.body)
    console.log('abcbac', resAdd)
    if(!resAdd || resAdd.error){
        return res.send(eResponse._errorByHand(!resAdd ? ' System Error ' : resAdd.error))
    }
    res.send(eResponse._success(resAdd))
}))

//GET Cart
router.get('/gio-hang', catchHandle(async(req,res)=>{
    console.log(req.body)
    console.log(req.session)
    const infoAdd = await billServices.getinfocustom()
    const infoCart = await billServices.getCart(req.session.userId)
    let checkma = {}
    if(req.session.magiamgia){
        const checkmaa = await db.magiamgia.findOne({
            where : {
                    magiamgia: req.session.magiamgia,
            }
        })
        checkma = checkmaa
        console.log("checkma",checkmaa)
    }
    else{
        var checkmaa = {
            magiamgia: 0,
        }
        checkma = checkmaa
        console.log('checlmamasas',checkma)
    }
    res.render('cart',{address:infoAdd, cart:infoCart, checkma: checkma})
    // const infoShip = await billServices.getShip()
    // const indobookcart = await billServices.getDistinct()
    // res.send({address:infoAdd, cart:infoCart,checkma:checkma})
}))



//Tang - giam soluong
router.post('/tangsoluong', catchHandle( async ( req,res) =>{
    console.log(req.body)
    console.log('acv', req.session)
    req.session.bookcartid = req.body.id
    console.log(req.session.bookcartid)
    console.log('acv', req.session)
    const getsoluongton = await db.warehouses.findOne({
        attribute : ['soluongton'],
        where : {
            bookId : req.body.bookId
        }
    })
    let soluongconlai = Number(getsoluongton.soluongton - 1 )
    console.log('soluongconlai', soluongconlai)
    let obj = {
        bookId : req.body.bookId,
        soluongton : soluongconlai
    }
    const resUp = await cartServices.upsoluongdat(req.body)
    const resUpwarehouse = await bookServices.upsoluongton(obj)
    if(!resUp || resUp.error){
        return res.send(eResponse._errorByHan(!resUp ? 'System Error' : resUp.error))
    }
    res.send((eResponse._success(resUp)))
}))

router.get('/checkout', catchHandle( async( req,res)=>{
    const infoAdd = await billServices.getinfocustom()
    const infoCart = await billServices.getCart()
    const infoShip = await billServices.getShip()
    // const bookCartsShip = await billServices.getShipbookcart()
    res.render('bill',{address:infoAdd, cart:infoCart, ship:infoShip})
}))

//DELETE Products
router.get('/deleteproducts',catchHandle( async (req, res)=>{

    console.log(req.query.id)
    res.send('ok')
    return await db.bookcarts.destroy({
        where :{
            id : Number(req.query.id)
        }
    })
}))


//ADD BIll
router.post('/thanhtoan',catchHandle(async(req,res)=>{
    console.log(req.body)
    console.log(req.session)
    const getuserid = await db.users.findOne({
        where : {
            phonenumber : req.session.phone}
    })
    var userid = getuserid.id
    const getdescbookcart = await db.bookcarts.findAll({
        order:[
            ['id']
        ],
    })
    console.log('vao dayyyy', getdescbookcart)
    const reaAddress = await billServices.createAdd(req.body)
    const getdescadd = await db.addresses.findOne({
        order: [
            ['id', 'desc']
        ],
        limit: 1
    })
    var addid = getdescadd.id
    for(var i =0;i<getdescbookcart.length;i++){
        var listid = getdescbookcart[i].id
        // var addid = String(listid)
        var objbill = {
            userId: userid,
            // bookcartId: listid,
            bookId : getdescbookcart[i].bookId,
            soluongdat: getdescbookcart[i].soluongdat,
            addressId : addid
        }
        var objdeletebookcart = {
            bookcartId: listid
        }
        console.log('obj',objdeletebookcart)
        const deletebookcart = await db.bookcarts.destroy({
            where: {
                id: objdeletebookcart.bookcartId
            }
        })
        const resAddBill = await billServices.addbill(objbill)
        // res.send(eResponse._success(resAddBill))
    }


    //Send Mail 
    // var today = new Date();
    // const sendmail = 
    //     `<div>  
    //         <a href="localhost:2021"> Booking Online</a>
    //         <p> Chao ban </p>
    //         <h3> Thong tin nhan hang </h3>
    //         <ul>
    //             <li> Name: ${req.body.name} </li>
    //             <li> Email: ${req.body.email} </li>
    //             <li> Address: ${req.body.address} </li>
    //             <li> Phone: ${req.body.phonenumber} </li>
    //             <li> Ngay: ${today} </li>
    //         <p> Cam? on ban va chuc' ban. mot. ngay tot' lanh </p>
    //     </div>`
    //     ;
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com", // giao thuc smtp gmail
    //     port: 587, //cong port cua google
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: 'dottu99@gmail.com', //ten gmail da tao
    //         pass: 'wsjbyfwrltbeisqj', // mat khau da dao
    //     },tls: { // giao thuc bao ve du lieu khi di chuyen
    //             // do not fail on invalid certs
    //         rejectUnauthorized: false // khong that bai tren chung chi khong hop le
    //     }
    
    // });
    // let info = transporter.sendMail({
    //     from: '"Don Hang cua ban" ', // sender address
    //     to: "tudt72@wru.vn", // list gmail
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: sendmail, // html body
    //   });
    res.redirect('/gio-hang')
    // res.send(getinfobook)
}))

//Mã giảm giá
router.post('/magiamgia', catchHandle(async(req,res)=>{
    console.log('as',req.body)
    // const checkmagg = await db.magiamgia.findAll({
    //     where :{
    //         status: 'conhan'
    //     }
    // })
    // console.log('vo day', checkmagg)
    var magiamgia = req.body.magiamgia
    const checkmagg = await db.magiamgia.findOne({
        where : {
            magiamgia : magiamgia
        }
    })
    var giamgia = checkmagg.sotiengiam
    console.log('magiamgia', checkmagg)
    if(magiamgia == checkmagg.magiamgia){
        req.session.magiamgia = magiamgia
        res.send({giamgia,magiamgia})
    }
}))

//Thong tin donn hang vua dat
router.get('/thongtin-donhang', catchHandle( async (req,res) =>{
    
    // Lay thong tin book
    const getinfobook = await db.books.findAll({
        include: {
            model : db.bills,
            requied: true,
            where : {
                userId : req.session.userId
            }
        },

    })
    //Lay thong tin Address 
    const getaddress = await db.addresses.findAll({
        include : {
            model : db.bills,
            requied : true,
            where : {
                userId : req.session.userId
            }
        }
    })
    // res.send({infobook : getinfobook})
    // res.send({infobook : getinfobook, infoaddress: getaddress})
    res.render('infobill',{infobook : getinfobook, infoaddress: getaddress})

}))


export default router