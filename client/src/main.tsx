// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ChakraProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
        </ChakraProvider>
    </BrowserRouter>,
)
