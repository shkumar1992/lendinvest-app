import styled from 'styled-components';

import { InvestButton, Row, Title } from '../../components';
import { FormattedLoan } from '../../types';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px;
    border: 1px solid grey;
    margin: 12px 0;
    background-color: white;
`;

const InvestedTag = styled.h5`
    color: green;
    margin: 0;
`;

const Details = styled.p`
    margin: 0;
`;

export interface LoanCardProps {
    /** The handler to handle invest button click */
    handleInvestment?: (loan: FormattedLoan) => void;
    /** The flag to show the invested tag */
    invested: boolean;
    /**  The loan to display */
    loan: FormattedLoan;
}

/**
 * A loan card component the show the main details of the loan as a
 * card and also show an invest button
 *
 * @param handleInvestment - The handler to handle invest button click
 * @param invested - The flag to show the invested tag
 * @param loan - The loan to display
 */
function LoanCard({
    handleInvestment,
    invested,
    loan,
}: LoanCardProps): JSX.Element {
    return (
        <Card key={loan.id}>
            <Row>
                <Title>{loan.title}</Title>
                {invested && <InvestedTag>Invested</InvestedTag>}
            </Row>
            <Row>
                <Details>
                    Tranche: {loan.tranche}, 
                    Amount Available: £{loan.available_amount.toLocaleString("en-US")} and 
                    Loan Value: £{loan.loan_value.toLocaleString("en-US")}
                </Details>
                <InvestButton 
                    type="button" 
                    onClick={(e) => handleInvestment?.(loan)}
                >
                    Invest
                </InvestButton>
            </Row>
        </Card>
    );
}

export default LoanCard;
