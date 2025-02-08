import CreditReportService from '../services/creditReportService.js';

export default class CreditReportController {
    static async uploadReport(req, res, next) {
        try {
            if (!req.file) {
                throw new AppError('No file uploaded', 400);
            }

            const report = await CreditReportService.processReport(req.file);
            res.json({
                message: 'Report processed successfully',
                id: report._id
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllReports(req, res, next) {
        try {
            const reports = await CreditReportService.getAllReports();
            res.json(reports);
        } catch (error) {
            next(error);
        }
    }

    static async getReportById(req, res, next) {
        try {
            const report = await CreditReportService.getReportById(req.params.id);
            res.json(report);
        } catch (error) {
            next(error);
        }
    }
}