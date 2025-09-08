DELIMITER //

create procedure DeleteInventory(in iid int , in pid int)
begin 
delete from inventory where i_id=iid and p_id=pid;
end//

DELIMITER ;

call DeleteInventory(1,101);
