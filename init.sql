-- Setting Native password cause some drive does not support 'caching_sha2_password'
SET GLOBAL authentication_policy='mysql_native_password';

-- Create separate database for keycloak
CREATE DATABASE IF NOT EXISTS keycloak;

GRANT ALL ON *.* TO 'admin'@'%';