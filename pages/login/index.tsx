import { Box, Stack, TextField, Button } from "@mui/material";
export default function index() {

    return (
        <Box
        className={'loginBase'}>
            <Stack className={'loginStack'}>
                <TextField placeholder={"username"} />
                <TextField placeholder={"phonenumber"} />
                <Button>Go</Button>
            </Stack>
        </Box>
    )

} 