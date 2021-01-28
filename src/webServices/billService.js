import _ from 'lodash'

import { shipRequestCheck,billsRequestCheck, cartRequestCheck } from '../config/constant'
import { Op, Sequelize } from 'sequelize'
import * as db from '../database/models'
import * as cache from  '../cache'
import { xoaDau , removeTagHtml, removeJsScript } from '../utilities/stringHelpers'
const cacheTime = 3600

// const createShip = async (data)=>{
//     if(!data.nameship){
//         return { error : shipRequestCheck.nameship}
//     }
//     data.nameship = removeTagHtml(data.nameship)

//     if(!data.costship){
//         return { error : shipRequestCheck.costship}
//     }
//     data.costship = removeTagHtml(data.costship)

//     return await db.ships.create(data)
// }

// const createCart = async (data)=>{
//     console.log(data)
//     if(!data.userId){
//         return { error : shipRequestCheck.userId}
//     }
//     data.userId = removeTagHtml(data.userId)

//     if(!data.shipId){
//         return { error : shipRequestCheck.shipId}
//     }
//     data.shipId = removeTagHtml(data.shipId)

//     if(!data.bookId){
//         return { error : shipRequestCheck.bookId}
//     }
//     data.bookId = removeTagHtml(data.bookId)

//     if(!data.soluongdat){
//         return { error : shipRequestCheck.soluongdat}
//     }
//     data.soluongdat = removeTagHtml(data.soluongdat)

//     return await db.carts.create(data)
// }

const createBill = async (data)=>{
    if(!data.name){
        return { error : shipRequestCheck.name}
    }
    data.name = removeTagHtml(data.name)

    if(!data.address){
        return { error : shipRequestCheck.address}
    }
    data.address = removeTagHtml(data.address)

    if(!data.phonenumber){
        return { error : shipRequestCheck.phonenumber}
    }
    data.phonenumber = removeTagHtml(data.phonenumber)

    if(!data.cartId){
        return { error : shipRequestCheck.cartId}
    }
    data.cartId = removeTagHtml(data.cartId)

    return await db.bills.create(data)
}

//GetAddress
const getinfocustom = async (bookid)=>{
    const infocustom = await db.addresses.findOne({
    })
    return infocustom
}

//Get Cart
const getCart = async (data) =>{
    console.log('data',data)
    const infobook = await db.books.findAll({
        include: {
            model: db.bookcarts,
            required : true,
            // distinct : ['bookId']
            where : {
                userId : data
            }
        },

    })
    return infobook
}

//Get Distinct bookcarts
// const getDistinct = async () =>{
//     const distinbookcart = await db.bookcarts.findAll({
//         attribute : ['id','bookId'],
//         include :{
//             model: db.books,
//             attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('bookId')), 'image', 'title', 'cost']],
//             requied: true
//         }
//     })
// }

//Get Ship
const getShip = async () =>{
    const getship = await db.ships.findAll({
        // include:{
        //     model: db.bookcarts,
        //     required : true
        // }
    })
    return getship
}
// const getShipbookcart = async () =>{
//     const getship = await db.ships.findAll({
//         include:{
//             model: db.bookcarts,
//             required : true
//         }
//     })
//     return getship
// }

//Update Ship
const upShipId = async (data) =>{
    console.log(data)
    return await db.bookcarts.update({
        shipId: Number(data.shipId)
    },{
        where: {
            id : Number(data.id)
        }
    })
}
//ADD Address 
const createAdd = async (data)=>{
    console.log(data)
    return await db.addresses.create(data)
}


//ADD bills
const addbill = async (data)=>{
    console.log(data)
    return await db.bills.create(data)
}

//Get booksale 
// const getbooksale = async () =>{
//     return await db.books.findAll
// }


export default {
    // createCart,
    createBill,
    // createShip,
    getinfocustom,
    getCart,
    getShip,
    // getShipbookcart,
    upShipId,
    createAdd,
    addbill,
    // getDistinct
}