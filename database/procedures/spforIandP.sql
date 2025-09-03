USE foodmanagement;

SELECT 
    i.i_id,
    i.Owner_name,
    i.Hub_location,
    i.Quantity,
    i.p_id,
    p.p_name,
    p.price,
    p.sales
FROM Inventory i
LEFT JOIN Product p 
    ON i.p_id = p.p_id;

DELIMITER //

CREATE PROCEDURE GetInventoryWithProducts(IN inv_id INT)
BEGIN
    SELECT 
        i.i_id,
        i.Owner_name,
        i.Hub_location,
        i.Quantity,
        i.p_id,
        p.p_name,
        p.price,
        p.sales
    FROM Inventory i
    LEFT JOIN Product p 
    ON i.p_id = p.p_id
    WHERE i.i_id = inv_id;
END //
DELIMITER ;


CALL GetInventoryWithProducts(7); 