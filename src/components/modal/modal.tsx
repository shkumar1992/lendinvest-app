import styled from 'styled-components';

interface BackgroundProps {
    show: boolean;
}

const Background = styled.div<BackgroundProps>`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${(props) => props.show ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
`;

const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 16px;
`;

export interface ModalProps {
    /** The content to show inside the modal */
    children?: React.ReactNode;
    /** Optional handler to handle closing of the modal */
    handleClose?: () => void;
    /** Flag to tell the modal when to appear or disappear */
    showModal: boolean;
}

/**
 * A modal component that can used to show a modal on top the parent component
 *
 * @param children - The content to show inside the modal
 * @param handleClose - Optional handler to handle closing of the modal
 * @param showModal - Flag to tell the modal when to appear or disappear
 */
function Modal(props: ModalProps): JSX.Element {
    return (
        <Background onClick={(_e) => props.handleClose?.()} show={props.showModal}>
            {
                props.showModal && 
                <ModalWrapper onClick={e => e.stopPropagation()}>
                    {props.children}
                </ModalWrapper>
            }
        </Background>
    );
}

export default Modal;
