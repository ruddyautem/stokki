"use client";

import { useState } from "react";
import { Trash2, Check } from "lucide-react";
import { DeleteMultipleProducts } from "@/lib/products";
import { useRouter } from "next/navigation";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";

interface Product {
  id: string;
  name: string;
  sku: string | null;
  quantity: number;
  price: number;
  lowStockAt: number | null;
}

interface InventoryTableProps {
  items: Product[];
  onDeleteProduct: (formData: FormData) => Promise<void>;
}

const InventoryTable = ({ items, onDeleteProduct }: InventoryTableProps) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteType, setDeleteType] = useState<"single" | "bulk">("bulk");
  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);

  const inventoryTableHeaders = [
    { key: "select", label: "" },
    { key: "name", label: "Nom" },
    { key: "sku", label: "SKU" },
    { key: "price", label: "Prix" },
    { key: "quantity", label: "Quantité" },
    { key: "lowStockAt", label: "Stock Faible à partir de" },
    { key: "Actions", label: "" },
  ];

  // Select all handler
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(items.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Individual checkbox handler
  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  // Check if all items are selected
  const allSelected =
    items.length > 0 && items.every((item) => selectedIds.includes(item.id));

  // Open bulk delete confirmation
  const handleBulkDeleteClick = () => {
    setDeleteType("bulk");
    setShowConfirmModal(true);
  };

  // Open single delete confirmation
  const handleSingleDeleteClick = (id: string) => {
    setSingleDeleteId(id);
    setDeleteType("single");
    setShowConfirmModal(true);
  };

  // Confirm delete action
  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (deleteType === "bulk") {
        await DeleteMultipleProducts(selectedIds);
        toast.success(
          `${selectedIds.length} produit(s) supprimé(s) avec succès`
        );
        setSelectedIds([]);
      } else if (deleteType === "single" && singleDeleteId) {
        const formData = new FormData();
        formData.append("id", singleDeleteId);
        await onDeleteProduct(formData);
        toast.success("Produit supprimé avec succès");
        setSingleDeleteId(null);
      }
      router.refresh();
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error deleting products:", error);
      toast.error("Erreur lors de la suppression");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className='bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm'>
        <table className='w-full'>
          <thead className='bg-slate-50 border-b border-slate-200'>
            <tr>
              {inventoryTableHeaders.map((header) => (
                <th
                  key={header.key}
                  className='px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'
                >
                  {header.key === "select" ? (
                    <label className='flex items-center cursor-pointer group'>
                      <input
                        type='checkbox'
                        checked={allSelected}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className='sr-only peer'
                      />
                      <div className='relative w-5 h-5 bg-white border-2 border-slate-300 rounded-md transition-all duration-200 peer-checked:bg-slate-800 peer-checked:border-slate-800 group-hover:border-slate-400 peer-checked:group-hover:bg-slate-900 peer-focus:ring-2 peer-focus:ring-slate-500 peer-focus:ring-offset-1'>
                        <Check className='absolute inset-0 w-3 h-3 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200' />
                      </div>
                    </label>
                  ) : (
                    header.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-slate-100'>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className='px-6 py-12 text-center text-slate-500'
                >
                  Aucun produit trouvé
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    selectedIds.includes(item.id) ? "bg-slate-100" : ""
                  }`}
                >
                  <td className='px-6 py-4'>
                    <label className='flex items-center cursor-pointer group'>
                      <input
                        type='checkbox'
                        checked={selectedIds.includes(item.id)}
                        onChange={(e) =>
                          handleSelectOne(item.id, e.target.checked)
                        }
                        className='sr-only peer'
                      />
                      <div className='relative w-5 h-5 bg-white border-2 border-slate-300 rounded-md transition-all duration-200 peer-checked:bg-slate-800 peer-checked:border-slate-800 group-hover:border-slate-400 peer-checked:group-hover:bg-slate-900 peer-focus:ring-2 peer-focus:ring-slate-500 peer-focus:ring-offset-1'>
                        <Check className='absolute inset-0 w-3 h-3 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200' />
                      </div>
                    </label>
                  </td>
                  <td className='px-6 py-4 text-sm font-medium text-slate-900'>
                    {item.name}
                  </td>
                  <td className='px-6 py-4 text-sm text-slate-600'>
                    {item.sku || "-"}
                  </td>
                  <td className='px-6 py-4 text-sm font-medium text-slate-900'>
                    {item.price.toFixed(2)} €
                  </td>
                  <td className='px-6 py-4 text-sm text-slate-900'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.quantity === 0
                          ? "bg-red-100 text-red-800"
                          : item.lowStockAt && item.quantity <= item.lowStockAt
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {item.quantity}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-sm text-slate-600'>
                    {item.lowStockAt || "-"}
                  </td>
                  <td className='px-6 py-4 text-sm'>
                    <button
                      type='button'
                      onClick={() => handleSingleDeleteClick(item.id)}
                      className='p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer'
                      title='Supprimer'
                      aria-label='Supprimer le produit'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Bulk Delete Button */}
        {selectedIds.length > 0 && (
          <div className='px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center'>
            <span className='text-sm text-slate-600 font-medium'>
              {selectedIds.length} produit(s) sélectionné(s)
            </span>
            <button
              type='button'
              onClick={handleBulkDeleteClick}
              disabled={isDeleting}
              className='flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-all font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Trash2 className='w-4 h-4' />
              Supprimer la sélection
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title={
          deleteType === "bulk"
            ? "Supprimer les produits sélectionnés ?"
            : "Supprimer ce produit ?"
        }
        message={
          deleteType === "bulk"
            ? `Vous êtes sur le point de supprimer ${selectedIds.length} produit(s). Cette action est irréversible.`
            : "Cette action est irréversible. Le produit sera définitivement supprimé."
        }
        confirmText='Supprimer'
        cancelText='Annuler'
        isLoading={isDeleting}
      />
    </>
  );
};

export default InventoryTable;
