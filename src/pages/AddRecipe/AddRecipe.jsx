import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./component/InputField/InputField";
import { CATEGORY } from "../../static/category/category";
import { LoadingPage } from "../../component/LoadingPage";
import { AuthContext } from "../../providers/AuthProvider";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const imgBBToken = import.meta.env.VITE_IMGBB_API_KEY;

const AddRecipe = () => {
  const { loading, user } = useContext(AuthContext);
  const [disable, setDisable] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [axiosSecure] = useAxiosSecure();

  const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imgBBToken}`;

  const onSubmit = (data) => {
    setDisable(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(imageHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgRes) => {
        if (imgRes.success) {
          const imgUrl = imgRes.data.display_url;
          const {
            category,
            countryName,
            embeddedCode,
            recipeDetails,
            recipeName,
          } = data;

          const sendData = {
            category,
            countryName,
            embeddedCode,
            recipeDetails,
            recipeName,
            recipeImage: imgUrl,
            creatorEmail: user.email,
            watchCount: 0,
            purchasedBy: [],
          };
          axiosSecure
            .post("/recipe-store", sendData)
            .then((data) => {
              if (data.data.insertedId) {
                toast.success("Recipe added done");
                reset();
              }
            })
            .catch((err) => toast.error(err.message));
        }

        setDisable(false);
      });
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center pt-28 pb-10">
      <h1 className="text-center text-3xl font-semibold underline">
        Add Recipe Here{" "}
      </h1>

      <div className="py-7 w-1/4 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            placeholder="Recipe Name"
            register={register}
            required
            registerName="recipeName"
          />
          <InputField
            type="text"
            placeholder="Embedded code"
            register={register}
            required
            registerName="embeddedCode"
          />
          <InputField
            type="text"
            placeholder="Country"
            register={register}
            required
            registerName="countryName"
          />

          <select
            id="category"
            className="w-full px-1 py-2 border-b border-gray-800 bg-transparent outline-0 cursor-pointer"
            {...register("category", { required: true })}
          >
            <option value="">Select category</option>
            {(CATEGORY ?? []).map(({ id, name }) => (
              <option value={name} key={id}>
                {name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span role="alert" className="text-red-700 px-5">
              *Category is required
            </span>
          )}

          <textarea
            className="mt-5 w-full h-40 rounded px-2 py-2 border border-gray-800 outline-0"
            placeholder="Details Recipe..."
            {...register("recipeDetails", { required: true })}
          />
          {errors.details && (
            <span role="alert" className="text-red-700 px-5">
              *Details Recipe is required
            </span>
          )}

          <input
            type="file"
            accept="image/*"
            className="cursor-pointer mt-5"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <span role="alert" className="text-red-700 px-5">
              *Image is required
            </span>
          )}

          <div className="flex justify-center items-center mt-12">
            <button className="btn btn-secondary px-8 py-5" disabled={disable}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
