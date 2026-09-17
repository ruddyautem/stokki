"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

export type Language = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      dashboard: "Tableau de bord",
      inventory: "Inventaire",
      addProduct: "Ajouter produit",
      settings: "Paramètres",
      add: "Ajouter",
      profile: "Profil",
      logout: "Se déconnecter",
      menu: "Menu",
      login: "Connexion",
      user: "Utilisateur",
    },
    landing: {
      title1: "Gérez vos stocks",
      title2: "avec précision.",
      subtitle:
        "Suivez vos stocks en temps réel et anticipez les ruptures en toute simplicité.",
      getStarted: "Commencer gratuitement",
      previewSubtitle:
        "Visualisez instantanément la valeur de vos stocks, vos niveaux de réapprovisionnement et les produits à rotation rapide.",
      badge: "Plateforme moderne de gestion",
      allRightsReserved: "Tous droits réservés.",
    },
    auth: {
      welcomeBack: "Content de vous revoir",
      signInSubtitle: "Connectez-vous à votre tableau de bord",
      demoAccount: "Compte de démonstration",
      oneClickLogin: "Connexion en un clic",
      loggingIn: "Connexion en cours...",
      loginSuccess: "Connexion réussie !",
      loginError: "Erreur de connexion",
      noAccount: "Pas de compte ?",
      createAccount: "Créer un compte",
      home: "Accueil",
      lastUsed: "Dernier utilisé",
    },
    dashboard: {
      title: "Tableau de bord",
      subtitle:
        "Aperçu en temps réel de votre inventaire et de vos indicateurs",
      totalProducts: "Total Références",
      totalValue: "Valeur Totale",
      lowStockAlert: "Stock Faible",
      outOfStock: "Rupture de Stock",
      stockEvolution: "Évolution des références",
      stockEvolutionSubtitle:
        "Suivi des références créées sur les 12 dernières semaines",
      productsAdded: "Références",
      stockLevels: "Niveau de stock",
      stockPercentage: "en pourcentage",
      inStock: "En stock",
      lowStock: "Stock faible",
      outOfStockItem: "Rupture",
      recentProducts: "Derniers ajouts",
      recentProductsSubtitle: "Vos références créées récemment",
      noProducts: "Aucun produit pour le moment",
      noProductsSubtitle:
        "Ajoutez votre premier produit pour visualiser vos statistiques",
      addFirstProduct: "Ajouter un produit",
      unitPrice: "Prix unitaire",
    },
    inventory: {
      title: "Inventaire",
      subtitle:
        "Supervisez vos stocks, mettez à jour vos quantités et gérez vos références",
      filter: "Filtrer",
      sortBy: "Trier par",
      nameAsc: "Nom (A → Z)",
      nameDesc: "Nom (Z → A)",
      qtyAsc: "Quantité (croissante)",
      qtyDesc: "Quantité (décroissante)",
      priceAsc: "Prix (croissant)",
      priceDesc: "Prix (décroissant)",
      searchPlaceholder: "Rechercher par nom ou SKU...",
      selectedCount: "sélectionné(s)",
      cancelSelection: "Annuler",
      deleteSelected: "Supprimer",
      newProduct: "Nouveau produit",
      totalReferences: "Total Références",
      inStockBadge: "En stock",
      lowStockBadge: "Stock faible",
      outOfStockBadge: "Rupture",
      colProduct: "Produit",
      colSku: "SKU / Code",
      colPrice: "Prix unitaire",
      colStatus: "Statut",
      colQuantity: "Quantité en stock",
      colActions: "Actions",
      noProductFound: "Aucun produit trouvé",
      noProductFoundSub:
        "Ajoutez un nouveau produit ou modifiez votre recherche",
      noProductYet: "Aucun produit dans l'inventaire",
      paginationShowing: "Affichage de",
      paginationTo: "à",
      paginationOn: "sur",
      paginationProducts: "produits",
      paginationPrevious: "Précédent",
      paginationNext: "Suivant",
      decreaseQty: "Diminuer",
      increaseQty: "Augmenter",
      deleteProductTooltip: "Supprimer",
      confirmDeleteTitle: "Confirmer la suppression",
      confirmDeleteSingle:
        "Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.",
      confirmDeleteBulk:
        "Êtes-vous sûr de vouloir supprimer les produits sélectionnés ? Cette action est irréversible.",
      confirm: "Confirmer",
      cancel: "Annuler",
      deleting: "Suppression...",
      deleteSuccess: "Produit supprimé avec succès",
      deleteBulkSuccess: "produit(s) supprimé(s) avec succès",
      deleteError: "Erreur lors de la suppression",
      qtyUpdateError: "Erreur lors de la modification de la quantité",
      statusInStock: "EN STOCK",
      statusLowStock: "STOCK FAIBLE",
      statusOutOfStock: "RUPTURE",
    },
    addProduct: {
      title: "Ajouter un produit",
      subtitle: "Ajouter un nouveau produit à votre inventaire",
      nameLabel: "Nom du produit",
      namePlaceholder: "Ex: Ordinateur portable Dell XPS 15",
      qtyLabel: "Quantité",
      priceLabel: "Prix (€)",
      skuLabel: "SKU",
      skuOptional: "(Facultatif)",
      skuPlaceholder: "Ex: DELL-XPS15-001",
      lowStockThreshold: "Seuil de stock faible",
      lowStockThresholdHint:
        "Vous recevrez une alerte lorsque le stock atteindra ce seuil",
      submitButton: "Ajouter le produit",
      submitting: "Ajout en cours...",
      cancelButton: "Annuler",
      addSuccess: "Produit ajouté avec succès !",
      addError: "Erreur lors de l'ajout du produit",
    },
    settings: {
      title: "Paramètres",
      subtitle: "Gérez les paramètres de votre compte et vos préférences",
    },
  },
  en: {
    nav: {
      dashboard: "Dashboard",
      inventory: "Inventory",
      addProduct: "Add Product",
      settings: "Settings",
      add: "Add",
      profile: "Profile",
      logout: "Log out",
      menu: "Menu",
      login: "Log in",
      user: "User",
    },
    landing: {
      title1: "Manage your inventory",
      title2: "with precision.",
      subtitle:
        "Track your stock in real time and anticipate shortages effortlessly.",
      getStarted: "Start for free",
      previewSubtitle:
        "Instantly visualize your inventory value, restock thresholds, and fast-moving products.",
      badge: "Modern inventory platform",
      allRightsReserved: "All rights reserved.",
    },
    auth: {
      welcomeBack: "Welcome back",
      signInSubtitle: "Sign in to your dashboard",
      demoAccount: "Demo Account",
      oneClickLogin: "One-click login",
      loggingIn: "Signing in...",
      loginSuccess: "Successfully signed in!",
      loginError: "Sign-in error",
      noAccount: "Don't have an account?",
      createAccount: "Create an account",
      home: "Home",
      lastUsed: "Last used",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Real-time overview of your inventory and key metrics",
      totalProducts: "Total Items",
      totalValue: "Total Value",
      lowStockAlert: "Low Stock",
      outOfStock: "Out of Stock",
      stockEvolution: "Inventory Growth",
      stockEvolutionSubtitle: "Tracking products added over the past 12 weeks",
      productsAdded: "Products",
      stockLevels: "Stock levels",
      stockPercentage: "in percentage",
      inStock: "In stock",
      lowStock: "Low stock",
      outOfStockItem: "Out of stock",
      recentProducts: "Recently added",
      recentProductsSubtitle: "Your most recently added products",
      noProducts: "No products yet",
      noProductsSubtitle: "Add your first product to visualize your analytics",
      addFirstProduct: "Add a product",
      unitPrice: "Unit price",
    },
    inventory: {
      title: "Inventory",
      subtitle:
        "Oversee your stock, update quantities, and manage your catalog",
      filter: "Filter",
      sortBy: "Sort by",
      nameAsc: "Name (A → Z)",
      nameDesc: "Name (Z → A)",
      qtyAsc: "Quantity (low to high)",
      qtyDesc: "Quantity (high to low)",
      priceAsc: "Price (low to high)",
      priceDesc: "Price (high to low)",
      searchPlaceholder: "Search by name or SKU...",
      selectedCount: "selected",
      cancelSelection: "Cancel",
      deleteSelected: "Delete",
      newProduct: "New product",
      totalReferences: "Total Items",
      inStockBadge: "In stock",
      lowStockBadge: "Low stock",
      outOfStockBadge: "Out of stock",
      colProduct: "Product",
      colSku: "SKU / Code",
      colPrice: "Unit price",
      colStatus: "Status",
      colQuantity: "Quantity in stock",
      colActions: "Actions",
      noProductFound: "No products found",
      noProductFoundSub: "Add a new product or modify your search",
      noProductYet: "No products in inventory",
      paginationShowing: "Showing",
      paginationTo: "to",
      paginationOn: "of",
      paginationProducts: "products",
      paginationPrevious: "Previous",
      paginationNext: "Next",
      decreaseQty: "Decrease",
      increaseQty: "Increase",
      deleteProductTooltip: "Delete",
      confirmDeleteTitle: "Confirm deletion",
      confirmDeleteSingle:
        "Are you sure you want to delete this product? This action cannot be undone.",
      confirmDeleteBulk:
        "Are you sure you want to delete the selected products? This action cannot be undone.",
      confirm: "Confirm",
      cancel: "Cancel",
      deleting: "Deleting...",
      deleteSuccess: "Product successfully deleted",
      deleteBulkSuccess: "product(s) successfully deleted",
      deleteError: "Error while deleting",
      qtyUpdateError: "Error while updating quantity",
      statusInStock: "IN STOCK",
      statusLowStock: "LOW STOCK",
      statusOutOfStock: "OUT OF STOCK",
    },
    addProduct: {
      title: "Add a product",
      subtitle: "Add a new item to your inventory catalog",
      nameLabel: "Product name",
      namePlaceholder: "e.g. Dell XPS 15 Laptop",
      qtyLabel: "Quantity",
      priceLabel: "Price (€)",
      skuLabel: "SKU",
      skuOptional: "(Optional)",
      skuPlaceholder: "e.g. DELL-XPS15-001",
      lowStockThreshold: "Low stock threshold",
      lowStockThresholdHint:
        "You will receive an alert when stock reaches this threshold",
      submitButton: "Add product",
      submitting: "Adding...",
      cancelButton: "Cancel",
      addSuccess: "Product added successfully!",
      addError: "Error while adding product",
    },
    settings: {
      title: "Settings",
      subtitle: "Manage your account settings and preferences",
    },
  },
};

export type TranslationsType = typeof translations.fr;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationsType;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  t: translations.fr,
});

const STORAGE_KEY = "stokki_lang";

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      const lang = stored === "en" || stored === "fr" ? stored : "fr";
      setLanguageState(lang);
      document.documentElement.lang = lang === "en" ? "en-GB" : "fr-FR";
      document.documentElement.setAttribute("data-lang", lang);
    } catch {
      // localStorage may not be accessible in rare cases
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang === "en" ? "en-GB" : "fr-FR";
      document.documentElement.setAttribute("data-lang", lang);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
