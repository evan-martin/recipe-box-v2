import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "darkslategray"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "darkslategray"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "darkslategray"
    },
    "&:hover fieldset": {
      borderColor: "darkslategray"
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
      borderWidth: 1
    }
  }
});

export default function CustomInput( {...props} ) {
  return (
    <CssTextField  focused {...props} />
  );
}