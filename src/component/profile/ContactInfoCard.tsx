interface ContactInfoCardProps {
    icon: React.ReactNode;
    title: string;
    value?: string;
    onEdit: () => void;
  }
  
  export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon, title, value, onEdit }) => {
    return (
      <div className="flex items-start">
        <div className="w-5 h-5 text-gray-500 mt-0.5 mr-3">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-sm text-gray-600">{value || "-"}</p>
          <button 
            onClick={onEdit}
            className="text-xs text-green-600 mt-1"
          >
            Change
          </button>
        </div>
      </div>
    );
  };