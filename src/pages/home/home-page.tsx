import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { LoanCard, LoanInvestmentForm, Modal } from '../../components';
import { FormattedLoan, Investment } from '../../types';
import { dataFormatter } from '../../utils/utils';

import data from '../../data/current-loans.json';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 32px;
`;

const AmountDetails = styled.p`
    margin: 8px 0;
    align-self: center;
`;

/**
 * The home page of the application that shows all the available loans to the user to invest in.
 */
function HomePage(): JSX.Element {
    const [loanData, setLoanData] = useState(dataFormatter(data.loans));
    const [availableAmount, setAvailableAmount] = useState<number>(2000);
    const [loanOpened, setLoanOpened] = useState<FormattedLoan | null>(null);
    const [investments, setInvestments] = useState<Investment[]>([]);

    const handleInvestFormOpenClick = useCallback((loan: FormattedLoan): void => {
        setLoanOpened(loan);
    }, []);

    const handleClose = useCallback((): void => {
        setLoanOpened(null);
    }, []);

    const updateLoanAmount = useCallback((loanToUpdate: FormattedLoan, amount: number): void => {
        const updatedLoans = loanData.map((loan) => {
            if (loanToUpdate.id === loan.id) {
                return { ...loan, available_amount: loan.available_amount - amount };
            }
            return loan;
        });
        setLoanData(updatedLoans);
    }, [loanData]);

    const handleInvestButtonClick = useCallback((loan: FormattedLoan, amount: number): void => {
        setInvestments([...investments, { loan, amount}]);
        setAvailableAmount(availableAmount - amount);
        updateLoanAmount(loan, amount);
        handleClose();
    }, [availableAmount, handleClose, investments, updateLoanAmount]);

    return (
        <Wrapper>
            <h1>Current Loans</h1>
            {loanData.map(loan => (
                <LoanCard 
                    key={loan.id} 
                    loan={loan} 
                    invested={investments.findIndex(investment => investment.loan.id === loan.id) > -1} 
                    handleInvestment={handleInvestFormOpenClick} 
                />
            ))}
            <AmountDetails>
                Total amount available for investments: £{availableAmount}
            </AmountDetails>
            <Modal showModal={loanOpened != null} handleClose={handleClose}>
                <LoanInvestmentForm loan={loanOpened} availableAmount={availableAmount} handleInvestment={handleInvestButtonClick} />
            </Modal>
        </Wrapper>
    );
}

export default HomePage;
