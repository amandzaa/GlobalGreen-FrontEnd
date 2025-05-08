interface SettingsCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    onButtonClick: () => void;
  }
  
  export const SettingsCard: React.FC<SettingsCardProps> = ({ 
    icon, title, description, buttonText, onButtonClick 
  }) => {
    return (
      <div className="flex items-center p-4 border rounded">
        <div className="text-green-600 w-8 h-8 mr-4">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <button 
          onClick={onButtonClick}
          className="ml-auto text-sm text-green-600"
        >
          {buttonText}
        </button>
      </div>
    );
  };