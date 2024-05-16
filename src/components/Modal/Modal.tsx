import styles from './Modal.module.scss';
import React, { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            onClose();
        }, 300); // Время анимации в миллисекундах
    };

    return (
        <>
            {isOpen && (
                <div className={`modal ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                    <div className="modal-overlay" onClick={handleClose}></div>
                    <div className="modal-content">
                        <button className="modal-close-btn" onClick={handleClose}>
                            &times;
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
