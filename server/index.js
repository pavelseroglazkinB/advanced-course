import express from "express";
import cors from "cors";
import { writeFile, readFile } from 'fs/promises';

const BASKET = './public/basket_goods.json';
const GOODS = './public/goods.json';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

function getReformBasket() {
    return Promise.all([
        readBasket(),
        readGoods()
    ]).then(([basketList, goodsList]) => {
        const result = basketList.map((basketItem) => {
            const goodsItem = goodsList.find(({ id: _goodsId }) => {
                return _goodsId === basketItem.id;
            });
            return {
                ...basketItem,
                ...goodsItem
            }
        })
        return result;
    });
}

app.post('/basket', (res, reg) => {
    readBasket().then((basket) => {
        const basketItem = basket.find(({ id: _id }) => _id === res.body.id);
        if (!basketItem) {
            basket.push({
                id: res.body.id,
                count: 1,
            })
        } else {
            basket = basket.map((basketItem) => {
                if (basketItem.id === res.body.id) {
                    return {
                        ...basketItem,
                        count: basketItem.count + 1
                    }
                } else {
                    return basketItem;
                }
            })
        }
        return writeFile(BASKET, JSON.stringify(basket)).then(() => {
            return getReformBasket()
        }).then((result) => {
            reg.send(result);
        })
    })
})

app.delete('/basket', (res, reg) => {
    readBasket().then((basket) => {
        const basketItem = basket.find(({ id: _id }) => _id === res.body.id);
        if (!basketItem) {
            basket.push({
                id: res.body.id,
                const: 0,
            })
        } else {
            basket = basket.map((basketItem) => {
                if (basketItem.id === res.body.id) {
                    return {
                        ...basketItem,
                        count: basketItem.count - 1
                    }
                } else {
                    return basketItem
                }
            })
        }
        return writeFile(BASKET, JSON.stringify(basket)).then(() => {
            return getReformBasket()
        }).then((result) => {
            reg.send(result);
        })
    })
})

const readBasket = () => readFile(BASKET, 'utf-8')
    .then((basketFile) => {
        return JSON.parse(basketFile);
    })
const readGoods = () => readFile(GOODS, 'utf-8')
    .then((basketFile) => {
        return JSON.parse(basketFile);
    })

app.get('/basket', (req, res) => {
    /*Promise.all([
        readBasket(),
        readGoods()
    ]).then(([basketList, goodsList]) => {
        return basketList.map((basketItem) => {
            const goodsItem = goodsList.find(({ id: _goodsId }) => {
                return _goodsId === basketItem.id;
            });
            return {
                ...basketItem,
                ...goodsItem
            }
        })
    }).then((result) => {
        res.send(JSON.stringify(result));
    })*/
    getReformBasket().then((result) => {
        res.send(JSON.stringify(result))
    })

});

app.listen('8000', () => {
    console.log('server is starting!');
});