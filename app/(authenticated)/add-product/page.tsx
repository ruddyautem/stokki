"use client";

import { CreateProduct } from "@/lib/products";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import FormInput from "@/components/FormInput";

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
      <main className='p-4 pt-16 lg:ml-64 lg:p-8'>
        <div className='mb-6 lg:mb-8 text-center w-full'>
          <Link
            href='/inventory'
            className='hidden lg:flex absolute left-8 items-center gap-1.5 mt-2 text-slate-600 hover:text-slate-900 mb-4 text-sm font-medium transition-colors cursor-pointer'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Retour à l'inventaire
          </Link>
          <div className='flex flex-col items-center gap-3'>
            <div className='bg-linear-to-br from-slate-700 to-slate-900 rounded-lg p-3 shadow-md'>
              <Package className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-900'>Ajouter un produit</h1>
              <p className='text-slate-600 mt-1'>Ajouter un nouveau produit à votre inventaire</p>
            </div>
          </div>
        </div>

        <div className='max-w-3xl mx-auto'>
          <div className='bg-white rounded-xl border border-slate-200 p-4 sm:p-6 lg:p-8 shadow-sm'>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <FormInput id='name' name='name' label='Nom du produit' required placeholder='Ex: Ordinateur portable Dell XPS 15' />

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6'>
                <FormInput type='number' id='quantity' name='quantity' label='Quantité' required min={0} placeholder='0' />
                <FormInput type='number' id='price' name='price' label='Prix (€)' required step={0.01} min={0} placeholder='0.00' />
              </div>

              <FormInput id='sku' name='sku' label='SKU' optionalLabel={'(Facultatif)'} placeholder='Ex: DELL-XPS15-001' />

              <div>
                <FormInput type='number' id='lowStockAt' name='lowStockAt' label='Seuil de stock faible' optionalLabel={'(Facultatif)'} min={0} placeholder='Ex: 5' />
                <p className='text-xs text-slate-500 mt-2'>Vous recevrez une alerte lorsque le stock atteindra ce seuil</p>
              </div>

              <div className='flex flex-col sm:flex-row gap-3 pt-4 items-center justify-center '>
                <button type='submit' disabled={isSubmitting} className='w-full sm:w-auto px-8 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'>
                  {isSubmitting ? "Ajout en cours..." : "Ajouter le produit"}
                </button>
                <Link href='/inventory' className='w-full sm:w-auto text-center px-8 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all'>Annuler</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProductPage;
