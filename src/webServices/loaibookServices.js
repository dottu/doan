import _, { identity } from 'lodash'

import { loaibookRequestCheck , warehouseRequestCheck } from '../config/constant'
import { Op } from 'sequelize'
import * as db from '../database/models'
import * as cache from '../cache'
import { xoaDau , removeTagHtml, removeJsScript, checkNameValid } from '../utilities/stringHelpers'

const createloaiBook = async (data)=>{
    // if(!data.bookid){
    //     return { error : loaibookRequestCheck.bookid }
    // }
    // data.bookid = data.bookid
    console.log(data)
    if(!data.namecategory){
        return {error : loaibookRequestCheck.bookid}
    }
    data.namecategory = removeTagHtml(data.namecategory)

    return await db.loaibooks.create(data)
}

const createwarehouse = async (data)=>{
    if(!data.book_id){
        return { error : warehouseRequestCheck.book_id }
    }
    data.book_id = data.book_id

    if(!data.soluongton){
        return {error : warehouseRequestCheck.bookid}
    }
    data.soluongton = removeTagHtml(data.soluongton)

    return await db.warehouses.create(data)
}

export default {
    createloaiBook,
    createwarehouse
}