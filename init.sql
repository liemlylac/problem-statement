-- Create separate database for keycloak
CREATE DATABASE IF NOT EXISTS keycloak;
CREATE DATABASE IF NOT EXISTS problem_statement;
CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'adminSecret';
GRANT ALL PRIVILEGES ON keycloak.* TO 'admin'@'%';
GRANT ALL PRIVILEGES ON problem_statement.* TO 'admin'@'%';
