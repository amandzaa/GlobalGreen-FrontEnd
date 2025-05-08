import { TabItem } from ".";

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onEditProfile: () => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange, onEditProfile }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`px-2 py-1 flex items-center ${
                activeTab === tab.id 
                  ? "text-green-600 border-b-2 border-green-600" 
                  : "text-gray-600"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};