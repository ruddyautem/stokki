"use client";

import { useState } from "react";
import { Trash2, Check, X } from "lucide-react";
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

const getQuantityBadge = (item: Product) => {
  if (item.quantity === 0) return "bg-red-100 text-red-800";
  if (item.lowStockAt && item.quantity <= item.lowStockAt) return "bg-amber-100 text-amber-800";
  return "bg-emerald-100 text-emerald-800";
};

const InventoryTable = ({ items, onDeleteProduct }: InventoryTableProps) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteType, setDeleteType] = useState<"single" | "bulk">("bulk");
  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? items.map((item) => item.id) : []);
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) setSelectedIds([...selectedIds, id]);
    else setSelectedIds(selectedIds.filter((sId) => sId !== id));
  };

  const allSelected = items.length > 0 && items.every((item) => selectedIds.includes(item.id));

  const handleBulkDeleteClick = () => { setDeleteType("bulk"); setShowConfirmModal(true); };
  const handleSingleDeleteClick = (id: string) => { setSingleDeleteId(id); setDeleteType("single"); setShowConfirmModal(true); };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (deleteType === "bulk") {
        await DeleteMultipleProducts(selectedIds);
        toast.success(`${selectedIds.length} produit(s) supprimé(s) avec succès`);
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

  const toggleSelect = (id: string) => {
    handleSelectOne(id, !selectedIds.includes(id));
  };

  // Checkbox component for reuse
  const Checkbox = ({ checked, onChange }: { checked: boolean; onChange?: () => void }) => (
    <button type="button" onClick={onChange} className={`relative w-5 h-5 border-2 rounded-md transition-all duration-200 flex items-center justify-center ${checked ? "bg-slate-800 border-slate-800" : "bg-white border-slate-300"} hover:border-slate-400 cursor-pointer`} aria-label="Sélectionner">
      {checked && <Check className="w-3 h-3 text-white" />}
    </button>
  );

  return (
    <>
      {/* Desktop table */}
      <div className='hidden lg:block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm'>
        <table className='w-full'>
          <thead className='bg-slate-50 border-b border-slate-200'>
            <tr>
              <th className='px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>
                <Checkbox checked={allSelected} onChange={() => handleSelectAll(!allSelected)} />
              </th>
              {["Nom du produit", "SKU", "Prix", "Quantité", "Stock Faible à partir de", "Supprimer"].map((label) => (
                <th key={label} className='px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider'>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-slate-100'>
            {items.length === 0 ? (
              <tr><td colSpan={7} className='px-6 py-12 text-center text-slate-500'>Aucun produit trouvé</td></tr>
            ) : items.map((item) => (
              <tr key={item.id} className={`hover:bg-slate-50 transition-colors ${selectedIds.includes(item.id) ? "bg-slate-100" : ""}`}>
                <td className='px-6 py-4'><Checkbox checked={selectedIds.includes(item.id)} onChange={() => toggleSelect(item.id)} /></td>
                <td className='px-6 py-4 text-sm font-medium text-slate-900'>{item.name}</td>
                <td className='px-6 py-4 text-sm text-slate-600'>{item.sku || "-"}</td>
                <td className='px-6 py-4 text-sm font-medium text-slate-900'>{item.price.toFixed(2)} €</td>
                <td className='px-6 py-4 text-sm'><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getQuantityBadge(item)}`}>{item.quantity}</span></td>
                <td className='px-6 py-4 text-sm text-slate-600'>{item.lowStockAt || "-"}</td>
                <td className='px-6 py-4'>
                  <button type='button' onClick={() => handleSingleDeleteClick(item.id)} className='p-2 hover:text-red-500 text-red-600 hover:bg-red-100 rounded-lg transition-all cursor-pointer' title='Supprimer'><Trash2 className='w-4 h-4' /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedIds.length > 0 && (
          <div className='px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center'>
            <span className='text-sm text-slate-600 font-medium'>{selectedIds.length} produit(s) sélectionné(s)</span>
            <button type='button' onClick={handleBulkDeleteClick} disabled={isDeleting} className='flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-all font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'>
              <Trash2 className='w-4 h-4' /> Supprimer la sélection
            </button>
          </div>
        )}
      </div>

      {/* Mobile card layout */}
      <div className='lg:hidden space-y-3'>
        {items.length === 0 ? (
          <div className='bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 shadow-sm'>Aucun produit trouvé</div>
        ) : items.map((item) => (
          <div key={item.id} className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-colors ${selectedIds.includes(item.id) ? "ring-2 ring-slate-800" : ""}`}>
            {/* Card header: name + checkbox + delete */}
            <div className='flex items-start justify-between p-4 border-b border-slate-100'>
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <Checkbox checked={selectedIds.includes(item.id)} onChange={() => toggleSelect(item.id)} />
                <span className='text-sm font-semibold text-slate-900 truncate'>{item.name}</span>
              </div>
              <button type='button' onClick={() => handleSingleDeleteClick(item.id)} className='p-2 hover:text-red-500 text-red-600 hover:bg-red-100 rounded-lg transition-all cursor-pointer shrink-0 ml-2' title='Supprimer'><Trash2 className='w-4 h-4' /></button>
            </div>

            {/* Card body: details grid */}
            <div className='grid grid-cols-3 gap-px bg-slate-100'>
              <div className='bg-white p-3 flex flex-col items-center text-center'>
                <span className='text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1'>Prix</span>
                <span className='text-sm font-bold text-slate-900'>{item.price.toFixed(2)} €</span>
              </div>
              <div className='bg-white p-3 flex flex-col items-center text-center'>
                <span className='text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1'>Quantité</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-0.5 ${getQuantityBadge(item)}`}>{item.quantity}</span>
              </div>
              <div className='bg-white p-3 flex flex-col items-center text-center'>
                <span className='text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1'>SKU</span>
                <span className='text-xs font-medium text-slate-600 mt-0.5'>{item.sku || "-"}</span>
              </div>
            </div>

            {/* Low stock threshold */}
            {item.lowStockAt !== null && (
              <div className='bg-white p-3 flex items-center justify-center border-t border-slate-100'>
                <span className='text-[10px] uppercase tracking-wider text-slate-400 font-semibold mr-2'>Alerte à:</span>
                <span className='text-xs font-medium text-slate-600'>{item.lowStockAt} unités</span>
              </div>
            )}
          </div>
        ))}

        {/* Mobile bulk delete bar */}
        {selectedIds.length > 0 && (
          <div className='fixed bottom-4 left-4 right-4 z-30 bg-slate-800 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between'>
            <span className='text-sm font-medium'>{selectedIds.length} sélectionné(s)</span>
            <button type='button' onClick={handleBulkDeleteClick} disabled={isDeleting} className='flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-all font-medium text-sm disabled:opacity-50 cursor-pointer'>
              <Trash2 className='w-4 h-4' /> Supprimer
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title={deleteType === "bulk" ? "Supprimer les produits sélectionnés ?" : "Supprimer ce produit ?"}
        message={deleteType === "bulk" ? `Vous êtes sur le point de supprimer ${selectedIds.length} produit(s). Cette action est irréversible.` : "Cette action est irréversible. Le produit sera définitivement supprimé."}
        confirmText='Supprimer'
        cancelText='Annuler'
        isLoading={isDeleting}
      />
    </>
  );
};

export default InventoryTable;
