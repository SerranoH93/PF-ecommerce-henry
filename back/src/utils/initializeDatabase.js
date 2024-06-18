const { sequelize } = require('sequelize');
const { Category, Product} = require('../db');
const fs = require('fs');
const path = require('path');

function readJSONFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            try {
                const json = JSON.parse(data);
                resolve(json);
            } catch (error) {
                reject(error);
            }
        });
    });
}

async function createCategories(categories) {
    for (let category of categories) {
        await Category.findOrCreate({
            where: { 
                name: category.name,
                description: category.description || '*'                
            }            
        });
    }
    console.log("Categories created successfully.");
}

async function createProducts(products) {
    for (let productData of products) {
        const { name, description, images, stock, price, gender, category } = productData;

        const categoryInstance = await Category.findOne({ where: { name: category } });
        console.log(categoryInstance)
        if (!categoryInstance) {
            throw new Error(`Category ${category} not found.`);
        }

        const productInstance = await Product.create({
            name,
            description,
            stock,
            price,
            gender,
            images,
            category_id: categoryInstance.category_id            
        });        
        await productInstance.setCategory(categoryInstance);

        console.log(`Product ${name} created successfully.`);
    }
}

async function initializeDatabase() {
    try {
        
        const categoryCount = await Category.count();
        const productCount = await Product.count();

        if (categoryCount === 0 && productCount === 0) {
            console.log("Database is empty. Initializing data...");

            const categoriesFilePath = path.join(__dirname, '..', 'api', 'categories.json');
            const productsFilePath = path.join(__dirname, '..', 'api', 'products.json');

            const categories = await readJSONFile(categoriesFilePath);
            const products = await readJSONFile(productsFilePath);

            await createCategories(categories);
            await createProducts(products);
        } else {
            console.log("Database is not empty. Skipping initialization.");
        }
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

module.exports = initializeDatabase;