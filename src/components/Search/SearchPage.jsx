import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSearch } from "../../hooks/useSearch.js";
import SearchResults from "./SearchResults.jsx";
import FilterPanel from "./FilterPanel.jsx";

const SearchPage = () => {
  const {
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
  } = useSearch();

  return (
    <Container className="mt-4">
      <Row>
        <SearchResults
          query={query}
          rawItems={rawItems}
          sortOption={sortOption}
          page={page}
          totalPages={totalPages}
          availableProducts={availableProducts}
          error={error}
          isLoading={isLoading}
          handlePageChange={handlePageChange}
        />
        <FilterPanel
          selectedIndex={selectedIndex}
          sortOption={sortOption}
          filters={filters}
          minPrice={minPrice}
          maxPrice={maxPrice}
          availableBrands={availableBrands}
          availableCategories={availableCategories}
          handleSortSelect={handleSortSelect}
          handleIndexSelect={handleIndexSelect}
          handleFilterChange={handleFilterChange}
          handleClearFilters={handleClearFilters}
        />
      </Row>
    </Container>
  );
};

export default SearchPage;