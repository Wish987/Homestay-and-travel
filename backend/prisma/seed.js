const prisma = require("./client");

async function main() {
  try {
    await prisma.$connect();

    await prisma.booking.deleteMany();
    await prisma.homestay.deleteMany();
    await prisma.user.deleteMany();

    const users = await prisma.user.createMany({
      data: [
        { name: "Asha Rao", email: "asha@example.com", phone: "9876543210" },
        { name: "Rohan Menon", email: "rohan@example.com", phone: "9123456780" }
      ]
    });

    const homestays = await prisma.homestay.createMany({
      data: [
        {
          name: "Mountain Retreat",
          location: "Ooty",
          price: 4999,
          image: "/images/mountain.jpg",
          description: "Beautiful mountain cottage with scenic views."
        },
        {
          name: "Beach Paradise",
          location: "Goa",
          price: 7999,
          image: "/images/beach.jpg",
          description: "Luxury beachfront villa with private pool."
        },
        {
          name: "Kerala Backwater Stay",
          location: "Kerala",
          price: 5499,
          image: "/images/kerala.jpg",
          description: "Relax in peaceful backwaters with nature."
        },
        {
          name: "Forest Cabin",
          location: "Coorg",
          price: 5999,
          image: "/images/forest.jpg",
          description: "A calm stay in the middle of coffee plantations."
        },
        {
          name: "City Luxe Apartment",
          location: "Bangalore",
          price: 6999,
          image: "/images/city.jpg",
          description: "Modern apartment close to business hubs and cafes."
        }
      ]
    });

    const createdUsers = await prisma.user.findMany();
    const createdHomestays = await prisma.homestay.findMany();

    await prisma.booking.createMany({
      data: [
        {
          userId: createdUsers[0].id,
          homestayId: createdHomestays[0].id,
          checkIn: new Date("2026-08-01"),
          checkOut: new Date("2026-08-03"),
          status: "Confirmed"
        },
        {
          userId: createdUsers[0].id,
          homestayId: createdHomestays[2].id,
          checkIn: new Date("2026-08-10"),
          checkOut: new Date("2026-08-12"),
          status: "Pending"
        },
        {
          userId: createdUsers[1].id,
          homestayId: createdHomestays[4].id,
          checkIn: new Date("2026-09-01"),
          checkOut: new Date("2026-09-04"),
          status: "Confirmed"
        }
      ]
    });

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.warn("Seed skipped because the database connection is unavailable:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
