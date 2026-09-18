export type Restaurant = {
  id: number;
  restaurant_name: string;
  address: string;
  city: string;
  phone_number: string;
  cuisine_type: string;
  average_rating: number;
  opening_hours: string;
  reservation_required: boolean;
  images: string;
  menu : Food[]
};

export type Food = {
  id :number,
  image : string,
  dish_name: string;
  description: string;
  price: number;
  calories: number;
  ingredients: string;
  category: string;
  spicy_level: string;
  vegetarian: boolean;
  gluten_free: boolean;
  chef_special: boolean;
};

export const restaurants_placeholder: Restaurant = {
  id: 0,
  restaurant_name: "",
  address: "",
  city: "",
  phone_number: "",
  cuisine_type: "",
  average_rating: 0,
  opening_hours: "",
  reservation_required: false,
  images: "",
  menu: []
};


export const food_placeholder : Food = {
  dish_name: "",
  description: "",
  price: 0,
  calories: 1,
  ingredients: "",
  category: "",
  spicy_level: "",
  vegetarian: false,
  gluten_free: true,
  chef_special: false,
}

export type CartItems = {
  food : Food,
  restaurant_name : string,
  quantity : number
}