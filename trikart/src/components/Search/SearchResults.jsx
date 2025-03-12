import React from "react";
import { Row, Col, Spinner, Alert, Pagination } from "react-bootstrap";
import ProductCard from "./ProductCard.jsx";

const SearchResults = ({
  query,
  rawItems,
  sortOption,
  page,
  totalPages,
  availableProducts,
  error,
  isLoading,
  handlePageChange,
}) => {
  const sortedItems = [...rawItems].sort((a, b) => {
    const priceA = a.discount_percentage > 0 && a.sale_price ? parseFloat(a.sale_price.trim()) : parseFloat(a.price.trim());
    const priceB = b.discount_percentage > 0 && b.sale_price ? parseFloat(b.sale_price.trim()) : parseFloat(b.price.trim());
    switch (sortOption) {
      case "Price: High to Low":
        return priceB - priceA;
      case "Price: Low to High":
        return priceA - priceB;
      default:
        return 0;
    }
  });
  
  return (
    <Col md={8}>
      <h1 className="text-center mb-4">Search Results for: {query}</h1>
      <p>
        Showing results for <strong>{availableProducts}</strong> products found
      </p>
      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && (
        <Alert variant="danger">
          <Alert.Heading>Oops!</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      )}
      {!isLoading && !error && (
        <>
          <Row xs={1} md={3} className="g-4 mb-4">
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => <ProductCard key={item.id} item={item} />)
            ) : (
              <Col className="text-center">
                <p className="lead">Results not found</p>
              </Col>
            )}
          </Row>
          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
                {Array.from({ length: totalPages }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === page}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
    </Col>
  );
};

export default SearchResults;