import { useState } from "react";
import { useModal } from "./hooks/useModal";
import { useProducts } from "./contexts/productsContext";
import { useSearchParams } from "react-router-dom";

import { Box, Pagination, Typography } from "@mui/material";

import NumberInput from "./components/NumberInput/NumberInput";
import Modal from "./components/Modal/Modal";
import ProductsTable from "./components/ProductsTable/ProductsTable";

import { Product } from "./types/types";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = searchParams.get("page") || "";
  const productIndex = searchParams.get("id") || "";

  const [isModalOpen, openModalHandler, closeModalHandler] = useModal();
  const { productsData, error, setProductsPage } = useProducts();

  const [selectedRow, setSelectedRow] = useState<Product>();

  const [productIndexNumber, setProductIndexNumber] = useState("");

  if (!productsData && error) {
    return <p>{error.message}</p>;
  }

  if (!productsData) {
    return <p>Loading...</p>;
  }

  if (+pageIndex > productsData.total_pages || +pageIndex <= 0) {
    setProductsPage(1);
    setSearchParams({ page: "1" });
  }

  const numberInputChangeHandler = (value: string) => {
    setProductIndexNumber(value.toString());
    const params = new URLSearchParams();
    params.append("page", pageIndex);
    if (value !== "") {
      params.append("id", value);
    }
    setSearchParams(params);
  };

  const filteredProducts = productsData.data.filter(
    (product) =>
      product.id === +productIndex || product.id === +productIndexNumber,
  );

  const productsList =
    filteredProducts.length !== 0 ? filteredProducts : productsData.data;

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        margin: "100px",
      }}
    >
      <NumberInput
        onChange={numberInputChangeHandler}
        productIndex={productIndex || productIndexNumber.toString()}
      />
      <ProductsTable
        productsList={productsList}
        openModalHandler={openModalHandler}
        setSelectedRow={setSelectedRow}
      />
      <Pagination
        count={productsData.total_pages}
        variant="outlined"
        color="primary"
        page={+pageIndex || 1}
        onChange={(_, page) => {
          setProductsPage(page);
          setSearchParams({ page: page.toString() });
        }}
      />
      {selectedRow && (
        <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
          <Typography>Product id: {selectedRow.id}</Typography>
          <Typography>Product name: {selectedRow.name}</Typography>
          <Typography>Product year: {selectedRow.year}</Typography>
          <Typography>Pantone value: {selectedRow.pantone_value}</Typography>
          <Typography>Product color: {selectedRow.color}</Typography>
        </Modal>
      )}
    </Box>
  );
}

export default App;
