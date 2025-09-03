USE foodmanagement;

DELIMITER //
CREATE PROCEDURE InsertProduct (
   IN in_p_id INT,
   IN in_p_name VARCHAR(50),
   IN in_price DECIMAL(10,2),
   IN in_sales INT
)

BEGIN
     INSERT INTO Product (p_id, p_name, price, sales) 
     values(in_p_id, in_p_name, in_price, in_sales);
END //
DELIMITER ;

CALL InsertProduct (121, 'Honey', 250.00, 400); 
CALL InsertProduct (122,'chicken', 190.00, 220);




DELIMITER $$
CREATE PROCEDURE UpdateProduct(
    IN in_p_id INT,
    IN new_name VARCHAR(50),
    IN new_price DECIMAL(10,2),
    IN new_sales INT
)
BEGIN
	UPDATE Product 
    SET p_name = new_name,
        price = new_price,
        sales = new_sales
    WHERE p_id = in_p_id;
END $$
DELIMITER ;
CALL UpdateProduct (105, 'Green Pulses', 75.00, 950);