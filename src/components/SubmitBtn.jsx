import React from "react";
import '../styles/Global.css';

const SubmitBtn = ({ text, isDisabled, onClick }) => {
    return (
        <button
            className={'submit ${isDisabled ? "disabled" : ""}'}
            onClick = {onClick}
            disabled = {isDisabled}
        >
            {text}
        </button>
    );
};

export default SubmitBtn;