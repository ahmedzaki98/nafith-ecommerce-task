import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdOutlineInsertPhoto } from "react-icons/md";
import useCategory from "../../custom-hooks/useCategory";
import createNewProduct from "../../apis/product/createNewProduct";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AddProduct = () => {
  const { t } = useTranslation();

  const [Step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);

  const { categoryList } = useCategory();

  const initialValues = {
    title: "",
    price: "",
    description: "",
    category: "",
    image: null,
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewImage(URL.createObjectURL(selectedFile));
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t("products.titleValidation")),
    price: Yup.number()
      .required(t("products.PriceValidation"))
      .positive(t("products.PriceValidation2")),
    description: Yup.string().required(t("products.descriptionValidation")),
    category: Yup.string().required(t("products.categoryValidation")),
    image: Yup.mixed().required(t("products.imageValidation")),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await createNewProduct(values);
      if (res?.status) {
        toast.success(t("products.productToast"));
        setSubmitting(false);
        resetForm();
        setPreviewImage(null);
        setStep(1);
      } else {
        toast.error(t("common.wrongToast"));
      }
    } catch (error) {}
  };

  return (
    <section className="py-24 relative bg-red w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleSubmit, isSubmitting, setFieldValue }) => (
          <div className="rounded-xl border border-gray-200 shadow-lg flex flex-col justify-center items-center md:p-20 md:w-[80%] mx-auto sm:w-full sm:p-10">
            <h2 className="w-full text-3xl flex items-start font-semibold leading-7 text-primary mb-20">
              {t("products.AddNewProduct")}
            </h2>
            <Form onSubmit={handleSubmit} className="bg-red w-full">
              {Step === 1 && (
                <div className="flex flex-col justify-start items-center w-full">
                  <h2 className="flex items-center justify-end w-full text-primaryVariant text-[18px]">
                    {t("products.Step1")}
                  </h2>

                  <div className="w-full px-3 mb-6">
                    <label
                      htmlFor="title"
                      className="block text-l font-medium leading-6 text-gray-900"
                    >
                      {t("products.title")}
                    </label>
                    <Field
                      className="rounded-xl shadow-md placeholder:text-gray-400 appearance-none block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 my-2 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      id="title"
                      name="title"
                      placeholder={t("products.titlePlaceholder")}
                    />
                    <p className="text-primaryVariant text-s italic">
                      <ErrorMessage name="title" />
                    </p>
                  </div>
                  <div className="w-full px-3 mb-6">
                    <label
                      htmlFor="price"
                      className="block text-l font-medium leading-6 text-gray-900"
                    >
                      {t("products.Price")}
                    </label>
                    <Field
                      className="rounded-xl shadow-md placeholder:text-gray-400 appearance-none block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 my-2 leading-tight focus:outline-none focus:bg-white"
                      type="number"
                      id="price"
                      name="price"
                      placeholder={t("products.PricePlaceholder")}
                    />
                    <p className="text-primaryVariant text-s italic">
                      <ErrorMessage name="price" />
                    </p>
                  </div>
                  <div className="w-full px-3 mb-6">
                    <label
                      className="block text-l font-medium leading-6 text-gray-900"
                      htmlFor="description"
                    >
                      {t("products.description")}
                    </label>
                    <Field
                      className="resize-none h-[100px] rounded-xl shadow-md placeholder:text-gray-400 appearance-none block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 my-2 leading-tight focus:outline-none focus:bg-white"
                      as="textarea"
                      id="description"
                      name="description"
                      placeholder={t("products.descriptionPlaceholder")}
                    />
                    <p className="text-primaryVariant text-s italic">
                      <ErrorMessage name="description" />
                    </p>
                  </div>

                  <div className="flex justify-end w-full">
                    <button
                      className="rounded-md w-100 bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      type="button"
                      onClick={() => setStep(2)}
                    >
                      {t("products.Next")}
                    </button>
                  </div>
                </div>
              )}
              {Step === 2 && (
                <div className="flex flex-col justify-start items-center w-full">
                  <h2 className="flex items-center justify-end w-full text-primaryVariant text-[18px]">
                    {t("products.Step2")}
                  </h2>
                  <div className="w-full px-3 mb-6">
                    <label
                      className="block text-l font-medium leading-6 text-gray-900"
                      htmlFor="category"
                    >
                      {t("products.Category")}
                    </label>
                    <Field
                      className="rounded-xl shadow-md placeholder:text-gray-400 appearance-none block w-full bg-white text-gray-700 border border-gray-300 py-3 px-4 my-2 leading-tight focus:outline-none focus:bg-white"
                      as="select"
                      id="category"
                      name="category"
                    >
                      <option value="" hidden>
                        {t("products.SelectCategory")}
                      </option>
                      {categoryList.map((value, index) => {
                        return (
                          <option key={index} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </Field>
                    <p className="text-primaryVariant text-s italic">
                      <ErrorMessage name="category" />
                    </p>
                  </div>
                  <div className="w-full px-3 mb-6">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {t("products.ProductPhoto")}
                    </label>
                    <div
                      className="h-80 relative mt-2 w-full flex justify-center rounded-lg border border-dashed border-gray-900/25 py-10 cursor-pointer"
                      onClick={() => document.getElementById("image").click()}
                    >
                      <div className="flex w-full flex-col items-center justify-center text-center">
                        <MdOutlineInsertPhoto className="w-10 h-10 flex items-center justify-center" />
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>{t("products.UploadImage")}</span>
                        </label>
                        <div className="mt-4 w-full flex items-center justify-center text-sm leading-6 text-gray-600">
                          <Field
                            id="image"
                            name="image"
                            type="file"
                            className="sr-only w-full h-full z-0"
                            value={undefined}
                            onChange={(event) => {
                              setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                              handleImageChange(event);
                            }}
                          />
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                        {previewImage && (
                          <img
                            src={previewImage}
                            alt="Product Preview"
                            className="absolute h-full w-full object-cover object-center lg:h-full lg:w-full rounded-md"
                          />
                        )}
                      </div>
                    </div>
                    <p className="text-primaryVariant text-s italic">
                      <ErrorMessage name="image" />
                    </p>
                  </div>
                  <div className="flex justify-end w-full">
                    <button
                      className="rounded-md w-100 bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      {t("products.Previous")}
                    </button>
                  </div>

                  <button
                    className="cursor-pointer w-[60%] mt-10 rounded-md w-100 bg-primaryVariant px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-[#F87B47] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {t("products.Submit")}
                  </button>
                </div>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </section>
  );
};

export default AddProduct;
