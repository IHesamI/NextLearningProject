import { Box, Stack, Button, TextField, IconButton, FormControl, InputAdornment, InputLabel, Input, OutlinedInput, Typography } from "@mui/material";
import { useReducer, useRef } from "react";
import { chatmessage } from "./interfaces";
import AttachFileIcon from '@mui/icons-material/AttachFile';

const reducer = (state: chatmessage[], action: { type: string, message?: string, user: string , created:string }) => {
    switch (action.type) {
        case 'AddMessage':
            return [...state, { content: action.message, user: action.user ,created:action.created}]
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
            const date=new Date().toString();
            // console.log(message_content.current?.value)
            dispatch({
                type: 'AddMessage',
                message: payam,
                user: user,
                // ,created:Date
                created:date,
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
                            className={'chatdiv'}
                            // component={'div'}
                            // style={{backgroundColo:'rgb(12,123,244)'}}
                            key={index}
                            justifyContent={'center'}
                            textAlign={message.user == user ? 'end' : 'start'}>
                            <Typography>{message.content}</Typography>
                            <Typography
                                fontSize={10}
                            >{message.created}</Typography>
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
