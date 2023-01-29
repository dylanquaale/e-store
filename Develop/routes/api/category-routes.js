const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//find all categories
  // be sure to include its associated Product
  // took from 11-Ins_RESTful-Routes
router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: Product ,
    });
    res.status(200).json(catData);
  } catch (err) {

    res.status(500).json(err);
  }
});

 // find one category by its `id` value
  // be sure to include its associated Products
  // took from 11-Ins_RESTful-Routes
router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
        include: Product
    });
    if (!catData) {
      res.status(404).json({ message: 'CATEGORY NOT FOUND' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
// took from 11-Ins_RESTful-Routes

router.post('/', (req, res) => {
  // creates a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
});

 // update a category by its `id` value
 // took from 17-Ins_Hooks
 router.put('/:id', (req, res) => {
  // updates a category by its `id` value
  Category.update(req.body,{
    where:{
      id:req.params.id
    },
  })
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});
  // delete a category by its `id` value
  // took from 07-Ins_Update-Delete
router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!catData) {
      res.status(404).json({ message: 'CATERGORY DELETE' });
     
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
