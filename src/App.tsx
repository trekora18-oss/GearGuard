import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { MainLayout } from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import EquipmentList from './pages/Equipment/EquipmentList';
import TeamList from './pages/Team/TeamList';
import RequestBoard from './pages/Requests/RequestBoard';
import MaintenanceCalendar from './pages/Calendar/MaintenanceCalendar';
import OperationalInstructions from './pages/Instructions/OperationalInstructions';

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-64 border border-dashed rounded-lg border-muted-foreground/50">
    <p className="text-muted-foreground text-lg">{title} Module Under Construction</p>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="equipment" element={<EquipmentList />} />
            <Route path="requests" element={<RequestBoard />} />
            <Route path="teams" element={<TeamList />} />
            <Route path="calendar" element={<MaintenanceCalendar />} />
            <Route path="instructions" element={<OperationalInstructions />} />
            <Route path="*" element={<Placeholder title="404 Not Found" />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
