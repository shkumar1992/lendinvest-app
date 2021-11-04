import { fireEvent, render } from '@testing-library/react';

import LoanCard, { LoanCardProps } from './loan-card';

const testLoan = {
    id: "1",
    title: "9 Munro Court, Bartin Close, Sheffield",
    tranche: "A",
    available_amount: 11959,
    annualised_return: 8.60,
    term_remaining: 864000,
    ltv: 48.80,
    loan_value: 85754,
};

function RenderLoanCard(props: LoanCardProps = { loan: testLoan, invested: false }) {
    return (
        <LoanCard {...props} />
    );
}

describe('LoanCard', () => {
    it('should display correctly', () => {
        const { queryByText, rerender } = render(RenderLoanCard());

        // Title should be displayed correctly
        const loanTitle = queryByText(testLoan.title);
        expect(loanTitle).toBeInTheDocument();

        // Loan Details should be displayed correctly
        const loanDetails = queryByText(
            `Tranche: ${testLoan.tranche}, ` + 
            `Amount Available: £${testLoan.available_amount.toLocaleString("en-US")} ` + 
            `and Loan Value: £${testLoan.loan_value.toLocaleString("en-US")}`
        );
        expect(loanDetails).toBeInTheDocument();

        // Invest button should be displayed correctly
        const InvestButton = queryByText('Invest');
        expect(InvestButton).toBeInTheDocument();

        // Invested tag should not be displayed initially
        let investedContent = queryByText('Invested');
        expect(investedContent).not.toBeInTheDocument();

        // Rerendering with invested flag as true
        rerender(RenderLoanCard({ loan: testLoan, invested: true }));

        // Invested tag should be displayed now
        investedContent = queryByText('Invested');
        expect(investedContent).toBeInTheDocument();
    });

    it('clicking on invest button should call handleInvest', async () => {
        const handleInvest = jest.fn((value) => value);
        const { findByText } = render(RenderLoanCard({ loan: testLoan, invested: false, handleInvestment: handleInvest }));

        // Find invest button
        const InvestButton = await findByText('Invest');

        // Initially handleInvest should not be called
        expect(handleInvest).toHaveBeenCalledTimes(0);

        // Click on invest button
        fireEvent.click(InvestButton);

        // handleInvest should be called once only
        expect(handleInvest).toHaveBeenCalledTimes(1);
        // Value returned should be equal to the test loan
        expect(handleInvest.mock.results[0].value).toEqual(testLoan);
    });
});
