import { FormattedLoan, Loan } from '../types';

/**
 * A utility to format loans array fetched from the backend and convert it into
 * an array of loans that can be used on the frontend
 *
 * @param loans - An array of loans extracted from the current-loans.json
 * @returns - An array of formatted loans array
 */
export const dataFormatter = (loans: Loan[]): FormattedLoan[] => {
    return loans.map((loan) => { 
        return {
            ...loan,
            available_amount: Number(loan.available_amount.replace(/,/g,'')),
            annualised_return: Number(loan.annualised_return.replace(/,/g,'')),
            term_remaining: Number(loan.term_remaining.replace(/,/g,'')),
            ltv: Number(loan.ltv.replace(/,/g,'')),
            loan_value: Number(loan.loan_value.replace(/,/g,'')),
        };
     });
};

/**
 * A utility function to convert seconds into days, time and seconds
 * format
 *
 * @param seconds - The seconds to convert, can be a number or string
 * @returns - The time in days, hours and seconds
 */
export const secondsToDhms = (seconds: number | string): string => {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days ") : "";
    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return (dDisplay + hDisplay + mDisplay + sDisplay).trim();
}
