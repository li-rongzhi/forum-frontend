import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";
import { LoginResponse } from "../types/LoginResponse";
import React, { useState } from "react";
import { Dialog } from "@mui/material";

type PopupProps = {
    open: boolean;
    handleClose: () => void;
    onLoginSuccess: (response: LoginResponse) => void;
};

const Popup: React.FC<PopupProps> = ({ open, handleClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    return (
        <Dialog open={open} onClose={handleClose}>
            {isLogin ? (
                <LoginPopup onLoginSuccess={onLoginSuccess} handleClose={handleClose} setIsLogin={setIsLogin} />
            ) : (
                <SignupPopup handleClose={handleClose} setIsLogin={setIsLogin} />
            )}
        </Dialog>
    );
};
export default Popup;
