import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useAxiosSecure } from "./useAxiosSecure";

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
