// types/user.ts
export interface UserData {
    id: number;
    username?: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    image_url?: string;
    role?: string;
    address?: string;
    store_id?: string;
    subscription?: string;
    join_date?: string;
    birthday?: string;
    tools?: string[];
    github?: string;
    slack?: string;
    office?: string;
  }