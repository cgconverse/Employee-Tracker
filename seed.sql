USE employeeTracker_DB;

INSERT INTO department
 (title)
 VALUES
('Clothes'),
('Makeup'),
('Shoes'),
('Accessories'),
('Skincare');

INSERT INTO role
(title, salary, department_id)
VALUES
('Manager', 26.00, 1),
('Assistant', 18.00, 2),
('Secretary', 14.00, 3),
('Department Head', 36.00, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Betty', 'Wright', 1, 1),
('Simon', 'Finkle', 2, null),
('Samantha', 'Good', 3, 1),
('Peter', 'Parker', 1, 1),
('Lisa', 'Lowry', 4, null),
('Chandler', 'Bing', 5, 1);