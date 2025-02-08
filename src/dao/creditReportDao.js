import CreditReport from '../models/CreditReport.js';

export default class CreditReportDAO {
    static async create(creditData) {
        const creditReport = new CreditReport(creditData);
        return await creditReport.save();
    }

    static async findAll() {
        return await CreditReport.find().sort({ createdAt: -1 });
    }

    static async findById(id) {
        return await CreditReport.findById(id);
    }
}