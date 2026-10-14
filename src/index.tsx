import ReactDOM from 'react-dom/client';
import '@fontsource/baloo-bhaijaan-2/400.css';
import '@fontsource/baloo-bhaijaan-2/600.css';
import '@fontsource/baloo-bhaijaan-2/700.css';
import '@fontsource/tajawal/400.css';
import '@fontsource/tajawal/700.css';
import App from './App';
import './index.css';

const rootNode = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootNode);

root.render(<App />);
