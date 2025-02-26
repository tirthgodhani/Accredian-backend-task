import { body, validationResult } from 'express-validator';

export const validateRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

export const validateLogin = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

export const validateReferral = [
  body('referrerName').trim().notEmpty().withMessage('Referrer name is required'),
  body('referrerEmail').trim().isEmail().withMessage('Valid referrer email is required'),
  body('refereeName').trim().notEmpty().withMessage('Referee name is required'),
  body('refereeEmail').trim().isEmail().withMessage('Valid referee email is required'),
  body('courseId').trim().notEmpty().withMessage('Course ID is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];
