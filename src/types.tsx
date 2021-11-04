export interface Loan {
    id: string;
    title: string;
    tranche: string;
    available_amount: string;
    annualised_return: string;
    term_remaining: string;
    ltv: string;
    loan_value: string;
}

export interface FormattedLoan {
    id: string;
    title: string;
    tranche: string;
    available_amount: number;
    annualised_return: number;
    term_remaining: number;
    ltv: number;
    loan_value: number;
}

export interface Investment {
    loan: FormattedLoan;
    amount: number
}