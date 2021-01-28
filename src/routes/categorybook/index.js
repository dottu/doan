import express from 'express'

import * as db from '../../database/models'
import catchHandle from './../../middlewares/catchHandle'
import * as eResponse from './../../config/eResponse'
import loaibookServices from './../../webServices/loaibookServices'
import bookServices from '../../webServices/bookServices'
// import loaibookServices from './../../webServices/loaibookServices'

const router = express.Router()

// router.get('/accsion',catchHandle(async(req,res) =>{
//     const accsion = await db.loaibooks.findAll({
//         include: {
//             model: db.books, 
//             required: true
//         }
//     })
//     console.log('ancav', accsion)
//     res.send(eResponse._errorByHand(accsion))
//     return accsion
// }))

// router.post('/loaibook', async(req,res)=>{
//     console.log(req.body)
//     const resAdd = await loaibookServices.createloaiBook(req.body)
//     if(!resAdd || resAdd.error){
//         return res.send(eResponse._errorByHand(!resAdd ? ' System Error ' : resAdd.error))
//     }
//     res.send(eResponse._success(resAdd))
// })

router.post('/ware', async(req,res)=>{
    console.log(req.body)
    const resAdd = await loaibookServices.createwarehouse(req.body)
    if(!resAdd || resAdd.error){
        return res.send(eResponse._errorByHand(!resAdd ? ' System Error ' : resAdd.error))
    }
    res.send(eResponse._success(resAdd))
})

// router.get('/accsion', catchHandle(async(req,res)=>{
//     const accsion = await db.loaibooks.findAll({
//         include: {
//             model: db.books,
//             requied : true
//         }
//     })
//     console.log('abcc', accsion)
//     res.send(eResponse._errorByHand(accsion))
//     return accsion;
// }))

//Create Sale GET
router.get('/create-sale', catchHandle(async(req,res)=>{
    const getbookid = await db.books.findAll({
        where : {
            status : 'publish'
        }
    })
    const getsale = await db.books.findAll({
        include : {
            model: db.sales,
            requied: true
        },
        where : {
            status : 'publish'
        }
    })  
    const getmagiamgia = await db.magiamgia.findAll({
        where : {
            status : "conhan",
        }
    })
    // res.send({view: getsale}0)
    res.render('create-sale',{book:getbookid,view: getsale, magiamgia : getmagiamgia})
}))
//Create Sale POST
router.post('/create-sale', catchHandle(async(req,res)=>{
    console.log(req.body)
    const resAddSale = await bookServices.createSale(req.body)
    res.redirect('/create-sale')
}))

//EDIT Sale
router.get('/create-sale/:id', catchHandle(async(req,res)=>{
    console.log(req.query)
    console.log(req.params)
    const getbookid = await db.books.findAll({
        where : {
            status : 'publish'
        }
    })
    const getsale = await db.books.findAll({
        include : {
            model: db.sales,
            requied: true,
        },
        where : {
            status : 'publish'
        }
    })
    const editsale = await db.books.findOne({
        include : {
            model: db.sales,
            requied: true,
        },
        where : {
            id : req.params.id
        }
    })
    // res.send(editsale)
    res.render('editsale',{book:getbookid,view: getsale, editsale: editsale})
}))

//Edit Sale
router.post('/create-sale/:id', catchHandle(async(req,res)=>{
    console.log(req.query)
    console.log(req.params)
    console.log(req.body)
    const Upsale = await bookServices.Upsale(req.body)
    res.redirect('/create-sale')
}))

//Delete Sale
router.get('/deletesale', catchHandle(async(req,res)=>{
    console.log(req.query)
    console.log(req.body),
    console.log(req.params)
    const removesale = await db.sales.destroy({
        where : {
            id : req.query.saleId
        }
    })
    const removebook = await db.books.destroy({
        where :{
            id: req.query.bookId
        }
    })
    const removewarehouse = await db.warehouse.destroy({
        where : {
            bookId : req.query.bookId
        }
    })
    return res.send(eResponse._success(removesale,removebook,removewarehouse))
}))


//Create MaGiamgia POST 
router.post('/create-magiamgia', catchHandle(async(req,res)=>{
    const resAddgiamgia = await bookServices.createGiamgia(req.body)
    res.redirect('/create-sale')
}))

//DELETE magiamgia
router.get('/deletemagiamgia', catchHandle(async(req,res)=>{
    const remove = await db.magiamgia.destroy({
        where :{
            id : req.query.id
        }
    })
    res.send(eResponse._success(remove))
}))


export default router