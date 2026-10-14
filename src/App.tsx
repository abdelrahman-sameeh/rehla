import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { WuduJourney } from './features/wudu/WuduJourney';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WuduJourney />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
