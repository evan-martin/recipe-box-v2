import React, { useEffect } from "react";
import { Button } from "@mui/material";

function UploadWidget({ setUrl }) {

    useEffect(() => {
        const myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dyi8luau7",
                uploadPreset: "x10dzwmp",
                multiple: false
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    setUrl(result.info.secure_url);
                    document.getElementById('imageURL').value = result.info.secure_url
                }
            }
        );

        document.getElementById("upload_widget").addEventListener(
            "click",
            function () {
                myWidget.open();
            },
            false
        );

    }, [setUrl]);

    return (
        <>
            <Button variant="contained" id="upload_widget" className="cloudinary-button">
                Upload Image
            </Button>
        </>

    );
}


export default UploadWidget;
