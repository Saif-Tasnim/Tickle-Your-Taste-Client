import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useGetRecipe = (email, id) => {
  const [axiosSecure] = useAxiosSecure();

  const { data: recipeData = {}, isLoading } = useQuery({
    queryKey: ["id", id],
    queryFn: async () => {
      if (email && localStorage.getItem("access-token")) {
        const res = await axiosSecure.get(`/get-recipe/${id}`);
        return res.data;
      }
      return {};
    },
  });

  return [recipeData,isLoading];
};
