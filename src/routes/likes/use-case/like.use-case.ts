import { LikeRepo } from "./like.repo";

export const AddToLike = async(data : any) => {

    const likerepo = LikeRepo();
    return likerepo.AddToLike(data);
};


export const RemoveFromLike = async(id : string) => {

    const likerepo = LikeRepo();
    return likerepo.RemoveFromLike(id);
}


export const GetLike = async(id : string) => {
    const likerepo = LikeRepo();
    return likerepo.GetLike(id);
}