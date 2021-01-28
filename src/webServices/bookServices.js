
import _ from 'lodash'

import { BOOK_LIMIT,bookRequestCheck, loaibookRequestCheck } from '../config/constant'
import { Op } from 'sequelize'
import * as db from '../database/models'
import * as cache from '../cache'
import { xoaDau , removeTagHtml, removeJsScript, checkNameValid } from '../utilities/stringHelpers'
// import multer from 'multer'
const cacheTime = 3600



const createBook = async (data)=>{
    if(!data.loaibookId){
        return { error : bookRequestCheck.loai_bookId}
    }
    data.loaibookId = removeTagHtml(data.loaibookId)
    if(!data.image){
        return { error : bookRequestCheck.imageRequire }
    }
    data.image = data.image
    if(!data.title){
        return { error : bookRequestCheck.titleRequire }
    }
    data.title = removeTagHtml(data.title)
    if(!data.author){
        return { error : bookRequestCheck.authorId }
    }
    data.author = removeTagHtml(data.author)
    if(!data.cost){
        return { error : bookRequestCheck.costRequire }
    }
    data.cost = removeTagHtml(data.cost)

    return await db.books.create(data)
}

const getBook = async (keySearch=false, pageBook =1,data) =>{
    // const finbook = db.books.findOne({
    //     limit : BOOK_LIMIT
    // })
    // return finbook
    let where = {
        title: data,
        status : 'publish',
    }
    if(keySearch) {
        keySearch = removeTagHtml((xoaDau(keySearch), ' '))
        where.title = {
            [Op.substring]: removeTagHtml(keySearch)
        }
    }
    console.log('search',data)
    if(!pageBook){
        pageBook =1
    }
    const offsets = (pageBook - 1)*BOOK_LIMIT

    const keyCache = '__book_search_keysearch_'+keySearch+'_page_'+pageBook+'_offset_'+offsets
    console.log('keycache', keyCache)
    const cacheData = await cache.get(keyCache, true)
    console.log('cacheData', cacheData)
    if(cacheData){
        return cacheData
    }
    const books = await db.books.findAndCountAll({
        // attributes: ['id','loaibookId','image', 'title', 'status', 'author','cost' ,'createdAt', 'updatedAt'],

        where: {
            // [Op.or]:{
                status:where.status,
                // title: {
                //     [Op.startsWith]: '%'+where.title
                // }
            // }
        },
        include : {
            model: db.sales,
            requied : true
        },
        limit: BOOK_LIMIT,
        offset: offsets,
        order: [
          ['id', 'desc']
        ],
        // include: [
        //   {
        //     model: db.comment,
        //     where: {
        //       status: 'publish'
        //     },
        //     limit: COMMENT_SUB_LIMIT
        //   }
        // ]
    })
    books.pages = Math.ceil(books.count/BOOK_LIMIT)
    books.current = pageBook
    cache.set(keyCache, books, cacheTime, true)
    console.log('page', pageBook)
    
    // const searchbook = await db.books.findAndCountAll({
    //     attributes: ['id','loaibookId','image', 'title', 'status', 'author','cost' ,'createdAt', 'updatedAt'],
    //     where : {
    //         title: {
    //             [Op.startsWith]: '%'+where.title
    //         }
    //     },
    //     limit : BOOK_LIMIT,
    //     offset: offsets,
    // })
  
  return books;
}

//Search  
const searchbook = async (data,pageBook =1) =>{
    console.log('data', data)
    // const offsets = (pageBook - 1)*BOOK_LIMIT
    const search =  await db.books.findAndCountAll({
        attributes: ['id','loaibookId','image', 'title', 'status', 'author','cost' ,'createdAt', 'updatedAt'],
        where :{
            [Op.and]:{
                status : 'publish',
                title :{
                    [Op.startsWith]: '%'+data.q
                }
            }
        },
        // limit: BOOK_LIMIT,
        // offset: offsets
    })
    // search.pages = Math.ceil(search.count/BOOK_LIMIT)
    // search.current = pageBook
    return search;
}

//Get gia tri de view ra man Home
const getbooks = async () =>{
    const joinbook = db.books.findAll({
    })
    return joinbook;
}
const getinfobook = async (bookid) =>{
    const infobook = await db.books.findOne({
        where: {
            id: bookid
        }
    })
    return infobook
}

//Create Warehouse
const createWarehouse = async (objwarehouse) =>{
    console.log('warehouse', objwarehouse)
    return await db.warehouses.create(objwarehouse)
}

//Update Warehouse
const upsoluongton = async (obj) =>{
    console.log('upsoluongton',obj)
    return await db.warehouses.update(
        {
            soluongton : obj.soluongton
        },
        {
            where :{
                bookId : obj.bookId
            }
        }
    )
}

//Update BookCarts sop luong 
const upsoluongdat = async (obj) =>{
    console.log('obj', obj.soluongdat)
    let a = obj.soluongdat +1
    const upbookcart = await db.bookcarts.update(
        {
            soluongdat : a
        },
        {
            where : {
                [Op.and]:[{
                    bookId : obj.bookId,
                    userId : obj.userId
                }                    
                ]
            }
        }
    )
}

//Create sale
const createSale = async(sale) =>{
    console.log('createo day', sale)
    return await db.sales.create(sale)
}
// Update sale 
const Upsale = async (data)=>{
    console.log(data)
    return await db.sales.update(
        {
            namesale: data.namesale,
            sale: data.sale
        },
        {
            where :{
                bookId : data.bookId
            }
        }
    )
}

//Create Magiamgia 
const createGiamgia = async(giamgia)=>{
    console.log('create giamgia ', giamgia)
    return await db.magiamgia.create(giamgia)
}

//Create bookSale 
// const createbookSale = async(booksale) =>{
//     return await db.booksales.create(booksale)
// }

const getbookadmin = async(keySearch=false, pageBook=1,data) =>{
    const offsets = (pageBook - 1)*BOOK_LIMIT
    console.log("offsets", offsets)
    const keyCache = '__book_search_keysearch_'+keySearch+'_page_'+pageBook+'_offset_'+offsets
    console.log('keycache', keyCache)
    const cacheData = await cache.get(keyCache, true)
    console.log('cacheData', cacheData)

    const book = await db.loaibooks.findAndCountAll({
        include : {
            model : db.books,
            requied: true,
        },
        limit: BOOK_LIMIT,
        offset : offsets,
        order :[
            ['id', 'desc']
        ]
    })
    book.pages = Math.ceil(book.count/BOOK_LIMIT)
    book.current = pageBook
    return book
}

export default{
    createBook,
    getBook,
    getbooks,
    getinfobook,
    searchbook,
    createWarehouse,
    upsoluongton,
    upsoluongdat,
    createSale,
    createGiamgia,
    // createbookSale,
    Upsale,
    getbookadmin
}
