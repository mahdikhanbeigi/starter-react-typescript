import { BrowserRouter } from 'react-router-dom';
import App from "containers/App";
import ThemeProvider from 'theme/Provider';

function MainApp() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default MainApp;
