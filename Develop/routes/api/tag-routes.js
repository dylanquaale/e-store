const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
 // find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"]
    }
  })

    .then(tagIdData => res.json(tagIdData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
});
  // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  Tag.findOne({
    
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"]
    }
  })

    .then(tagIdData => res.json(tagIdData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  // create a new tag
router.post('/', async (req, res) => {
  Tag.create({
    tags_name: req.body.tags_name
  })

    .then(tagIdData => res.json(tagIdData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })

    .then(tagIdData => {
      if (!tagIdData){
        res.status(404).json({message:'NO PRODUCT TAG FOUND'});
        return;
      }
      res.json(tagIdData);
    })

    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  // delete on tag by its `id` value
router.delete('/:id', async(req, res) => {

  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagIdData => {
    if (!tagIdData) {
      res.status(404).json({message: 'No PRODUCT TAG FOUND'});
      return;
    }
    res.json(tagIdData);
  })

  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
