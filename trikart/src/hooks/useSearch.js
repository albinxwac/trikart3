import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import useSWRImmutable from "swr/immutable";

const INDICES = [
  {
    name: "english",
    clientId: "7645129791",
    secretKey: "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
  },
  {
    name: "arabic",
    clientId: "5807942863",
    secretKey: "Llz5MR37gZ4gJULMwf762w1lQ13Iro",
  },
];



const fetcher = async ([_, query, page, filters, selectedIndex]) => {
  const indexConfig = INDICES.find((index) => index.name === selectedIndex) || INDICES[0];

  try {
    const response = await axiosInstance.post(
      "/search",
      {
        search: query,
        size: 9,
        page: page,
        page_size: 28,
        filter: {
          category: filters.categories.length > 0 ? filters.categories : undefined,
          price: filters.priceRange,
          brand: filters.brands.length > 0 ? filters.brands : undefined,
        },
      },
      {
        headers: {
          "Client-id": indexConfig.clientId,
          "Secret-key": indexConfig.secretKey,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};


export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const brands = searchParams.get("brands")?.split(",") || [];
  const categories = searchParams.get("categories")?.split(",") || [];
  const selectedIndex = searchParams.get("index") || INDICES[0].name;
  const [sortOption, setSortOption] = useState("Relevance");

  const priceMin = parseInt(searchParams.get("priceMin")) || 0;
  const priceMax = parseInt(searchParams.get("priceMax")) || 10000;

  const filters = {
    brands,
    categories,
    priceRange: [priceMin, priceMax],
  };

  const { data, error, isLoading } = useSWRImmutable(
    query ? ["/search", query, page, filters, selectedIndex] : null,
    fetcher,
    { revalidateOnFocus: false }
  );
  

  const rawItems = data?.items || [];
  const totalPages = Math.ceil((data?.total || 0) / 28);
  const availableProducts = data?.total || 0;

  const filterList = data?.filter_list || [];
  const priceFilter = filterList.find((f) => f.label === "Price")?.options || {
    min_price: 0,
    max_price: 10000,
  };
  const brandFilter = filterList.find((f) => f.label === "Brand")?.options || [];
  const categoryFilter = filterList.find((f) => f.label === "Category")?.options || [];

  const minPrice = priceFilter.min_price;
  const maxPrice = priceFilter.max_price;
  const availableBrands = brandFilter.map((option) => option.name);
  const availableCategories = categoryFilter.map((option) => option.name);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", newPage.toString());
      setSearchParams(newParams, { replace: true });
    }
  };

  const handleFilterChange = (type, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (type === "brands" || type === "categories") {
      const currentValues = type === "brands" ? brands : categories;
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      if (updatedValues.length > 0) {
        newParams.set(type, updatedValues.join(","));
      } else {
        newParams.delete(type);
      }
    } else if (type === "priceRange") {
      newParams.set("priceMin", value[0].toString());
      newParams.set("priceMax", value[1].toString());
    }
    newParams.set("page", "1");
    setSearchParams(newParams, { replace: true });
  };

  const handleSortSelect = (eventKey) => {
    setSortOption(eventKey);
  };

  const handleIndexSelect = (eventKey) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("index", eventKey);
    newParams.set("page", "1");
    setSearchParams(newParams, { replace: true });
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("brands");
    newParams.delete("categories");
    newParams.set("priceMin", minPrice.toString());
    newParams.set("priceMax", maxPrice.toString());
    newParams.set("page", "1");
    setSearchParams(newParams, { replace: true });
  };

  return {
    query,
    page,
    totalPages,
    availableProducts,
    rawItems,
    sortOption,
    selectedIndex,
    filters,
    minPrice,
    maxPrice,
    availableBrands,
    availableCategories,
    error,
    isLoading,
    handlePageChange,
    handleFilterChange,
    handleSortSelect,
    handleIndexSelect,
    handleClearFilters,
  };
};