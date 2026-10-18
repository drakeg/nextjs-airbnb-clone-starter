CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "locationType" TEXT NOT NULL,
    "placeType" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL DEFAULT 1,
    "bedrooms" INTEGER NOT NULL DEFAULT 1,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "mapData" JSONB,
    "photos" JSONB,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE INDEX "Listing_ownerId_idx" ON "Listing"("ownerId");
CREATE UNIQUE INDEX "Wishlist_userId_listingId_key" ON "Wishlist"("userId", "listingId");
CREATE INDEX "Wishlist_listingId_idx" ON "Wishlist"("listingId");
CREATE INDEX "Trip_userId_idx" ON "Trip"("userId");
CREATE INDEX "Trip_listingId_idx" ON "Trip"("listingId");

ALTER TABLE "Listing"
  ADD CONSTRAINT "Listing_ownerId_fkey"
  FOREIGN KEY ("ownerId") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Wishlist"
  ADD CONSTRAINT "Wishlist_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Wishlist"
  ADD CONSTRAINT "Wishlist_listingId_fkey"
  FOREIGN KEY ("listingId") REFERENCES "Listing"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Trip"
  ADD CONSTRAINT "Trip_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Trip"
  ADD CONSTRAINT "Trip_listingId_fkey"
  FOREIGN KEY ("listingId") REFERENCES "Listing"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "User" (
  "id", "username", "firstName", "lastName", "password", "role", "updatedAt"
) VALUES (
  'demo-host-user', 'demo-host', 'Demo', 'Host', 'auth-migration-pending', 'ADMIN', CURRENT_TIMESTAMP
);

INSERT INTO "Listing" (
  "id", "title", "description", "location", "locationType", "placeType",
  "price", "guests", "bedrooms", "rating", "featured", "ownerId", "updatedAt"
) VALUES
('lake-cabin', 'Lakeside Cabin Retreat', 'A quiet cabin near the water with a private deck, fire pit, full kitchen, and room for a long weekend away.', 'Finger Lakes, New York', 'Waterfront', 'Cabin', 189, 4, 2, 4.92, true, 'demo-host-user', CURRENT_TIMESTAMP),
('mountain-a-frame', 'Mountain A-Frame', 'A modern A-frame surrounded by trails, mountain views, and a cozy wood-burning stove.', 'Poconos, Pennsylvania', 'Mountains', 'Cabin', 215, 6, 3, 4.87, true, 'demo-host-user', CURRENT_TIMESTAMP),
('river-camper', 'Riverside Camper Getaway', 'A fully equipped camper on a private riverfront site with outdoor dining and easy paddling access.', 'Central Pennsylvania', 'Riverfront', 'Campervan', 129, 4, 1, 4.81, false, 'demo-host-user', CURRENT_TIMESTAMP),
('city-loft', 'Walkable City Loft', 'Bright loft with a dedicated workspace, full kitchen, and restaurants and breweries just outside the door.', 'Pittsburgh, Pennsylvania', 'City', 'Apartment', 164, 2, 1, 4.76, false, 'demo-host-user', CURRENT_TIMESTAMP),
('farmhouse', 'Country Farmhouse', 'Restored farmhouse with a large porch, open fields, family-sized kitchen, and plenty of room to unplug.', 'State College, Pennsylvania', 'Countryside', 'House', 248, 8, 4, 4.95, true, 'demo-host-user', CURRENT_TIMESTAMP),
('tiny-home', 'Modern Tiny Home', 'Efficient tiny-home living with a full bath, compact kitchen, outdoor seating, and a surprisingly roomy interior.', 'Allegheny National Forest, Pennsylvania', 'Forest', 'Tiny home', 118, 2, 1, 4.89, false, 'demo-host-user', CURRENT_TIMESTAMP);
