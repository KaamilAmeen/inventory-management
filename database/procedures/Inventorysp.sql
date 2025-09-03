USE foodmanagement;
CREATE TABLE inventory (
   i_id INT,
    p_id INT,
    Owner_name VARCHAR(50),
    Hub_location VARCHAR(50),
    Quantity INT,
    PRIMARY KEY (i_id, p_id)
);
INSERT INTO inventory (i_id, p_id, Owner_name, Hub_location, Quantity) VALUES
(1, 101, 'Ravi', 'Delhi Hub', 500),
(1, 102, 'Ravi', 'Delhi Hub', 300),   
(2, 103, 'Anil', 'Mumbai Hub', 600),
(2, 104, 'Anil', 'Mumbai Hub', 400), 
(3, 105, 'Suresh', 'Chennai Hub', 550),
(4, 106, 'Kiran', 'Hyderabad Hub', 700),
(5, 107, 'Mohan', 'Kolkata Hub', 800),
(6, 108, 'Ravi', 'Delhi Hub', 650),
(6, 109, 'Ravi', 'Delhi Hub', 350),   
(7, 110, 'Anil', 'Mumbai Hub', 720),
(7, 111, 'Anil', 'Mumbai Hub', 500), 
(8, 112, 'Suresh', 'Chennai Hub', 680),
(9, 113, 'Kiran', 'Hyderabad Hub', 900),
(9, 114, 'Kiran', 'Hyderabad Hub', 450), 
(10, 115, 'Mohan', 'Kolkata Hub', 400),
(11, 116, 'Ravi', 'Delhi Hub', 750),
(11, 117, 'Ravi', 'Delhi Hub', 500),     
(12, 118, 'Anil', 'Mumbai Hub', 620),
(12, 119, 'Anil', 'Mumbai Hub', 300),    
(13, 120, 'Suresh', 'Chennai Hub', 800);


SELECT * FROM inventory;



DELIMITER //
CREATE PROCEDURE Allinventory()
BEGIN
    SELECT * From inventory;
END //
DELIMITER ;

CALL Allinventory(); 



    
    
    
 






    



