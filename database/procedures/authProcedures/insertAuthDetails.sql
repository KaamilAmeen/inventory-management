DELIMITER $$
CREATE PROCEDURE InsertAuthDetails (IN u_username VARCHAR(50), IN u_email VARCHAR(100), 
IN u_password VARCHAR(255), 
IN u_role_id INT)
BEGIN
INSERT INTO users (username, email, password, role_id) 
VALUES (u_username, u_email, u_password, u_role_id);
END $$
DELIMITER ;