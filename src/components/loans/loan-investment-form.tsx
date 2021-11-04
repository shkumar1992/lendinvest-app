import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { InvestButton, Row, Title } from '../../components';
import { FormattedLoan } from '../../types';
import { secondsToDhms } from '../../utils/utils';

const LoanDetails = styled.p`
    margin: 8px 0;
    font-size: 14px;
`;

const StyledInput = styled.input`
    padding: 7px 28px;
    margin-right: 8px;
`;

const ErrorMsg = styled.p`
    color: red;
    margin: 8px 0;
    font-size: 14px;
`;

export interface LoanInvestmentFormProps {
    /** The total amount available to the user */
    availableAmount: Number;
    /**  The optional handler to handle invest button click */
    handleInvestment?: (loan: FormattedLoan, amount: number) => void;
    /** The loan to show in the component */
    loan: FormattedLoan | null;
}

/**
 * The loan investment form component to show the loan details and allow for a user
 * to invest
 *
 * @param availableAmount - The total amount available to the user
 * @param handleInvestment - The optional handler to handle invest button click
 * @param loan - The loan to show in the component
 */
function LoanInvestmentForm({
    loan,
    availableAmount,
    handleInvestment,
}: LoanInvestmentFormProps): JSX.Element {
    const [investmentAmount, setInvestmentAmount] = useState<number>(0);
    const [error, setError] = useState<String>('');

    const handleInput = useCallback((evt: any): void => {
        const input = (evt.target.validity.valid) ? evt.target.value : investmentAmount;
        setInvestmentAmount(input);
    }, [investmentAmount]);

    const handleInvestButtonClick = useCallback((loan: FormattedLoan, amount: number): void => {
        if (amount > loan.available_amount) {
            setError('Amount should not be more than available amount of loan');
        } else if (amount > availableAmount) {
            setError('Amount should not be more than your available amount');
        } else {
            handleInvestment?.(loan, amount);
            setInvestmentAmount(0);
            setError('');
        }
    }, [availableAmount, handleInvestment]);

    return (
        <>
            <Title>Invest in Loan</Title>
            <LoanDetails>{loan?.title}</LoanDetails>
            <LoanDetails style={{ marginBottom: 0 }}>
                Amount Available: £{loan?.available_amount.toLocaleString("en-US")}
            </LoanDetails>
            <LoanDetails style={{ marginTop: '4px' }}>
                Loan ends in: {loan && secondsToDhms(loan.term_remaining)}
            </LoanDetails>
            <LoanDetails>Investment amount (£)</LoanDetails>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <Row>
                <StyledInput 
                    type="text" 
                    pattern="[0-9]*" 
                    onInput={handleInput} 
                    value={investmentAmount}
                />
                <InvestButton 
                    type="button" 
                    onClick={(e) => loan && handleInvestButtonClick(loan, investmentAmount)}
                >
                    Invest
                </InvestButton>
            </Row>
        </>
    );
}

export default LoanInvestmentForm;
