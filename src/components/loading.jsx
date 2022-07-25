import { Box, CircularProgress } from "@mui/material"

export default function Loading() {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column', height: '100vh' }}>
            <p style={{marginBottom: '-5em'}}>Loading...</p>
            <CircularProgress size='10em' />
        </Box>
    )
}