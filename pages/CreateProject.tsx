import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"
import { useRef, useState } from "react"
export default function CreateProject() {
    const title = useRef<HTMLInputElement>(null);
    const employeeid = useRef(null);
    const [id, setId] = useState('');

    const handleclick = () => {
        // console.log('zarp')
        if (title.current != null) {
            const title_value = title.current.value
            const fetcher = async () => {
                await fetch('/api/createproject', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id,
                        title: title_value
                    })
                }).then((response) => response.json())


            }
            fetcher();
        }
    }

    return (
        <Box
            display={'block'}>
            <TextField
                placeholder={'title'}
                inputRef={title}
            />
            <FormControl>
                <InputLabel>ID</InputLabel>
                <Select
                    value={id}
                    label={'ID'}
                    onChange={(event: SelectChangeEvent) => { setId(event.target.value) }}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            </FormControl>
            <Button
                onClick={handleclick}>
                click
            </Button>
        </Box>
    )


}