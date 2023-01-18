CREATE TABLE IF NOT EXISTS `products` (
    `product_id` INT NOT NULL AUTO_INCREMENT,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `name` VARCHAR(50),
    `slug` VARCHAR(50),
    `category` JSON NOT NULL,
    `brand` JSON NOT NULL,
    `status` BOOLEAN NOT NULL,
    PRIMARY KEY (product_id)
);