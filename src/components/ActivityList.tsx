import React from 'react';
import ActivityCard from './ActivityCard';

type ActivityType = 'email' | 'notes' | 'call' | 'task';

interface ActivityItem {
  id: number;
  tipo: ActivityType;
  created_at: string;
  user_id: number;
  subject?: string;
  body?: string;
  summary?: string;
  description?: string;
  contenido?: string;

}

interface Props {
  activities: ActivityItem[];
  activeTab: 'Activity' | 'Email' | 'Notes' | 'Call' | 'Task';
}

const ActivityList: React.FC<Props> = ({ activities, activeTab }) => {
  const filtered = activeTab === 'Activity'
    ? activities
    : activities.filter((item) => item.tipo === activeTab.toLowerCase());

  const sorted = [...filtered].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="activity-list">
      {sorted.map((item) => (
        <ActivityCard key={`${item.tipo}-${item.id}`} item={item} />
      ))}
    </div>
  );
};

export default ActivityList;
