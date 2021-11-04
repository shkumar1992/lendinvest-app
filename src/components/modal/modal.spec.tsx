import { fireEvent, render } from '@testing-library/react';

import Modal, { ModalProps } from './modal';

const CHILDREN = 'children';

function RenderModal(props: ModalProps = { children: CHILDREN, showModal: false }) {
    return (
        <Modal {...props} />
    );
}

describe('Modal', () => {
    it('should not display if showModal is false', () => {
        const { queryByText } = render(RenderModal());

        // Initially modal should not be displayed
        const modalContent = queryByText(CHILDREN);
        expect(modalContent).not.toBeInTheDocument();
    });

    it('should display correctly if showModal is true', async () => {
        const { findByText } = render(RenderModal({ children: CHILDREN, showModal: true }));

        // Setting showModal to true should display the modal
        const modalContent = await findByText(CHILDREN);
        expect(modalContent).toBeInTheDocument();
        expect(modalContent.parentElement).toBeInTheDocument();
        expect(modalContent.parentElement).toHaveStyle({
            display: 'flex',
        });
    });

    it('clicking on background should call handleClose', async () => {
        const handleClose = jest.fn();
        const { findByText } = render(RenderModal({ children: CHILDREN, showModal: true, handleClose: handleClose }));

        // Find background and click on it
        const modalContent = await findByText(CHILDREN);
        if (modalContent.parentElement) {
            fireEvent.click(modalContent.parentElement);
        }

        // handleClose should be called one time
        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
