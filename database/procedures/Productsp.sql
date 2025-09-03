USE foodmanagement;

CREATE TABLE product (
    p_id INT PRIMARY KEY,
    p_name VARCHAR(50),
    price DECIMAL(10,2),
    sales INT
);
INSERT INTO Product (p_id, p_name, price, sales) VALUES
(101, 'Wheat', 45.00, 1200),
(102, 'Rice', 50.00, 1400),
(103, 'Sugar', 40.00, 900),
(104, 'Oil', 120.00, 600),
(105, 'Pulses', 70.00, 800),
(106, 'Salt', 20.00, 1000),
(107, 'Tea', 150.00, 700),
(108, 'Coffee', 200.00, 500),
(109, 'Milk', 35.00, 1600),
(110, 'Butter', 250.00, 450),
(111, 'Cheese', 300.00, 400),
(112, 'Curd', 50.00, 750),
(113, 'Eggs', 6.00, 2000),
(114, 'Chicken', 180.00, 850),
(115, 'Fish', 220.00, 600),
(116, 'Mutton', 500.00, 300),
(117, 'Fruits', 90.00, 1100),
(118, 'Vegetables', 60.00, 1300),
(119, 'Juice', 80.00, 700),
(120, 'Biscuits', 30.00, 1500);

SELECT * FROM Product;

DELIMITER $$
CREATE PROCEDURE Allproduct()
BEGIN 
  SELECT * FROM product;
END $$
DELIMITER ;

CALL Allproduct();





