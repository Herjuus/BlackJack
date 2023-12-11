-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema blackjack
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema blackjack
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `blackjack` DEFAULT CHARACTER SET utf8 ;
USE `blackjack` ;

-- -----------------------------------------------------
-- Table `blackjack`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `blackjack`.`user` ;

CREATE TABLE IF NOT EXISTS `blackjack`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `chips` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blackjack`.`task`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `blackjack`.`task` ;

CREATE TABLE IF NOT EXISTS `blackjack`.`task` (
  `user_id` INT NOT NULL,
  `correct` INT NULL,
  `incorrect` INT NULL,
  INDEX `fk_task_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_task_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `blackjack`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blackjack`.`pot`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `blackjack`.`pot` ;

CREATE TABLE IF NOT EXISTS `blackjack`.`pot` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `chips` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pot_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_pot_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `blackjack`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
