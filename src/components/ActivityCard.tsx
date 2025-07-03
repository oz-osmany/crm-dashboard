import React, { type JSX } from 'react';
import { MdEmail, MdCall, MdAssignment, MdStickyNote2 } from 'react-icons/md';

type ActivityType = 'email' | 'call' | 'notes' | 'task';

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
  item: ActivityItem;
}

const iconMap: Record<ActivityType, JSX.Element> = {
  email: <MdEmail />,
  call: <MdCall />,
  notes: <MdStickyNote2 />,
  task: <MdAssignment />,
};

const ActivityCard: React.FC<Props> = ({ item }) => {
  const formattedDate = new Date(item.created_at).toLocaleString();
  const icon = iconMap[item.tipo];

  // Obtener contenido dinámico
  const getTitle = () => {
    if (item.tipo === 'email') return item.subject;
    if (item.tipo === 'call') return 'Llamada';
    if (item.tipo === 'notes') return 'Nota';
    if (item.tipo === 'task') return item.contenido || 'Tarea';
    return '';
  };

  const getText = () => {
    if (item.tipo === 'email') return item.body;
    if (item.tipo === 'call') return item.summary;
    if (item.tipo === 'notes') return item.description;
    if (item.tipo === 'task') return item.description;
    return '';
  };

  return (
    <div className={`activity-card activity-card--${item.tipo}`}>
      <div className="activity-card__icon">{icon}</div>
      <div className="activity-card__content">
        <div className="activity-card__header">
          <span className="activity-card__type">{item.tipo.toLowerCase()}</span>
          <span className="activity-card__date">{formattedDate}</span>
        </div>
        <div className="activity-card__body">
          <h4 className="activity-card__title">{getTitle()}</h4>
          <p className="activity-card__text">{getText()}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
