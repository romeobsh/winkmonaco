import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Check, FileCopy } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const CopyToClipboardButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        enqueueSnackbar("Texte copié au presse-papiers!", { variant: "info" });
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  return (
    <IconButton size='small' onClick={handleCopy} color='primary' sx={{ marginLeft: "0.5rem" }}>
      {copied ? <Check fontSize='small' /> : <FileCopy fontSize='small' />}
    </IconButton>
  );
};

export default CopyToClipboardButton;
