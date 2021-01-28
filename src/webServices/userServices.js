import _ from  'lodash'

import { userRequestCheck } from '../config/constant'
import { Op } from 'sequelize'
import * as db from '../database/models'
import * as cache from '../cache'
import { xoaDau , removeTagHtml, removeJsScript} from '../utilities/stringHelpers'
import { Router } from 'express'
const cacheTime = 3600

//Sign-Up
const createUser = async(data)=>{
    if(!data.phonenumber){
        return { error : userRequestCheck.phonenumber}
    }
    data.phonenumber = removeTagHtml(data.phonenumber)
    if(!data.password){
        return { error : userRequestCheck.password}
    }
    data.password = removeTagHtml(data.password)

    if(!data.confirmpassword && data.password!=data.confirmpassword ){
        return { error : userRequestCheck.confrimpassword}
    }
    data.confirmpassword = removeTagHtml(data.confirmpassword)

    // console.log('aav',data)
    return await db.users.create(data)
}

//Login
// const loginUser = async(data)=>{
//     if(!data.phonenumber){
//         return { error : userRequestCheck.phonenumber }
//     }
//     data.phonenumber = removeTagHtml(data.phonenumber)
    
//     if(!data.password){
//         return { error : userRequestCheck.password }
//     }
//     data.password = removeTagHtml(data.password)
// }


export default {
    createUser,
    // loginUser
}