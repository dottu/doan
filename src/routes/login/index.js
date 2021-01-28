import express from 'express'

import * as db from '../../database/models'
import catchHandle from './../../middlewares/catchHandle'
import * as eResponse from './../../config/eResponse'
import userServices from '../../webServices/userServices'
import { phone } from 'faker'
import alert from'alert'; 

const router = express.Router()

router.get('/logout',(req,res)=>{
    // console.log('aaaaa', req.session)
    console.log('ress',req.session)
    req.session.destroy(function(err){
        return res.status(200).redirect('/login');
    })
})

//LOGIN
router.get('/login',catchHandle( async(req,res)=>{
    console.log(req.body)
    console.log(req.query)
    console.log(req.params)
    console.log(req.session)
    var phone = req.session.phone
    if(req.session.phone){
        const userLogin = await db.users.findOne({
            where :{
                phonenumber : phone
            }
        })
        console.log('suse',userLogin)
        res.render('login',{userLogin})
    }else{
        res.render('login')
    }
    // res.render('login')
}))

router.post('/login',catchHandle( async (req,res)=>{
    console.log(req.body)
    var phone = req.body.phonenumber
    var password = req.body.password

    // console.log('phone',userLogin[0].phonenumber)

    if(phone && password ){
        const userLogin = await db.users.findAll({
            where : {
                phonenumber : phone,
                password : password
            },
        })
        if(userLogin.length >0){
            req.session.phone = phone
            req.session.password = true
            req.session.userId = userLogin[0].id
            console.log('o dat',req.session)
            res.redirect('/')
            // res.send('oke')
        }
        else{
            req.session.phone = phone
            console.log('o day ')
            // alert('tài khoản hoặc mật khẩu không chính xác')
            req.flash('loi','Có lỗi xảy ra')
            res.redirect('/login')
            // res.send('<h2> co loi xay ra </h2>')

        }
    }
    else{
        res.redirect('/login')
    }
}))

router.get('/deleteuser', catchHandle( async(req, res)=>{
    console.log(req.body)
    console.log(req.query)
    var iduser = req.query.id
    const remove = await db.users.destroy({
        where : {
            id : iduser
        }
    })
    res.send('ok')
}))




export default router