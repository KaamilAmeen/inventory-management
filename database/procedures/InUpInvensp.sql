USE foodmanagement;

DELIMITER //
CREATE PROCEDURE InsertInventory(
    IN in_i_id INT,
    IN in_p_id INT,
    IN in_Owner_name VARCHAR(50),
    IN in_Hub_location VARCHAR(50),
    IN in_Quantity INT
)
BEGIN
    INSERT INTO inventory (i_id, p_id, Owner_name, Hub_location, Quantity)
    VALUES (in_i_id, in_p_id, in_Owner_name, in_Hub_location, in_Quantity);
END //
DELIMITER ;

CALL InsertInventory(4, 121, 'Manoj', 'Pune Hub', 550);


DELIMITER //
CREATE PROCEDURE UpdateInventory(
    IN in_i_id INT,
    IN in_p_id INT,
    IN new_name VARCHAR(50),
    IN new_quantity INT,
    IN new_location VARCHAR(50)
)
BEGIN
    UPDATE inventory
    SET Quantity = new_quantity,
        Hub_location = new_location,
        Owner_name = new_name
    WHERE i_id = in_i_id AND p_id = in_p_id;
END //
DELIMITER ;


CALL UpdateInventory(1, 101, 600, 'Delhi Hub');



