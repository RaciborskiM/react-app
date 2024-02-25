import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useSearchParams } from "react-router-dom";

import { Product } from "../types/types";

interface ProductsData {
  data: Product[];
  page: number;
  per_page: number;
  support: {
    url: string;
    text: string;
  };
  total: number;
  total_pages: number;
}

interface ProductsDataContextType {
  productsData: ProductsData | undefined;
  setProductsPage: (page: number) => void;
  setProductsLimit: (limit: number) => void;
  fetchProductsData: (page: number, limit?: number) => void;
}

const DataContext = createContext<ProductsDataContextType | undefined>(
  undefined,
);

export const ProductsDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [productsData, setProductsData] = useState<ProductsData | undefined>(
    undefined,
  );

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const [productsPage, setProductsPage] = useState<number>(page ? +page : 1);
  const [productsLimit, setProductsLimit] = useState<number>(5);

  const fetchProductsData = async (page: number, limit?: number) => {
    let url = "https://reqres.in/api/products";
    if (page && limit) {
      url += `?page=${page}&per_page=${limit}`;
    } else if (page) {
      url += `?page=${page}`;
    } else if (limit) {
      url += `?per_page=${limit}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedData = await response.json();
      setProductsData(fetchedData);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  useEffect(() => {
    fetchProductsData(productsPage, productsLimit);
  }, [productsPage, productsLimit]);

  return (
    <DataContext.Provider
      value={{
        productsData,
        setProductsPage,
        setProductsLimit,
        fetchProductsData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a ProductsDataProvider");
  }
  return context;
};
