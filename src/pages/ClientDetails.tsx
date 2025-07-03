import { useParams } from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import {  fetchClientsById } from '../features/clients/clientSlice';
import { fetchDealsbyId } from '../features/deals/dealSlice';
import { fetchClientActivity } from '../features/clients/clientActivitySlice';
import ActivityList from '../components/ActivityList';

const ClientDetails = () => {
  const { id }  = useParams();
 
  const dispatch = useAppDispatch();
  const client = useAppSelector(state => state.clients.selectedClient);
  const activities = useAppSelector((state) => state.clientActivity.items);
  const deals = useAppSelector(state => state.deals.deals.filter(deal => deal.client_id === client?.id));

  const TABS = ["Activity", "Notes", "Email", "Call", "Task"];
  const [activeTab, setActiveTab] = useState<'Activity' | 'Email' | 'Notes' | 'Call' | 'Task'>('Activity');

  useEffect(() => {
    if(id){
     dispatch( fetchClientsById( id ) );
     dispatch( fetchDealsbyId( id ) );
     dispatch( fetchClientActivity( id ) );
    }
    
  }, [id, dispatch]);
    
 
  if (!client) return <p>Loading...</p>;
  

  return (
    <div className="cliente-detail">
      <div>
        <h2>Client Details</h2>
        {
          TABS.map(tab => (
            <button
              key={tab}
              className={`cliente-detail__tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab as 'Activity' | 'Notes' | 'Email' | 'Call' | 'Task')}
            >
              {tab}
            </button>
          ))}
      </div>
          <div className="clients-main__timeline">
            <ActivityList activities={activities} activeTab={activeTab} />
          </div>
    </div>
  );
};

export default ClientDetails;
