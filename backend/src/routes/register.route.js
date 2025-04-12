import express from 'express';
import multer from 'multer';
import { startNomination, createNominee } from '../controller/register.controller.js';

const upload = multer({ 
  dest: 'uploads/',
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

const router = express.Router();

router.post('/nominate/start', upload.single('positionImage'), startNomination);
router.post('/nominate/create', createNominee);

export default router;