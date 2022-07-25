import { Box, Alert } from "@mui/material"

export default function Error( {error} ) {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Alert variant="filled" severity="error">
                Error: {error} 
            </Alert>
        </Box>
    )
}