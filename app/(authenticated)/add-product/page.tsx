"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { CreateProduct } from "@/lib/products";

const AddProductPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      await CreateProduct(formData);
      toast.success(t.addProduct.addSuccess);
      router.push("/inventory");
      router.refresh();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(t.addProduct.addError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto flex flex-col bg-slate-50 dark:bg-slate-950 px-4 pt-3 pb-24 sm:items-center sm:px-6 sm:pt-6 sm:pb-28 lg:py-6 lg:px-8 lg:ml-64 relative transition-colors duration-200">
      {/* Desktop Theme & Language Toggles */}
      <div className="hidden lg:flex items-center gap-2 absolute right-8 top-6 z-20">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      {/* Inner: flex-1 on mobile, natural + my-auto centering on desktop */}
      <div className="flex-1 min-h-0 flex flex-col w-full max-w-sm mx-auto sm:flex-none sm:my-auto sm:max-w-xl lg:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-3 sm:mb-6 shrink-0">
          <h1 className="text-xl sm:text-3xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.addProduct.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5 max-w-md mx-auto">
            {t.addProduct.subtitle}
          </p>
        </div>

        {/* Card: fills remaining height on mobile, natural on desktop */}
        <div className="flex-1 min-h-0 flex flex-col bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:flex-none sm:p-7 lg:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.04)] dark:shadow-none lg:min-h-0 lg:justify-center transition-colors">
          <form
            className="flex-1 flex flex-col sm:flex-none"
            onSubmit={handleSubmit}
          >
            {/* Fields group */}
            <div className="space-y-4 sm:space-y-5">
              {/* Nom du produit */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1 sm:mb-2"
                >
                  {t.addProduct.nameLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder={t.addProduct.namePlaceholder}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-700 rounded-lg sm:rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              {/* Quantité */}
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1 sm:mb-2"
                >
                  {t.addProduct.qtyLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  required
                  min={0}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-700 rounded-lg sm:rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              {/* Prix */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1 sm:mb-2"
                >
                  {t.addProduct.priceLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  step={0.01}
                  min={0}
                  placeholder="0.00"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-700 rounded-lg sm:rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              {/* SKU */}
              <div>
                <label
                  htmlFor="sku"
                  className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1 sm:mb-2"
                >
                  {t.addProduct.skuLabel}{" "}
                  <span className="text-slate-400 dark:text-slate-500 text-xs font-normal">
                    {t.addProduct.skuOptional}
                  </span>
                </label>
                <input
                  id="sku"
                  name="sku"
                  placeholder={t.addProduct.skuPlaceholder}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-700 rounded-lg sm:rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              {/* Seuil de stock faible */}
              <div>
                <label
                  htmlFor="lowStockAt"
                  className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-1 sm:mb-2"
                >
                  {t.addProduct.lowStockThreshold}{" "}
                  <span className="text-slate-400 dark:text-slate-500 text-xs font-normal">
                    {t.addProduct.skuOptional}
                  </span>
                </label>
                <input
                  type="number"
                  id="lowStockAt"
                  name="lowStockAt"
                  min={0}
                  placeholder="Ex: 5"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-slate-300 dark:border-slate-700 rounded-lg sm:rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 hidden sm:block">
                  {t.addProduct.lowStockThresholdHint}
                </p>
              </div>
            </div>

            {/* Buttons — mt-auto pushes them to bottom of flex-col form on mobile */}
            <div className="mt-auto pt-5 flex gap-3 sm:mt-6 sm:pt-0">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm sm:text-base font-semibold active:scale-[0.99] transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting
                  ? t.addProduct.submitting
                  : t.addProduct.submitButton}
              </button>
              <Link
                href="/inventory"
                className="py-3 sm:py-3.5 px-4 sm:px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm sm:text-base font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-center"
              >
                {t.addProduct.cancelButton}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
