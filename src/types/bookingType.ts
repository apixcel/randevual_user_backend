export interface ServiceOptionType {
  cost: number;
  duration: string;
  _id: string;
}

export interface ServiceType {
  _id: string;
  name: string;
  option: ServiceOptionType[];
  down: number;
}

export interface TeamMemberType {
  _id: string;
  picture: string;
  name: string;
  profession: string;
  hourly_rate: number;
  schedule: any[]; // You might want to define a type for schedule as well
  createdAt: string;
  updatedAt: string;
}

export interface ReviewType {
  _id: string;
  description: string;
  rating: number;
  user: string;
  shop: string;
  createdAt: string;
  updatedAt: string;
}


export interface ShopServiceType {
  _id: string;
  listName: string;
  list: ServiceType[];
  team_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopType {
  media: {
    gallery: {
      [key: string]: string;
    };
    thumbnail: string;
  };
  _id: string;
  shopName: string;
  about: string;
  categories: {
    _id: string;
    label: string;
    value: string;
    createdAt: string;
    updatedAt: string;
  }[];
  services: ShopServiceType[];
  team: TeamMemberType[];
  ratings: number;
  numOfratings: number;
  paymentMethod: string;
  location: string;
  website: string;
  facebook: string;
  instagram: string;
  weekStart: string;
  weekEnd: string;
  onHour: string;
  offHour: string;
  cancelPolicy: string;
  createdAt: string;
  updatedAt: string;
  reviews: ReviewType[];
}
