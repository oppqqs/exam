const express = require('express');
const router = express.Router();

const asyncHandler = require('express-async-handler');
const db = require('../../db');

/* GET users listing. */

router.post('/', asyncHandler(async(req, res, next) => {
    let { token } = req.body;
    if (token) {
        let queryCheck = await db(`Select * from users Where login_token = '${token}' and admin = 1`);
        if (queryCheck.length < 1) {
            return res.json({ status: 0, message: '您沒有使用此功能的權限' });
        }
    } else {
        return res.json({ status: 0, message: '登入已逾時，請重新登入' });
    }
    try {
        let queryResult = await db(`Select * from product_sort where status = 0`);
        console.log(queryResult);
        console.log(queryResult.length);
        if (queryResult.length < 1) {
            return res.json({ status: 0, message: '目前沒有商品分類，請新增分類' });
        } else {
            return res.json({ status: 1, message: '資料獲取成功', productSorts: queryResult });
        }
    } catch (err) {
        next(err);
    }
}));

router.post('/add', asyncHandler(async(req, res, next) => {
    let { token, name } = req.body;
    if (token) {
        let queryCheck = await db(`Select * from users Where login_token = '${token}' and admin = 1`);
        if (queryCheck.length < 1) {
            return res.json({ status: 0, message: '您沒有使用此功能的權限' });
        }
    } else {
        return res.json({ status: 0, message: '登入已逾時，請重新登入' });
    }
    try {
        if (name) {
            db(`Insert into product_sort ( name ) Values ( ? )`, [name]);
            return res.json({ status: 1, message: '清單新增成功' });
        } else {
            return res.json({ status: 0, message: '請填寫清單名稱' });
        }
    } catch (err) {
        next(err);
    }
}));

router.post('/getChange', asyncHandler(async(req, res, next) => {
    let { token, sId } = req.body;
    if (token) {
        let queryCheck = await db(`Select * from users Where login_token = '${token}' and admin = 1`);
        if (queryCheck.length < 1) {
            return res.json({ status: 0, message: '您沒有使用此功能的權限' });
        }
    } else {
        return res.json({ status: 0, message: '登入已逾時，請重新登入' });
    }
    try {
        let queryResult = await db(`Select * from product_sort where id = ?`, [sId]);
        console.log(queryResult);
        console.log(queryResult.length);
        if (queryResult.length < 1) {
            return res.json({ status: 0, message: '目前沒有商品分類，請新增分類' });
        } else {
            return res.json({ status: 1, message: '資料獲取成功', productSorts: queryResult });
        }
    } catch (err) {
        next(err);
    }
}));

router.post('/update', asyncHandler(async(req, res, next) => {
    let { token, sId, name } = req.body;
    if (token) {
        let queryCheck = await db(`Select * from users Where login_token = '${token}' and admin = 1`);
        if (queryCheck.length < 1) {
            return res.json({ status: 0, message: '您沒有使用此功能的權限' });
        }
    } else {
        return res.json({ status: 0, message: '登入已逾時，請重新登入' });
    }
    try {
        if (name) {
            await db(`Update product_sort set name = ? where id = ?`, [name, sId]);
            return res.json({ status: 1, message: '商品列表更新成功' });
        } else {
            return res.json({ status: 0, message: '列表名稱未輸入' });
        }
    } catch (err) {
        next(err);
    }
}));

module.exports = router;