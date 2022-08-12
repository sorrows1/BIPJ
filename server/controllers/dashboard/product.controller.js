const Sequelize = require('sequelize');

const Product = require('../../models/Product/Product.model');
const Ingredient = require('../../models/Product/Ingredient.model');
const Nutrient = require('../../models/Product/Nutrient.model');
const Type = require('../../models/Product/Type.model');
const {
  Recipe,
  ProductNutrient,
  ProductType,
} = require('../../models/Product/associations');

const addProductIdToAttributes = require('../../helper/addProductID.helper');
const {
  updateRecipeTable,
  updateProductNutrientTable,
  createProductTypes,
  removeRecipes,
  removeProductNutrients,
  removeProductTypes,
} = require('../../helper/updateProduct.helper');
const sequelize = require('../../config/database');

const Op = Sequelize.Op;

// exports.checkID = (req, res, next, val) => {
//   if (+val > 10)
//     return res.status(400).json({ status: 'fail', message: 'Invalid Id' });
//   next();
// };

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Type,
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.status(200).render('dashboard/productList');
  } catch (err) {
    res
      .status(500)
      .json({ status: 'fail', message: `error trying to get product, ${err}` });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findAll({
      where: {
        id,
      },
      include: [
        {
          model: Ingredient,
          through: {
            attributes: ['original', 'unit', 'amount'],
          },
        },
        {
          model: Nutrient,
          through: { attributes: ['amount', 'percentOfDailyNeeds'] },
        },
        {
          model: Type,
          through: { attributes: [] },
        },
      ],
    });
    if (!product.length) throw new Error('Product does not exist');
    const productTypes = product[0].types.map((val) => val.id);
    const diets = await Type.findAll({
      where: {
        id: { [Op.notIn]: productTypes },
      },
      raw: true,
    });
    res.status(200).render('dashboard/editProduct', {
      ...product[0],
      diets,
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: 'fail', message: `error trying to get product, ${err}` });
  }
};

exports.createProduct = async (req, res) => {
  if (req.method == 'POST') {
    const { ingredients, nutrients, types } = req.body;

    try {
      const product = await Product.create(req.body);
      const { id } = product;

      const { newRecipes, newNutrients, newTypes } = addProductIdToAttributes(
        id,
        ingredients,
        nutrients,
        types
      );

      // create records in the many to many associations
      await Promise.all([
        Recipe.bulkCreate(newRecipes),
        ProductNutrient.bulkCreate(newNutrients),
        ProductType.bulkCreate(newTypes),
      ]);

      res.status(200).render('dashboard/productList');
    } catch (err) {
      res.status(500).json({
        status: 'fail',
        message: `error trying to create product ${err}`,
      });
    }
  }
  
  
  const types = await Type.findAll({ raw: true });
  res.render('dashboard/createProduct', {
    types,
  });
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      createAndUpdate: { ingredients, nutrients, types },
      remove: {
        ingredients: removeIngredients,
        nutrients: removeNutrients,
        types: removeTypes,
      },
    } = req.body;

    const { newRecipes, newNutrients, newTypes } = addProductIdToAttributes(
      id,
      ingredients,
      nutrients,
      types
    );
    const result = await Product.update(
      { ...req.body },
      {
        where: {
          id,
        },
      }
    );
    if (!result[0]) throw new Error('Product does not exist');

    if (newRecipes.length || newNutrients.length || newTypes.length) {
      await Promise.all([
        updateRecipeTable(newRecipes),
        updateProductNutrientTable(newNutrients),
        createProductTypes(newTypes),
      ]);
    }

    if (
      removeIngredients.length ||
      removeNutrients.length ||
      removeTypes.length
    ) {
      await Promise.all([
        removeRecipes(id, removeIngredients),
        removeProductNutrients(id, removeNutrients),
        removeProductTypes(id, removeTypes),
      ]);
    }

    res
      .status(200)
      .json({ status: 'ok', message: `successfully updated product ${id}` });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `error trying to update product, ${err}`,
    });
  }
};

exports.removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.destroy({
      where: {
        id,
      },
    });
    if (!result) throw new Error(`Product ${id} does not exists!`);
    res.status(204).json();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `error trying to remove product ${id}, ${err}`,
    });
  }
};
