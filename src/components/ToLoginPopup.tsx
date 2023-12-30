import { Button, DialogActions, DialogContent, DialogTitle, Dialog } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type ToLoginPopupProps = {
    initial: boolean;
}
const ToLoginPopup: React.FC<ToLoginPopupProps> = ({initial}) => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/login'); // Redirect to login page when the dialog is closed
    };

    return (
        <Dialog open={initial}>
            <DialogTitle>You need to log in</DialogTitle>
            <DialogContent>
                To create a new thread, please log in first.
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Go to Login
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ToLoginPopup;