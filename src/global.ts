import 'react';
import '@mui/material/styles';
import {History} from "history";

declare global {
    interface Window {
        $flow: History;
    }
}
