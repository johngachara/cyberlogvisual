
import React from 'react';
import { Decision } from '../../types';

interface BadgeProps {
  decision: Decision;
}

const decisionStyles: Record<Decision, { style: string; indicator: string }> = {
  allowed: { 
    style: 'badge-success', 
    indicator: 'status-success' 
  },
  blocked: { 
    style: 'badge-danger', 
    indicator: 'status-danger' 
  },
  monitored: { 
    style: 'badge-warning', 
    indicator: 'status-warning' 
  },
  BENIGN: { 
    style: 'badge-success', 
    indicator: 'status-success' 
  },
  MALICIOUS: { 
    style: 'badge-danger', 
    indicator: 'status-danger' 
  },
};

const Badge: React.FC<BadgeProps> = ({ decision }) => {
  const config = decisionStyles[decision] || { style: 'badge-info', indicator: 'status-indicator' };
  const displayText = decision === 'BENIGN' ? 'Allowed' : 
                     decision === 'MALICIOUS' ? 'Blocked' : 
                     decision.charAt(0).toUpperCase() + decision.slice(1);
  
  return (
    <span className={`${config.style} inline-flex items-center`}>
      <span className={config.indicator}></span>
      {displayText}
    </span>
  );
};

export default Badge;
