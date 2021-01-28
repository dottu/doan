import express from 'express'

import * as db from '../../database/models'
import { Op } from 'sequelize'
import catchHandle from './../../middlewares/catchHandle'
import * as eResponse from './../../config/eResponse'
// import bookServices from './../../webServices/bookServices'
// import userServices from '../../webServices/userServices'
import cartServices from '../../webServices/cartService'
import bookServices from '../../webServices/bookServices'
import { BOOK_LIMIT, cartRequestCheck } from '../../config/constant'
import checklogin from '../../middlewares/checklogin'
import multer from 'multer'
import path from 'path'

const router = express.Router()

//Add Cart
router.post('/addcart', catchHandle(async (req,res)=>{

    console.log(req.session)
    console.log('bac',req.body)
    req.session.giasale = req.body.giasale
    var giasale = Number(req.body.giasale.replace(/\./g, ''))
  
    //lay BookcartId 
    const getbookcartid = await db.bookcarts.findOne({
        // attribute : ['id','cartId','bookId', 'soluongdat'],
        where :{
            [Op.and]: {
                bookId : req.session.bookid,
                userId : req.session.userId
            },
        },
        // order : [
        //     ['id', 'DESC']
        // ]
    })

    // viet ham kiem tra

    // kiem tra gio hang cua thang user hien tai tai co khong
    // if (co) {
    //     // tao du lieu va goi ham cap nhat
    // } else {
    //     // tao du lieu va tao gio hang cho user
    // }

    // kiem tra gio hang cua thang user hien tai tai co khong
    if(getbookcartid &&req.session.bookid == getbookcartid.bookId ){
        //     // tao du lieu va goi ham cap nhat
        const getsoluongton = await db.warehouses.findOne({
            attribute : ['soluongton'],
            where :{
                bookId : req.body.id
            }
        })

        //capnhat soluong
        var soluongconlai = Number(getsoluongton.soluongton) - Number(getbookcartid.soluongdat)
        console.log('soluongconlai', soluongconlai)
        //
        var obj = {
            bookId : req.body.id,
            soluongton : String(soluongconlai)
        }
        console.log('oas', obj)
        console.log('obj', objbookcart)

        // 
        var objupsoluong = {
            bookId: getbookcartid.bookId,
            userId : req.session.userId,
            soluongdat: getbookcartid.soluongdat,
            // giasale : res.session.giasale
        }
        console.log('objupsluong', objupsoluong)
        req.session.soluong = objupsoluong.soluongdat
        //update soluongdat in bookcarts
        const upbookcart = await bookServices.upsoluongdat(objupsoluong)
        console.log('vao if')
        //update soluongton in warehouses
        const resUpwarehouse = await bookServices.upsoluongton(obj)
    }
    else {

        //// tao du lieu va tao gio hang cho user

        const resAdd = await cartServices.createCart(req.body.name)
        //lay idgiohang cuoi cung
        const getDesc = await db.carts.findOne({
            order:[
                ['id', 'DESC']
            ] ,
            limit : 1
        })
        //lay userId dang duoc luu o session
        const getUserid = await db.users.findOne({
            attribute: ['id'],
            where :{
                phonenumber : req.session.phone
            }
        })
        console.log('vao` else', getUserid.id)
        req.session.userId = getUserid.id
        var a = String(getDesc.id)
        console.log('abcc',typeof getDesc.id)
        var objbookcart = {
            bookId: req.body.id,
            cartId: a,
            userId: getUserid.id,
            soluongdat : Number(req.body.soluongdat),
            giasale : giasale
        }
        req.session.soluong = objbookcart.soluongdat
        //tao gio hang
        const resAddbookcart = await cartServices.createBookCart(objbookcart)
        //Update soluongton
        const getsoluongton = await db.warehouses.findOne({
            attribute : ['soluongton'],
            where :{
                bookId : req.body.id
            }
        })
        var soluongconlai = Number(getsoluongton.soluongton - objbookcart.soluongdat )
        console.log('soluongconlai', soluongconlai)
        var obj = {
            bookId : req.body.id,
            soluongton : String(soluongconlai)
        }

        //update lai soluongton in warehouses
        const resUpwarehouse = await bookServices.upsoluongton(obj)
    }
    res.send('abc') 
}))




export default router