import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const CreateThreadBtn: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/edit");
    };

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleNavigation}
            style={{
                marginRight: '15px',
                borderRadius: '20px', // Adjust as needed for desired roundness
                padding: '6px 12px', // Adjust padding to control width and height
            }}>
            <AddIcon></AddIcon>
            New Thread
        </Button>
    );
};

export default CreateThreadBtn;
