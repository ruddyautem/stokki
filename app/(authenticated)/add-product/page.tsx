"use client";

import { CreateProduct } from "@/lib/products";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

const AddProductPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      await CreateProduct(formData);
      toast.success("Produit ajouté avec succès !");
      router.push("/inventory");
      router.refresh();
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Erreur lors de l'ajout du produit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      <main className='ml-64 p-8'>
        <div className='mb-8'>
          <Link
            href='/inventory'
            className='inline-flex items-center text-slate-600 hover:text-slate-900 mb-4 text-sm font-medium transition-colors'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Retour à l'inventaire
          </Link>
          <div className='flex items-center gap-3'>
            <div className='bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-3 shadow-md'>
              <Package className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-slate-900'>
                Ajouter un produit
              </h1>
              <p className='text-slate-600 mt-1'>
                Ajouter un nouveau produit à votre inventaire
              </p>
            </div>
          </div>
        </div>

        <div className='max-w-2xl'>
          <div className='bg-white rounded-xl border border-slate-200 p-8 shadow-sm'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-semibold text-slate-900 mb-2'
                >
                  Nom du produit <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  required
                  className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all'
                  placeholder='Ex: Ordinateur portable Dell XPS 15'
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='quantity'
                    className='block text-sm font-semibold text-slate-900 mb-2'
                  >
                    Quantité <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    name='quantity'
                    id='quantity'
                    min={0}
                    required
                    className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all'
                    placeholder='0'
                  />
                </div>
                <div>
                  <label
                    htmlFor='price'
                    className='block text-sm font-semibold text-slate-900 mb-2'
                  >
                    Prix (€) <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    name='price'
                    id='price'
                    step={0.01}
                    min={0}
                    required
                    className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all'
                    placeholder='0.00'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='sku'
                  className='block text-sm font-semibold text-slate-900 mb-2'
                >
                  SKU <span className='text-slate-400'>(Facultatif)</span>
                </label>
                <input
                  type='text'
                  name='sku'
                  id='sku'
                  className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all'
                  placeholder='Ex: DELL-XPS15-001'
                />
              </div>

              <div>
                <label
                  htmlFor='lowStockAt'
                  className='block text-sm font-semibold text-slate-900 mb-2'
                >
                  Seuil de stock faible{" "}
                  <span className='text-slate-400'>(Facultatif)</span>
                </label>
                <input
                  type='number'
                  name='lowStockAt'
                  id='lowStockAt'
                  min={0}
                  className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all'
                  placeholder='Ex: 5'
                />
                <p className='text-xs text-slate-500 mt-2'>
                  Vous recevrez une alerte lorsque le stock atteindra ce seuil
                </p>
              </div>

              <div className='flex gap-4 pt-4'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-8 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                >
                  {isSubmitting ? "Ajout en cours..." : "Ajouter le produit"}
                </button>
                <Link
                  href='/inventory'
                  className='px-8 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all text-center'
                >
                  Annuler
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProductPage;
