DELIMITER //
CREATE PROCEDURE getUserByEmail (IN u_email varchar(100))
BEGIN 
SELECT * FROM user WHERE email = u_email; 
END //
DELIMITER ;