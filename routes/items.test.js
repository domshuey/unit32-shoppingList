process.env.NODE_ENV = 'test';
const request = require('supertest');
const items = require('../fakeDB');
const app = require('../app');
const { response } = require('../app');

const toothbrush = {name: 'Toothbrush', price: '7.99'};
const apple = {name: 'Apple', price: 0.99}

beforeEach(() => {
    items.push(toothbrush)
});

afterEach( () => {
    items.length = 0;
})


describe('/GET items', () => {
    test('Get all items from array', async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [toothbrush]})
    });
    test('Get item by name', async () => {
        const res = await request(app).get('/items/Toothbrush');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: toothbrush})
    })
});

describe('/POST items', () => { 
    test('post new item to array', async () => {
        const res = await request(app).post('/items').send(apple);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({added: apple});
    })
});

describe('', () => {
    test('', () => {

    })
});
describe('', () => {
    test('', () => {

    })
});