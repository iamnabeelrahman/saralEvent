CREATE TABLE `distributor_partner` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`distributor_id` text NOT NULL,
	`commission_percentage` integer DEFAULT 10 NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`distributor_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
