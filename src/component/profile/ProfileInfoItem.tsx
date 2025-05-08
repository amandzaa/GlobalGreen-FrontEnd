interface ProfileInfoItemProps {
    label: string;
    value?: string;
  }
  
  export const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({ label, value }) => (
    <div>
      <span className="text-sm text-gray-500 block">{label}</span>
      <span className="text-sm">{value || "-"}</span>
    </div>
  );
  