/*
  Warnings:

  - You are about to drop the `_UserSeenMessages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_UserSeenMessages` DROP FOREIGN KEY `_UserSeenMessages_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserSeenMessages` DROP FOREIGN KEY `_UserSeenMessages_B_fkey`;

-- DropTable
DROP TABLE `_UserSeenMessages`;

-- CreateTable
CREATE TABLE `_user_seen_messages` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_user_seen_messages_AB_unique`(`A`, `B`),
    INDEX `_user_seen_messages_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_user_seen_messages` ADD CONSTRAINT `_user_seen_messages_A_fkey` FOREIGN KEY (`A`) REFERENCES `messages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user_seen_messages` ADD CONSTRAINT `_user_seen_messages_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
