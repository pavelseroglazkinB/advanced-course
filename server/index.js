import express from "express";
import cors from "cors";
import { writeFile, readFile } from 'fs/promises';

const BASKET = './public/basket_goods.json';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


app.get('/basket', (req, res) => {
    readFile(BASKET, 'utf-8')
        .then((basketFile) => {
            return JSON.parse(basketFile);
        })
        .then((basketList) => {
            console.log(basketList);
        })
});

app.listen('8000', () => {
    console.log('server is starting!');
});