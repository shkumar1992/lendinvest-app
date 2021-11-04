import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoanInvestmentForm, { LoanInvestmentFormProps } from './loan-investment-form';
import { secondsToDhms } from '../../utils/utils';

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

function RenderLoanInvestmentForm(props: LoanInvestmentFormProps = { loan: testLoan, availableAmount: 100000 }) {
    return (
        <LoanInvestmentForm {...props} />
    );
}

describe('Loan Investment Form', () => {
    it('should display correctly', () => {
        const { queryByText, getByRole } = render(RenderLoanInvestmentForm());

        // Loan title is displayed correctly
        const loanTitle = queryByText(testLoan.title);
        expect(loanTitle).toBeInTheDocument();

        // Available amount is displayed correctly
        const loanAvailableAmount = queryByText(`Amount Available: £${testLoan.available_amount.toLocaleString("en-US")}`);
        expect(loanAvailableAmount).toBeInTheDocument();

        // loan term is displayed correctly in days hrs mins
        const loanTerm = queryByText(`Loan ends in: ${secondsToDhms(testLoan.term_remaining)}`);
        expect(loanTerm).toBeInTheDocument();

        // Input is displayed and has 0 initial value
        const input = getByRole('textbox', { hidden: true });
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('0');
        expect(input).toHaveAttribute('type', 'text');

        // Invest Button is displayed correctly
        const InvestButton = queryByText('Invest');
        expect(InvestButton).toBeInTheDocument();
    });

    it('entering investment amount and clicking invest button should call handleInvestment', async () => {
        const handleInvest = jest.fn((loan, amount) => {return { loan, amount }});
        const { findByText, getByRole } = render(RenderLoanInvestmentForm({ 
            loan: testLoan, 
            availableAmount: 100000, 
            handleInvestment: handleInvest 
        }));

        // Get the input
        let input = getByRole('textbox', { hidden: true });
        // Type 2000 in the input
        userEvent.type(input, '{backspace}2000');

        // input value should now be 2000
        input = getByRole('textbox', { hidden: true });
        expect(input).toHaveValue('2000');

        const InvestButton = await findByText('Invest');
        //handleInvest should not be called initially
        expect(handleInvest).toHaveBeenCalledTimes(0);

        // Click invest button
        fireEvent.click(InvestButton);

        // handleInvest should now be called once
        expect(handleInvest).toHaveBeenCalledTimes(1);

        // handleInvest should get the testLoan and the amount invested
        expect(handleInvest.mock.results[0].value).toEqual({ loan: testLoan, amount: '2000'});
    });

    it('entering out of bounds amount should give an error', async () => {
        const handleInvest = jest.fn((loan, amount) => {return { loan, amount }});
        const { findByText, getByRole } = render(RenderLoanInvestmentForm({ 
            loan: testLoan, 
            availableAmount: 1000, 
            handleInvestment: handleInvest 
        }));

        // Enter 12000 into the input
        let input = getByRole('textbox', { hidden: true });
        userEvent.type(input, '{backspace}12000');

        //Input should have value 12000
        input = getByRole('textbox', { hidden: true });
        expect(input).toHaveValue('12000');

        // handleInvest should not have been called
        expect(handleInvest).toHaveBeenCalledTimes(0);

        // Click on invest button
        let InvestButton = await findByText('Invest');
        fireEvent.click(InvestButton);

        // handleInvest should still not be called as an error should be showed to the user
        expect(handleInvest).toHaveBeenCalledTimes(0);

        // Correct error message should be displayed
        let errorMsg = await findByText('Amount should not be more than available amount of loan');
        expect(errorMsg).toBeInTheDocument();

        // Reduce amount to 1200
        userEvent.type(input, '{backspace}');

        // input should have 1200 value
        input = getByRole('textbox', { hidden: true });
        expect(input).toHaveValue('1200');

        // handleInvest should still not be called
        expect(handleInvest).toHaveBeenCalledTimes(0);

        // Click invest button
        InvestButton = await findByText('Invest');
        fireEvent.click(InvestButton);

        // handleInvest should still not be called as an error should be showed to the user
        expect(handleInvest).toHaveBeenCalledTimes(0);

        // Correct error message should be displayed
        errorMsg = await findByText('Amount should not be more than your available amount');
        expect(errorMsg).toBeInTheDocument();
    });
});
