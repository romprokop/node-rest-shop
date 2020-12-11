import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched',
  });
});

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.status(201).json({
    message: 'Orders was created',
    order: order,
  });
});

router.get('/:orderID', (req, res, next) => {
  const id = req.params.orderID;
  res.status(200).json({
    message: 'Order details',
    orderID: id,
  });
});

router.delete('/:orderID', (req, res, next) => {
  const id = req.params.orderID;
  res.status(200).json({
    message: `Deleted order with \'${id}\' ID!`,
    orderID: id,
  });
});

export default router;
