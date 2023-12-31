ALTER TABLE `user` RENAME COLUMN `username` TO `name`;--> statement-breakpoint
ALTER TABLE user ADD `avatar` text DEFAULT '' NOT NULL;