import React from "react";
import { Card, Col } from "react-bootstrap";

const ProductCard = ({ item }) => (
  <Col>
    <Card className="h-100" style={{ opacity: item.in_stock ? 1 : 0.6 }}>
      <Card.Img variant="top" src={item.image_link} alt={item.title} className="img-fluid rounded" />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text className="fw-bold">
          {item.discount_percentage > 0 && item.sale_price ? (
            <>
              <span style={{ textDecoration: "line-through", color: "grey" }}>
                ₹{item.price.trim()}
              </span>{" "}
              <span style={{ color: "red" }}>₹{item.sale_price.trim()}</span>
            </>
          ) : (
            <span>₹{item.price.trim()}</span>
          )}
        </Card.Text>
        {!item.in_stock && (
          <Card.Text className="text-danger fw-bold" style={{ marginTop: "10px" }}>
            Sold Out
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  </Col>
);

export default ProductCard;