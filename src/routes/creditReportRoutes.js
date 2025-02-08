import express from 'express';
import CreditReportController from '../controllers/creditReportController.js';
import upload from '../config/multer.js';

const router = express.Router();

router.post('/upload', upload.single('file'), CreditReportController.uploadReport);
router.get('/', CreditReportController.getAllReports);
router.get('/:id', CreditReportController.getReportById);

export default router;