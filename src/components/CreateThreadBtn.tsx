import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

type CreateThreadBtnProps = {
    to: string; // The path to navigate to when the button is clicked
    label: string; // The text to display on the button
};

const CreateThreadBtn: React.FC<CreateThreadBtnProps> = ({ to, label }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(to);
    };

    return (
        <Button variant="contained" color="primary" onClick={handleNavigation}>
            <AddIcon></AddIcon>
            {label}
        </Button>
    );
};

export default CreateThreadBtn;
