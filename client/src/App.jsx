import React, { useState } from "react";
import Inventory from "./components/InventoryPage/Inventory";
import StaticGrid from "./components/StaticGrid/StaticGrid";

function App() {
  const [page, setPage] = useState("inventory");
  const [items, setItems] = useState([]);          // all items stored here
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      {page === "inventory" && (
        <Inventory
          items={items}
          setItems={setItems}
          onViewItem={(item) => {
            setSelectedItem(item);
            setPage("grid");
          }}
        />
      )}

      {page === "grid" && selectedItem && (
        <StaticGrid
          item={selectedItem}
          onBack={() => setPage("inventory")}
        />
      )}
    </>
  );
}

export default App;
