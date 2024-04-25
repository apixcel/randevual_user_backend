export interface BookingT {
  list: {
    name: string;
    cost: {
      full: number;
      down: number;
    };
    duration: string;
  }[];
  total: number;
  date: string;
  time: string;
  team: string;
  phone: string;
  notes: string;
  status: number;
  user_id: string;
  shop_id: string;
}

export interface UserT {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  status: string;
  user_type: string;
  picture: string;
}
