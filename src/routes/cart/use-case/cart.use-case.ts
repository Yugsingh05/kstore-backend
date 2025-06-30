import { CartRepo } from "./cart.repo";

export const AddtoCart = async(data : any) => {

    const cartRepo = CartRepo();
    return cartRepo.AddToCart(data);
};


export const RemoveFromCart = async(id : string) => {

    const cartRepo = CartRepo();
    return cartRepo.RemoveFromCart(id);
}

export const UpdateCart = async(id : string, data : any) => {
    const cartRepo = CartRepo();
    return cartRepo.UpdateCart(id, data);
}

export const GetCart = async(id : string) => {
    const cartRepo = CartRepo();
    return cartRepo.GetCart(id);
}





