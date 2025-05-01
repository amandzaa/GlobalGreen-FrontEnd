import React from 'react';
import { User, ShoppingBag, Users, MessageSquare, Star, Calendar } from 'lucide-react';

interface StoreInfoProps {
  name: string;
  avatar: string;
  lastActive: string;
  productCount: number;
  followerCount: string;
  following: number;
  chatPerformance: number;
  rating: number;
  reviewCount: string;
  memberSince: string;
}

const StoreInfo: React.FC<StoreInfoProps> = ({
  name,
  avatar,
  lastActive,
  productCount,
  followerCount,
  following,
  chatPerformance,
  rating,
  reviewCount,
  memberSince
}) => {

  return (
    <div className="py-4 bg-[#E6F4EA] rounded-lg p-6">
      <div className="flex flex-col md:flex-row">
        {/* Store avatar and basic info */}
        <div className="flex items-start mr-8 mb-6 md:mb-0">
          <div className="relative w-20 h-20 mr-4">
            <img 
              src={avatar} 
              alt={name} 
              className="rounded-full border-4 border-[#2E8B57]"
            />
            <div className="absolute bottom-0 left-0 bg-[#2E8B57] text-white text-xs px-2 py-0.5 rounded">
              Star
            </div>
          </div>
          <div>
            <h1 className="text-xl font-medium text-[#20603D]">{name}</h1>
            <p className="text-sm text-[#20603D]/70">Aktif {lastActive}</p>
            <div className="flex space-x-2 mt-4">
              <button className="flex items-center bg-[#87CEEB] hover:bg-[#87CEEB]/80 text-[#20603D] text-sm px-4 py-1 rounded-full">
                <User className="h-4 w-4 mr-1" />
                Ikuti
              </button>
              <button className="flex items-center bg-[#2E8B57] hover:bg-[#2E8B57]/80 text-white text-sm px-4 py-1 rounded-full">
                <MessageSquare className="h-4 w-4 mr-1" />
                Chat
              </button>
            </div>
          </div>
        </div>
        
        {/* Store statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-4 ml-0 md:ml-4 p-4 bg-white/50 rounded-lg">
          <div className="flex items-start">
            <ShoppingBag className="h-5 w-5 text-[#2E8B57] mr-2" />
            <div>
              <p className="text-[#20603D]/70">Produk:</p>
              <p className="font-medium text-[#20603D]">{productCount}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Users className="h-5 w-5 text-[#2E8B57] mr-2" />
            <div>
              <p className="text-[#20603D]/70">Pengikut:</p>
              <p className="font-medium text-[#20603D]">{followerCount}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <User className="h-5 w-5 text-[#2E8B57] mr-2" />
            <div>
              <p className="text-[#20603D]/70">Mengikuti:</p>
              <p className="font-medium text-[#20603D]">{following}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <MessageSquare className="h-5 w-5 text-[#2E8B57] mr-2" />
            <div>
              <p className="text-[#20603D]/70">Performa Chat:</p>
              <p className="font-medium flex items-center text-[#20603D]">
                {chatPerformance}% 
                <span className="ml-1 text-[#2E8B57] text-xs">(Hitungan Jam)</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Star className="h-5 w-5 text-[#2E8B57] mr-2" />
            <div>
              <p className="text-[#20603D]/70">Penilaian:</p>
              <p className="font-medium text-[#20603D]">{rating} ({reviewCount} Penilaian)</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-[#2E8B57] mr-2" />
            <div>
              <p className="text-[#20603D]/70">Bergabung:</p>
              <p className="font-medium text-[#20603D]">{memberSince}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;