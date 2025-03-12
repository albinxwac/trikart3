// FilterPanel.jsx
import React from "react";
import { Col, DropdownButton, Dropdown, Button, Form } from "react-bootstrap";
import CustomSlider from "./CustomSlider.jsx";

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

const FilterPanel = ({
  selectedIndex,
  sortOption,
  filters,
  minPrice,
  maxPrice,
  availableBrands,
  availableCategories,
  handleSortSelect,
  handleIndexSelect,
  handleFilterChange,
  handleClearFilters,
}) => (
  <Col md={4}>
    <h5>Select Language:</h5>
    <DropdownButton
      title={selectedIndex}
      onSelect={handleIndexSelect}
      className="mb-2"
    >
      {INDICES.map((index) => (
        <Dropdown.Item key={index.name} eventKey={index.name}>
          {index.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>

    <h3>Sort by:</h3>
    <DropdownButton
      title={sortOption}
      onSelect={handleSortSelect}
      className="mb-2"
    >
      <Dropdown.Item eventKey="Relevance">Relevance</Dropdown.Item>
      <Dropdown.Item eventKey="Price: High to Low">
        Price: High to Low
      </Dropdown.Item>
      <Dropdown.Item eventKey="Price: Low to High">
        Price: Low to High
      </Dropdown.Item>
    </DropdownButton>
    <h4>Filters</h4>
    <Button
      variant="outline-danger"
      onClick={handleClearFilters}
      className="mb-3"
    >
      Clear All Filters
    </Button>

    {availableBrands.length > 0 && (
      <>
        <h6 className="mt-3">Brand</h6>
        <Form>
          {availableBrands.map((brand) => (
            <Form.Check
              key={brand}
              type="checkbox"
              label={brand}
              checked={filters.brands.includes(brand)}
              onChange={() => handleFilterChange("brands", brand)}
            />
          ))}
        </Form>
      </>
    )}

    {availableCategories.length > 0 && (
      <>
        <h6 className="mt-3">Category</h6>
        <Form>
          {availableCategories.map((category) => (
            <Form.Check
              key={category}
              type="checkbox"
              label={category}
              checked={filters.categories.includes(category)}
              onChange={() => handleFilterChange("categories", category)}
            />
          ))}
        </Form>
      </>
    )}

    {minPrice !== undefined && maxPrice !== undefined && (
      <>
        <h6 className="mt-3">Price Range</h6>
        <div className="mb-3">
          <div style={{ marginBottom: "10px" }}>
            {filters.priceRange[0]} - {filters.priceRange[1]}
          </div>
          <CustomSlider
            min={minPrice}
            max={maxPrice}
            value={filters.priceRange}
            onChange={(value) => handleFilterChange("priceRange", value)}
            minDistance={10}
          />
        </div>
      </>
    )}
  </Col>
);

export default FilterPanel;
