import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useCreatorUser = (email) => {
  const [axiosSecure] = useAxiosSecure();

  const { data: userData = {} } = useQuery({
    queryKey: ["email", email],
    queryFn: async () => {
      if (email && localStorage.getItem("access-token")) {
        const res = await axiosSecure.get(`/creator-users/${email}`);
        return res.data;
      }
      return {};
    },
    enabled: !!email,
  });

  return userData;
};


export const useDbUser = (email) => {
  const [axiosSecure] = useAxiosSecure();

  const { data: userData = {} } = useQuery({
    queryKey: ["email", email],
    queryFn: async () => {
      if (email && localStorage.getItem("access-token")) {
        const res = await axiosSecure.get(`/users/${email}`);
        return res.data;
      }
      return {};
    },
    enabled: !!email,
  });

  return userData;
};
