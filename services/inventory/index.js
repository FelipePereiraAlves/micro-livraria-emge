const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const products = require('./products.json');
const fs = require('fs');
const path = require('path');

const packageDefinition = protoLoader.loadSync('proto/inventory.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const inventoryProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

// implementa os métodos do InventoryService
server.addService(inventoryProto.InventoryService.service, {
    SearchAllProducts: (_, callback) => {
        callback(null, {
            products: products,
        });
    },

    SearchProductByID: (payload, callback) => {
        callback(
            null,
            products.find((product) => product.id == payload.request.id)
        );
    },

    AddQuantityBook: (payload, callback) => {
        products.find((product, index) => {
            if (product.id == payload.request.id) {
                products[index].quantity = payload.request.quantity;
            }
        });

        const pro = JSON.stringify(products);

        fs.writeFile(path.resolve(__dirname, 'products.json'), pro, (cb) => {
            console.log(cb);
        });

        callback(
            null,
            products.find((product) => product.id == payload.request.id)
        );
    },
});

server.bindAsync('127.0.0.1:3002', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Inventory Service running at http://127.0.0.1:3002');
    server.start();
});
