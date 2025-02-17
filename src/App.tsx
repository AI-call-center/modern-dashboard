import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Templates from './pages/Templates';
import Agents from './pages/Agents';
import CreateAgent from './pages/CreateAgent';
import CampaignDetails from './pages/CampaignDetails';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="campaigns/new" element={<CampaignDetails />} />
        <Route path="campaigns/:id" element={<CampaignDetails />} />
        <Route path="agents" element={<Agents />} />
        <Route path="agents/create" element={<CreateAgent />} />
        <Route path="templates" element={<Templates />} />
      </Route>
    </Routes>
  );
}
