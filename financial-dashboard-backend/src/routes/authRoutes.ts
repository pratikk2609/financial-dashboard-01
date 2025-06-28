// import express, { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// router.post('/login', (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   if (email === 'test@admin.com' && password === 'MySecureTest@456') {
//     const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret123', {
//       expiresIn: '1h'
//     });

//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// export default router;

import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  // ✅ Log input to debug login issues
  console.log('Received login:', { email, password });

  if (email === 'test@admin.com' && password === 'MySecureTest@456') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret123', {
      expiresIn: '1h'
    });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default router;
