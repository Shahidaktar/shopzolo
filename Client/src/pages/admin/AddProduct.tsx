import { ChangeEvent, FormEvent, useState } from "react";
import AdminLayout from "../../components/shared/Layout/AdminLayout";
import InputType from "../../components/shared/InputType";
import { useSelector } from "react-redux";
import { useNewProductMutation } from "../../redux/api/productAPI";
import { responseToast } from "../../utils/features";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const AddProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || stock < 0 || !photo || !category) return;

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);

    const res = await newProduct({ id: user?._id!, formData });

    responseToast(res, navigate, "/admin/product");
  };
  return (
    <AdminLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            New Product
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
            <InputType
              id="name"
              name="name"
              placeholder="name"
              type="text"
              value={name}
              required
              autoComplete="autocomplete"
              label="name"
              labelFor="name"
              onChange={(e) => setName(e.target.value)}
            />
            <InputType
              id="price"
              name="price"
              placeholder="price"
              type="number"
              value={price}
              required
              autoComplete="autocomplete"
              label="price"
              labelFor="price"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <InputType
              id="stock"
              name="stock"
              placeholder="stock"
              type="number"
              value={stock}
              required
              autoComplete="autocomplete"
              label="stock"
              labelFor="stock"
              onChange={(e) => setStock(Number(e.target.value))}
            />

            <InputType
              id="catagory"
              name="catagory"
              placeholder="catagory"
              type="text"
              value={category}
              required
              autoComplete="autocomplete"
              label="catagory"
              labelFor="catagory"
              onChange={(e) => setCategory(e.target.value)}
            />
            <div className="col-span-full ">
              <label
                htmlFor="file"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <div className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none  hover:text-indigo-500">
                      <input
                        id="file"
                        required
                        type="file"
                        onChange={changeImgHandler}
                        className="bg-gray-100 "
                      />
                    </div>
                  </div>
                  <p className="text-xs leading-5 text-gray-600 p-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            {photoPrev && (
              <div className="flex items-center justify-center">
                <img src={photoPrev} alt="New Image" className=" h-40 w-40" />
              </div>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
