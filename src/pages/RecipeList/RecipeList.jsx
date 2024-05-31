import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeCard } from "./component";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingPage from "../../component/LoadingPage/LoadingPage";

// https://reciepe-server.vercel.app/get-recipe

const RecipeList = () => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  
  const {
    data: recipeList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const res = await axios.get(
        `https://reciepe-server.vercel.app/get-recipe?page=${page}`
      );
      if (res.data.length === 0) {
        setLoadMore(false);
        setLoadingPage(false);
      } else {
        setAllData((allData) => [...allData, ...res.data]);
        setLoadingPage(false);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [page]);

  const fetchNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setLoadingPage(true);
  };

  const handleSearchInput = async (value) => {
    const lower = value.toLowerCase();
    const res = await axios.get(`https://reciepe-server.vercel.app/get-recipes/${lower}`);
    setAllData(res.data);
  };

  if (isLoading || loadingPage) {
    return <LoadingPage />;
  }
  return (
    <div className="pt-28 pb-10">
      <h1 className="text-3xl font-semibold underline text-center">
        All Recipe List
      </h1>
      <div className="my-12 md:m-12 flex justify-between items-center">
        <div>
          <input
            type="text"
            placeholder="Search by recipe name ..."
            className="bg-transparent px-6 py-3 rounded-md border border-purple-800"
            onChange={(e) => handleSearchInput(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={recipeList.length}
        next={fetchNextPage}
        hasMore={loadMore}
        loader={<p>Loading ...</p>}
        endMessage={
          <p style={{ textAlign: "center", color: "purple" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        scrollThreshold={1}
      >
        <div className="my-14 md:m-14 flex flex-col gap-10">
          {allData.map((recipe, i) => (
            <RecipeCard recipe={recipe} key={i} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default RecipeList;
