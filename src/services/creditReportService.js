import fs from 'fs/promises';
import { parseXMLFile } from '../utils/xmlParser.js';
import CreditReportDAO from '../dao/creditReportDao.js';
import { AppError } from '../utils/errorHandler.js';

export default class CreditReportService {
  static async processReport(file) {
    try {
      const xmlData = await fs.readFile(file.path, 'utf-8');
      const result = await parseXMLFile(xmlData);
      
      const root = result.INProfileResponse;
      const applicant = root.Current_Application?.Current_Application_Details?.Current_Applicant_Details;
      const score = root.SCORE;
      const caisSummary = root.CAIS_Account?.CAIS_Summary;
      const creditAccountSummary = caisSummary?.Credit_Account;
      const totalOutstanding = caisSummary?.Total_Outstanding_Balance;
      const accountDetails = root.CAIS_Account?.CAIS_Account_DETAILS;

      const creditData = {
        basicDetails: {
          name: applicant ? `${applicant.First_Name || ''} ${applicant.Last_Name || ''}`.trim() : '',
          mobilePhone: applicant?.MobilePhoneNumber || '',
            pan: applicant?.IncomeTaxPan || '',
          creditScore: score ? parseInt(score.BureauScore, 10) : 0
        },
        reportSummary: {
          totalAccounts: creditAccountSummary ? parseInt(creditAccountSummary.CreditAccountTotal, 10) : 0,
          activeAccounts: creditAccountSummary ? parseInt(creditAccountSummary.CreditAccountActive, 10) : 0,
          closedAccounts: creditAccountSummary ? parseInt(creditAccountSummary.CreditAccountClosed, 10) : 0,
          currentBalanceAmount: totalOutstanding ? parseFloat(totalOutstanding.Outstanding_Balance_All) : 0,
          securedAccountsAmount: totalOutstanding ? parseFloat(totalOutstanding.Outstanding_Balance_Secured) : 0,
          unsecuredAccountsAmount: totalOutstanding ? parseFloat(totalOutstanding.Outstanding_Balance_UnSecured) : 0,
          lastSevenDaysCreditEnquiries: 0
        },
        creditAccounts: []
      };

      if (accountDetails) {
        creditData.creditAccounts = Array.isArray(accountDetails) 
          ? accountDetails.map(this.mapAccountDetails)
          : [this.mapAccountDetails(accountDetails)];
      }

      const savedReport = await CreditReportDAO.create(creditData);
      await fs.unlink(file.path);
      
      return savedReport;
    } catch (error) {
      throw new AppError(`Error processing report: ${error.message}`, 500);
    }
  }

  static mapAccountDetails(acc) {
    return {
      type: acc.Account_Type || '',
      bank: acc.Subscriber_Name || '',
      accountNumber: acc.Account_Number || '',
      address: '',
      amountOverdue: parseFloat(acc.Amount_Past_Due || '0'),
      currentBalance: parseFloat(acc.Current_Balance || '0')
    };
  }

  static async getAllReports() {
    return await CreditReportDAO.findAll();
  }

  static async getReportById(id) {
    const report = await CreditReportDAO.findById(id);
    if (!report) {
      throw new AppError('Report not found', 404);
    }
    return report;
  }
}
