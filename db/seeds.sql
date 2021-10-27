INSERT INTO department (name)
VALUES
    ( "Sales"),
    ( "Engineering"),
    ( "Legal");

INSERT INTO role (title, salary, department_id)
VALUES
    ( "Sales Manager", 100000,1),
    (  'Sales Person',80000,1),
    ( "Senior Engineer", 100000,2),
    ( "Junior Dev", 70000,2),
    (  'Lawyer',350000,3),
    ( "Legal Assistant", 70000,3);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES
    ("Bob",'Smith', 1, NULL ),
    ("Jim", 'Johnson', 2, 1),
    ("Daniel", 'Diaz',5, NULL),
    ("Vinnie", "Lopez", 6, 3),
    ("Abi", 'Diaz', 3, NULL),
    ("Korey", "Cheshire", 4, 3);