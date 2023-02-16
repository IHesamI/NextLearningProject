import { Box, Stack, Button, TextField, IconButton, FormControl, InputAdornment, InputLabel, Input, OutlinedInput, Typography } from "@mui/material";
import { useReducer, useRef } from "react";
import { chatmessage } from "./interfaces";
import AttachFileIcon from '@mui/icons-material/AttachFile';

const reducer = (state: chatmessage[], action: { type: string, message?: string, user: string }) => {

    switch (action.type) {
        case 'AddMessage':
            return [...state, { content: action.message, user: action.user }]
        default:
            break;
    }
}

export default function Chatcompo(
    { chats, sendMessage, user }: { chats?: chatmessage[], sendMessage: any, user: string }
) {
    const message_content = useRef<HTMLInputElement>();
    const [messages, dispatch] = useReducer(reducer, chats);

    const handleSend = () => {
        const payam = message_content.current?.value
        if (payam != '') {
            // console.log(message_content.current?.value)
            dispatch({
                type: 'AddMessage',
                message: payam,
                user: user,
            });

            sendMessage(payam, user)
        }
    }

    return (
        <Stack>

            <Stack
                sx={{ mx: '100px', mt: '15px' }}
                style={{ overflowY: 'auto', height: '400px' }}
                gap={2}
            >
                {
                    messages?.map((message, index) => (
                        <Box
                            key={index}
                            justifyContent={'center'}
                            textAlign={message.user == user ? 'end' : 'start'}>
                            <Typography>{message.content}</Typography>
                            {/* <Typography>{index}</Typography> */}
                        </Box>
                    ))
                }
            </Stack>
            <Stack
                direction={'row'}
                gap={1}
                className={'messageinput'}
            >

                <Button
                    variant={'contained'}
                    size={'small'}
                    onClick={handleSend}>

                    send
                </Button>
                <FormControl
                    variant="outlined">
                    <InputLabel
                    >
                    </InputLabel>
                    <OutlinedInput
                        inputRef={message_content}

                        startAdornment={
                            <InputAdornment position={'start'}>
                                <IconButton>
                                    <AttachFileIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

            </Stack>
        </Stack>
    )

}
