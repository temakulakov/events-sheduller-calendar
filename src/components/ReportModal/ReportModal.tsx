import React from 'react';
import { Modal, Box, Button } from "@mui/material";
import { AnimatePresence, motion } from 'framer-motion';

interface ReportModalProps {
    open: boolean;
    onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ open, onClose }) => {

    const boxStyle = {
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        height: '90vh',
        marginTop: '2vh'
    };

    return (
        <AnimatePresence>
            {open && (
                <Modal
                    open={open}
                    onClose={onClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    closeAfterTransition
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.1 }}
                        style={{
                            width: '90vw',
                            height: '90vh',
                            margin: 'auto',

                        }}
                    >
                        <Box sx={boxStyle}>
                            <Button onClick={onClose} variant="contained" color="primary">Закрыть</Button>
                            <h2 id="modal-title">Отчет</h2>
                            <p id="modal-description">Здесь будет содержимое отчета.</p>
                        </Box>
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default ReportModal;