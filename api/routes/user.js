import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../models/user.js';

router.post('/signup', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists',
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                console.log('result', result);
                res.status(201).json({
                  message: 'User created',
                });
              })
              .catch((err) => {
                console.log('error', err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch();
});

router.get('/', (req, res, next) => {
  User.find()
    .select('id email password')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        users: docs.map((doc) => {
          return {
            id: doc.id,
            email: doc.email,
            password: doc.password
          };
        }),
      };
      console.log(response);
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete('/:userId', (req, res, next) => {
  User.remove({
    _id: req.params.userId,
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'User deleted',
      });
    })
    .catch((err) => {
      console.log('error', err);
      res.status(500).json({
        error: err,
      });
    });
});

export default router;
