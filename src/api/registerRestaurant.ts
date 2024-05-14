import { api } from "@/lib/axios";

export interface registerRestaurantBody {
    restaurantName: string,
    managerName: string,
    email: string,
    phone: string
}

export async function registerRestaurant({ 
    email,
    managerName,
    phone,
    restaurantName
 }: registerRestaurantBody) {
    await api.post('/restaurants', { 
        email,
        managerName,
        phone,
        restaurantName
    })
}